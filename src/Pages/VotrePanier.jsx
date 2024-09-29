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
        const totalFrais = panier.reduce((total, item) => total + item.frais_port * item.quantite, 0);
        setTotalFraisDePort(totalFrais);
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
                    <p><strong>Nombre d'articles :</strong> {nombreTotalArticles}</p>
                    <p><strong>Frais de port :</strong> {totalFraisDePort.toFixed(2)} €</p>
                    <h2><strong>Montant total :</strong> {(total + totalFraisDePort).toFixed(2)} €</h2>
                </div>
            ) : (
                <p>Votre panier est vide.</p>
            )}
        </div>
    );
};

export default VotrePanier;
