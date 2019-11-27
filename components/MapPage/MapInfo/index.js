import { h} from 'preact';
import * as R from 'ramda';
import './mapInfo.css'

const sortByRuName = R.sortBy(R.compose(R.toLower, R.path(['names', 'ru'])));
const groupExtracts = (extracts) => {
  const res = extracts.reduce(
    (acc, ext) => {
      if (ext.faction === 'all' || ext.faction === 'pmc') {
        acc.pmc.push(ext);
      }
      if (ext.faction === 'all' || ext.faction === 'scav') {
        acc.scav.push(ext);
      }
      return acc;
    },
    { pmc: [], scav: [] }
  );

  res.pmc = sortByRuName(res.pmc);
  res.scav = sortByRuName(res.scav);

  return res;
};

const ExtractItem = ({ extract, isSelected }) => {
  return (
    <li onClick={() => toggleExtract(extract.id)}>
      {extract.names.ru}
      {
        (isSelected)
          ? "(selected)"
          : null
      }
      {
        (extract.activationCoords) ? <div>нужна активация</div> : null
      }
      {
        (extract.specialConditions) ? extract.specialConditions : null
      }
    </li>
  );
};

const MapInfo = ({
  extracts = [],
  selected = [],
  toggleExtract
}) => {
  if (extracts.length === 0) {
    return (
      <div class="map-info">
        <div>No extracts for this map</div>
      </div>
    );
  }
  const groups = groupExtracts(extracts);
  return (
    <div class="map-info">
      <h3>ЧВК</h3>
      <ul>
        {
          groups.pmc.map((e) => (
            <ExtractItem
              extract={e}
              isSelected={selected.includes(e.id)}
            />
          ))
        }
      </ul>
      <h3>Дикий</h3>
      <ul>
        {
          groups.scav.map((e) => (
            <ExtractItem
              extract={e}
              isSelected={selected.includes(e.id)}
            />
          ))
        }
      </ul>
    </div>
  );
};

export default MapInfo;
