import React from "react";
import LogoPanier from "../Assets/paniers.png";
import "../Styles/Panier.scss";
import { Link } from "react-router-dom";

const Panier = () => {

    let nbArticles = 0;

    return (
        <div className="panier">
            <Link to="/votre_panier">
            <img src={LogoPanier} alt="Panier" className="logoPanier" />
            </Link>
            <div className="textPanier">
                <p className="titrePanier">Mon panier</p>
                <p className="articlePanier">{nbArticles} {nbArticles<=1? "ARTICLE": "ARTICLES"} </p>
            </div>
        </div>
    );
};

export default Panier;
