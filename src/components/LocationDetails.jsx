import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export function LocationsDetails() {
  const { id } = useParams();
  const [location, setLocation] = useState(null);
  const [origins, setOrigins] = useState([]);

  useEffect(() => {
    axios
      .get(`https://rickandmortyapi.com/api/location/${id}`)
      .then(({ data }) => {
        setLocation(data);
        fetchOrigins(data.residents);
      });
  }, [id]);

  async function fetchOrigins(urlOrigins) {
    const promise = await Promise.all(
      urlOrigins.map((endpoint) => axios.get(endpoint))
    );
    const dataOrigins = promise.map((singleOrigin) => {
      return singleOrigin.data;
    });
    setOrigins(dataOrigins);
  }

  return (
    <>
      {location && (
        <div>
          <p className="locationName">{location.name}</p>
          <p className="originNames">
            Origins:
            {origins.map((origin, index) => (
              <span key={index}> {origin.name}</span>
            ))}
          </p>
        </div>
      )}
    </>
  );
}
