import { h } from 'preact';

const MapInfo = ({
  extracts = [],
  selected = [],
  toggleExtract
}) => {
  if (extracts.length === 0) {
    return <div>No extracts for this map</div>;
  }
  return (
    <ul>
      {
        extracts.map((e) => (
          <li onClick={() => toggleExtract(e.id)}>
            {e.names.ru}
            {
              selected.includes(e.id)
                ? "(selected)"
                : null
            }
          </li>
        ))
      }
    </ul>
  );
};

export default MapInfo;
