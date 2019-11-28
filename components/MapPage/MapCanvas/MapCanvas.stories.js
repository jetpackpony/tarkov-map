import { h } from 'preact';
import map from '../../../mapImages/Customs.png';
import MapCanvas from './index';

export default {
  title: 'MapCanvas',
};

const markers = [
  { id: 'dsafasdf', coords: { x: 100, y: 100 }, type: "user", color: "#ffc0cb" },
  { id: 'wk3jkjk', coords: { x: 200, y: 200 }, type: "user", color: "#0000ff" },
];
export const withUserMarkers = () => (
  <div style={{ height: "500px" }}>
    <MapCanvas imgPath={map} markers={markers} />
  </div>
);

const extMarkers = [
  {
    id: "ext-1",
    names: {
      en: "Bunker Hermetic Door",
      ru: "Гермодверь к депо"
    },
    faction: "all",
    specialConditions: "??? нажать рычаг, звучит сирена. Сирена звучит 4 минуты после нажатия",
    coords: { x: 50, y: 100 },
    activationCoords: { x: 50, y: 200 },
    type: "extraction"
  },
  {
    id: "ext-2",
    names: {
      en: "Scav lands",
      ru: "Дикие места"
    },
    faction: "pmc",
    specialConditions: "??? нужна пара ЧВК + Дикий чтобы выйти",
    coords: { x: 100, y: 100 },
    type: "extraction"
  },
  {
    id: "ext-3",
    names: {
      en: "Hole in fence by the mountains",
      ru: "Дыра в заборе у скал"
    },
    faction: "scav",
    specialConditions: null,
    coords: { x: 150, y: 100 },
    type: "extraction"
  },
  {
    id: "ext-4",
    names: {
      en: "01 Cargo Elevator",
      ru: "01 Грузовой лифт"
    },
    faction: "all",
    specialConditions: null,
    coords: { x: 200, y: 100 },
    activationCoords: { x: 200, y: 200 },
    type: "extraction"
  },
];
export const withExtractionMarkers = () => (
  <div style={{ height: "500px" }}>
    <MapCanvas imgPath={map} markers={extMarkers} />
  </div>
);
