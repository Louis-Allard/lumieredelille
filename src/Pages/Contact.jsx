import React from "react";
import Formulaire from "../Components/Formulaire";
import "../Styles/Contact.scss";

const Contact=()=>{
    return(
        <div class="content">
        <h1 className="titrePage">Contactez-nous</h1>
        <div className="textContact">
        <h2 className="sousTitre">Nous sommes à votre écoute !</h2>
            <p className="paragraphe">
            Pour toute question, suggestion ou demande, n’hésitez pas à nous contacter. Nous serons ravis de vous répondre.</p>

        </div>

        <Formulaire/>

        <p>Coordonnées :
Adresse :Les Lumières de Lille3 avenue Poincaré, 59700 Marcq-en-Barœul, France
Email : contact@lumieresdelille.fr
Téléphone : +33 (0)3 XX XX XX XX</p>

    </div>
    )

};

export default Contact;