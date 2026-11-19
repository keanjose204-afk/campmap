// ---- APP: draws the picture + nodes and finds routes. (Edit data.js to change the map.) ----

// 1. Map = your picture (positions are pixels, y counts from the top)
const map = L.map("map", { crs: L.CRS.Simple, minZoom: -1, maxZoom: 3 });
const bounds = [[0, 0], [IMAGE_HEIGHT, IMAGE_WIDTH]];
L.imageOverlay(IMAGE_FILE, bounds).addTo(map);
map.fitBounds(bounds);

const graphLayer = L.layerGroup().addTo(map);  // nodes + walkways
const routeLayer = L.layerGroup().addTo(map);  // the blue route

// 2. Helpers
function pos(nodeId) {                       // node -> place on the map
  return [IMAGE_HEIGHT - nodes[nodeId].y, nodes[nodeId].x];
}
function placeOf(nodeId) { return places.find(p => p.nodeId === nodeId); }
function findPlace(name) { return places.find(p => p.name.toLowerCase() === name.trim().toLowerCase()); }

// 3. Search suggestions
places.forEach(p => {
  const option = document.createElement("option");
  option.value = p.name;
  document.getElementById("placeList").appendChild(option);
});

// 4. Draw walkways + nodes
let graphVisible = true;

function drawGraph() {
  graphLayer.clearLayers();
  if (!graphVisible) return;

  edges.forEach(e => {
    const line = L.polyline([pos(e.a), pos(e.b)], { color: "#3c00ff", weight: 3 }).addTo(graphLayer);
    line.bindTooltip(Math.round(e.meters * 10) / 10 + " m",
      SHOW_EDGE_LABELS
        ? { permanent: true, direction: "center", className: "edge-label" }
        : { sticky: true, className: "edge-label" });
  });

  for (const id in nodes) {
    const place = placeOf(id);
    L.marker(pos(id), {
      icon: L.divIcon({
        className: "",
        html: '<div class="' + (place ? "bldg-dot" : "node-dot") + '"></div>',
        iconSize: place ? [14, 14] : [10, 10]
      })
    }).addTo(graphLayer)
      .bindTooltip((place ? place.name : "Intersection") + " (" + id + ")<br>x=" + nodes[id].x + ", y=" + nodes[id].y);
  }
}
drawGraph();

document.getElementById("toggleGraph").addEventListener("click", ev => {
  graphVisible = !graphVisible;
  ev.target.textContent = graphVisible ? "Hide nodes" : "Show nodes";
  drawGraph();
});

// 5. Pixel readout: move the mouse to read, click to copy
function pixelText(latlng) {
  return "x=" + Math.round(latlng.lng) + ", y=" + Math.round(IMAGE_HEIGHT - latlng.lat);
}
map.on("mousemove", ev => {
  document.getElementById("coords").textContent = "Mouse: " + pixelText(ev.latlng);
});
map.on("click", ev => {
  document.getElementById("clicked").textContent = "Clicked: " + pixelText(ev.latlng) + " (copied)";
  if (navigator.clipboard) navigator.clipboard.writeText(pixelText(ev.latlng)).catch(() => {});
});

// 6. Find Route
document.getElementById("findButton").addEventListener("click", () => {
  const message = document.getElementById("message");
  const result = document.getElementById("result");
  const list = document.getElementById("directions");
  message.textContent = result.textContent = list.innerHTML = "";
  routeLayer.clearLayers();

  const from = findPlace(document.getElementById("fromInput").value);
  const to = findPlace(document.getElementById("toInput").value);
  if (!from || !to) { message.textContent = "Please pick two places from the list."; return; }
  if (from === to) { message.textContent = "Pick two different places."; return; }

  const route = findRoute(from.nodeId, to.nodeId);
  if (!route) { message.textContent = "No route found."; return; }

  result.textContent = Math.round(route.meters * 10) / 10 + " m, " +
    Math.max(1, Math.round(route.minutes)) + " min walk, " +
    Math.round(route.steps) + " steps";

  const line = L.polyline(route.path.map(pos), { color: "blue", weight: 6 }).addTo(routeLayer);
  map.fitBounds(line.getBounds());

  route.path.slice(1).forEach((id, i) => {
    const place = placeOf(id);
    const meters = Math.round(route.legs[i] * 10) / 10;
    const li = document.createElement("li");
    li.textContent = place ? "Arrive at " + place.name + " (" + meters + " m)"
                           : "Turn at the intersection (" + meters + " m)";
    list.appendChild(li);
  });
});