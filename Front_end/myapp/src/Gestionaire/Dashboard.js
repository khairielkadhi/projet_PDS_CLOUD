import React from 'react';
import { Container, Grid, Paper, Typography, CircularProgress, Box } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { BarChart, XAxis, YAxis, Tooltip, Legend, Bar, ResponsiveContainer, CartesianGrid, Title } from 'recharts';

import Header from './header';

const defaultTheme = createTheme();

function Dashboard() {
  // Supposons que vous ayez les données du nombre de candidats acceptés par sexe
  const maleAccepted = 20;
  const femaleAccepted = 10;

  function generateChartData() {
    const data = [
      { experience: 'Inférieur à 1 an', count: 15 },
      { experience: 'Entre 1 et 2 ans', count: 25 },
      { experience: 'Entre 2 et 3 ans', count: 20 },
      { experience: 'Supérieur à 3 ans', count: 40 },
    ];
  
    return data;
  }

  return (
    <ThemeProvider theme={defaultTheme}>
      <div className="header">
        <Header />
      </div>
      <Container sx={{ marginTop: '100px' }}>
        

        {/* Première ligne avec les champs */}
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={4}>
            <Paper elevation={3} sx={{ '&:hover': { backgroundColor: '#7c8fe6' }, borderRadius: '30px' }}>
              <Typography variant="h6" component="div" align="center">
                Nombre de candidats
              </Typography>
              <Typography variant="h4" component="div" align="center">
                100
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Paper elevation={3} sx={{ '&:hover': { backgroundColor: '#7c8fe6' }, borderRadius: '30px' }}>
              <Typography variant="h6" component="div" align="center">
                Candidatures en cours
              </Typography>
              <Typography variant="h4" component="div" align="center">
                50
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Paper elevation={3} sx={{ '&:hover': { backgroundColor: '#7c8fe6' }, borderRadius: '30px' }}>
              <Typography variant="h6" component="div" align="center">
                Candidatures validées
              </Typography>
              <Typography variant="h4" component="div" align="center">
                30
              </Typography>
            </Paper>
          </Grid>
        </Grid>

        {/* Deuxième ligne avec le graphique à droite */}
        
        <Grid container>
  <Grid item xs={12} sm={8} sx={{ marginTop: '100px', marginLeft: '100px' }}>
    <div style={{ textAlign: 'center', marginBottom: '20px' }}>
      <Typography variant="h5" gutterBottom>
        Nombre de Candidats par Expérience
      </Typography>
    </div>
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={generateChartData()}>
        <XAxis dataKey="experience" />
        <YAxis label={{ value: 'Nombre de candidats', angle: -90, position: 'insideLeft' }} />
        <Tooltip />
        <Legend />
        <Bar dataKey="count" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  </Grid>
</Grid>


      </Container>
    </ThemeProvider>
  );
}

export default Dashboard;
