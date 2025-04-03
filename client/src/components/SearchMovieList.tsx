//import styling css files
import MovieResult from "./MovieResult"

const SearchMovieList = ({ results }) => {
    return (
        <div className="results-list">
            {results.map((result, id) => {
                return <MovieResult result={result} key={id}/>;
            })}
            </div>
        
    );
};

