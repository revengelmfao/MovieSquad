import Search from "../components/Search";
import SearchMovieList from "../components/SearchMovieList.tsx"
import { useState } from 'react';

const Home = () => {

  const [results, setResults] = useState([]);

/* useEffect(() => {
        fetchMovies();
    }, []);

    const fetchMovies = async () => {
        // Call retrievetips function which asynchronously fetches user data.
        const data = await retrieveMovies();
        // Update 'tips' state with the fetched data.
        setMovies(data);
    }

        <LoginForm />
        <RegistrationForm />
*/

    return (
      <section>
        <h1>THIS IS THE HOME PAGE/ EXAMPLE</h1>
        
        <Search setResults={setResults} />
        <SearchMoviesList results={results}/>
      </section>

    );
  };
  
  // COMPONETS INSIDE HOME PAGE: 
  // LOGIN IN FORM
  // REGISTRATION FORM
  // SEARCH BAR
  // TOP RATED/RECOMMEND MOVIES SECTION

  export default Home;
