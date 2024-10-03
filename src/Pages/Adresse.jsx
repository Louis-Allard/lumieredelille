import React, { useState } from "react";
import "../Styles/Adresse.scss";
import { Link } from "react-router-dom";
import FormulaireAdresse from "../Components/FormulaireAdresse";

const Adresse = () => {
  const [useSameAdresse, setUseSameAdresse] = useState(true);
  const [acceptConditions, setAcceptConditions] = useState(false);

  // Gère le changement de la case à cocher pour utiliser la même adresse
  const handleChangeAdresse = () => {
    setUseSameAdresse(!useSameAdresse);
  };

  // Gère le changement de la case à cocher des conditions générales
  const handleConditionsChange = (event) => {
    setAcceptConditions(event.target.checked);
  };

  return (
    <div className="content">
      <div className="etape">
        <h2>
          <span className="panierEtape1">Étape 1 : Panier</span> &gt;
          <span className="trait">Étape 2 : Adresses</span> &gt;
          <span className="panierEtape3">Étape 3 : Paiement</span>
        </h2>
      </div>

      <div className="titreBoutonAdresse">
        <h1 className="titreAdresse">Adresse - livraison/facturation</h1>
        <Link to="/">
          <button className="boutonAchatVotrePanier">Continuer mes achats</button>
        </Link>
      </div>

      <h1 className="titrePageAdresse">Adresse de Livraison</h1>

      <FormulaireAdresse />

      {/* Affiche le formulaire d'adresse de facturation si nécessaire */}
      {!useSameAdresse && (
        <div className="facturation-container">
          <h1 className="titrePageAdresse">Adresse de Facturation</h1>
          <FormulaireAdresse />
        </div>
      )}

      <div className="form-container2">
        <div className="checkBoxAdresse">
          <div>
            <input
              type="checkbox"
              id="scales"
              name="scales"
              checked={useSameAdresse}
              onChange={handleChangeAdresse}
            />
            <label htmlFor="scales">Utiliser la même adresse pour la livraison et la facturation</label>
          </div>

          <div>
            <input
              type="checkbox"
              id="horns"
              name="horns"
              checked={acceptConditions}
              onChange={handleConditionsChange}
            />
            <label htmlFor="horns">
              J’ai lu et j’accepte les{" "}
              <a href="/CGV" target="_blank" rel="noopener noreferrer">conditions générales</a>
            </label>
          </div>
        </div>
          <Link to="/">
                  <button
                    type="submit"
                    className="buttonNextStepPayer"
                    title="Valider et payer"
                    disabled={!acceptConditions}
                  >
                    Valider et payer
                  </button>
          </Link>
      </div>
    </div>
  );
};

export default Adresse;
