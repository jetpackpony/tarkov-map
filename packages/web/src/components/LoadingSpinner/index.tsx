import { h } from "preact";
import styles from "./LoadingSpinner.module.css";

const LoadingSpinner = () => {
  return (
    <div class={styles.container}>
      <div class={styles["lds-dual-ring"]} />
    </div>
  );
};

export default LoadingSpinner;
