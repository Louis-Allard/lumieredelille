import React, { useEffect, useState } from "react";
import "../Styles/VotrePanier.scss";
import { Link } from "react-router-dom";
import TableauPanier from "../Components/TableauPanier";
import { usePanier } from "../Components/PanierContext"; // Vérifie que le chemin est correct

const VotrePanier = () => {
    const { panier, nombreTotalArticles } = usePanier(); // Utiliser le contexte
    const [total, setTotal] = useState(0);
    const [totalFraisDePort, setTotalFraisDePort] = useState(0); 

    useEffect(() => {
        // Calculer les totaux à chaque mise à jour du panier
        calculerTotal();
        calculerTotalFraisDePort();
    }, [panier]); // Dépendance sur 'panier'

    // Fonction pour calculer le montant total
    const calculerTotal = () => {
        const montantTotal = panier.reduce((total, item) => total + item.prix * item.quantite, 0);
        setTotal(montantTotal);
    };

    // Fonction pour calculer le montant total des frais de port
    const calculerTotalFraisDePort = () => {
        const totalPoids = panier.reduce((total, item) => total + item.poids * item.quantite, 0);
        setTotalFraisDePort(totalPoids);
    };

    return (
        <div className="content">
            <div className="etape">
                <h2>
                    <span className="trait">Étape 1 : Panier</span> &gt;
                    <span className="panierEtape2">Étape 2 : Adresses</span> &gt;
                    <span className="panierEtape3">Étape 3 : Paiement</span>
                </h2>
            </div>

            <div className="titreBoutonAchat">
                <h1 className="titreVotrePanier">Votre panier</h1>
                <Link to="/">
                    <button className="boutonAchatVotrePanier" title="Continuer mes achats">Continuer mes achats</button>
                </Link>
            </div>

            {/* Composant pour afficher les articles du panier */}
            <TableauPanier panier={panier} />

            {/* Ligne horizontale */}
            <hr />

            {panier.length > 0 ? (
                <div className="totalPanier">
                    <p><strong>Nombre d'articles :</strong> {nombreTotalArticles}</p>
                    <p><strong>Poids total :</strong> {totalFraisDePort.toFixed(0)} g</p>
                    <h2><strong>Montant total :</strong> {(total + totalFraisDePort).toFixed(2)} €</h2>
                </div>
            ) : (
                <p>Votre panier est vide.</p>
            )}
        </div>
    );
};

export default VotrePanier;
