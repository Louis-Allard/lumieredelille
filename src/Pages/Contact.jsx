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
            <div className="blocInfoContact">
                <p className="textSousForm">Si vous souhaitez envoyer votre tapuscrit, merci de me l’adresser par mail ou par courrier.</p>


                <ul className="contact">

                <p className="textInfoContact"><span className="spanContact">Coordonnées :</span></p>

                    <li><span className="spanContact">Adresse :</span><br></br>Les Lumières de Lille <br></br>3 avenue Poincaré, 59700 Marcq-en-Barœul, France </li>
                    <li><span className="spanContact">Email : </span>frederic@leslumieresdelille.com</li>
                    <li><span className="spanContact">Téléphone : </span>+33 (0)3 XX XX XX XX</li>
                </ul>
            </div>

    </div>
    )

};

export default Contact;