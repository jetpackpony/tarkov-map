import initFirebase from '../firebase/index.js';

const db = initFirebase();
db.addDataListener((data) => {
  console.log("Data here: ", data);
});
db.listen();

const mapName = "customs-main";
const markerId = "unN3md";
const extId = "ext-1";
document.getElementById("addMarker").addEventListener("click", (e) => {
  db.addMarker(markerId, mapName, {
    coords: { x: 100, y: 100 },
    color: "#ff00ff"
  });
});
document.getElementById("removeMarker").addEventListener("click", (e) => {
  db.removeMarker(markerId, mapName);
});
document.getElementById("selectExt").addEventListener("click", (e) => {
  db.addExtraction(extId, mapName);
});
document.getElementById("unSelectExt").addEventListener("click", (e) => {
  db.removeExtraction(extId, mapName);
});
document.getElementById("clearMap").addEventListener("click", (e) => {
  db.clearMap("shoreline-resort");
});
