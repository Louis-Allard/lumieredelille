import React from "react";
import "../Styles/Adresse.scss";
import { Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const Adresse = () => {
  // Schéma de validation avec Yup
  const validationSchema = Yup.object({
    nom: Yup.string()
      .min(2, "Le nom doit comporter au moins 2 lettres")
      .required("Le nom est requis"),
    prenom: Yup.string()
      .min(2, "Le prénom doit comporter au moins 2 lettres")
      .required("Le prénom est requis"), // Corrigé ici
  });

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

      <Formik
        initialValues={{
          nom: "",
          prenom: "",
        }}
        onSubmit={(values) => {
          console.log(values); // Soumission des données
        }}
        validationSchema={validationSchema}
      >
        <Form className="formAdresse">
            <div className="ligneChampAdresse">

                <div className="form-fieldAdresseNomAd">
                    {/* <label htmlFor="nom">Nom</label> */}
                    <Field name="nom" type="text" placeholder="Nom" />
                    <ErrorMessage name="nom" component="div" className="error" />
                </div>

                <div className="form-fieldAdressePrenomAd">
                    {/* <label htmlFor="prenom">Prénom</label> */}
                    <Field name="prenom" type="text" placeholder="Prénom" />
                    <ErrorMessage name="prenom" component="div" className="error" />
                </div>
                
            </div>

            <div className="ligneChampAdresse">

                <div className="form-fieldAdresseMail">
                    {/* <label htmlFor="nom">Nom</label> */}
                    <Field name="mail" type="text" placeholder="E-mail" />
                    <ErrorMessage name="mail" component="div" className="error" />
                </div>

                <div className="form-fieldAdresseTelephone">
                    {/* <label htmlFor="prenom">Prénom</label> */}
                    <Field name="telephone" type="text" placeholder="Téléphone" />
                    <ErrorMessage name="telephone" component="div" className="error" />
                </div>
                
            </div>

          <button type="submit" className="form-button">
            Envoyer
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default Adresse;
