// ---- ROUTING: finds the shortest walking path ----

// Dijkstra: finds the shortest walking path
function findRoute(startId, endId) {
  const dist = {}, previous = {}, done = {};
  for (const id in nodes) dist[id] = Infinity;
  dist[startId] = 0;

  while (true) {
    // pick the closest node we haven't finished yet
    let current = null;
    for (const id in nodes) {
      if (!done[id] && (current === null || dist[id] < dist[current])) current = id;
    }
    if (current === null || dist[current] === Infinity || current === endId) break;
    done[current] = true;

    // update the neighbors of this node
    edges.forEach(e => {
      const neighbor = e.a === current ? e.b : e.b === current ? e.a : null;
      if (!neighbor) return;
      const d = dist[current] + e.meters;
      if (d < dist[neighbor]) { dist[neighbor] = d; previous[neighbor] = current; }
    });
  }

  if (dist[endId] === Infinity) return null;

  // walk backwards from the end to build the path
  const path = [];
  for (let id = endId; id; id = previous[id]) path.unshift(id);

  // meters of each step along the path
  const legs = [];
  for (let i = 1; i < path.length; i++) {
    const e = edges.find(e => (e.a === path[i-1] && e.b === path[i]) || (e.b === path[i-1] && e.a === path[i]));
    legs.push(e.meters);
  }

  const meters = dist[endId];
  return { path, legs, meters, minutes: meters / 1.4 / 60, steps: meters / 0.75 };
}