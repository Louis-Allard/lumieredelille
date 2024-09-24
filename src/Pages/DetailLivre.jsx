import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../Styles/DetailLivre.scss";
import LogoPanier2 from "../Assets/panierBlanc.png";


const DetailLivre = () => {
    const { id } = useParams(); // Récupère l'ID du livre depuis l'URL
    const [livre, setLivre] = useState(null); // Stocke les détails du livre
    const [loading, setLoading] = useState(true); // État de chargement
    const [error, setError] = useState(null); // État d'erreur

    useEffect(() => {
        // Fonction pour récupérer les détails du livre
        const fetchLivreDetails = async () => {
            try {
                const response = await fetch(`http://localhost/Editeur/Api.php?id=${id}`);
                if (!response.ok) {
                    throw new Error("Erreur lors de la récupération des données.");
                }
                const data = await response.json();
                setLivre(data); // Mets à jour les données du livre
                setLoading(false); // Fin du chargement
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };

        fetchLivreDetails(); // Appel la fonction lors du chargement du composant
    }, [id]);

    // Affichage lors du chargement
    if (loading) {
        return <div className="content">Chargement des détails du livre...</div>;
    }

    // Affichage en cas d'erreur
    if (error) {
        return <div className="content">Erreur: {error}</div>;
    }

    // Affichage des détails du livre une fois récupérés
    return (
        <div className="content">
            {livre ? (
                <>
                <div className="cardLivre">

                    <img src={`http://localhost/Editeur/${livre.image_url}`} alt={livre.titre} className="imageLivre" />

                    <div className="infoLivre">

                        <h2 className="titreCardLivre"><strong>Titre :</strong> {livre.titre}</h2>

                        <p className="auteurCardLivre"><strong>Auteur :</strong> {livre.auteur}</p>

                            <div className="detailtechnicLivre">
                                <p className="textCardLivre"><strong>ISBN :</strong> {livre.isbn}</p>
                                <p className="textCardLivre"><strong>Date de publication :</strong> {livre.date_publication}</p>
                                <p className="textCardLivre"><strong>Format :</strong> {livre.format}</p>
                                <p className="textCardLivre"><strong>Nombre de pages :</strong> {livre.nombre_pages}</p>
                            </div>

                        <div className="prixStockContainer">
                            <p className="prixCardLivre">{livre.prix} €</p>
                            {livre.stock ? (
                                <div className="stockStatus">
                                    <span className="stockCircle"></span>
                                    <span className="enStockText">En stock</span>
                                </div>
                            ) : (
                                <div className="stockStatus">
                                    <span className="stockCircle red"></span>
                                    <span className="outOfStockText">Rupture de stock</span>
                                </div>
                            )}
                        </div>

                        <p className="descriptCardLivre"><strong>Description : </strong>{livre.descriptif}</p>
                        <button className="buttonPanier">
                            <img src={LogoPanier2} alt="Panier" className="iconPanier" />
                            Ajouter au panier
                        </button>
                    </div>
                </div>
                </>
            ) : (
                <p>Impossible de trouver les détails de ce livre.</p>
            )}
        </div>
    );
};

export default DetailLivre;
