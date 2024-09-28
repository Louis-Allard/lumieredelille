import React, { createContext, useContext, useState, useEffect } from "react";

const PanierContext = createContext();

export const PanierProvider = ({ children }) => {
    // Chargement initial du panier à partir du localStorage
    const [panier, setPanier] = useState(() => {
        const storedPanier = localStorage.getItem("panier");
        return storedPanier ? JSON.parse(storedPanier) : [];
    });

    // Effet pour synchroniser le panier avec le localStorage
    useEffect(() => {
        localStorage.setItem("panier", JSON.stringify(panier));
    }, [panier]);

    const ajouterAuPanier = (livre) => {
        const itemExist = panier.find((item) => item.id === livre.id);
        if (itemExist) {
            setPanier(
                panier.map((item) =>
                    item.id === livre.id ? { ...item, quantite: item.quantite + 1 } : item
                )
            );
        } else {
            setPanier([...panier, { ...livre, quantite: 1 }]);
        }
    };

    const nombreTotalArticles = panier.reduce((total, item) => total + item.quantite, 0);

    return (
        <PanierContext.Provider value={{ panier, ajouterAuPanier, nombreTotalArticles }}>
            {children}
        </PanierContext.Provider>
    );
};

export const usePanier = () => {
    return useContext(PanierContext);
};
