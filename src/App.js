import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import NosAutricesAuteurs from "./Pages/NosAutricesAuteurs";
import VosAvis from "./Pages/VosAvis";
import Contact from "./Pages/Contact";

const App = () => {
    return (
      <div>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/nos_autrices_auteurs" element={<NosAutricesAuteurs />} />
            <Route path="/vos_avis" element={<VosAvis/>}/>
            <Route path="/contact" element={<Contact/>}/>
          </Routes>
        </Router>
      </div>
    );
};

export default App;
