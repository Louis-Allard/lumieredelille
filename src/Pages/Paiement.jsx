import React from "react";
import "../Styles/Paiement.scss";
import { Link } from "react-router-dom";



const Paiement =()=>{
    return(
        <div className="content">
            <div className="etape">
                <h2>

                    <Link to="/votre_panier" className="linkPanier">
                    <span className="panierEtape1">Étape 1 : Panier</span> &gt; 
                    </Link>

                    <Link to="/adresse_livraison_facturation"className="linkPanier">
                    <span className="panierEtape2">Étape 2 : Adresses</span> &gt; 
                    </Link>

                    <span className="trait">Étape 3 : Paiement</span>

                </h2>
            </div>
            
            <div className="titreBoutonAchat">
                <h1 className="titreVotrePanier">Paiement</h1>
                    <Link to="/">
                        <button className="boutonAchatVotrePanier">Continuer mes achats</button>
                    </Link>
            </div>
        </div>
    )
};

export default Paiement;


