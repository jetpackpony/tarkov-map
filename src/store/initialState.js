import mapData from './mapData';

export const getMapInitState = () => ({
  markers: [],
  selectedExtracts: []
});

const initState = {
  mapState: (
    Object.keys(mapData.maps).reduce((acc, k) => {
      acc[k] = getMapInitState();
      return acc;
    }, {})
  ),
  ui: {
    currentMap: 'customs-main'
    // currentMap: 'customs-keys'
    //currentMap: 'customs-hidden-stashes'
    //currentMap: 'shoreline-main'
    //currentMap: 'shoreline-keys'
    //currentMap: 'shoreline-resort'
    //currentMap: 'interchange-main'
    //currentMap: 'interchange-hidden-stashes'
    //currentMap: 'woods-main'
    //currentMap: 'reserve-main'
    //currentMap: 'factory-main'
    //currentMap: 'labs-main'
    ,
    markerColor: "#ff0000",
    lang: "en",
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