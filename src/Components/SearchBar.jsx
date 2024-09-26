import React, { useState } from "react";
import Loupe from "../Assets/search.png";
import "../Styles/SearchBar.scss";
import Panier from "./Panier";

const SearchBar = () => {
    const [query, setQuery] = useState("");

    const handleSearch = (event) => {
        event.preventDefault();
        // Simuler un traitement de recherche avec la query
        console.log("Recherche en cours pour : ", query);
    };

    return (
        <div className="searchBarPanier">
            <form onSubmit={handleSearch} className="searchBarInput">
                <input
                    className="searchBar"
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                            handleSearch(e);
                        }
                    }}
                    placeholder="Rechercher un produit..."
                />
                <button type="submit" className="buttonSearch">
                    <img src={Loupe} alt="Loupe" className="loupe" />
                </button>
            </form>
            <Panier />
        </div>
    );
};

export default SearchBar;
