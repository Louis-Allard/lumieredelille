import React, { useState, useEffect } from "react";
import "../Styles/CardLivre.scss";
import { Link } from "react-router-dom";

const CardLivre = () => {
  const [livres, setLivres] = useState([]);
  const [filteredLivres, setFilteredLivres] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [authorsList, setAuthorsList] = useState([]);
  const [selectedAuthor, setSelectedAuthor] = useState("");
  
  const [filter, setFilter] = useState({ sortBy: "release_date", order: "desc" }); // Par défaut tri par date de sortie décroissante

  const fetchLivres = async (page) => {
    try {
      const response = await fetch('http://localhost/Editeur/afficherLivreCard.php');
      const data = await response.json();
      setLivres(data.livres);
      setCurrentPage(data.currentPage);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error("Erreur lors de la récupération des livres", error);
    }
  };

  useEffect(() => {
    fetchLivres(currentPage);
  }, [currentPage]);

  useEffect(() => {
    applyFilters();
  }, [filter, livres]);

  useEffect(() => {
    if (livres.length > 0) {
      // Obtenir les auteurs uniques à partir de la liste des livres
      const uniqueAuthors = [...new Set(livres.map((livre) => livre.auteur))];
      setAuthorsList(uniqueAuthors); // Mettre à jour la liste des auteurs
    }
  }, [livres]);
  
  // Appliquer les filtres et le tri
  const applyFilters = () => {
    let sortedLivres = [...livres];

    // Tri par date de sortie
    if (filter.sortBy === "release_date") {
      sortedLivres.sort((a, b) =>
        filter.order === "asc" ? new Date(a.date_publication) - new Date(b.date_publication) : new Date(b.date_publication) - new Date(a.date_publication)
      );
    }

    // Tri par prix
    if (filter.sortBy === "price") {
      sortedLivres.sort((a, b) =>
        filter.order === "asc" ? a.prix - b.prix : b.prix - a.prix
      );
    }

    // Tri par ordre alphabétique
    if (filter.sortBy === "title") {
      sortedLivres.sort((a, b) => {
        if (filter.order === "asc") {
          return a.titre.localeCompare(b.titre); // Tri croissant
        } else {
          return b.titre.localeCompare(a.titre); // Tri décroissant
        }
      });
    }

    setFilteredLivres(sortedLivres);
  };

  // Gestion de la sélection d'un auteur
    const handleAuthorSelection = (event) => {
        const selected = event.target.value;
        setSelectedAuthor(selected); // Mettre à jour l'auteur sélectionné
    
        // Filtrer les livres par l'auteur sélectionné
        const filteredByAuthor = livres.filter(livre => livre.auteur === selected);
        setFilteredLivres(filteredByAuthor);
  };
  

  // Gestion des changements dans le filtre
  const handleFilterChange = (event) => {
    const value = event.target.value;
    if (value === "price_asc") {
      setFilter({ sortBy: "price", order: "asc" });
    } else if (value === "price_desc") {
      setFilter({ sortBy: "price", order: "desc" });
    } else if (value === "title_asc") {
      setFilter({ sortBy: "title", order: "asc" });
    } else if (value === "release_date_desc") {
      setFilter({ sortBy: "release_date", order: "desc" });
    } else if (value === "authors") {
      setFilter({ sortBy: "author", order: "asc" });
    }
  };
  
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>

      {/* Menu déroulant pour le tri */}
      <div className="filter-section" title="Trier le catalogue par ...">
        <label>
          Trier par :
          <select onChange={handleFilterChange} defaultValue="release_date_desc"
          className="selectedCardLivre"
          >
            <option value="release_date_desc">Date de sortie (plus récent)</option>
            <option value="price_asc">Prix croissant</option>
            <option value="price_desc">Prix décroissant</option>
            <option value="title_asc">Titre de A à Z</option>
            <option value="authors">Autrices / Auteurs</option>
          </select>
        </label>
          {/* Afficher la liste des auteurs uniquement si l'utilisateur a sélectionné le filtre "author" */}
  {filter.sortBy === "author" && (
    <div className="author-filter">
      <label>Choisir un auteur :</label>
      <select onChange={handleAuthorSelection}>
        <option value="">Sélectionner un auteur</option>
        {authorsList.map((author, index) => (
          <option key={index} value={author}>
            {author}
          </option>
        ))}
      </select>
    </div>
  )}
      </div>

 {/* Liste des livres */}
 <div className="book_list">
        <div className="book_grid">
          {filteredLivres.map((livre) => (
            <div key={livre.id} className="book_card">
              <img src={`http://localhost/Editeur/${livre.image_url}`} alt={livre.titre} className="imageCardLivre" />
              <div className="book_info">
                <h3 className="titreCardLivre">{livre.titre}</h3>
                <p className="infoCardLivre"><strong>Auteur : </strong>{livre.auteur}</p>
                <p className="infoCardLivre"><strong>Date de sortie : </strong>{new Date(livre.date_publication).toLocaleDateString("fr-FR")}</p>
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

                <Link to={`/detail_livre/${livre.id}`}>
                  <button title="En savoir plus ..." className="buttonCardLivre">En savoir plus ...</button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pagination */}
      <div className="pagination">
        {currentPage > 1 && (
          <button onClick={() => paginate(currentPage - 1)}>Précédent</button>
        )}
        {[...Array(totalPages).keys()].map((number) => (
          <button
            key={number + 1}
            onClick={() => paginate(number + 1)}
            className={number + 1 === currentPage ? "active" : ""}
          >
            {number + 1}
          </button>
        ))}
        {currentPage < totalPages && (
          <button onClick={() => paginate(currentPage + 1)}>Suivant</button>
        )}
      </div>
    </div>
  );
};

export default CardLivre;
