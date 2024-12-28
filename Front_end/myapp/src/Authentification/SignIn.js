import React, { useState } from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import {
  MDBBtn,
  MDBContainer,
  
  MDBRow,
  MDBCol,
  MDBInput
} from 'mdb-react-ui-kit';
import './SignIn.css'; // Importez votre fichier CSS personnalisé ici
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import logosopra from '../images/logosopra.jpg'; // Importez l'image ici

function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [alertOpen, setAlertOpen] = useState(false);
  const [isLoginSuccess, setIsLoginSuccess] = useState(false);

  const handleAlertClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setAlertOpen(false);

    if (isLoginSuccess) {
      window.location.href = '/joboffer'; // Rediriger vers la page de profil en cas de succès
    }
  };

  const handleSignIn = async (event) => {
    event.preventDefault();
    try {
      // Envoyez les informations de connexion au backend
      const response = await axios.post('http://localhost:5000/login/user', { email, password });

      const token = response.data.token;
      const decodedToken = jwtDecode(token);
      const { userId } = decodedToken;

      localStorage.setItem('token', token);

      setAlertOpen(true);
      setIsLoginSuccess(true);
    } catch (error) {
      console.error('Erreur lors de la connexion :', error.message);
      setAlertOpen(true); // Afficher le message d'erreur
    }
  };

  return (
    <MDBContainer className=" gradient-form" >
      <MDBRow>
        <MDBCol col='6' className="mb-5">
          <div className="d-flex flex-column ms-5">
            <div className="text-center" style={{marginTop:"30px"}}>
            <img src={logosopra} style={{ width: '185px' }} alt="logo" />

              <h4 className="mt-1 mb-5 pb-1">We are The Sopra Team</h4>
            </div>
            <p>Please login to your account</p>
            <form onSubmit={handleSignIn}>
              <MDBInput wrapperClass='mb-4' label='Email address' id='form1' type='email' value={email} onChange={(e) => setEmail(e.target.value)} />
              <MDBInput wrapperClass='mb-4' label='Password' id='form2' type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
              <div className="text-center pt-1 mb-5 pb-1">
              <Button type="submit" className="mb-4 w-100 gradient-custom-2"style={{ color: 'white', borderRadius: '25px' }}>
  Sign in</Button>
                <a className="text-muted" href="#!">Forgot password?</a>
              </div>
            </form>
            <div className="d-flex flex-row align-items-center justify-content-center pb-4 mb-4">
              <p className="mb-0">Don't have an account?</p>
              <MDBBtn outline className='mx-2' color='danger' href="signup">
                Sing Up
              </MDBBtn>
            </div>
          </div>
        </MDBCol>
          <MDBCol col='6' className="mb-9">
            <div className="d-flex flex-column  justify-content-center gradient-custom-2 h-100 mb-4"  >

              <div className="text-white px-3 py-4 p-md-5 mx-md-4" >
                <h4 class="mb-4">We are more than just a company</h4>
                <p class="small mb-1">Vivre une expérience en équipe, relever des défis,
                être fier de construire des solutions utilisées chaque jour par des millions de salariés,
                  innover pour transformer les RH, développer l’excellence de services pour la satisfaction 
                  de nos clients. Sopra HR favorise l’engagement de chacun auprès d’associations pour agir sur
                  des actions solidaires ou environnementales.
                </p>
              </div>

            </div>

          </MDBCol>
      </MDBRow>
      {/* Snackbar pour afficher les messages */}
      <Snackbar
        open={alertOpen}
        autoHideDuration={6000}
        onClose={handleAlertClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        style={{ position: 'fixed', top: '20px', left: '50%', transform: 'translateX(-50%)' }}
      >
        {isLoginSuccess ? (
          <Alert onClose={handleAlertClose} severity="success" sx={{ width: '100%' }}>
            Connexion réussie ! Vous êtes maintenant connecté !
          </Alert>
        ) : (
          <Alert onClose={handleAlertClose} severity="error" sx={{ width: '100%' }}>
            Échec de la connexion ! Veuillez vérifier vos identifiants et réessayer.
          </Alert>
        )}
      </Snackbar>
    </MDBContainer>
  );
}

export default SignIn;
