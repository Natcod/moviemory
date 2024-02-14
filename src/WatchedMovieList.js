import { useEffect, useState, useCallback } from "react";

export default function WatchedMovieList({ watched, onDeleteWatched }) {
  const [title, setTitle] = useState("");

  const redirectToMovie = useCallback(() => {
    console.log(title);
    window.location.href = `https://fmoviesz.to/filter?keyword=${title}`;
  }, [title]);
  function handleWatchNowClick(movieTitle) {
    setTitle(movieTitle);
  }
  useEffect(() => {
    if (title) {
      redirectToMovie();
    }
  }, [title, redirectToMovie]);
  return (
    <ul className="list">
      {watched.map((movie) => (
        <li key={movie.imdbID}>
          <img
            src={movie.poster}
            alt={`${movie.title} poster`}
            onClick={() => handleWatchNowClick(movie.title)}
            // onClick={() =>
            //   (window.location.href = `https://fmoviesz.to/filter?keyword=${movie.title}`)
            // }
          />
          <h3>{movie.title}</h3>
          <div>
            <p>
              <span>⭐️</span>
              <span>{movie.imdbRating}</span>
            </p>
            <p>
              <span>🌟</span>
              <span>{movie.userRating}</span>
            </p>
            <p>
              <span>⏳</span>
              <span>{movie.runtime} min</span>
            </p>
            <button
              className="btn-delete"
              onClick={() => onDeleteWatched(movie.imdbID)}
            >
              X
            </button>
          </div>
          <div>
            <button
              className="watch--now"
              onClick={() => handleWatchNowClick(movie.title)}
            >
              Watch now
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
