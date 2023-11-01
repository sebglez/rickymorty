import React from "react";
import styles from "./GridButton.module.css";
import "normalize.css";
export function GridButton() {
  return (
    <div className={styles.divButton}>
      <button className={styles.buttonLoad}>Load next page</button>
    </div>
  );
}
