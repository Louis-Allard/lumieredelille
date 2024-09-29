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

    // Fonction pour retirer un article ou diminuer la quantité
    const retirerDuPanier = (item) => {
        const itemExist = panier.find((i) => i.id === item.id);
        if (itemExist) {
            if (itemExist.quantite === 1) {
                // Si la quantité est de 1, retirer l'article du panier
                setPanier(panier.filter((i) => i.id !== item.id));
            } else {
                // Sinon, décrémenter la quantité
                setPanier(
                    panier.map((i) =>
                        i.id === item.id ? { ...i, quantite: i.quantite - 1 } : i
                    )
                );
            }
        }
    };

    const supprimerDuPanier = (item) =>{
        // Vérifie si l'article existe dans le panier
    const itemExist = panier.find((i) => i.id === item.id);
    if (itemExist) {
        // Si l'article existe, le retirer du panier
        setPanier(panier.filter((i) => i.id !== item.id));
    }
    };

    const nombreTotalArticles = panier.reduce((total, item) => total + item.quantite, 0);

    return (
        <PanierContext.Provider value={{ panier, ajouterAuPanier, retirerDuPanier, nombreTotalArticles, supprimerDuPanier }}>
            {children}
        </PanierContext.Provider>
    );
};

export const usePanier = () => {
    return useContext(PanierContext);
};
