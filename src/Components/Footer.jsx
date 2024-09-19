import React from "react";
import "../Styles/Footer.scss";
import Instagram from "../Assets/instagram.png";
import Facebook from "../Assets/logo-de-lapplication-facebook.png";
import Email from "../Assets/courrier.png";

const Footer =()=>{
    const currentYear = new Date().getFullYear();
    return(
        
        <footer class="footer">
    <div className="footerComplet">

    <div className="footerText">
  <p>CGV/CGU</p>
  <p>Qui sommes-nous?</p>
  <p>Mentions légales</p>
  <p>&copy; Les Lumières de Lille {currentYear}</p>
    </div>

                <div className="iconeReseaux">
                    <img src={Instagram} alt="Instagram" className="icon" />
                    <img src={Facebook} alt="Facebook" className="icon" />
                    <img src={Email} alt="Email" className="icon3" />
                </div>

    </div>
</footer>   


)
};

export default Footer;