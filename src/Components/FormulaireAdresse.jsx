import React from "react";
import "../Styles/FormulaireAdresse.scss";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const FormulaireAdresse = () => {
  // Validation schema avec Yup
  const validationSchema = Yup.object({
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

    adresse1: Yup.string()
      .min(5, "L'adresse doit comporter au minimum 5 caractères")
      .required("L'adresse est requise"),
    adresse2: Yup.string(),
    codePostal: Yup.string()
    .required("Le code postal est requis"),
    ville: Yup.string()
    .required("La ville est requise"),
    pays: Yup.string()
    .required("Le pays est requis"),
  });

  return (
    <div className="form-container">
      <Formik
        initialValues={{
          nom: "",
          prenom: "",
          telephone: "",
          email: "",
          adresse1: "",
          adresse2: "",
          codePostal: "",
          ville: "",
          pays:"",
        }}
        onSubmit={(values) => {
          console.log(values);
        }}
        validationSchema={validationSchema}
      >
        <Form className="formAdresse">

          <div className="nomPrenomAdresse">
            <div className="form-fieldNomAdresse">
              {/* <label htmlFor="nom">Nom</label> */}
              <Field name="nom" type="text" placeholder="Nom" />
              <ErrorMessage name="nom" component="div" className="error" />
            </div>

            <div className="form-fieldPrenomAdresse">
              {/* <label htmlFor="prenom">Prénom</label> */}
              <Field name="prenom" type="text" placeholder="Prénom" />
              <ErrorMessage name="prenom" component="div" className="error" />
            </div>
          </div>

          <div className="mailTelephoneAdresse">
            <div className="form-fieldTelAdresse">
              {/* <label htmlFor="telephone">Téléphone</label> */}
              <Field name="telephone" type="text" placeholder="Téléphone" />
              <ErrorMessage name="telephone" component="div" className="error" />
            </div>

            <div className="form-fieldMailAdresse">
              {/* <label htmlFor="email">Email</label> */}
              <Field name="email" type="email" placeholder="E-mail" />
              <ErrorMessage name="email" component="div" className="error" />
            </div>
          </div>

          <div className="adresse1Et2Adresse">
            <div className="form-fieldAdresse1">
              {/* <label htmlFor="adresse1">Adresse</label> */}
              <Field name="adresse1" type="text" placeholder="Adresse, exemple: 7 Rue de la Paix" />
              <ErrorMessage name="adresse1" component="div" className="error" />
            </div>

            <div className="form-fieldAdresse2">
              {/* <label htmlFor="adresse2">Complément d'adresse</label> */}
              <Field name="adresse2" type="text" placeholder="Complément d'adresse: Etage, batiment, etc ..." />
              <ErrorMessage name="adresse2" component="div" className="error" />
            </div>
          </div>

          <div className="CodePostalAdresse">
            <div className="form-fieldCodePostal">
              {/* <label htmlFor="adresse1">Code postale</label> */}
              <Field name="Code_postal" type="text" placeholder="Code postale" />
              <ErrorMessage name="code_postal" component="div" className="error" />
            </div>

            <div className="form-fieldVille">
              {/* <label htmlFor="adresse2">Ville</label> */}
              <Field name="ville" type="text" placeholder="Ville" />
              <ErrorMessage name="ville" component="div" className="error" />
            </div>
          </div>

          <div className="paysAdresse">
            <div className="form-fieldPays">
              {/* <label htmlFor="adresse1">Pays</label> */}
              <Field name="pays" type="text" placeholder="Pays" />
              <ErrorMessage name="pays" component="div" className="error" />
            </div>

          </div>


        </Form>
      </Formik>
    </div>
  );
};

export default FormulaireAdresse;
