import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../Styles/DetailLivre.scss";
import LogoPanier2 from "../Assets/panierBlanc.png";
import { usePanier } from "../Components/PanierContext"; // Importer le hook du contexte

const DetailLivre = () => {
    const { id } = useParams();
    const [livre, setLivre] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { ajouterAuPanier } = usePanier(); // Utiliser le hook pour ajouter au panier

    useEffect(() => {
        const fetchLivreDetails = async () => {
            try {
                const response = await fetch(`http://localhost/Editeur/Api.php?id=${id}`);
                if (!response.ok) {
                    throw new Error("Erreur lors de la récupération des données.");
                }
                const data = await response.json();
                setLivre(data);
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };

        fetchLivreDetails();
    }, [id]);

    if (loading) {
        return <div className="content">Chargement des détails du livre...</div>;
    }

    if (error) {
        return <div className="content">Erreur: {error}</div>;
    }

    

    return (
        <div className="content">
            {livre ? (
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

                        <button 
                        className="buttonPanier" 
                        onClick={() => {
                            if (livre.stock > 0) {
                                ajouterAuPanier(livre);
                            } else {
                                alert("Désolé, cet article est en rupture de stock.");
                            }
                        }}
                    >
                        <img src={LogoPanier2} alt="Panier" className="iconPanier" />
                        Ajouter au panier
                    </button>
                        
                    </div>
                </div>
            ) : (
                <p>Impossible de trouver les détails de ce livre.</p>
            )}
        </div>
    );
};

export default DetailLivre;
