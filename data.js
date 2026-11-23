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
  ["i6",  131,  92, "top road, below CBO (top)"],
  ["i7",  88, 92, "top left corner"],
  ["i8",  88, 149, "left road, CIT (upper) door"],
  ["i9",  88, 209, "left road meets middle road"],
  ["i10", 89, 265, "left road, CIT (lower) door"],
  ["i11", 88, 318, "left road meets bottom road"],
  ["i12", 88, 344, "left road, EDUC (small) door"],
  ["i13", 88, 384, "left road, INFIR door"],
  ["i14", 139, 209, "middle road, CHUMMS door"],
  ["i15", 179, 209, "middle road meets center road"],
  ["i15.3", 188, 210, "between i15 and i15.5"],
  ["i15.5", 210, 210,"rode between 15 & 16"],
  ["i16", 273, 209, "middle road, LAB door"],
  ["i17", 312, 209, "middle road meets right road"],
  ["i18", 360, 209, "middle road, DORM door"],
  ["i19", 401, 209, "far right top corner"],
  ["i20", 401, 293, "far right road, CIA door"],
  ["i21", 401, 315, "far right bottom corner"],
  ["i22", 189, 268, "center road, LIB door"],
  ["i23", 295, 267, "short road, CBO (middle) door"],
  ["i24", 312, 266, "short road meets right road"],
  ["i25", 169, 318, "bottom road, EDUC (large) door"],
  ["i26", 233, 320, "bottom road meets center road + south loop"],
  ["i27", 280, 320, "bottom road, Main building door"],
  ["i28", 336, 320, "bottom road meets right road"],
  ["i29", 361, 317, "bottom road, GYM door"],
  ["i30", 336, 361, "right road, CHS door"],
  ["i31", 231, 422, "south loop, bottom left"],
  ["i32", 336, 422, "south loop, bottom right"],
  ["i33", 219, 240, "in front of unnamed b"],
  ["i34", 167, 209, "lib"],
  ["i35", 122, 283, "cit"],
  ["i36", 181, 320, "infront of unnamed D"],
  ["i37", 219, 320, "beside lib"],
  ["i38", 236, 268, "back right main building"],
  ["i39", 326, 268, "back left main building"],
  ["i40", 238, 320, "front left main building"],
  ["i41", 326, 320, "front right main building"],
  ["i42", 280, 268, "back middle main building"],
  ["i43", 336, 294, "main right"],
  ["i44", 106, 92, "CBA (left)"],
  ["i45", 155, 92, "CBA (right)"],
  ["i46", 209, 136, "CHUMMS (right)"],
  ["i47", 122, 126, "CHUMMS (left)"],
  ["i48", 312, 176, "LAB (right)"],
  ["i50", 209, 162, "CICT(road)"], 
  ["i51", 231, 162, "CICT(back)"]
];


// 3. ROADS: [intersection, intersection, optional distance in meters]

const ROADS = [
  // right road (top to bottom)
  ["i1","i2",], ["i2","i48"], ["i48", "i17"], ["i17","i24"], ["i24","i28"], ["i28","i30"], ["i30","i32"],
  // top road (left to right)
  ["i7","i44"], ["i44", "i6"], ["i6","i45"], ["i45", "i5"], ["i5","i4"], ["i4","i3"], ["i3","i2"],
  // left road (top to bottom)
  ["i7","i47"], ["i7", "i8"], ["i8","i9"], ["i9", "i10"], ["i10", "i35"], ["i35","i11"], ["i11","i12"], ["i12","i13"],
  // middle road (left to right)
  ["i9","i34"], ["i34", "i14"], ["i14","i15"], ["i15", "i15.3"], ["i15.3", "i15.5"], ["i15.5","i16"], ["i16","i17"], ["i17","i18"], ["i18","i19"],
  // far right road
  ["i19","i20"], ["i20","i21"],
  // short road
  ["i22","i38"], ["i38", "i42"], ["i42", "i23"], ["i23","i39"], ["i39", "i24"],
  // center road (top to bottom)
  ["i5","i46"], ["i46", "i15"], ["i15.3","i33"], ["i33","i22"], ["i22", "i37"],
  // bottom road (left to right)
  ["i11","i36"], ["i36", "i25"], ["i25", "i37"], ["i37","i26"], ["i26","i40"], ["i40", "i27"], ["i27","i41"], ["i41", "i28"], ["i28","i29"], ["i29","i21"],
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
  ["CHUMMS",         172, 146, "i14"],
  ["COS",            240, 200, "i15.5"],
  ["LAB",            300, 200, "i16"],
  ["DORM WOMEN",     378, 194, "i18"],
  ["CIA",            418, 293, "i20"],
  ["CIT (lower)",    119, 269, "i10"],
  ["LIB",            191, 268, "i22"],
  ["CBO (middle)",   306, 260, "i23"],
  ["GYM",            360, 279, "i29"],
  ["Main building",  280, 309, "i27"],
  ["EDUC (large)",   201, 332, "i25"],
  ["CHS",            348, 361, "i30"],
  ["EDUC (small)",   111, 347, "i12"],
  ["INFIR",          111, 387, "i13"],
  ["Unnamed A",      167, 217, "i34"],  // blue box above LIB
  ["Unnamed B",      223, 240, "i33"],  // blue box left of CBO (middle)
  ["Unnamed C",      130, 283, "i35"],  // tall blue box left of LIB
  ["Unnamed D",      181, 313, "i36"],  // blue box below LIB
  ["Main (front left)", 238, 309, "i40"],
  ["Main (front right)", 326, 309, "i41"],
  ["Main (back right)", 236, 275, "i38"],
  ["Main (back middle)", 280, 275, "i42"],
  ["Main (back right)", 326, 275, "i39"],
  ["Main (right)", 331, 294, "i43"],
  ["CAF (left)", 236, 69, "i3"],
  ["CBA (left)", 106, 86, "i44"],
  ["CBA (right)", 155, 86, "i45"],
  ["CHUMMS (right)", 197, 136, "i46"],
  ["CHUMMS (left)", 94, 139, "i47"],
  ["Lab (right)", 304, 176, "i48"],
  ["Dorm (women)", 319, 176, "i48"],
  ["CICT (back)", 231, 159, "i51"]
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
