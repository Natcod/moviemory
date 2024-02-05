export default function Movie({ movie, onSelectMovie, onScroll }) {
  function onClick() {
    onSelectMovie(movie.imdbID);
    onScroll();
  }
  return (
    <>
      <li key={movie.imdbID} onClick={onClick}>
        <img src={movie.Poster} alt={`${movie.Title} poster`} />
        <h3>{movie.Title}</h3>
        <div>
          <p>
            <span>🗓</span>
            <span>{movie.Year}</span>
          </p>
        </div>
      </li>
    </>
  );
}
