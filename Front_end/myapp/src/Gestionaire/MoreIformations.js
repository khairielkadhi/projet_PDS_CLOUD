import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import jsPDF from 'jspdf';
import './ListOfCandidate.css';
import Header from './header';

function MoreInformation({id}) {
  
  const [candidate, setCandidate] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log(id)
        const response = await axios.get(`http://localhost:5000/Condidate/${id}`);
        const data = response.data;
        console.log(data[0]);
        setCandidate(data[0]);
      } catch (error) {
        console.error('Erreur lors de la récupération des données du candidat :', error);
      }
    };

    fetchData();
  }, [id]);

  const exportAsPDF = () => {
    const pdf = new jsPDF('p', 'mm', 'A0');
    const fontSize = 1;
    const content = document.getElementById('pdf-content');
    const pdfHeight = pdf.internal.pageSize.getHeight();
    const posY = 10;

    pdf.html(content, {
      callback: (pdf) => {
        const contentHeight = pdf.internal.pageSize.getHeight();
        const minFontSize = (pdfHeight / contentHeight) * fontSize;
        pdf.setFontSize(minFontSize);

        pdf.html(content, {
          x: 0,
          y: posY,
          width: 0,
        });

        pdf.save('CV.pdf');
      },
      x: 10,
      y: 10,
    });
  };

  return (
    
     
    
    <div className="job-offer-details">
      
      <button onClick={exportAsPDF} className="mon-bouton">Export PDF</button>
      <div className="job-details" id="pdf-content">
        <h1>
          <span className='SPAN'> Information Personnelle</span>
          
       
       

        
      
        </h1>
        
        {candidate && (
          <>
            <div className="job-info">
              <span className="job-label">firstName:</span>
              <span className="job-labell">{candidate.firstName}</span>
              
            </div>
            <div className="job-info">
              <span className="job-label">lastName:</span>
              <span className="job-labell">{candidate.lastName}</span>
            
            </div>
            <div className="job-info">
              <span className="job-label">email:</span>
              <span className="job-labell"> {candidate.email}</span>
             
            </div>
            <div className="job-info">
              <span className="job-label">phoneNumber:</span>
              <span className="job-labell">{candidate.phoneNumber}</span>
              
            </div>
            <div className="job-info">
              <span className="job-label">dateOfBirth:</span>
              <span className="job-labell"> {candidate.ALLcandidates[0].dateOfBirth?candidate.ALLcandidates[0].dateOfBirth.toString().split('T')[0] : ''}</span>
             

            </div>
            <div className="job-info">
              <span className="job-label"> SEX:</span>
              <span className="job-labell"> {candidate.ALLcandidates[0].sex}</span>
              
            </div>
            <div className="job-info">
              <span className="job-label"> address:</span>
              <span className="job-labell">  {candidate.ALLcandidates[0].address}</span>
             
              
              
            </div>
            
            <h1>
              <span className='SPAN'> Diplomas</span>
            </h1>
            
            {candidate.diplomas && candidate.diplomas.map((diploma, index) => (
  <React.Fragment key={index}>
    <div className="job-info">
      <span className="job-label">Diploma Title:</span>
      <span className="job-labell">   {diploma.diplomaTitle}</span>
    
    </div>
    <div className="job-info">
      <span className="job-label">Institution:</span>
      <span className="job-labell">{diploma.institution}</span>
    </div>
    <div className="job-info">
      <span className="job-label">Start Date:</span>
      <span className="job-labell">  {diploma.startDateDiploma?diploma.startDateDiploma.toString().split('T')[0] : ''}</span>
     
    </div>
    <div className="job-info">
      <span className="job-label">End Date:</span>
      <span className="job-labell">{diploma.endDateDiploma?diploma.endDateDiploma.toString().split('T')[0] : ''}</span>
      
    </div>
  </React.Fragment>
))}

<h1>
  <span className='SPAN'> Expériences</span>
</h1>
{candidate && candidate.experiences && candidate.experiences.map((experience, index) => (
  <React.Fragment key={index}>
    <div className="job-info">
      <span className="job-label">Entreprise:</span>
      <span className="job-labell">{experience.company}</span>
      
    </div>
    <div className="job-info">
      <span className="job-label">Poste:</span>
      <span className="job-labell">      {experience.poste}</span>
    </div>
    <div className="job-info">
      <span className="job-label">Date de début:</span>
      <span className="job-labell">{experience.startDate?experience.startDate.toString().split('T')[0] : ''}</span>
      
    </div>
    <div className="job-info">
      <span className="job-label">Date de fin:</span>
      <span className="job-labell">{experience.endDate?experience.endDate.toString().split('T')[0] : ''}</span>
      
    </div>
    
  </React.Fragment>
))}










<h1>
  <span className='SPAN'> Langues</span>
</h1>
{candidate && candidate.languages && candidate.languages.map((language, index) => (
  <React.Fragment key={index}>
    <div className="job-info">
      <span className="job-label">Langue:</span>
      <span className="job-labell"> {language.language}</span>
     
    </div>
    <div className="job-info">
      <span className="job-label">Niveau:</span>
      <span className="job-labell"> {language.level}</span>
     
    </div>
  </React.Fragment>
))}









          </>
        )}
      </div>
    </div>
    
  );
  
}


export default MoreInformation;
