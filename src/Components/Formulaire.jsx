import React from "react";
import "../Styles/Formulaire.scss";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const Formulaire = () => {
  // Validation schema avec Yup
  const validationShema = Yup.object({
    nom: Yup.string()
      .min(2, "Le nom doit comporter au minimum 2 caractères")
      .required("Le nom est requis"),

    prenom: Yup.string()
      .min(2, "Le prénom doit comporter au minimum 2 caractères")
      .required("Le prénom est requis"),

      telephone: Yup.string()
      .matches(
        /^(\+?\d{1,3}[- ]?)?\d{10}$/,
        "Le numéro de téléphone doit comporter 10 chiffres"
      )
      .required("Le téléphone est requis"),

    email: Yup.string()
      .email("Adresse email invalide")
      .required("L'adresse email est requise"),

    message: Yup.string()
      .min(5, "Le message doit comporter au moins 5 caractères")
      .required("Le message est requis"),
  });

  return (
    <div className="form-container">
      <h1 className="form-title">Formulaire de contact</h1>
      <Formik
        initialValues={{
          nom: "",
          prenom: "",
          telephone: "",
          email: "",
          message: "",
        }}
        onSubmit={(values) => {
          console.log(values); // Soumission des données
        }}
        validationSchema={validationShema}
      >
        <Form className="form">
          <div className="nomPrenom">
            <div className="form-fieldNom">
              <label htmlFor="nom">Nom</label>
              <Field name="nom" type="text" placeholder="Nom" />
              <ErrorMessage name="nom" component="div" className="error" />
            </div>

            <div className="form-fieldPrenom">
              <label htmlFor="prenom">Prénom</label>
              <Field name="prenom" type="text" placeholder="Prénom" />
              <ErrorMessage name="prenom" component="div" className="error" />
            </div>
          </div>

          <div className="mailTelephone">
            <div className="form-fieldTel">
              <label htmlFor="telephone">Téléphone</label>
              <Field name="telephone" type="text" placeholder="Téléphone"/>
              <ErrorMessage name="telephone" component="div" className="error" />
            </div>

            <div className="form-fieldMail">
              <label htmlFor="email">Email</label>
              <Field name="email" type="email" placeholder="E-mail"/>
              <ErrorMessage name="email" component="div" className="error" />
            </div>
          </div>

          <div className="form-fieldMessage">
            <label htmlFor="message">Message</label>
            <Field as="textarea" name="message" placeholder="Votre message ..."/>
            <ErrorMessage name="message" component="div" className="error" />
          </div>

          <button type="submit" className="form-button">
            Envoyer
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default Formulaire;
