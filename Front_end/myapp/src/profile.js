import React, { useState, useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Header from './header';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import PublishIcon from '@mui/icons-material/Publish';
import { FormControl, InputLabel, Select, MenuItem, InputAdornment,Radio,RadioGroup } from '@mui/material';
import { Phone } from '@mui/icons-material';
import Alert from '@mui/material/Alert';
import 'react-datepicker/dist/react-datepicker.css';
import './index.css';
import jwtDecode from 'jwt-decode';
import axios from 'axios';
import { Divider } from '@mui/material';
import Footer from './footer';


//ountriesWithCities
const educationOptions = [
  { value: 'bachelor', label: "Bachelor's Degree" },
  { value: 'master', label: "Master's Degree" },
  { value: 'engineer', label: 'Engineer Degree' },
  // Ajoutez d'autres options ici
];




const defaultTheme = createTheme();

export default function Profile() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
   
   
  });

  const [candidateData, setcandidateData] = useState({
      address: '', // Ajoutez un champ "Address"
      sex: '', // Ajoutez un champ "Sex"
      dateOfBirth: null, // Ajoutez un champ "Date of Birth"
      sessionId:''
    
   
  });







  //set languages

  // Initialize languages state as an empty array of objects
  const [languages, setLanguages] = useState([{
    language: '',
    level: '',
    CondidateId: '', // Assurez-vous que ce champ est initialisé correctement
  }]);


const languageOptions = ['English', 'French', 'German'];
const levelOptions = ['Beginner', 'Intermediate', 'Advanced'];

// Function to handle changes in the languages array
const updateUserLanguages = (index) => {
  const updatedLanguages = [...languages];
  updatedLanguages[index] = {
    ...updatedLanguages[index],
    
  };
  return updatedLanguages;
};

const handleLanguageChange = (e, index) => {
  const { name, value } = e.target;
  const updatedLanguages = updateUserLanguages(index);
  updatedLanguages[index] = {
    ...updatedLanguages[index],
    [name]: value,
  };
  setLanguages(updatedLanguages);
};


// Function to add a new language object
const addLanguage = () => {
  setLanguages([...languages, {}]);
};

  

  
  
  const [firstNameError, setFirstNameError] = useState(false);
  const [lastNameError, setLastNameError] = useState(false);
  const [posteError, setposteError] = useState(false);
  const [companyError, setcompanyError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [diplomaError, setDiplomaError] = useState(false);
  const [phoneNumberError, setPhoneNumberError] = useState(false);
  const [dateOfBirthError, setDateOfBirthError] = useState(false);
  
  const [showAlert, setShowAlert] = useState(false);
  const token = localStorage.getItem('token');
  const decodedToken = jwtDecode(token);
   const Userid = decodedToken.userId;
  
  
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/login/user/${Userid}`)
      .then((response) => {
        
        const userData = response.data;
        setFormData((prevData) => ({
          ...prevData,
          lastName: userData.lastName,
          firstName: userData.firstName,
          email: userData.email,
          phoneNumber: userData.phoneNumber,
          dateOfBirth: userData.dateOfBirth,
          sex:userData.sex
        }));
        setLoading(false);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des données de l'utilisateur :", error);
        setLoading(false);
      });
      
  }, []);

  

  // Rest of the code remains the same
  const handleChange = (event) => {
    const { name, value, type, checked, files } = event.target;
    const updatedValue = type === 'checkbox' ? checked : value;
  
    if (type === 'file') {
      setFormData((prevData) => ({
        ...prevData,
        [name]: files[0],
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: updatedValue,
      }));
    }
  };



  
  const handleChangeCandidate = (event) => {
    const { name, value, type, checked, files } = event.target;
    const updatedValue = type === 'checkbox' ? checked : value;
  
    if (type === 'file') {
      setcandidateData((prevData) => ({
        ...prevData,
        [name]: files[0],
      }));
    } else {
      setcandidateData((prevData) => ({
        ...prevData,
        [name]: updatedValue,
        userId: decodedToken.userId,
        sessionId:localStorage.getItem('sessionId'),
        
      }));
    }
  };

  

  const handleAlertClose = () => {
    setShowAlert(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Vérification des erreurs de validation
    if (
      formData.firstName === '' ||
      formData.lastName === '' ||
      formData.email === '' ||
      formData.phoneNumber === '' ||
      candidateData.dateOfBirth === null ||
      candidateData.sex === '' ||
      candidateData.address === '' ||
      diplomas.diplomaTitle === ''||
      diplomas.institution === ''||
      diplomas.startDateDiploma === null ||
      diplomas.endDateDiploma === null 
      

    
     
      
    ) {
      setShowAlert(true);
      return;
    }
   
    try {
      const updatedUserData = { ...formData };
      console.log('Données du formulaire soumises :', updatedUserData);
      console.log('Expériences :', experiences);
      console.log('languages:',languages);
      console.log('diplomaData',diplomas);
      console.log('formData',formData);

      console.log('candidateData',candidateData);
      
      
      
      // Envoi des mises à jour pour les données de l'utilisateur
      //await axios.post('http://localhost:5000/diploma/add', diplomas);

      //await axios.post('http://localhost:5000/language/add', languages); 

      //await axios.post('http://localhost:5000/Experience/add', experiences); 

      const ResponceCondidate=await axios.post('http://localhost:5000/Condidate/add', candidateData); 
      
      console.log(ResponceCondidate.data._id);

      localStorage.setItem('condidateId', ResponceCondidate.data._id);
      
      
     

      if(ResponceCondidate !=null){
        
        const condidateId=localStorage.getItem('condidateId');
        const diplomaData = diplomas.map((diplomas) => ({ ...diplomas, CondidateId: condidateId}));
        const languagesData = languages.map((languages) => ({ ...languages, CondidateId: condidateId }));
        const experiencesData = experiences.map((experiences) => ({ ...experiences, CondidateId: condidateId }));
        console.log(diplomaData)

      
      await axios.post('http://localhost:5000/diploma/add', diplomaData);
      await axios.post('http://localhost:5000/language/add', languagesData);
      await axios.post('http://localhost:5000/Experience/add', experiencesData); 

      }
      

      await axios.put(`http://localhost:5000/user/update/${Userid}`, updatedUserData);

      console.log('Mise à jour réussie');
    } catch (error) {
      console.error('Erreur lors de la mise à jour des données:', error);
      // Gérer l'erreur, afficher un message d'erreur, etc.
    }
  };

 
  const [experiences, setExperiences] = useState([{
  poste: '', // Champ "Poste"
  company: '', // Champ "Company"
  startDate: null, // Champ "Start Date"
  endDate: null, // Champ "End Date"
}]);

// Function to handle changes in the experiences array
const updateUserExperienceChange = (index) => {
  const updatedExperiences = [...experiences];
  
  updatedExperiences[index] = {
    ...updatedExperiences[index],
    
  };
  return updatedExperiences;
};




const handleExperienceChange = (e, index) => {
  const { name, value } = e.target;
  const updatedExperiences = updateUserExperienceChange(index);
  updatedExperiences[index] = {
    ...updatedExperiences[index],
    [name]: value,
  };
  setExperiences(updatedExperiences);
};

// Function to add a new experience object
const addExperience = () => {
  setExperiences([...experiences, {}]);
};
  


const [diplomas, setDiplomas] = useState([{
  diplomaTitle: '',
  institution: '',
  startDateDiploma: null,
  endDateDiploma: null,
  moyenneSemestre1: '',
  moyenneSemestre2: '',
  moyenneSemestre3: '',
  notePFE: '',
}]);

const updateUserInDiplomas = (index) => {
  const updatedDiplomas = [...diplomas];
  updatedDiplomas[index] = {
    ...updatedDiplomas[index],
   
  };
  return updatedDiplomas;
};





const handleDiplomaChange = (e, index) => {
  const { name, value } = e.target;
  const updatedDiplomas = updateUserInDiplomas(index);
  updatedDiplomas[index] = {
    ...updatedDiplomas[index],
    [name]: value
  };
  setDiplomas(updatedDiplomas);
};
// Function to add a new diploma object
const addDiploma = () => {
  setDiplomas([...diplomas, {}]);
};





  

  return (
    <ThemeProvider theme={defaultTheme}>
 <div className="sticky-header">
    <Header />
  </div>
    
      
    
    <Container component="main" maxWidth="xm" >
      <CssBaseline />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-end', // Aligning the content to the right
          padding: '50px', // Adding some padding for the border
          border: '4px solid #ccc', // Adding a border around the form
          marginTop: '100px',
         
         
        }}
      >
        
 
  



          
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>

          {showAlert && (
              <Alert variant="filled" severity="error" onClose={handleAlertClose}>
                Please check your input. Some required fields are empty.
              </Alert>
            )}

<Typography variant="h6" gutterBottom>
    Personal Information
  </Typography>
<Divider sx={{ width: '100%', marginY: 2 ,border:0.1}} />
 


            <Grid container spacing={3}>
              <Grid item xs={30} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  value={formData.firstName}
                  onChange={handleChange}
                  error={firstNameError}
                />
              </Grid>
              <Grid item xs={30} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  value={formData.lastName}
                  onChange={handleChange}
                  error={lastNameError}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
    <TextField
      required
      fullWidth
      id="email"
      label="Email Address"
      name="email"
      autoComplete="email"
      value={formData.email}
      onChange={handleChange}
      error={emailError}
    />
  </Grid>
  <Grid item xs={12} sm={6}>
    <TextField
      required
      fullWidth
      name="phoneNumber"
      label="Phone Number"
      id="phoneNumber"
      value={formData.phoneNumber}
      onChange={handleChange}
      error={phoneNumberError}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <Avatar variant="square" sx={{ cursor: 'pointer' }}>
              <Phone />
            </Avatar>
          </InputAdornment>
        ),
      }}
    />
  </Grid>
  <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  name="dateOfBirth"
                  label="Birth Date"
                  type="date"
                  id="dateOfBirth"
                  value={candidateData.dateOfBirth ? candidateData.dateOfBirth.toString().split('T')[0] : ''}
                  onChange={handleChangeCandidate}
                  error={dateOfBirthError}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>  


              <Grid item xs={6} sm={6}>
          <TextField
            required
            fullWidth
            label="Address" // Ajoutez l'étiquette "Address" ici
            name="address" // Ajoutez le nom "address" ici
            value={candidateData.address} // Utilisez la valeur de l'état formData pour "Address"
            onChange={handleChangeCandidate} // Utilisez la même fonction de gestion du changement
          />
        </Grid>            

              <Grid item xs={12} sm={6}>
  <FormControl component="fieldset" fullWidth>
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <label style={{ marginRight: '40px',marginLeft:'10px',marginTop:'10px' }}>Sex</label>

      <RadioGroup
  name="sex"
  onChange={handleChangeCandidate} // Laissez tomber la prop "value"
  style={{ flexDirection: 'row', marginTop: '10px' }}
  value={candidateData.sex}
>
  <FormControlLabel value="girl" control={<Radio />} label="Girl" />
  <FormControlLabel value="boy" control={<Radio />} label="Boy" />
</RadioGroup>


    </div>
  </FormControl>
</Grid>



<Container component="main" maxWidth="xm">
  <CssBaseline />
  <br></br> <br></br>
  <Box
    sx={{
      display: 'flex',
      justifyContent: 'space-between', // Pour espacer l'avatar et le texte
      alignItems: 'center',
      marginBottom: '20px', // Marge en bas pour séparer du reste du contenu
    }}
  >
    <Typography variant="h6">Diploma</Typography>
    <Avatar
      variant="square"
      sx={{
        bgcolor: 'secondary.main',
        cursor: 'pointer',
      }}
      onClick={addDiploma}
    >
      <AddIcon />
    </Avatar>
  </Box>
  {/* Le reste du contenu */}

  <Divider sx={{ width: '100%', marginY: 0, border: 0.1, marginX: 0 }} />
  <br></br>

  {diplomas.map((diploma, index) => (
    <div key={index} style={{ marginTop: '20px' }}>
      <Grid container spacing={3}>
        <Grid item xs={30} sm={6}>
          <TextField
            required
            fullWidth
            label="Diploma Title"
            name="diplomaTitle" // Utilisez un nom cohérent pour tous les diplômes
            select
            value={diploma.diplomaTitle || ''}
            onChange={(e) => handleDiplomaChange(e, index)}
          >
             <MenuItem value="Master">Master</MenuItem>
  <MenuItem value="Engineer">Engineer</MenuItem>
  <MenuItem value="Bachelor">Bachelor</MenuItem>
  <MenuItem value="PhD">PhD</MenuItem>
  <MenuItem value="Associate Degree">Associate Degree</MenuItem>
          </TextField>
        </Grid>
        <Grid item xs={30} sm={6}>
          <TextField
            required
            fullWidth
            label="Institution"
            name="institution" // Utilisez un nom cohérent pour tous les diplômes
            value={diploma.institution || ''}
            onChange={(e) => handleDiplomaChange(e, index)}
          />
        </Grid>
        
        <Grid item xs={12} sm={6}>
          <TextField
            required
            fullWidth
            label="Start Date"
            name="startDateDiploma" // Renommé en "startDateDiploma"
            type="date"
            value={diploma.startDateDiploma || ''}
            onChange={(e) => handleDiplomaChange(e, index)}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            fullWidth
            label="End Date"
            name="endDateDiploma" // Renommé en "endDateDiploma"
            type="date"
            value={diploma.endDateDiploma || ''}
            onChange={(e) => handleDiplomaChange(e, index)}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>

        <Grid item xs={30} sm={6}>
          <TextField
            required
            fullWidth
            label="Moyenne semestre 1 année"
            name="moyenneSemestre1"
            value={diploma.moyenneSemestre1 || ''} // Utilisez un nom cohérent pour tous les diplômes
            
            onChange={(e) => handleDiplomaChange(e, index)}
          />
        </Grid>
        

        <Grid item xs={30} sm={6}>
          <TextField
            required
            fullWidth
            label="Moyenne semestre 2 année"
            name="moyenneSemestre2"
            value={diploma.moyenneSemestre2 || ''}
            onChange={(e) => handleDiplomaChange(e, index)}
          />
        </Grid>
        
        <Grid item xs={30} sm={6}>
          <TextField
            required
            fullWidth
            label="Moyenne semestre 3 année"
            name="moyenneSemestre3" // Utilisez un nom cohérent pour tous les diplômes
            value={diploma.moyenneSemestre3 || ''}
            onChange={(e) => handleDiplomaChange(e, index)}
          />
        </Grid>
        
        <Grid item xs={30} sm={6}>
          <TextField
            required
            fullWidth
            label="Note PFE"
            name="notePFE"
            value={diploma.notePFE || ''} // Utilisez un nom cohérent pour tous les diplômes
            
            onChange={(e) => handleDiplomaChange(e, index)}
          />
        </Grid>
        
      </Grid>
    </div>
  ))}
</Container>


              
              <Container component="main" maxWidth="xm">
  <CssBaseline />
  <br></br> <br></br>
  <Box
    sx={{
      display: 'flex',
      justifyContent: 'space-between', // Pour espacer l'avatar et le texte
      alignItems: 'center',
      marginBottom: '20px', // Marge en bas pour séparer du reste du contenu
    }}
  >
    <Typography variant="h6">Experience</Typography>
    <Avatar
      variant="square"
      sx={{
        bgcolor: 'secondary.main',
        cursor: 'pointer',
      }}
      onClick={addExperience} // Assurez-vous d'appeler la bonne fonction ici
    >
      <AddIcon />
    </Avatar>
  </Box>
  {/* Le reste du contenu */}

  <Divider sx={{ width: '100%', marginY: 0, border: 0.1, marginX: 0 }} />
  <br></br>

  {experiences.map((experience, index) => (
  <div key={index} style={{ marginTop: '20px' }}>
    <Grid container spacing={3}>
      <Grid item xs={30} sm={6}>
        <TextField
          required
          fullWidth
          label="Poste"
          name="poste" // Use a consistent name for all experiences
          value={experience.poste || ''}
          onChange={(e) => handleExperienceChange(e, index)}
        />
      </Grid>
      <Grid item xs={30} sm={6}>
        <TextField
          required
          fullWidth
          label="Company"
          name="company" // Use a consistent name for all experiences
          value={experience.company || ''}
          onChange={(e) => handleExperienceChange(e, index)}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          required
          fullWidth
          label="Start Date"
          name="startDate" // Use a consistent name for all experiences
          type="date"
          value={experience.startDate || ''}
          onChange={(e) => handleExperienceChange(e, index)}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          required
          fullWidth
          label="End Date"
          name="endDate" // Use a consistent name for all experiences
          type="date"
          value={experience.endDate || ''}
          onChange={(e) => handleExperienceChange(e, index)}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </Grid>
    </Grid>
  </div>
))}




</Container>


              <Container component="main" maxWidth="xm">
  <CssBaseline />
  <br></br> <br></br>
  <Box
    sx={{
      display: 'flex',
      justifyContent: 'space-between', // Pour espacer l'avatar et le texte
      alignItems: 'center',
      marginBottom: '20px', // Marge en bas pour séparer du reste du contenu
    }}
  >
    <Typography variant="h6">Language</Typography>
    <Avatar
      variant="square"
      sx={{
        bgcolor: 'secondary.main',
        cursor: 'pointer',
      }}
      onClick={addLanguage}
    >
      <AddIcon />
    </Avatar>
  </Box>
  {/* Le reste du contenu */}




<Divider sx={{ width: '100%', marginY: 0 ,border:0.1,marginX:0}} />
<br></br>


{languages.map((language, index) => (
        <div key={index} style={{ marginTop: '20px' }}>
          <Grid container spacing={3}>
            <Grid item xs={6} sm={6}>
              <TextField
                required
                fullWidth
                label="Language"
                name="language"
                value={language.language || ''}
                onChange={(e) => handleLanguageChange(e, index)}
                select // Utilisez l'attribut select pour transformer le TextField en Select
              >
                {languageOptions.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={6} sm={6}>
              <TextField
                required
                fullWidth
                label="Level"
                name="level"
                value={language.level || ''}
                onChange={(e) => handleLanguageChange(e, index)}
                select // Utilisez l'attribut select pour transformer le TextField en Select
              >
                {levelOptions.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          </Grid>
        </div>
      ))}


</Container>












 
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox
                      color="primary"
                      name="receiveEmails"
                      value={formData.receiveEmails}
                      onChange={handleChange}
                    />
                  }
                  label="I want to receive job updates and notifications via email."
                />
              </Grid>
            </Grid>

            

            
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              Submit Application
            </Button>
            
          </Box>
        </Box>
        <br>
        </br>
<Footer />
      </Container>
    </ThemeProvider>
  );
}
