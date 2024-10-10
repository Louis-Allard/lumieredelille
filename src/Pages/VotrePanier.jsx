import React, { useEffect, useState } from "react";
import "../Styles/VotrePanier.scss";
import { Link } from "react-router-dom";
import TableauPanier from "../Components/TableauPanier";
import { usePanier } from "../Components/PanierContext";
import Cadenas from "../Assets/lock(1).png";

const VotrePanier = () => {
    const { panier, nombreTotalArticles } = usePanier(); // Utiliser le contexte
    const [total, setTotal] = useState(0);
    const [totalFraisDePort, setTotalFraisDePort] = useState(0); 
    const [tvaPrix, setTvaPrix] = useState(0);

    useEffect(() => {
        // Calculer les totaux à chaque mise à jour du panier
        calculerTotal();
        calculerTotalFraisDePort();
    }, [panier]); // Dépendance sur 'panier'

    // Fonction pour calculer le montant total
    const calculerTotal = () => {
        const montantTotal = panier.reduce((total, item) => total + item.prix * item.quantite, 0);
        setTotal(montantTotal);

        // Calculer la TVA
        const tauxTva = 0.055;
        let montantHT = montantTotal/(1+tauxTva);
        let montantTva = montantTotal - montantHT;
        setTvaPrix(montantTva);
    };

    // Fonction pour calculer le montant total des frais de port par rapport au poids
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
    <table className="tableauPanier">
        <tbody>
            <tr>
                <td>Montant total de vos achats</td>
                <td>{total.toFixed(2)} €</td>
            </tr>
            <tr>
                <td>Dont TVA 5.5%</td>
                <td>{tvaPrix.toFixed(2)} €</td>
            </tr>
            <tr>
                <td>Poids total</td>
                <td>{totalFraisDePort.toFixed(0)} g</td>
            </tr>
            <tr>
                <td className="totalDuPanier">Total du panier</td>
                <td className="totalDuPanier">{total.toFixed(2)} €</td>
            </tr>
        </tbody>
    </table>
) : (
    <p>Votre panier est vide.</p>
)}
                    <div className="paiementSecurise">
                        <p>Paiement sécurisé</p>
                        <img src={Cadenas} alt="Cadenas" className="cadenas"/>

                    </div>

                    <div>
                        <Link to="/adresse_livraison_facturation">
                        <button className="buttonNextStep" title="Etape suivante">Etape suivante</button>
                        </Link>
                    </div>


        </div>
    );

};

export default VotrePanier;
