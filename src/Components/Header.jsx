import React from "react";
import Logo from '../Assets/Logo.png';
import NavBar from "./NavBar";
import SearchBar from "./SearchBar";
import Panier from "./Panier";
import "../Styles/Header.scss";

const Header = () => {
    return (
        <div>

        <div className="header">
            <img src={Logo} alt="Logo" className="logoLLDL" />
            <NavBar/>
            <SearchBar/>
        </div>
        <div className="panierGroup">
            <Panier/>
        </div>
        </div>
    );
};

export default Header;
