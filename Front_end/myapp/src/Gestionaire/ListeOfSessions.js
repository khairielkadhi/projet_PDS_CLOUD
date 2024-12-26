import { Link } from 'react-router-dom'; // Si vous utilisez React Router pour gérer la navigation
import '../index.css';
import Header from './header';
import React, { useState, useEffect } from 'react';
import axios from 'axios';


export const ALLJobOffer = () => {

const [jobOffers, setJobOffers] = useState([]);

useEffect(() => {
  fetchJobOffers();
}, []);

const fetchJobOffers = async () => {
  try {
    const response = await axios.get('http://localhost:5000/joboffer/get'); // Mettez l'URL correcte du backend ici
    setJobOffers(response.data);
  } catch (error) {
    console.error('Error fetching job offers:', error);
  }
};

const renderJobOffers = () => {
  return jobOffers.map((offer) => (
    <Link to={`/job/${offer._id}`} key={offer._id} style={{ textDecoration: 'none' }}>
      <div className="job-offer-box">
        <h2>{offer.title}</h2>
        <p>{offer.company}</p>
        <p>{offer.location}</p>
      </div>
    </Link>
  ));
};

  return (
    <div>

      <div className="header">
    <Header />
  </div>
  <br></br>
  <br></br>
  <br></br>
  
  <br></br>
      
      <div className="job-offers-container">
        {renderJobOffers()}
      </div>

      <style jsx>{`
        .job-offers-container {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }

        .job-offer-box {
          background-color: #f0f0f0;
          padding: 10px;
          border: 1px solid #ddd;
          border-radius: 10px;
          text-align: center;
          margin: 5px; 
        }

        .list {
          color: #FF0000; // Couleur pour "List"
        }

        .page-title {
          color: #8B008B; // Assurez-vous que la couleur du texte est suffisamment contrastée
          text-align: center;
          margin-bottom: 20px; // Ajout d'une marge en bas pour séparer le titre des cases
        }
        
      `}</style>
    </div>
  );
};

export default ALLJobOffer;
