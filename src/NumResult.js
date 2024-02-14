export default function NumResult({ movies }) {
  if (movies.length !== 0) {
    return (
      <p className="num-results">
        {movies.length === 0 ? " " : `${movies.length}  Movies Found`}
        <span className="double-click">double tap to scroll to the movie</span>
      </p>
    );
  }
}
