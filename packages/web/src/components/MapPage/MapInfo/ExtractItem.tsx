import { h } from "preact";
import styles from "./ExtractItem.module.css";
import { ExtractData } from "../../../types";
import { useLanguage } from "../../../language";

interface ExtractItemProps {
  extract: ExtractData;
  isSelected: boolean;
  toggleExtract: (extId: string) => void;
}

const ExtractItem = ({
  extract,
  isSelected,
  toggleExtract,
}: ExtractItemProps) => {
  const { currentLang, t } = useLanguage();
  return (
    <li
      class={`${styles.extractItem} ${isSelected ? styles.selected : ""}`}
      onClick={() => toggleExtract(extract.id)}
    >
      <div class={styles.title}>
        <div>{extract.names[currentLang]}</div>
        {extract.activationCoords ? (
          <div
            title={t("Activation needed")}
            class={styles.activationRequired}
          />
        ) : null}
      </div>
      {extract.specialConditions ? (
        <div class={styles.specialConds}>
          {extract.specialConditions[currentLang]}
        </div>
      ) : null}
    </li>
  );
};

export default ExtractItem;
