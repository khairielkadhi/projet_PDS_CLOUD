import React from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Tooltip } from '@mui/material';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';


const Header = () => {


  const handleLogout = () => {
    // Vider le localStorage
    localStorage.clear();

    // Rediriger vers la page de connexion
    window.location.href = '/signin';
  };









  return (
    <AppBar position="static" sx={{ backgroundColor: '#4682B4' }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>

           {/* Add your logo image here */}
          <img src="../mylogos/ssp2.png" alt="Logo" style={{ marginRight: '15px', width: '120px', height: '45px'}} />
        

{/* "Applicate" Button */}



<Button variant="contained" color="secondary" sx={{ borderRadius: '20px', marginRight: '20px', backgroundColor: 'rgba(0, 0, 0, 0)' }} href="/Dashboard">
            <Typography variant="h7">Dashboard</Typography>
          </Button>
          <Button variant="contained" color="secondary" sx={{ borderRadius: '20px', marginRight: '20px', backgroundColor: 'rgba(0, 0, 0, 0)' }} href="/JoboofersForm">
            <Typography variant="h7">Creat Session</Typography>
          </Button>
          <Button variant="contained" color="secondary" sx={{ borderRadius: '20px', marginRight: '20px', backgroundColor: 'rgba(0, 0, 0, 0)' }}href="/ListOfCandidate">
            <Typography variant="h7">Liste Of condidates</Typography>
          </Button>
          <Button variant="contained" color="secondary" sx={{ borderRadius: '20px', marginRight: '20px', backgroundColor: 'rgba(0, 0, 0, 0)' }}href="/ALLJobOffer">
            <Typography variant="h7">Liste Of Session</Typography>
          </Button>

          

          

          
        </div>
        <div>
       
      
          <Tooltip title="Déconnecter">
            <IconButton color="inherit" onClick={handleLogout}>
              <ExitToAppIcon />
            </IconButton>
          </Tooltip>
         
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
