import React from "react";
import Logo from '../Assets/Logo.png';
import NavBar from "./NavBar";
import SearchBar from "./SearchBar";
import "../Styles/Header.scss";

const Header = () => {
    return (
        <div className="header">
            <img src={Logo} alt="Logo" />
            <NavBar/>
            <SearchBar/>
        </div>
    );
};

export default Header;
