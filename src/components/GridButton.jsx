import React from "react";
import styles from "./GridButton.module.css";

export function GridButton({ onClick, disabled }) {
  return (
    <div className={styles.divButton}>
      <button
        className={styles.buttonLoad}
        onClick={onClick}
        disabled={disabled}
      >
        Load next page
      </button>
    </div>
  );
}
