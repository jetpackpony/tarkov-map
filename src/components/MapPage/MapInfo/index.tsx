import { h } from 'preact';
import { sortBy, compose, toLower, path } from 'rambda';
import './mapInfo.css'
import { useState } from 'preact/compat';
import { useTranslation } from 'react-i18next';

const sortByName = (lang) => sortBy(compose(toLower, path(['names', lang])));
const groupExtracts = (extracts, lang) => {
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

  res.pmc = sortByName(lang)(res.pmc);
  res.scav = sortByName(lang)(res.scav);

  return res;
};

const ExtractItem = ({ extract, isSelected, toggleExtract }) => {
  const { t, i18n } = useTranslation();
  return (
    <li
      class={(isSelected) ? "selected" : null}
      onClick={() => toggleExtract(extract.id)}
    >
      <div>
        <div>{extract.names[i18n.language]}</div>
        {
          (extract.activationCoords)
            ? <div title={t('Activation needed')} class="activation-required"></div>
            : null
        }
      </div>
      {
        (extract.specialConditions)
          ? <div class="special-conds">{extract.specialConditions[i18n.language]}</div>
          : null
      }
    </li>
  );
};

const FactionList = ({ title, children }) => {
  const [unfolded, setUnfolded] = useState(false);
  return (
    <div>
      <h3>
        <button onClick={() => setUnfolded(!unfolded)}>
          {title}
          <i class={`arrow ${unfolded ? "up" : "down"}`}></i>
        </button>
      </h3>
      <ul class={`extracts-list ${(unfolded) ? "" : "hidden"}`}>
        {children}
      </ul>
    </div>
  );
}

const MapInfo = ({
  extracts = [],
  selected = [],
  toggleExtract,
}) => {
  const { t, i18n } = useTranslation();
  if (extracts.length === 0) {
    return (
      <div class="map-info">
        <div>No extracts for this map</div>
      </div>
    );
  }
  const groups = groupExtracts(extracts, i18n.language);
  return (
    <div class="map-info">
      <FactionList title={t('PMC')}>
        {
          groups.pmc.map((e) => (
            <ExtractItem
              extract={e}
              isSelected={selected.includes(e.id)}
              toggleExtract={toggleExtract}
            />
          ))
        }
      </FactionList>
      <FactionList title={t('Scav')}>
        {
          groups.scav.map((e) => (
            <ExtractItem
              extract={e}
              isSelected={selected.includes(e.id)}
              toggleExtract={toggleExtract}
            />
          ))
        }
      </FactionList>
    </div>
  );
};

export default MapInfo;
