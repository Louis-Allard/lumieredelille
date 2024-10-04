import React, { useEffect, useState } from 'react';
import axios from 'axios';

const BackgroundImage = () => {
    const [activeImageUrl, setActiveImageUrl] = useState('');

    useEffect(() => {
        const fetchActiveImage = async () => {
            try {
                const response = await axios.get('http://localhost/Editeur/importBackgroundImage.php');
                setActiveImageUrl(response.data.image_url);
            } catch (error) {
                console.error('Erreur lors de la récupération de l\'image active:', error);
            }
        };

        fetchActiveImage();
    }, []);

    return (
        <div
            className="content"
            style={{ backgroundImage: `url(${activeImageUrl})` }}
        >
        </div>
    );
};

export default BackgroundImage;
