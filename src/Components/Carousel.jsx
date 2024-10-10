import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import { Link } from "react-router-dom"; // Importation du Link
import "../Styles/Carousel.scss";

const Carousel = () => {
    const [livres, setLivres] = useState([]);

    useEffect(() => {
        fetch('http://localhost/Les_lumieres_de_Lille/Backend/API_Carousel.php')
        .then(response => response.json())
        .then(data => {
            console.log("Données des livres reçues:", data);
            setLivres(data);
        })
        .catch(error => console.error('Erreur:', error));
}, []);

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 4,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                },
            },
        ],
    };

    return (
        <div className="carousel">
            <Slider {...settings}>
                {livres.length > 0 ? (
                    livres.map((livre) => (
                        <div key={livre.id}>
                            <Link to={`/detail_livre/${livre.id}`}>
                                <img src={`http://localhost/Les_lumieres_de_Lille/Backend/${livre.image_url}`} alt={livre.titre} title="Cliquez pour plus de détail sur ce livre" />
                            </Link>
                        </div>
                    ))
                ) : (
                    <p>Chargement des livres...</p>
                )}
            </Slider>
        </div>
    );
};

export default Carousel;
