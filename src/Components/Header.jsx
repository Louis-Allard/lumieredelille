import React from "react";
import Logo from '../Assets/Logo.png';
import NavBar from "./NavBar";
import SearchBar from "./SearchBar";
import Panier from "./Panier";
import "../Styles/Header.scss";
import { Link } from "react-router-dom";

const Header = () => {
    return (
        <div>

        <div className="header">
            <Link to="/">
            <img src={Logo} alt="Logo" className="logoLLDL" />
            </Link>
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
