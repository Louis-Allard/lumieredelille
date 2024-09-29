import React from "react";
import "../Styles/TableauPanier.scss";
import { usePanier } from "../Components/PanierContext";

const TableauPanier = () => {
    const { panier, ajouterAuPanier, retirerDuPanier, nombreTotalArticles, supprimerDuPanier } = usePanier(); // Récupérer les fonctions du contexte

    return (
        <div className="cartesContainer">

            {/* En-tête des colonnes */}
            <div className="titrePagePanier">
                <div className="colonneImage"></div>
                <div className="colonneDesign">Désignation</div>
                <div className="colonneQuantite">Quantité</div>
                <div className="colonneFraisPort">Frais de port</div>
                <div className="colonneTotal">Total</div>
                <div className="colonneActions">Actions</div> {/* Nouvelle colonne pour les actions */}
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
                                <p className="portCartePanier">Frais de port : {item.frais_port} €</p>
                                <p className="prixCartePanier">{item.prix} €</p>
                            </div>

                            {/* Bloc pour gérer la quantité */}
                            <div className="quantitePortPrix">

                                {/* Bloc de gestion de la quantité */}
                                <div className="quantiteContainer">
                                    <button
                                        onClick={() => retirerDuPanier(item)}
                                        className="btnDecrement"
                                        disabled={item.quantite === 1} // Désactiver le bouton si quantité = 1
                                    >
                                        -
                                    </button>
                                    <p className="quantiteDisplay">{item.quantite}</p>
                                    <button
                                        onClick={() => ajouterAuPanier(item)}
                                        className="btnIncrement"
                                    >
                                        +
                                    </button>
                                </div>

                                {/* Bouton de suppression */}
                                <div className="actionsContainer">
                                    <button
                                        onClick={() => supprimerDuPanier(item)} // Retirer l'article
                                        className="btnSupprimer"
                                    >
                                        Supprimer
                                    </button>
                                </div>



                                {/* Frais de port en fonction de la quantité */}
                                <div className="fraisEtTotalContainer">
                                    <p className="fraisPortCartePanier">
                                        {(item.frais_port * item.quantite).toFixed(2)} €
                                    </p>
                                </div>

                                {/* Total (prix * quantité) */}
                                <div className="prixTotalContainer">
                                    <p className="totalCartePanier">
                                        {(item.prix * item.quantite).toFixed(2)} €
                                    </p>
                                </div>

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
