import React, { useEffect, useState } from "react";
import styles from "./EpisodesGrid.module.css";
import axios from "axios";
import { Link } from "react-router-dom";
import "normalize.css";
import { GridButton } from "./GridButton";

export function EpisodesGrid() {
  const [episodes, setEpisodes] = useState([]);
  useEffect(() => {
    axios
      .get("https://rickandmortyapi.com/api/episode?page=1")
      .then(({ data }) => {
        setEpisodes(data.results);
      });
  }, []);

  return (
    <>
      <h1 className={styles.subTitle}>Episodes Loaded!</h1>
      <div className={styles.episodesGrid}>
        {episodes.map(function ({ id, name, air_date, episode }) {
          return (
            <div key={id} className={styles.episodeItem}>
              <Link to={`/episode/${id}`} className={styles.link}>
                <div className={styles.title}>{name}</div>
              </Link>

              <div className={styles.liGrid}>
                <p>
                  {air_date} | {episode}
                </p>
              </div>
            </div>
          );
        })}
      </div>
      <GridButton />
    </>
  );
}
