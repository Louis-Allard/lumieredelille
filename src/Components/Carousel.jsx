import React from "react";
import Slider from "react-slick";
import "../Styles/Carousel.scss"; 
import Image1 from "../Assets/Livre1.jpg";
import Image2 from "../Assets/Livre2.jpg";
import Image3 from "../Assets/Livre5.jpg";
import Image4 from "../Assets/Livre6.jpg";

const Carousel = () => {
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
    
    const images = [
        Image1, Image2, Image3, Image4,
    ];

    return (
        <div className="carousel">
            <Slider {...settings}>
                {images.map((image, index) => (
                    <div key={index}>
                        <img src={image} alt={`Image ${index + 1}`} />
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default Carousel;
