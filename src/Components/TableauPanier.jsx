import React from "react";
import "../Styles/TableauPanier.scss";
import { usePanier } from "../Components/PanierContext";

const TableauPanier = () => {
    const { panier } = usePanier(); // Récupérer le contenu du panier depuis le contexte

    const fraisDePort = 5; // Exemple de frais de port fixe

    // Calcul du montant total du panier
    const montantTotalPanier = panier.reduce((total, item) => total + item.prix * item.quantite, 0);
    const totalAvecFraisDePort = montantTotalPanier + fraisDePort;

    return (
        <div className="cartesContainer">
            {/* En-tête des colonnes */}
            <div className="titrePagePanier">
                <div className="colonneImage"></div>
                <div className="colonneDesign">Désignation</div>
                <div className="colonneQuantite">Quantité</div>
                <div className="colonneFraisPort">Frais de port</div>
                <div className="colonneTotal">Total</div>
            </div>

            {panier.length > 0 ? (
                <>
                    {panier.map((item) => (
                        <div key={item.id} className="cartePanierHorizontale">
                            {/* Image du produit à gauche */}
                            <img
                                src={`http://localhost/Editeur/${item.image_url}`}
                                alt={item.titre}
                                className="imageCartePanier"
                            />

                            {/* Bloc d'informations à côté de l'image */}
                            <div className="infoCartePanier">
                                <h3 className="titreCartePanier">{item.titre}</h3>
                                <p className="auteurCartePanier">Auteur: {item.auteur}</p>
                                <p className="isbnCartePanier">ISBN: {item.isbn}</p>
                                <p className="prixCartePanier">{item.prix} €</p>
                            </div>

                            {/* Quantité au centre */}
                            <div className="quantiteContainer">
                                <p>Quantité: {item.quantite}</p>
                            </div>

                            {/* Bloc frais de port et total à droite */}
                            <div className="fraisEtTotalContainer">
                                <p className="fraisPortCartePanier">Frais de port: {fraisDePort} €</p>
                                <p className="totalCartePanier">Total: {(item.prix * item.quantite).toFixed(2)} €</p>
                            </div>
                        </div>
                    ))}

                </>
            ) : (
                <p>Votre panier est vide.</p>
            )}
        </div>
    );
};

export default TableauPanier;
