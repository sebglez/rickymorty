import {
  BrowserRouter as Router,
  Link,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import { EpisodesGrid } from "./components/EpisodesGrid";
import React from "react";
import styles from "./App.module.css";
import "normalize.css";
import { EpisodesDetails } from "./components/EpisodesDetails";
import { LocationsDetails } from "./components/LocationDetails";
import { CharactersCard } from "./components/CharactersCard";

const router = createBrowserRouter([
  {
    path: "/",
    element: <EpisodesGrid></EpisodesGrid>,
  },
  {
    path: "/episode/:id",
    element: <EpisodesDetails />,
  },
  { path: "/location/:id", element: <LocationsDetails /> },
  { path: "/characters/:id", element: <CharactersCard /> },
]);

export function App() {
  // Redirigir a la página principal
  const HomeClick = () => {
    router.navigate("/");
  };
  return (
    <div>
      <h4 className={styles.navTop}>
        <div className={styles.title} onClick={HomeClick}>
          Home
        </div>
      </h4>

      <RouterProvider router={router}></RouterProvider>
    </div>
  );
}
