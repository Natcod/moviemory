import Logo from "./Logo";
import Search from "./search";
import Box from "./Box";
import Movie from "./Movie";
import NumResult from "./NumResult";
import WatchedSummary from "./WatchedSummary";
import WatchedMovieList from "./WatchedMovieList";
import { useState } from "react";
import MovieDetails from "./MovieDetails";
import useMovie from "./useMovie";
import Loader from "./Loader";
import useLocalStorage from "./useLocalStorage";

export default function App() {
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const { movies, isLoading, error } = useMovie(query);
  const [watched, setWatched] = useLocalStorage([], "watched");

  function handleSelectMovie(id) {
    setSelectedId((selectedId) => (id === selectedId ? null : id));
  }
  function handleAddWatchedMovie(movie) {
    setWatched((watched) => [...watched, movie]);
  }
  function handleCloseMovie() {
    setSelectedId(null);
  }

  return (
    <>
      <NavBar>
        <Logo />
        <NumResult movies={movies} />
        <Search query={query} setQuery={setQuery} />
      </NavBar>
      <Main>
        <Box>
          {movies && movies.length === 0 ? (
            <WelcomeMessage />
          ) : (
            <>
              {isLoading && <Loader />}
              {!isLoading && !error && (
                <MovieList movies={movies} onSelectMovie={handleSelectMovie} />
              )}
              {error && <ErrorMessage message={error} />}
            </>
          )}
        </Box>

        <Box movies={movies}>
          {selectedId ? (
            <MovieDetails
              movies={movies}
              selectedId={selectedId}
              onAddWatchedMovie={handleAddWatchedMovie}
              onCloseMovie={handleCloseMovie}
              watched={watched}
            />
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <WatchedMovieList watched={watched} />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}
function NavBar({ children }) {
  return <nav className="nav-bar">{children}</nav>;
}
function Main({ children }) {
  return <main className="main">{children}</main>;
}
function MovieList({ movies, onSelectMovie }) {
  return (
    <ul className="list list-movies">
      {movies?.map((movie) => (
        <Movie movie={movie} key={movie.imdbID} onSelectMovie={onSelectMovie} />
      ))}
    </ul>
  );
}
function ErrorMessage({ message }) {
  return (
    <p className="error">
      <span>🛑</span>
      {message}
    </p>
  );
}
function WelcomeMessage() {
  return (
    <div className="welcome">
      <p>Welcome to MovieMory. Search the desired movie!</p>
    </div>
  );
}
