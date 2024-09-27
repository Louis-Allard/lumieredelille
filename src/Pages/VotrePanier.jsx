import React from "react";
import "../Styles/VotrePanier.scss";
import { Link } from "react-router-dom";

const VotrePanier = () => {
    return (
        <div className="content">
            <div className="etape">
                <h2><span className="trait">Étape 1 : Panier</span> &gt; Étape 2 : Adresses &gt; Étape 3 : Paiement</h2>
            </div>
            <h1>Votre panier</h1>
            <Link to="/">
                <button className="boutonAchat">Continuer mes achats</button>
            </Link>
        </div>
    );
}

export default VotrePanier;
