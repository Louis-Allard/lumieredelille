import React, { useEffect, useState } from "react";
import "../Styles/VotrePanier.scss";
import { Link } from "react-router-dom";
import TableauPanier from "../Components/TableauPanier";

const VotrePanier = () => {
    const [panier, setPanier] = useState([]); // État pour stocker le panier
    const [total, setTotal] = useState(0); // État pour stocker le total
    const [fraisDePort, setFraisDePort] = useState(5); // Par exemple, frais de port fixe à 5€

    useEffect(() => {
        // Fonction pour récupérer le panier du localStorage
        const recupererPanier = () => {
            const panierLocal = JSON.parse(localStorage.getItem("panier")) || [];
            setPanier(panierLocal);
            calculerTotal(panierLocal);
        };

        recupererPanier(); // Appelle la fonction au chargement du composant
    }, []);

    // Fonction pour calculer le montant total
    const calculerTotal = (panier) => {
        const montantTotal = panier.reduce((total, item) => total + item.prix * item.quantite, 0);
        setTotal(montantTotal);
    };

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

    {/* Composant pour afficher les articles du panier */}
    <TableauPanier panier={panier} />

    {/* Ligne horizontale */}
    <hr />

    {panier.length > 0 ? (
        <div className="totalPanier">
            <p><strong>Frais de port :</strong> {fraisDePort.toFixed(2)} €</p>
            <h2><strong>Montant total :</strong> {(total + fraisDePort).toFixed(2)} €</h2>
        </div>
    ) : (
        <p>Votre panier est vide.</p>
    )}
</div>
    );
}

export default VotrePanier;
