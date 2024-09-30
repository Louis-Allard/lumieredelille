import React from "react";
import LogoPanier from "../Assets/paniers.png";
import "../Styles/Panier.scss";
import { Link } from "react-router-dom";
import { usePanier } from "../Components/PanierContext"; // Importer le hook du contexte

const Panier = () => {
    const { nombreTotalArticles } = usePanier(); // Utiliser le hook pour obtenir le nombre total

    return (
        <div className="panier">
            <Link to="/votre_panier">
                <img src={LogoPanier} alt="Panier" className="logoPanier" title="Mon panier"/>
            </Link>
            <div className="textPanier">
                <p className="titrePanier">Mon panier</p>
                <p className="articlePanier">
                    {nombreTotalArticles} {nombreTotalArticles <= 1 ? "ARTICLE" : "ARTICLES"}
                </p>
            </div>
        </div>
    );
};

export default Panier;
