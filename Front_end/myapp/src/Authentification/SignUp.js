import React, { useState } from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBInput,
  MDBCardImage,
} from 'mdb-react-ui-kit';
import './SignIn.css'; // Importez votre fichier CSS personnalisé ici
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import logosopra from '../images/logosopra.jpg'; // Importez l'image ici
import SIgnup from '../images/SIgnup.webp'; 
function SignUp() {
  const [formFields, setFormFields] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  const [alertOpen, setAlertOpen] = useState(false);
  const [isSignUpSuccess, setIsSignUpSuccess] = useState(false);

  const handleAlertClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setAlertOpen(false);

    if (isSignUpSuccess) {
      window.location.href = '/signin'; // Rediriger vers la page de connexion en cas de succès
    }
  };

  const handleSignUp = async (event) => {
    event.preventDefault();
    try {
      // Envoyez les informations d'inscription au backend
      await axios.post('http://localhost:5000/user/save', {
        email: formFields.email,
        password: formFields.password,
        firstName: formFields.firstName,
        lastName: formFields.lastName,
      });

      setAlertOpen(true);
      setIsSignUpSuccess(true);
    } catch (error) {
      console.error('Erreur lors de l\'inscription :', error.message);
      setAlertOpen(true); // Afficher le message d'erreur
    }
  };

  return (
    <MDBContainer className="gradient-form">
      <MDBRow>
        <MDBCol col='6' className="mb-5">
          <div className="d-flex flex-column ms-5">
            <div className="text-center" style={{ marginTop: "30px" }}>
              <img src={logosopra} style={{ width: '185px' }} alt="logo" />
              <h4 className="mt-1 mb-5 pb-1">We are The Sopra Team</h4>
            </div>
            <p>Please sign up for your account</p>
            <form onSubmit={handleSignUp}>
              <div className="mb-4 d-flex ">
                <MDBInput  label='First Name' id='form1' type='text' value={formFields.firstName} onChange={(e) => setFormFields({ ...formFields, firstName: e.target.value })} />
                <div style={{marginLeft:"70px"}}>
                <MDBInput  label='Last Name' id='form2' type='text' value={formFields.lastName} onChange={(e) => setFormFields({ ...formFields, lastName: e.target.value })} />
                </div>
              </div>
              <MDBInput wrapperClass='mb-4' label='Email address' id='form3' type='email' value={formFields.email} onChange={(e) => setFormFields({ ...formFields, email: e.target.value })} />
              <MDBInput  wrapperClass='mb-4' label='Password' id='form4' type='password' value={formFields.password} onChange={(e) => setFormFields({ ...formFields, password: e.target.value })} />
              <div className="text-center pt-1 mb-5 pb-1">
                <Button type="submit" className="mb-4 w-100 gradient-custom-2" style={{ color: 'white', borderRadius: '25px' }}>
                  Sign Up
                </Button>
              </div>
            </form>
            <div className="d-flex flex-row align-items-center justify-content-center pb-4 mb-4">
              <p className="mb-0">Already have an account?</p>
              <MDBBtn outline className='mx-2' color='danger' href="/signin">
                Sign In
              </MDBBtn>
            </div>
          </div>
        </MDBCol>
        
        <MDBCol md='6'>
          <MDBCardImage src={SIgnup}  className='rounded-start w-100'/>
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
        {isSignUpSuccess ? (
          <Alert onClose={handleAlertClose} severity="success" sx={{ width: '100%' }}>
            Account created successfully! You can now sign in.
          </Alert>
        ) : (
          <Alert onClose={handleAlertClose} severity="error" sx={{ width: '100%' }}>
            Error creating the account. Please check your details and try again.
          </Alert>
        )}
      </Snackbar>
    </MDBContainer>
  );
}

export default SignUp;
