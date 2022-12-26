import { h } from "preact";
import styles from "./mapInfo.module.css";
import { ExtractData } from "../../../types";
import { useLanguage } from "../../../language";
import { groupExtracts } from "./utils";
import FactionList from "./FactionList";
import ExtractItem from "./ExtractItem";

interface MapInfoProps {
  extracts: ExtractData[];
  selected: string[];
  toggleExtract: (extId: string) => void;
}

const MapInfo = ({
  extracts = [],
  selected = [],
  toggleExtract,
}: MapInfoProps) => {
  const { currentLang, t } = useLanguage();
  if (extracts.length === 0) {
    return null;
  }
  const groups = groupExtracts(extracts, currentLang);
  return (
    <div class={styles.mapInfo}>
      <h3 class={styles.header}>Extractions</h3>
      <FactionList title={t("PMC")}>
        {groups.pmc.map((e) => (
          <ExtractItem
            key={e.id}
            extract={e}
            isSelected={selected.includes(e.id)}
            toggleExtract={toggleExtract}
          />
        ))}
      </FactionList>
      <FactionList title={t("Scav")}>
        {groups.scav.map((e) => (
          <ExtractItem
            key={e.id}
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
