// JoboofersForm.js

import './JobOffer.css';
import React, { useReducer, useState } from "react";
import axios from "axios";
import Header from './header';

const initialState = {
  years: "",
  description: "",
};

const initialValidityState = {
  yearsError: false,
  descriptionError: false,
};

const formReducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_YEARS":
      return { ...state, years: action.payload };
    case "UPDATE_DESCRIPTION":
      return { ...state, description: action.payload };
    default:
      return state;
  }
};

const formValidityReducer = (state, action) => {
  switch (action.type) {
    // Ajoutez ici la validation des champs si nécessaire
    default:
      return state;
  }
};

const JoboofersForm = () => {
  const [formData, dispatchFormData] = useReducer(formReducer, initialState);
  const [formValidityData] = useReducer(
    formValidityReducer,
    initialValidityState
  );
  const [formSubmitted, setFormSubmitted] = useState(false);

  const onFormSubmit = async (event) => {
    event.preventDefault();

    // Validation des données ici (ajoutez de la logique de validation si nécessaire)

    // Vérifiez si le formulaire est valide
    // Par exemple, vous pouvez vérifier si tous les champs requis sont remplis

    if (formData.years && formData.description) {
      try {
        console.log(formData)
        // Envoyez les données au serveur (MongoDB) en utilisant une requête HTTP
        await axios.post("http://localhost:5000/joboffer/save", formData);

        console.log("Formulaire valide, données soumises:", formData);

        // Réinitialisez le formulaire après soumission si nécessaire
        dispatchFormData({ type: "RESET_FORM" });
        setFormSubmitted(true);
      } catch (error) {
        console.error("Erreur lors de l'envoi du formulaire:", error);
      }
    } else {
      console.log("Le formulaire contient des erreurs, veuillez le corriger.");
    }
  };

  return (
    
    <div className="page-container">
      <div className="form-container">
        <h1>Create a New Session</h1>
        {formSubmitted ? (
          <p>Your job offer has been submitted successfully.</p>
        ) : (
          <form onSubmit={onFormSubmit}>
            <div className="form-field">
              <label htmlFor="years" className="form-label">
                Years:
              </label>
              <input
                type="text"
                id="years"
                className="form-input"
                value={formData.years}
                onChange={(e) =>
                  dispatchFormData({ type: "UPDATE_YEARS", payload: e.target.value })
                }
              />
            </div>
            <div className="form-field">
              <label htmlFor="description" className="form-label">
                Description:
              </label>
              <textarea
                id="description"
                className="form-inputdescription"
                value={formData.description}
                onChange={(e) =>
                  dispatchFormData({ type: "UPDATE_DESCRIPTION", payload: e.target.value })
                }
              />
            </div>
            <button type="submit" className="form-button">
              Submit
            </button>
          </form>
        )}
      </div>
      </div>
    
  );
};

export default JoboofersForm;
