import mapData from './mapData';

const initState = {
  mapState: (
    Object.keys(mapData.maps).reduce((acc, k) => {
      acc[k] = {
        markers: [],
        selectedExtracts: []
      };
      return acc;
    }, {})
  ),
  ui: {
    //currentMap: 'customs-main'
    //currentMap: 'customs-keys'
    //currentMap: 'customs-hidden-stashes'
    //currentMap: 'shoreline-main'
    //currentMap: 'shoreline-keys'
    //currentMap: 'shoreline-resort'
    //currentMap: 'interchange-main'
    //currentMap: 'interchange-hidden-stashes'
    //currentMap: 'woods-main'
    //currentMap: 'reserve-main'
    currentMap: 'factory-main'
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