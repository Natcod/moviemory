export default function NumResult({ movies }) {
  return (
    <p className="num-results">
      {movies.length === 0 ? " " : `${movies.length}  Movies Found`}
    </p>
  );
}
