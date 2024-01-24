import { useState, useEffect } from "react";

const KEY = "4da07dae";

export default function useMovie(query) {
  const [movies, setMovies] = useState([]);

  useEffect(
    function () {
      async function fetchMovies() {
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${KEY}&s=${query} `
        );
        const data = await res.json();
        setMovies(data.Search);
      }
      fetchMovies();
    },
    [query]
  );
  return { movies };
}
