import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Tooltip } from '@mui/material';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import logosopra from './images/SOPRASTERIA.png'; // Importez l'image du logo ici
import backgroundImg from './images/jointeam.jpeg'; // Importez l'image de fond ici
import Profile from './profile'
const Header = () => {
  const handleLogout = () => {
    // Vider le localStorage
    localStorage.clear();

    // Rediriger vers la page de connexion
    window.location.href = '/signin';
  };

  const [isHeaderSticky, setIsHeaderSticky] = useState(false);

  // Hauteur fixe pour la Toolbar (plus grande)
  const toolbarHeight = '600px'; // Augmentez cette valeur pour agrandir davantage

  // Style de la Toolbar avec l'image de fond et un fond sombre semi-transparent
  const toolbarStyle = {
    backgroundColor: 'black', // Couleur de fond sombre semi-transparente
    boxShadow: 'none',
    height: toolbarHeight, // Hauteur fixe
    backgroundImage: `url(${backgroundImg})`, // Image de fond
    backgroundSize: 'cover', // Ajustement de l'image de fond pour couvrir la Toolbar
    backgroundPosition: 'center', // Position de l'image de fond
    color: 'white', // Couleur du texte à l'intérieur de la Toolbar
    position: isHeaderSticky ? 'sticky' : 'static', // Fixer ou non le Header
    top: 0, // Assurez-vous que le Header est ancré en haut de la page
    zIndex: 1000, // Assurez-vous que le Header est au-dessus du contenu
  };

  const handleScroll = () => {
    // Vérifiez la position verticale de défilement
    const scrollY = window.scrollY;
    // Définissez isHeaderSticky en fonction de la position de défilement
    setIsHeaderSticky(scrollY > 0);
  };

  // Écoutez les événements de défilement pour activer/désactiver le Header collant
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div>
    <AppBar position="sticky" sx={toolbarStyle}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', padding: '0' }}>
        <div style={{ display: 'flex', alignItems: 'center', }}>
          <img src={logosopra} alt="Logo" style={{ marginRight: '15px', height: 'auto', width: '200px', maxHeight: '100%', maxWidth: '100%' }} />
          <Button variant="contained" sx={{ borderRadius: '20px', marginRight: '20px', backgroundColor: 'rgba(0, 0, 0, 0.6)' }} href="/joboffer">
            <Typography variant="h7">Job offer</Typography>
          </Button>
          <Button variant="contained" sx={{ borderRadius: '20px', marginRight: '20px', backgroundColor: 'rgba(0, 0, 0, 0.6)' }} href="/#">
            <Typography variant="h7">My applications</Typography>
          </Button>
          <Button variant="contained" sx={{ borderRadius: '20px', marginRight: '20px', backgroundColor: 'rgba(0, 0, 0, 0.6)' }} href="/AboutUs">
            <Typography variant="h7">About US</Typography>
          </Button>
          <Button variant="contained" sx={{ borderRadius: '20px', marginRight: '20px', backgroundColor: 'rgba(0, 0, 0, 0.6)' }} href="/EditApplication">
            <Typography variant="h7">My profile</Typography>
          </Button>
          <Tooltip title="Déconnecter" style={{ marginLeft: "350px" }}>
            <IconButton color="inherit" onClick={handleLogout}>
              <ExitToAppIcon />
            </IconButton>
          </Tooltip>
        </div>
      </Toolbar>
      <div style={{ marginTop: "110px", marginLeft: "100px", fontWeight: 'bold', fontSize: '20px' }}>A PROPOS DE NOUS</div>
      <div style={{ marginTop: "10px", marginLeft: "150px", fontWeight: 'bold', fontSize: '35px' }}>Un partenaire unique pour les Ressources Humaines</div>
   
   
     
      <div
  className='d-none d-lg-block gradient-linear offset-lg-1 col-lg-10 gradient-custom-2'
  style={{
    
    borderBottom: '0px solid #000',
    marginTop: '320px',
    color: '#fff',
    minHeight: '30px' // Hauteur minimale, ajustez cette valeur selon vos besoins
  }}
>
  {/* Aucun contenu ici */}
</div>
      </AppBar>
    </div>
   
  );
};

export default Header;
