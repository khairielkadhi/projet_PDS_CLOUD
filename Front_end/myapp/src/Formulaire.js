import React, { useState, useRef } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import FolderIcon  from '@mui/icons-material/Folder'
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import PublishIcon from '@mui/icons-material/Publish';

import Alert from '@mui/material/Alert';
import 'react-datepicker/dist/react-datepicker.css';
import './index.css';



const defaultTheme = createTheme();

export default function SignUp() {
  const [formData, setFormData] = useState({

    cv: null,
    cvName: '',
    
    additionalInfo: '', // Added Additional Info field
  });

  
  const [cvError, setCvError] = useState(false);
 

  const [showAlert, setShowAlert] = useState(false);

 

  const handleChange = (event) => {
    const { name, value, type, checked, files } = event.target;
    const updatedValue = type === 'checkbox' ? checked : type === 'file' ? files[0] : value;

    if (type === 'file') {
      // Handle file input and set cv and cvName
      setFormData((prevData) => ({
        ...prevData,
        [name]: updatedValue,
        cvName: updatedValue ? updatedValue.name : '', // Store the name of the selected file
      }));
    } else {
      // Handle other form fields
      if (name === 'yearOfExperience') {
        // Ensure that the value is a positive integer
        const intValue = parseInt(updatedValue);
        if (!isNaN(intValue) && intValue >= 0) {
          setFormData((prevData) => ({
            ...prevData,
            [name]: intValue.toString(), // Store the integer value as a string
          }));
        }
      } else {
        setFormData((prevData) => ({
          ...prevData,
          [name]: updatedValue,
        }));
      }
    }
  };

  const hiddenFileInputRef = useRef(null);

  const handleAvatarClick = () => {
    hiddenFileInputRef.current.click();
  };

  const handleAlertClose = () => {
    setShowAlert(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData); // Do something with the form data (e.g., submit to backend)

    

    if (formData.cv === '') {
      setCvError(true);
    } else {
      setCvError(false);
    }

   

    if (
      
      cvError
      
    ) {
      setShowAlert(true);
      return;
    }
    

    // If all fields are valid, you can proceed with form submission here

    // For this example, I'm just showing an alert indicating successful submission
    
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <FolderIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
          Upload Curriculum Vitae
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>

          {showAlert && (
              <Alert variant="filled" severity="error" onClose={handleAlertClose}>
                Please check your input. Some required fields are empty.
              </Alert>
            )}


            <Grid container spacing={2}>
              
              
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  name="additionalInfo"
                  label="Additional Information"
                  value={formData.additionalInfo}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sx={{ display: 'flex', alignItems: 'center' }}>
                <Avatar variant="square" sx={{ marginRight: '10px', cursor: 'pointer' }} onClick={handleAvatarClick}>
                  <PublishIcon />
                </Avatar>
                <div>
                  <Typography variant="body1" color={formData.cvName ? 'inherit' : 'error'}>
                    {formData.cvName ? formData.cvName : 'Upload your CV *'}
                  </Typography>
                </div>
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  name="cv"
                  id="cv"
                  ref={hiddenFileInputRef}
                  style={{ display: 'none' }}
                  onChange={handleChange}
                  error={cvError}
                />
              </Grid>
              
            </Grid>
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              Submit Application
            </Button>
            
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
