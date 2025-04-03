import { useState } from "react";



const Search = ({ setResults }) => {

const [inputText, setInputText] = useState("");

const fetchMovies = (value) => {
    fetch("htpps://")
    .then((response) => response.json())
    .then((json) => {
        const results = json.filter((user) => {
            return value && user && user.name && user.name.toLowerCase().includes(value)
        })
        setResults(results);
    });
}

const handleInputChange =(value) => {
    setInputText(value)
    fetchMovies(value)
}

  return (
    <section >
      <header >
        <div>
        <p>What movie are you searching for?</p>
       <input placeholder="Search Movie Here" value={inputText} onChange={(e) => handleInputChange(e.target.value)}/>
       <button />
        </div>
      </header>
    </section>
  )
}

export default Search;