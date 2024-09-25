import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import NosAutricesAuteurs from "./Pages/NosAutricesAuteurs";
import VosAvis from "./Pages/VosAvis";
import Contact from "./Pages/Contact";
import Footer from "./Components/Footer";
import "./App.css";
import Header from "./Components/Header";
import CGV from "./Pages/CGV";
import MentionsLegales from "./Pages/MentionsLegales";
import QuiSommesNous from "./Pages/QuiSommesNous";
import DetailLivre from "./Pages/DetailLivre";
import Actualites from "./Pages/Actualites";

const App = () => {
    return (
      <Router>
        <div>
          <Header/>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/nos_autrices_auteurs" element={<NosAutricesAuteurs />} />
            <Route path="/vos_avis" element={<VosAvis/>}/>
            <Route path="/contact" element={<Contact/>}/>
            <Route path="/CGV" element={<CGV/>}/>
            <Route path="/mentions_legales" element={<MentionsLegales/>}/>
            <Route path="/qui_sommes_nous?" element={<QuiSommesNous/>}/>
            <Route path="/detail_livre/:id" element={<DetailLivre />} />
            <Route path="/actualites" element={<Actualites/>}/>
            </Routes>
          <Footer/>
        </div>
      </Router>
    );
};

export default App;