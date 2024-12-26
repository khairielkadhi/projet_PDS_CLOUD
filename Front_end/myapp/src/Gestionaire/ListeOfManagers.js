import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';

function ListofManagers() {
  const [data, setData] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const [newEntry, setNewEntry] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    role: 'manager',
  });
  const [message, setMessage] = useState('');
  const [isMessageVisible, setIsMessageVisible] = useState(false);

  useEffect(() => {
    fetchData(); // Appeler la fonction fetchData lors du chargement initial
  }, []);

  const fetchData = () => {
    fetch('http://localhost:5000/user/Managers')
      .then((response) => response.json())
      .then((managers) => {
        setData(managers);
      })
      .catch((error) => {
        console.error('Erreur lors de la récupération des gestionnaires :', error);
      });
  };

  const handleAddEntry = () => {
    fetch('http://localhost:5000/user/save', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newEntry),
    })
      .then((response) => response.json())
      .then((addedEntry) => {
        fetchData(); // Mettre à jour la liste après l'ajout
        setNewEntry({
          firstName: '',
          lastName: '',
          email: '',
          password: '',
          role: 'manager',
        });
        setIsAdding(false);
        setMessage('Gestionnaire ajouté avec succès');
        setIsMessageVisible(true);
        setTimeout(() => {
          setIsMessageVisible(false);
        }, 3000);
      })
      .catch((error) => {
        console.error('Erreur lors de l\'ajout du gestionnaire :', error);
        setMessage('Erreur lors de l\'ajout du gestionnaire');
        setIsMessageVisible(true);
        setTimeout(() => {
          setIsMessageVisible(false);
        }, 3000);
      });
  };

  const handleDeleteManager = (id) => {
  fetch(`http://localhost:5000/user/delete/${id}`, {
    method: 'DELETE',
  })
    .then((response) => response.text()) // Utilisez response.text() pour obtenir le texte de la réponse
    .then((response) => {
      if (response === 'Utilisateur supprimé avec succès') {
        fetchData(); // Rafraîchir la liste après la suppression
        setMessage('Utilisateur supprimé avec succès');
        setIsMessageVisible(true);
        setTimeout(() => {
          setIsMessageVisible(false);
        }, 3000);
      } else {
        console.error('Erreur lors de la suppression du gestionnaire :', response);
        setMessage('Erreur lors de la suppression du gestionnaire');
        setIsMessageVisible(true);
        setTimeout(() => {
          setIsMessageVisible(false);
        }, 3000);
      }
    })
    .catch((error) => {
      console.error('Erreur lors de la suppression du gestionnaire :', error);
      setMessage('Erreur lors de la suppression du gestionnaire');
      setIsMessageVisible(true);
      setTimeout(() => {
        setIsMessageVisible(false);
      }, 3000);
    });
};

  return (
    <div className="about-content" style={{ boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)', maxWidth: '1050px', margin: '0 auto', marginTop: '0px' }}>
      {isMessageVisible && (
        <div className={`alert ${message.includes('succès') ? 'alert-success' : 'alert-danger'}`} role="alert">
          {message}
        </div>
      )}
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">firstName</th>
            <th scope="col">lastName</th>
            <th scope="col">email</th>
            <th scope="col">password</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((entry) => (
            <tr key={entry._id}>
              <td>{entry.firstName}</td>
              <td>{entry.lastName}</td>
              <td>{entry.email}</td>
              <td>{entry.password}</td>
              <td>
              <button onClick={() => handleDeleteManager(entry._id)} className="btn btn-danger btn-sm">
  <FontAwesomeIcon icon={faTrash} /> 
</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {isAdding ? (
        <div>
          <h2>Ajouter une nouvelle entrée</h2>
          <form>
            <div className="form-group">
              <label htmlFor="firstName">firstName:</label>
              <input type="text" id="firstName" className="form-control" value={newEntry.firstName} onChange={(e) => setNewEntry({ ...newEntry, firstName: e.target.value })} />
            </div>
            <div className="form-group">
              <label htmlFor="lastName">lastName:</label>
              <input type="text" id="lastName" className="form-control" value={newEntry.lastName} onChange={(e) => setNewEntry({ ...newEntry, lastName: e.target.value })} />
            </div>
            <div className="form-group">
              <label htmlFor="email">email:</label>
              <input type="email" id="email" className="form-control" value={newEntry.email} onChange={(e) => setNewEntry({ ...newEntry, email: e.target.value })} />
            </div>
            <div className="form-group">
              <label htmlFor="password">password:</label>
              <input type="password" id="password" className="form-control" value={newEntry.password} onChange={(e) => setNewEntry({ ...newEntry, password: e.target.value })} />
            </div>
          </form>
          <button onClick={handleAddEntry} className="btn btn-primary">Ajouter</button>
        </div>
      ) : (
        <button className="btn btn-primary" onClick={() => setIsAdding(true)}>
          <FontAwesomeIcon icon={faPlus} /> Ajouter
        </button>
      )}
    </div>
  );
}

export default ListofManagers;
