import { Language } from '../i18n';
import { AllMapsState, AppState, MapState } from '../types';
import { MapName } from './mapData';

export const getMapInitState = (): MapState => ({
  markers: [],
  selectedExtracts: []
});

const getAllMapsInitState = (): AllMapsState => {
  return Object.values(MapName).reduce((res, mapName) => {
    res[mapName] = getMapInitState();
    return res;
  }, {} as AllMapsState);
};

const initState: AppState = {
  mapState: getAllMapsInitState(),
  ui: {
    currentMap: MapName.CustomsMain
    // currentMap: MapName.CustomsHiddenStashes
    ,
    markerColor: "#ff0000",
    lang: Language.EN,
    isTrackPad: false
  }
};

// initState.mapState["customs-main"].markers = [
//   { id: 'dsafasdf', coords: { x: 300, y: 500 } },
//   { id: 'wk3jkjk', coords: { x: 400, y: 600 } },
// ];
// initState.mapState["customs-keys"].markers = [
//   { id: 'dsafasdf', coords: { x: 100, y: 300 } },
//   { id: 'wk3jkjk', coords: { x: 200, y: 200 } },
// ];

export default initState;