import React from "react";
import LogoPanier from "../Assets/paniers.png";
import "../Styles/Panier.scss";

const Panier = () => {
    return (
        <div className="panier">
            <img src={LogoPanier} alt="Panier" className="logoPanier" />
            <div className="textPanier">
                <p className="titrePanier">Mon panier</p>
                <p className="articlePanier">0 ARTICLE</p>
            </div>
        </div>
    );
};

export default Panier;
