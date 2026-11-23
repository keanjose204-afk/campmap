// ---- 1. THE PICTURE + SETTINGS ----
const IMAGE_FILE = MAP_IMAGE_DATA;   // picture is stored in image.js
const IMAGE_WIDTH = 510;             // picture size in pixels
const IMAGE_HEIGHT = 444;
const METERS_PER_PIXEL = 250 / 510;  // real width 250 m / picture width
const SHOW_EDGE_LABELS = false;      // true = always show distances


const INTERSECTIONS = [
  ["i1",  312, 40, "right road, CAF door"],
  ["i2",  311, 92, "top right corner"],
  ["i3",  236,  92, "top road, below CAF"],
  ["i4",  202,  92, "top road, above CICIT"],
  ["i5",  178,  92, "top road, middle road starts"],
  ["i6",  131,  92, "top road, below CBA"],
  ["i7",  88, 92, "top left corner"],
  ["i8",  88, 149, "left road, CIT (upper) door"],
  ["i9",  88, 209, "left road meets middle road"],
  ["i10", 88, 264, "left road, CIT (lower) door"],
  ["i11", 88, 318, "left road meets bottom road"],
  ["i12", 88, 344, "left road, EDUC (small) door"],
  ["i13", 88, 383, "left road, INFIR door"],
  ["i14", 139, 209, "middle road, CHUMMS door"],
  ["i15", 178, 209, "middle road meets center road"],
  ["i15.3", 188, 209, "between i15 and i15.5"],
  ["i15.5", 210, 209,"rode between 15 & 16"],
  ["i16", 273, 209, "middle road, LAB door"],
  ["i17", 312, 209, "middle road meets right road"],
  ["i19", 401, 209, "far right top corner"],
  ["i20", 401, 293, "far right road, CEA door"],
  ["i21", 401, 315, "far right bottom corner"],
  ["i22", 189, 267, "center road, LIB door"],
  ["i23", 295, 267, "short road, CBO (middle) door"],
  ["i24", 312, 266, "short road meets right road"],
  ["i25", 169, 318, "bottom road, EDUC (large) door"],
  ["i26", 202, 319, "bottom road meets center road + south loop"],
  ["i27", 254, 318, "bottom road, Main building door"],
  ["i28", 312, 317, "bottom road meets right road"],
  ["i29", 360, 316, "bottom road, GYM door"],
  ["i30", 312, 358, "right road, CHS door"],
  ["i31", 202, 418, "south loop, bottom left"],
  ["i32", 311, 417, "south loop, bottom right"],
  ["i33", 188, 226, "in front of unnamed b"],
  ["i34", 167, 209, "lib"],
  ["i35", 88, 286, "cit"],
  ["i36", 114, 318, "infront of unnamed D"],
  ["i37", 189, 318, "beside lib"],
  ["i38", 211, 267, "back right main building"],
  ["i39", 314, 267, "back left main building"],
  ["i40", 209, 318, "front left main building"],
  ["i42", 254, 267, "back middle main building"],
  ["i43", 311, 301, "main right"],
  ["i44", 106, 92, "CBA (left)"],
  ["i45", 155, 92, "CBA (right)"],
  ["i46", 178, 180, "Science lab"],
  ["i47", 88, 139, "CHUMMS (left)"],
  ["i48", 312, 176, "LAB (right)"],
  ["i50", 178, 161, "CICT(road)"], 
  ["i51", 202, 161, "CICT(back)"],
  ["i52", 88, 400, "INFIR(front)"],
  ["i53", 202, 401, "main gate rode(left rode)"],
  ["i54", 167, 401, "INFIR(front)"]
];



// 3. ROADS: [intersection, intersection, optional distance in meters]

const ROADS = [
  // right road (top to bottom)
  ["i1","i2",], ["i2","i48"], ["i48", "i17"], ["i17","i24"], ["i24","i28"], ["i28","i30"], ["i30","i32"],
  // top road (left to right)
  ["i7","i44"], ["i44", "i6"], ["i6","i45"], ["i45", "i5"], ["i5","i4"], ["i4","i3"], ["i3","i2"],
  // left road (top to bottom)
  ["i7","i47"], ["i47", "i9"], ["i9", "i10"], ["i10", "i35"], ["i35","i11"], ["i11","i12"], ["i12","i13"],
  // middle road (left to right)
  ["i9","i34"], ["i34", "i14"], ["i14","i15"], ["i15", "i15.3"], ["i15.3", "i15.5"], ["i15.5","i16"], ["i16","i17"], ["i17","i19"], 
  // far right road
  ["i19","i20"], ["i20","i21"],
  // short road
  ["i22","i38"], ["i38", "i42"], ["i42", "i23"], ["i23","i39"], ["i39", "i24"],
  // center road (top to bottom)
  ["i5","i50"], ["i50", "i46"], ["i46", "i15"], ["i15.3","i33"], ["i33","i22"], ["i22", "i37"],
  // bottom road (left to right)
  ["i11","i36"], ["i36", "i25"], ["i25", "i37"], ["i37","i26"], ["i26","i40"], ["i40", "i27"], ["i27","i28"], ["i28","i29"], ["i29","i21"],
  // south loop
  ["i26","i31"], ["i31","i32"],
  
  ["i51", "i50"]
];


// 4. BUILDINGS (22): [name, x, y, connects to which intersection, optional distance in meters]

const BUILDINGS = [
  ["CAF",            285, 40, "i1"],
  ["CBA (top)",      131, 86, "i6"],
  ["CICT",           202, 97, "i4"],
  ["CIT (upper)",    84, 149, "i8"],
  ["CHUMMS",         139, 146, "i14"],
  ["Science Lab",    210, 199, "i15.5"],
  ["LAB",            273, 199, "i16"],
  ["CIA",            418, 293, "i20"],
  ["CIT (lower)",    81, 264, "i10"],
  ["LIB",            158, 267, "i22"],
  ["CBO (middle)",   294, 258, "i23"],
  ["GYM",            360, 279, "i29"],
  ["Main building",  280, 309, "i27"],
  ["EDUC (large)",   201, 332, "i25"],
  ["CHS",            322, 358, "i30"],
  ["CHS-ND",         76, 344, "i12"],
  ["INFIR",          76, 383, "i13"],
  ["Unnamed A",      167, 217, "i34"],  // blue box above LIB
  ["Unnamed B",      194, 226, "i33"],  // blue box left of CBO (middle)
  ["CB Building",      95, 286, "i35"],  // tall blue box left of LIB
  ["Unnamed D",      181, 313, "i36"],  // blue box below LIB
  ["Main (front left)", 238, 309, "i40"],
  ["Main (front right)", 326, 309, "i43"],
  ["Main (back left)", 211, 272, "i38"],
  ["Main (back middle)", 254, 272, "i42"],
  ["Main (back right)", 326, 275, "i39"],
  ["Main (right)", 331, 294, "i43"],
  ["CAF (left)", 236, 69, "i3"],
  ["CBA (left)", 106, 86, "i44"],
  ["CBA (right)", 155, 86, "i45"],
  ["Science Lab", 186, 180, "i46"],
  ["CHUMMS (left)", 94, 139, "i47"],
  ["Lab (right)", 304, 176, "i48"],
  ["Dorm (women)", 319, 176, "i48"],
  ["CICT (back)", 202, 157, "i51"]
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
