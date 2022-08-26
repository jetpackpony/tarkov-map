import { ComponentChildren, h } from "preact";
import { sortBy, compose, toLower, path, defaultTo } from "rambda";
import styles from "./mapInfo.module.css";
import { useState } from "preact/compat";
import { ExtractData } from "../../../types";
import { useLanguageContext, Language } from "../../../I18nContext";

const sortByName = (lang: Language) =>
  sortBy(
    compose(toLower, defaultTo(""), path<ExtractData, string>(["names", lang]))
  );
const groupExtracts = (extracts: ExtractData[], lang: Language) => {
  const res = extracts.reduce(
    (acc, ext) => {
      if (ext.faction === "all" || ext.faction === "pmc") {
        acc.pmc.push(ext);
      }
      if (ext.faction === "all" || ext.faction === "scav") {
        acc.scav.push(ext);
      }
      return acc;
    },
    { pmc: [], scav: [] } as { pmc: ExtractData[]; scav: ExtractData[] }
  );

  res.pmc = sortByName(lang)(res.pmc);
  res.scav = sortByName(lang)(res.scav);

  return res;
};

interface ExtractItemProps {
  extract: ExtractData;
  isSelected: boolean;
  toggleExtract: (extId: string) => any;
}

const ExtractItem = ({
  extract,
  isSelected,
  toggleExtract,
}: ExtractItemProps) => {
  const { getCurrentLang, t } = useLanguageContext();
  return (
    <li
      class={isSelected ? styles.selected : undefined}
      onClick={() => toggleExtract(extract.id)}
    >
      <div>
        <div>{extract.names[getCurrentLang()]}</div>
        {extract.activationCoords ? (
          <div
            title={t("Activation needed")}
            class={styles.activationRequired}
          ></div>
        ) : null}
      </div>
      {extract.specialConditions ? (
        <div class={styles.specialConds}>
          {extract.specialConditions[getCurrentLang()]}
        </div>
      ) : null}
    </li>
  );
};

interface FactionListProps {
  title: string;
  children: ComponentChildren;
}

const FactionList = ({ title, children }: FactionListProps) => {
  const [unfolded, setUnfolded] = useState(false);
  return (
    <div>
      <h4>
        <button
          class={styles.factionHeader}
          onClick={() => setUnfolded(!unfolded)}
        >
          {title}
          <i
            class={`${styles.arrow} ${unfolded ? styles.up : styles.down}`}
          ></i>
        </button>
      </h4>
      <ul class={`${styles.extractsList} ${!unfolded ? styles.hidden : ""}`}>
        {children}
      </ul>
    </div>
  );
};

interface MapInfoProps {
  extracts: ExtractData[];
  selected: string[];
  toggleExtract: (extId: string) => any;
}

const MapInfo = ({
  extracts = [],
  selected = [],
  toggleExtract,
}: MapInfoProps) => {
  const { getCurrentLang, t } = useLanguageContext();
  if (extracts.length === 0) {
    return (
      <div class={styles.mapInfo}>
        <div>No extracts for this map</div>
      </div>
    );
  }
  const groups = groupExtracts(extracts, getCurrentLang());
  return (
    <div class={styles.mapInfo}>
      <h3 class={styles.header}>Extractions</h3>
      <FactionList title={t("PMC")}>
        {groups.pmc.map((e) => (
          <ExtractItem
            extract={e}
            isSelected={selected.includes(e.id)}
            toggleExtract={toggleExtract}
          />
        ))}
      </FactionList>
      <FactionList title={t("Scav")}>
        {groups.scav.map((e) => (
          <ExtractItem
            extract={e}
            isSelected={selected.includes(e.id)}
            toggleExtract={toggleExtract}
          />
        ))}
      </FactionList>
    </div>
  );
};

export default MapInfo;
