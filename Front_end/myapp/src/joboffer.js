import { Link } from 'react-router-dom'; // Si vous utilisez React Router pour gérer la navigation

import Header from './header';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Footer from './footer';
import './LisjobOffer.css'


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
        <h2>Session of {offer.years}</h2>
      
        <p>Tunisie,Tunis</p>
      </div>
    </Link>
  ));
};

return (
  <div>
    <div className="sticky-header">
      <Header />
    </div>
  
    <div className="content">
      <div className="job-offers-container">
        {renderJobOffers()}
      </div>
    </div>
   
    <Footer />
  </div>
);
};

export default ALLJobOffer;



