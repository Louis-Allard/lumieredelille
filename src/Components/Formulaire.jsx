import React from "react";
import "../Styles/Formulaire.scss";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const Formulaire =()=>{
 // Validation schema YUp

 const validationShema = Yup.object({
    nom: Yup.string()
    .min(2, "Le nom doit comporter au minimum 2 caractères")
    .required("Le nom est requis"),

    prenom: Yup.string()
    .min(2,"Le prénom doit comporter au minimum 2 caractères" )
    .required("Le prénom est requis"),

    email: Yup.string()
    .email("Adresse email invalide")
    .required("L'adress est requis"),

    message: Yup.string()
    .min(5, "Le message comporter au moins 5 caractères")
    .required("Message requis"),

    
 });


    return(
        <div>

            <h1>Formulaire de contact</h1>
            <Formik
            initialValues={{
                nom: "",
                prenom: "",
                email: "",
                message: "",
            }}
            // onSubmit={submit}
            validationSchema={validationShema}
            >
                <form action="">
                    <div>
                    <label htmlFor="nom">Nom</label>
                    <Field name="nom"/>
                    <ErrorMessage name="nom" component="div" className="error" />    
                    </div>

                    <div>
                    <label htmlFor="prenom">Prénom</label>
                    <Field name="nom"/>
                    <ErrorMessage name="nom" component="div" className="error" />   
                    </div>

                    <div className="form-field">
              <label htmlFor="message">Message</label>
              <Field as="textarea" name="message" />
              <ErrorMessage name="message" component="div" className="error" />
                    </div>

                    <button type="submit">Envoyer</button>
            
                </form>



            </Formik>
            
        
        </div>

    )
};

export default Formulaire;