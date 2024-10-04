import React, { useState, useEffect } from 'react';
import "../Styles/Home.scss";
import Carousel from '../Components/Carousel';

const Home = () => {
  const [textPresentation, setTextPresentation] = useState("");

  // Fonction pour récupérer le texte de présentation actif depuis le backend
  const fetchTextPresentation = async () => {
    try {
      const response = await fetch('http://localhost/Editeur/recupText.php'); // Remplacez par l'URL correcte
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      console.log('Données récupérées:', data); // Log des données
      setTextPresentation(data.activeText); // Adaptez selon la structure de la réponse
    } catch (error) {
      console.error('Erreur lors de la récupération du texte de présentation:', error);
    }
  };

  // Appel de la fonction dès que le composant est monté
  useEffect(() => {
    fetchTextPresentation();
  }, []);

  // Log pour le débogage
  console.log('Texte de présentation:', textPresentation); // Log du texte de présentation

  return (
    <div className="content">
      <p className='textPresentation'>{textPresentation || 'Chargement...'}</p>
      <Carousel />
    </div>
  );
};

export default Home;
