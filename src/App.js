import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./Components/Header";
import Home from "./Pages/Home";
import NosAutricesAuteurs from "./Pages/NosAutricesAuteurs";
import VosAvis from "./Pages/VosAvis";
import Contact from "./Pages/Contact";

const App = () => {
    return (
      <div><Home/></div>
        // <Router>
        //     <Header />
        //     <Routes>
        //         <Route path="/" element={<Home />} />
        //         <Route path="/Autrices_auteurs" element={<NosAutricesAuteurs />} />
        //         <Route path="/Vos_avis" element={<VosAvis />} />
        //         <Route path="/Contact" element={<Contact />} />
        //     </Routes>
        // </Router>
    );
};

export default App;
