import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../Styles/DetailLivre.scss";

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

        fetchLivreDetails(); // Appelle la fonction lors du chargement du composant
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
                    <h1>{livre.titre}</h1>
                    <p><strong>Auteur :</strong> {livre.auteur}</p>
                    <p><strong>ISBN :</strong> {livre.isbn}</p>
                    <p><strong>Prix :</strong> {livre.prix} €</p>
                    <p><strong>Frais de port :</strong> {livre.frais_port} €</p>
                    <img src={`http://localhost/Editeur/${livre.image_url}`} alt={livre.titre} />
                </>
            ) : (
                <p>Impossible de trouver les détails de ce livre.</p>
            )}
        </div>
    );
};

export default DetailLivre;
