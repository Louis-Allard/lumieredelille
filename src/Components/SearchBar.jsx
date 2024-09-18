import React, { useState } from "react";
import Loupe from "../Assets/search.png";
import "../Styles/SearchBar.scss";

const SearchBar = () => {
    const [query, setQuery] = useState("");

    const handleSearch = (event) => {
        event.preventDefault();

    };

    return (
            <div className="searchBarComplet">
        <form onSubmit={handleSearch}>

            <input
                className="searchBar"
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Recherche..."
                />
            <button type="submit" className="buttonSearch"><img src={Loupe} alt="Loupe" className="loupe" /></button>
        </form>
                </div>
    );
};

export default SearchBar;
