import { ComponentChildren, h } from "preact";
import styles from "./FactionList.module.css";
import { useState } from "preact/compat";

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
          <i class={`${styles.arrow} ${unfolded ? styles.up : styles.down}`} />
        </button>
      </h4>
      <ul class={`${styles.extractsList} ${!unfolded ? styles.hidden : ""}`}>
        {children}
      </ul>
    </div>
  );
};

export default FactionList;
