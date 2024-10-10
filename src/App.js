import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import NosAutricesAuteurs from "./Pages/NosAutricesAuteurs";
import Catalogue from "./Pages/Catalogue";
import Contact from "./Pages/Contact";
import Footer from "./Components/Footer";
import "./App.css";
import Header from "./Components/Header";
import CGV from "./Pages/CGV";
import MentionsLegales from "./Pages/MentionsLegales";
import QuiSommesNous from "./Pages/QuiSommesNous";
import DetailLivre from "./Pages/DetailLivre";
import Actualités from "./Pages/Actualités";
import VotrePanier from "./Pages/VotrePanier";
import Adresse from "./Pages/Adresse";
import Paiement from "./Pages/Paiement";
import { PanierProvider } from "./Components/PanierContext";
// import BackgroundImage from "./Components/BackgroundImage";


const App = () => {
    return (
      <PanierProvider>
      <Router>
        <div>
          {/* <BackgroundImage/> */}
          <Header/>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/nos_autrices_auteurs" element={<NosAutricesAuteurs />} />
            <Route path="/catalogue" element={<Catalogue/>}/>
            <Route path="/contact" element={<Contact/>}/>
            <Route path="/CGV" element={<CGV/>}/>
            <Route path="/mentions_legales" element={<MentionsLegales/>}/>
            <Route path="/qui_sommes_nous?" element={<QuiSommesNous/>}/>
            <Route path="/detail_livre/:id" element={<DetailLivre />} />
            <Route path="/actualités" element={<Actualités/>}/>
            <Route path="/votre_panier" element={<VotrePanier/>}/>
            <Route path="/adresse_livraison_facturation" element={<Adresse/>}/>
            <Route path="/paiement" element={<Paiement/>}/>
            </Routes>
          <Footer/>
        </div>
      </Router>
      </PanierProvider>
    );
};

export default App;