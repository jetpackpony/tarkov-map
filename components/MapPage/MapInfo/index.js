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

const ExtractItem = ({ extract, isSelected, toggleExtract }) => {
  return (
    <li
      class={(isSelected) ? "selected" : null}
      onClick={() => toggleExtract(extract.id)}
    >
      <div>
        <div>{extract.names.ru}</div>
        {
          (extract.activationCoords)
            ? <div title="Нужна активация" class="activation-required"></div>
            : null
        }
      </div>
      {
        (extract.specialConditions)
          ? <div class="special-conds">{extract.specialConditions}</div>
          : null
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
      <ul class="extracts-list">
        {
          groups.pmc.map((e) => (
            <ExtractItem
              extract={e}
              isSelected={selected.includes(e.id)}
              toggleExtract={toggleExtract}
            />
          ))
        }
      </ul>
      <h3>Дикий</h3>
      <ul class="extracts-list">
        {
          groups.scav.map((e) => (
            <ExtractItem
              extract={e}
              isSelected={selected.includes(e.id)}
              toggleExtract={toggleExtract}
            />
          ))
        }
      </ul>
    </div>
  );
};

export default MapInfo;
