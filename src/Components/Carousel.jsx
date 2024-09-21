import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "../Styles/Carousel.scss";

const Carousel = () => {
    const [livres, setLivres] = useState([]);

    useEffect(() => {
        // Appel de l'API pour récupérer les livres
        fetch('http://localhost/Editeur/Api.php') // URL de l'API PHP
            .then(response => response.json())
            .then(data => setLivres(data))
            .catch(error => console.error('Erreur:', error));
    }, []);

    const settings = {
        dots: true, 
        infinite: true,
        speed: 500,
        slidesToShow: 4,  
        slidesToScroll: 4, 
        customPaging: function (i) {
            return <div className="dot"></div>;
        },
        appendDots: (dots) => (
            <div>
                <ul style={{ display: "flex", justifyContent: "center" }}>
                    {dots.slice(0, 5)}
                </ul>
            </div>
        ),
        responsive: [
            {
                breakpoint: 1024, 
                settings: {
                    slidesToShow: 2,
                },
            },
            {
                breakpoint: 600, 
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
                    livres.map((livre, index) => (
                        <div key={index}>
                            <img src={`http://localhost/Editeur/${livre.image_url}`} alt={livre.titre} />
                            <h3>{livre.titre}</h3>
                            <p>{livre.auteur}</p>
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
