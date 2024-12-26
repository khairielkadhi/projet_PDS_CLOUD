import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from './header';
import './job-offer-details.css';
import { Button,} from '@mui/material';
import FormulairePopup from './FormulairePopup';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import Footer from './footer';
import { green } from '@mui/material/colors';
const JobOfferDetails = () => {
  const { id } = useParams();
  const jobId = Number(id);
  console.log(jobId);


  const [jobOffer, setJobOffer] = useState(null);
  const [showSignUpPopup, setShowSignUpPopup] = useState(false);
  const [candidateData, setCandidateData] = useState(null);
  
  const token = localStorage.getItem('token');
  const decodedToken = jwtDecode(token);
  const Userid = decodedToken.userId;

  useEffect(() => {

    fetchJobOffer();
  }, []);

  const fetchJobOffer = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/joboffer/get/${id}`); // Mettez l'URL correcte du backend ici
      console.log('Job offer response:', response.data);
      setJobOffer(response.data);
      
    } catch (error) {
      console.error('Error fetching job offer:', error);
    }

    /*try {
      const responsesession = await axios.get(`http://localhost:5000/Condidate/session/${id}`); // Mettez l'URL correcte du backend ici
      console.log('Session response:', responsesession);
      console.log('Session response IDsession:', responsesession.data);
      setCandidateData(responsesession.data);
      
      
    } catch (error) {
      console.error('Error candidate by session:', error);
    }*/

////////////////////////////////////////////////////////////////////////////

    try {
      const responsesession2 = await axios.get(`http://localhost:5000/Condidate/get/getsession/${Userid}`); // Mettez l'URL correcte du backend ici
      console.log('Session response khairi:', responsesession2);
      console.log('Session response IDsession:', responsesession2.data);
      setCandidateData(responsesession2.data);
console.log("tata")
console.log(responsesession2.data)
console.log(candidateData.sessionId)
      
    } catch (error) {
      console.error('Error candidate by session:', error);
    }





     

  };

  const handleCloseSignUpPopup = () => {
    setShowSignUpPopup(false);
  };
  const handleInterestedClick = () => {
    if (jobOffer && jobOffer._id) {
      // Sauvegarder l'ID de l'offre d'emploi dans le local storage
      localStorage.setItem('sessionId', jobOffer._id);
    }

    // Rediriger l'utilisateur vers la page /profile
    window.location.href = '/profile';
  };

  if (!jobOffer) {
    return <div>Offre d'emploi non trouvée.</div>;
  }

  const hasApplied = candidateData && candidateData.sessionId === id;
  return (
    <div>
    <div className="sticky-header">
    <Header />
  </div>
     
    <div className="job-offer-details">
      <FormulairePopup open={showSignUpPopup} onClose={handleCloseSignUpPopup} />
      
      
      <div className="job-details">
        <h1>
          <span> {jobOffer.title}</span>
          <span className="interest-button-container">
            {hasApplied ? (
              <p>Vous avez déjà postulé dans cette session !<p>Staut de votre condidature:

                <span style={{color:'royalblue'}}>{candidateData.statut}</span></p></p>
              
            ) : (
              <Button onClick={handleInterestedClick} type="submit" 
            className="mb-4 w-20 gradient-custom-2"style={{ color: 'white', borderRadius: '25px' }}>
            Interested</Button>
              
            )}
            

          </span>
        </h1>
        <div className="job-info">
          <span className="job-label">Year of this Session:</span> {jobOffer.years}
        </div>
        <div className="job-info">
          <span className="job-label">Description of this Session:</span>
          <div>
            {jobOffer.description.split(/(\.|:|-)\s+/).map((fragment, index) => (
              <React.Fragment key={index}>
                {fragment}
                <br />
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </div>
    <div>
    <Footer />
    </div>
    </div>
  );
};

export default JobOfferDetails;
