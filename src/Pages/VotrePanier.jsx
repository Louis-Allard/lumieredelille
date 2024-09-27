import React from "react";
import "../Styles/VotrePanier.scss";
import { Link } from "react-router-dom";

const VotrePanier = () => {
    return (
        <div className="content">
            <div className="etape">
                <h2>
                    <span className="trait">Étape 1 : Panier</span> &gt; 

                    <Link to="/adresse_livraison_facturation" className="linkPanier">
                    <span className="panierEtape2">Étape 2 : Adresses</span> &gt; 
                    </Link>

                    <Link to="/paiement" className="linkPanier">
                    <span className="panierEtape3">Étape 3 : Paiement</span>
                    </Link>
                
                </h2>
            </div>

            <div className="titreBoutonAchat">
                <h1 className="titreVotrePanier">Votre panier</h1>
                    <Link to="/">
                        <button className="boutonAchatVotrePanier">Continuer mes achats</button>
                    </Link>
            </div>

        </div>
    );
}

export default VotrePanier;
