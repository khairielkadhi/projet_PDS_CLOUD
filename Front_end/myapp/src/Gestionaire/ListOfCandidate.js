import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { format } from 'date-fns';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import './ListOfCandidate.css'; // Assurez-vous d'ajouter le fichier CSS pour le style
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons'; // Exemple avec Font Awesome
import SaveAltRoundedIcon from '@mui/icons-material/SaveAltRounded';
import Header from './header';
import MoreInformation from './MoreIformations';
import { Link } from 'react-router-dom';





function ListOfCandidate() {
  const [candidateData, setCandidateData] = useState([]);
 
  const [search, setSearch] = useState('');
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [newStatus, setNewStatus] = useState('');
  const [candidateStatus, setCandidateStatus] = useState({});
  const [showMoreInformation, setShowMoreInformation] = useState(false);
  const [selectedCandidateId, setSelectedCandidateId] = useState(null);
 
  
  
  
  
  

  // Effet secondaire pour charger les données des candidats depuis l'API
  useEffect(() => {
    axios.get('http://localhost:5000/Condidate')
      .then((response) => {
        setCandidateData(response.data);
        console.log(response.data)

        const initialStatus = {};
        response.data.forEach((candidate) => {
          initialStatus[candidate._id] = candidate.ALLcandidates[0].statut;
          console.log(candidate.ALLcandidates[0].statut)
        });
        setCandidateStatus(initialStatus);




      })
      .catch((error) => {
        console.error('Erreur lors de la récupération des données des candidats :', error);
      });
  }, []);

  // Fonction pour mettre à jour l'état de recherche
  const handleSearchChange = (e) => {
    setSearch(e.target.value);
   
  };

  const updateCandidateStatus = (candidateId, newStatus) => {
    console.log("kiea")
    console.log(candidateId);
    // Envoyez une requête au backend pour mettre à jour le statut du candidat
    axios.put(`http://localhost:5000/Condidate/updatecondidate/${candidateId}`, { statut: newStatus })
      .then((response) => {
      
        // Mettez à jour l'état du candidat dans la liste candidateData
        const updatedCandidates = candidateData.map((candidate) => {
          if (candidate._id === candidateId) {
            return { ...candidate, status: newStatus };
          }
          return candidate;
        });
        setCandidateData(updatedCandidates);
      })
      .catch((error) => {
        console.error('Erreur lors de la mise à jour du statut du candidat :', error);
      });
  };



  const handleStatusChange = (candidateId,newStatus) => {
    // Appeler la fonction pour mettre à jour le statut avec le nouveau statut sélectionné
    setCandidateStatus(newStatus);
    updateCandidateStatus(candidateId.ALLcandidates[0]._id, newStatus);
    console.log(candidateId.ALLcandidates[0]._id);
    console.log(newStatus);
    
  };

  






  // Filtrer les candidats en fonction de la recherche
  const filteredCandidates = candidateData.filter((candidate) => {
    const lastName  = candidate.lastName || ''; // Assurez-vous que lastName n'est pas undefined
    console.log("tit");
    console.log(lastName );
    return lastName .toLowerCase().includes(search.toLowerCase());
  });

  return (
    <div className="about-content" style={{ boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)', maxWidth: '2000px', margin: '0 auto',marginTop:'0px' }}>
      
      <div className="exportexcel">
        <ReactHTMLTableToExcel
          className="btn btn-info export-button"
          table="candidates"
          filename="CandidateReportExcel"
          sheet="Sheet"
          buttonText={<SaveAltRoundedIcon />}
        />
      </div>
      <div className="search-bar">
        <div className="search-icon">
          <FontAwesomeIcon icon={faSearch} />
        </div>
        <input
          type="text"
          placeholder="Recherche par Stut..."
          value={search}
          onChange={handleSearchChange}
        />
      </div>
      
      <table id="candidates" class="table table-hover">
      <thead  >
          <tr>
            <th>Statut</th>
            <th>LastName</th>
            <th>FirstName</th>
            <th>Address</th>
            <th>Phone</th>
            <th>Email</th>
            <th>DateOfBirth</th>
            <th>sex</th>
            <th>Score CV</th>
            <th>Score Entretient</th>
            <th>Score test</th>
          </tr>
        </thead>
        <tbody>
        {filteredCandidates.map((candidate, index) => {
  // Accédez aux données du candidat principal (en dehors de la boucle ALLcandidates)
  const {
    _id,
    lastName,
    firstName,
    address,
    phoneNumber,
    email,
    ALLcandidates,
  } = candidate;

  return (
    <tr key={index}>
      <td>
        {/* Liste déroulante pour sélectionner le nouveau statut */}
        <select
          onChange={(e) => handleStatusChange(candidate, e.target.value)}
          value={candidateStatus[candidate._id]} // Utilisez la valeur de l'état local
         
        >
          <option value="En attente">En attente</option>
          <option value="Accepté">Accepté</option>
          <option value="Refusé">Refusé</option>
        </select>
      </td>
      <td>{lastName}</td>
      <td>{firstName}</td>
      <td>
        {ALLcandidates.map((subCandidate, subIndex) => (
          <div key={subIndex}>{subCandidate.address}</div>
        ))}
      </td>
      <td>{phoneNumber}</td>             
      <td>{email}</td>
      {/* Utilisez .map() pour itérer sur les éléments de ALLcandidates */}
      <td>
      {ALLcandidates.map((subCandidate, subIndex) => (
          <div key={subIndex}>
            {format(
              new Date(subCandidate.dateOfBirth), // Convertissez la chaîne de date en objet Date
              'dd/MM/yyyy' // Format de date souhaité (par exemple, 'dd/MM/yyyy')
            )}
          </div>
        ))}
        </td>
        <td>
      {ALLcandidates.map((subCandidate, subIndex) => (
          <div key={subIndex}>
            {
             (subCandidate.sex)
            }
          </div>
        ))}
        </td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>
      <button
                  className='MoreDetails'
                  onClick={() => {
                    setSelectedCandidateId(candidate._id);
                    setShowMoreInformation(true);
                  }}
                >
                  Plus
                </button>
        </td>
</tr>




  );
})}
        </tbody>
      </table>
<div>
{showMoreInformation && (
        <MoreInformation id={selectedCandidateId} />
      )}
</div>
    
    </div>
    
  );
}

export default ListOfCandidate;
