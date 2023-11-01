import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import styles from "./CharactersCard.module.css";
import "normalize.css";

export function CharactersCard() {
  const { id } = useParams();
  const [character, setCharacter] = useState(null);
  const [episodes, setEpisodes] = useState([]);
  const [characterEpisodes, setCharacterEpisodes] = useState([]);

  useEffect(() => {
    axios
      .get(`https://rickandmortyapi.com/api/character/${id}`)
      .then(({ data }) => {
        setCharacter(data);
        fetchEpisodes(data.episode);
      });
  }, [id]);

  async function fetchEpisodes(episodeUrls) {
    const promise = await Promise.all(episodeUrls.map((url) => axios.get(url)));
    const episodesData = promise.map((response) => response.data);
    setEpisodes(episodesData);
  }

  useEffect(() => {
    // Filtro los personajes que aparecen
    if (character && episodes.length > 0) {
      const characterEpisodeList = episodes.filter((episode) =>
        episode.characters.includes(
          `https://rickandmortyapi.com/api/character/${id}`
        )
      );
      setCharacterEpisodes(characterEpisodeList);
    }
  }, [character, episodes, id]);

  return (
    <div>
      {character && (
        <div>
          <div>
            <div className={styles.header}>
              <div className={styles.pic}>
                <img src={character.image} alt={character.name} width={250} />
              </div>
              <div className={styles.characterInfo}>
                <h2 className={styles.characterName}>{character.name}</h2>
                <div className={styles.characterDescription}>
                  <h3 className={styles.character}>CHARACTER</h3> <br></br>
                  <p className={styles.speciesStatus}>
                    {character.species} | {character.status}
                  </p>
                  <div className={styles.locationOrigin}>
                    <p>
                      <strong> ORIGIN</strong> <br></br>
                      {character.origin.name}
                    </p>
                    <br></br>
                    <br></br>
                    <p>
                      <strong>LOCATION</strong> <br></br>
                      {character.location.name}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <h2 className={styles.episodes}>Episodes</h2>
          <>
            <div className={styles.characterEpisodeGrid}>
              {characterEpisodes.map((episode) => (
                <p key={episode.id} className={styles.grid}>
                  <Link to={`/episode/${id}`} className={styles.episodesStyle}>
                    {episode.name}
                  </Link>
                  <br></br>
                  {episode.air_date} | {episode.episode}
                </p>
              ))}
            </div>
          </>
        </div>
      )}
    </div>
  );
}
