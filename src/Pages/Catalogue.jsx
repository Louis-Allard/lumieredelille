import React from "react";
import CardLivre from "../Components/CardLivre";

const Catalogue =()=>{
    return(
        <div class="content">
            <h1 className="titrePage">Tous les livres</h1>
            <div className="textContact">
                <h2 className="sousTitre">Découvrez notre catalogue complet :</h2>
                    <p className="paragraphe">
                    Plongez dans la richesse de notre collection, des nouveautés aux classiques de la maison d'édition Les Lumières de Lille. Sélectionnez un livre pour en savoir plus, ou filtrez selon vos préférences.</p>
                </div>

            <CardLivre/>
                    
        </div>
    )

};

export default Catalogue;