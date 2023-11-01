import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import "normalize.css";
import styles from "./EpisodesDetails.module.css";

export function EpisodesDetails() {
  const { id } = useParams();
  const [episode, setEpisode] = useState(null);
  const [characters, setCharacters] = useState();
  useEffect(() => {
    axios
      .get(`https://rickandmortyapi.com/api/episode/${id}`)
      .then(({ data }) => {
        setEpisode(data);
        fetchCharacter(data.characters);
      });
  }, []);

  async function fetchCharacter(urlCharacters) {
    const promise = await Promise.all(
      urlCharacters.map((endpoint) => axios.get(endpoint))
    );
    const dataCharacters = promise.map((singleCharacter) => {
      return singleCharacter.data;
    });
    setCharacters(dataCharacters);
    console.log(dataCharacters);
  }

  return (
    <>
      {episode && (
        <>
          <h1 className={styles.episodeTitle}>{episode.name}</h1>
          <div className={styles.episodeInfo}>
            {episode.episode} | {episode.air_date}
          </div>
        </>
      )}
      <div className={styles.detailsGridContainer}>
        {characters?.map(({ name, id, image, status, origin }) => (
          <div className={styles.detailsGrid} key={id}>
            <img
              src={image}
              width={250}
              height={255}
              className={styles.detailsImgGrid}
            />
            <Link to={`/characters/${id}`} className={styles.linkName}>
              <p className={styles.name}>{name}</p>
            </Link>
            <div className={styles.location}>
              <Link to={`/location/${id}`} className={styles.link}>
                {origin.name}&nbsp;
              </Link>
              | {status}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
