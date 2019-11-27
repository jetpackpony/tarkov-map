import { h} from 'preact';
import * as R from 'ramda';

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

const MapInfo = ({
  extracts = [],
  selected = [],
  toggleExtract
}) => {
  if (extracts.length === 0) {
    return <div>No extracts for this map</div>;
  }
  const groups = groupExtracts(extracts);
  return (
    <div>
      <h3>ЧВК</h3>
      <ul>
        {
          groups.pmc.map((e) => (
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
      <h3>Дикий</h3>
      <ul>
        {
          groups.scav.map((e) => (
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
    </div>
  );
};

export default MapInfo;
