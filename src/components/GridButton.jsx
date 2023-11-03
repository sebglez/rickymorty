import React from "react";
import styles from "./GridButton.module.css";

export function GridButton({ onClick }) {
  return (
    <div className={styles.divButton}>
      <button className={styles.buttonLoad} onClick={onClick}>
        Load next page
      </button>
    </div>
  );
}
