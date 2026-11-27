// ---- 1. THE PICTURE + SETTINGS ----
const IMAGE_FILE = MAP_IMAGE_DATA;   // picture is stored in image.js
const IMAGE_WIDTH = 510;             // picture size in pixels
const IMAGE_HEIGHT = 444;
const METERS_PER_PIXEL = 250 / 510;  // real width 250 m / picture width
const SHOW_EDGE_LABELS = false;      // true = always show distances


const INTERSECTIONS = [
  ["i1",  312, 40, ],
  ["i2",  311, 92, ],
  ["i3",  236,  92, ],
  ["i4",  202,  92, ],
  ["i5",  178,  92, ],
  ["i6",  131,  92, ],
  ["i7",  88, 92, ],
  ["i8",  88, 149, ],
  ["i9",  88, 209, ],
  ["i10", 88, 264, ],
  ["i11", 88, 318, ],
  ["i12", 88, 344, ],
  ["i13", 88, 384, ],
  ["i14", 139, 209, ],
  ["i14.5", 139, 209, ],
  ["i15", 179, 209, ],
  ["i15.3", 188, 209, ],
  ["i15.5", 210, 208,],
  ["i16", 273, 208, ],
  ["i17", 312, 209, ],
  ["i18", 401, 209, ],
  ["i19", 401, 219, ],
  ["i20", 401, 293, ],
  ["i21", 401, 315, ],
  ["i22", 189, 267, ],
  ["i23", 294, 266, ],
  ["i24", 312, 266, ],
  ["i25", 169, 318, ],
  ["i26", 202, 318, ],
  ["i27", 254, 318, ],
  ["i28", 312, 317, ],
  ["i29", 360, 316, ],
  ["i30", 312, 358, ],
  ["i31", 202, 418, ],
  ["i32", 311, 417, ],
  ["i33", 189, 228, ],
  ["i34", 216, 418, ],
  ["i35", 88, 286, ],
  ["i36", 113, 318, ],
  ["i37", 189, 318, ],
  ["i38", 210, 266, ],
  ["i39", 114, 400, ],
  ["i40", 209, 318, ],
  ["i42", 254, 266, ],
  ["i43", 311, 300, ],
  ["i44", 106, 92, ],
  ["i45", 155, 92, ],
  ["i46", 178, 155, ],
  ["i47", 88, 140, ],
  ["i48", 312, 176, ],
  ["i50", 178, 181, ], 
  ["i51", 88, 110, ],
  ["i52", 88, 400, ],
  ["i53", 202, 401, ],
  ["i54", 167, 401, ],
  ["i55", 88, 257, ],
  ["i56", 162, 92, ],
  ["i57", 156, 318, ],
  ["i58", 298, 418, ],
  ["i59", 256, 418, ],
];



// 3. ROADS: [intersection, intersection, optional distance in meters]

const ROADS = [
  // right road (top to bottom)
  const ROADS = [
  // ROAD EDGES
  ["i52","i39",], ["i39","i54"], ["i54","i53"],["i53","i31"],["i31","i34"],["i34","i59"],["i59","i58"],["i58","i32"],["i32","i30"],["i30","i28"],["i28","i29"],["i29","i21"],["i21","i20"],["i20","i19"],["i19","i18"],["i18","i17"],["i17","i48"],["i48","i2"],["i2","i3"],["i3","i4"],["i4","i5"],["i5","i56"],["i56","i45"],["i45","i6"],["i6","i44"],["i44","i7"],["i7","i51"],["i51","i47"],["i47","i8"],["i8","i9"],["i9","i55"],["i55","i10"],["i10","i35"],["i35","i11"],["i11","i12"],["i12","i13"],["i13","i52"],
  //vertical (chumms,cict)
  ["i5","i46"],["i46","i50"],["i50","i15"],
  //2nd horizontal row
  ["i9","i14.5"],["i14.5","i15"],["i15","i15.3"],["i15.5","i15.3"],["i15.5","i16"],["i16","i17"],
  //vertical(lib,main building)
  ["i15.3","i33"],["i33","i22"],["i22","i37"],
  //vertical(cbo,gym)
  ["i17","i24"],["i24","i43"],["i43","i28"],
  //3rd horizontal row
  ["i11","i36"],["i36","i57"],["i57","i25"],["i25","i37"],["i37","i26"],["i26","i40"],["i40","i27"],["i27","i28"],
  //horizontal (cbo,main building)
  ["i22","i38"],["i38","i42"],["i42","i23"],["i23","i24"],
  //vertical(coed,mainbuilding)
  ["i53","i26"],
  //near caf road
  ["i1","i2"],
];
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
