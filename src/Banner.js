import React, { useEffect, useState } from "react";
import "./Banner.css";
import { baseURL1 } from "./axios";
import requests from "./requests";
function Banner() {
    const [movie, setMovie] = useState([]);
    useEffect(() => {
        fetch(`${baseURL1}${requests.fetchNetflixOriginals}`)
            .then((data) => {
                return data.json();
            })
            .then((data) => {
                setMovie(() => {
                    return data.results[
                        Math.floor(Math.random() * data.results.length)
                    ];
                });
            });
    }, []);

    console.log(movie);
    function truncate(str, n) {
        return str?.length > n ? str.substr(0, n - 1) + "..." : str;
    }

    return (
        <header
            className="banner"
            style={{
                backgroundSize: "cover",
                backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie.backdrop_path}")`,
                backgroundPosition: "center center",
            }}
        >
            <div className="banner__contents">
                <h1 className="banner__title">
                    {movie?.title || movie?.name || movie.original_name}
                </h1>
                <div className="banner__buttons">
                    <button className="banner__button">Play</button>
                    <button className="banner__button">My List</button>
                </div>
                <h1 className="banner__description">
                    {truncate(movie?.overview, 150)}
                </h1>
            </div>
            <div className="banner__fadeBottom" />
        </header>
    );
}

export default Banner;
