import React, { useEffect, useState } from "react";
import './App.css';
import SearchIcon from './search.svg';
import MovieCard from "./MovieCard";

const API_URL = 'http://www.omdbapi.com?apikey=4d020ab1';

const App = () => {
    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    const searchMovies = async(title) => {
        const responce = await fetch(`${API_URL}&s=${title}`);
        const data = await responce.json();

        setMovies(data.Search);
    }

    useEffect(() => {<MovieCard movie={movies[0]} />
        searchMovies('Spiderman');
    }, [movies])

    return (
        <div className="app">
            <h1>MovieLand</h1>

            <div className="search ">
                <input 
                    placeholder="Search for movies"
                    value = {searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <img 
                    src={SearchIcon} 
                    alt="search"
                    onClick={() => searchMovies(searchTerm)}
                />
            </div>

            {
                movies.length > 0 ? 
                (
                    <div className="container">
                        { 
                            movies.map((movie) => (
                                <MovieCard movie={movie} />
                            ))
                        }
                    </div>
                ) : (
                    <div className="empty">
                        <h1>No movies found</h1>
                    </div>
                )
            }
        </div>
    );
}

export default App; 
