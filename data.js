// ---- 1. THE PICTURE + SETTINGS ----
const IMAGE_FILE = MAP_IMAGE_DATA;   // picture is stored in image.js
const IMAGE_WIDTH = 510;             // picture size in pixels
const IMAGE_HEIGHT = 444;
const METERS_PER_PIXEL = 250 / 510;  // real width 250 m / picture width
const SHOW_EDGE_LABELS = false;      // true = always show distances


const INTERSECTIONS = [
  ["i1",  336,  38, "right road, CAF door"],
  ["i2",  336,  92, "top right corner"],
  ["i3",  263,  92, "top road, below CAF"],
  ["i4",  231,  92, "top road, above CICIT"],
  ["i5",  209,  92, "top road, middle road starts"],
  ["i6",  165,  92, "top road, below CBO (top)"],
  ["i7",  122,  92, "top left corner"],
  ["i8",  122, 151, "left road, CIT (upper) door"],
  ["i9",  122, 208, "left road meets middle road"],
  ["i10", 122, 269, "left road, CIT (lower) door"],
  ["i11", 122, 320, "left road meets bottom road"],
  ["i12", 122, 347, "left road, EDUC (small) door"],
  ["i13", 122, 387, "left road, INFIR door"],
  ["i14", 172, 208, "middle road, CHUMMS door"],
  ["i15", 220, 211, "middle road meets center road"],
  ["i15.5", 239, 208,"rode between 15 & 16"],
  ["i16", 300, 208, "middle road, LAB door"],
  ["i17", 336, 208, "middle road meets right road"],
  ["i18", 378, 208, "middle road, DORM door"],
  ["i19", 423, 208, "far right top corner"],
  ["i20", 423, 305, "far right road, CIA door"],
  ["i21", 423, 318, "far right bottom corner"],
  ["i22", 218, 268, "center road, LIB door"],
  ["i23", 306, 268, "short road, CBO (middle) door"],
  ["i24", 336, 268, "short road meets right road"],
  ["i25", 201, 320, "bottom road, EDUC (large) door"],
  ["i26", 226, 320, "bottom road meets center road + south loop"],
  ["i27", 280, 320, "bottom road, Main building door"],
  ["i28", 336, 320, "bottom road meets right road"],
  ["i29", 383, 319, "bottom road, GYM door"],
  ["i30", 336, 361, "right road, CHS door"],
  ["i31", 231, 422, "south loop, bottom left"],
  ["i32", 336, 422, "south loop, bottom right"]
];


// 3. ROADS: [intersection, intersection, optional distance in meters]

const ROADS = [
  // right road (top to bottom)
  ["i1","i2",], ["i2","i17"], ["i17","i24"], ["i24","i28"], ["i28","i30"], ["i30","i32"],
  // top road (left to right)
  ["i7","i6",31.65], ["i6","i5"], ["i5","i4"], ["i4","i3"], ["i3","i2"],
  // left road (top to bottom)
  ["i7","i8",49.34], ["i8","i9"], ["i9","i10"], ["i10","i11"], ["i11","i12"], ["i12","i13"],
  // middle road (left to right)
  ["i9","i14"], ["i14","i15"], ["i15","i16"], ["i16","i17"], ["i17","i18"], ["i18","i19"],
  // far right road
  ["i19","i20"], ["i20","i21"],
  // short road
  ["i22","i23"], ["i23","i24"],
  // center road (top to bottom)
  ["i5","i15"], ["i15","i22"], ["i22","i26"],
  // bottom road (left to right)
  ["i11","i25"], ["i25","i26"], ["i26","i27"], ["i27","i28"], ["i28","i29"], ["i29","i21"],
  // south loop
  ["i26","i31"], ["i31","i32"]
];


// 4. BUILDINGS (22): [name, x, y, connects to which intersection, optional distance in meters]

const BUILDINGS = [
  ["CAF",            311,  38, "i1"],
  ["CBO (top)",      165,  84, "i6"],
  ["CICIT",          231, 100, "i4"],
  ["CIT (upper)",    117, 151, "i8"],
  ["CHUMMS",         172, 146, "i14"],
  ["COS",            240, 200, "i15.5"],
  ["LAB",            300, 200, "i16"],
  ["DORM WOMEN",     378, 194, "i18"],
  ["CIA",            439, 305, "i20"],
  ["CIT (lower)",    119, 269, "i10"],
  ["LIB",            191, 269, "i22"],
  ["CBO (middle)",   306, 260, "i23"],
  ["GYM",            383, 280, "i29"],
  ["Main building",  280, 309, "i27"],
  ["EDUC (large)",   201, 332, "i25"],
  ["CHS",            348, 361, "i30"],
  ["EDUC (small)",   111, 347, "i12"],
  ["INFIR",          111, 387, "i13"],
  ["Unnamed A",      167, 217, "i14"],  // blue box above LIB
  ["Unnamed B",      223, 240, "i22"],  // blue box left of CBO (middle)
  ["Unnamed C",      130, 283, "i10"],  // tall blue box left of LIB
  ["Unnamed D",      181, 313, "i25"]   // blue box below LIB
];

// Below: builds the lists the app uses. You don't need to edit this part.
const nodes = {};    // id -> {x, y}
const places = [];   // {name, nodeId}
const edges = [];    // {a, b, meters}

function addEdge(a, b, meters) {
  if (!meters) {   // no number typed: measure from the picture
    meters = Math.hypot(nodes[a].x - nodes[b].x, nodes[a].y - nodes[b].y) * METERS_PER_PIXEL;
  }
  edges.push({ a, b, meters });
}

INTERSECTIONS.forEach(([id, x, y]) => nodes[id] = { x, y });
ROADS.forEach(([a, b, meters]) => addEdge(a, b, meters));
BUILDINGS.forEach(([name, x, y, link, meters], i) => {
  const id = "b" + (i + 1);
  nodes[id] = { x, y };
  places.push({ name, nodeId: id });
  addEdge(id, link, meters);
});