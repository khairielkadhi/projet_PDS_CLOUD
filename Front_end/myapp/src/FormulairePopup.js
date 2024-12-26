import React from 'react';
import SignUp from './Formulaire';
import Profile from './profile';

import { Dialog, DialogTitle, DialogContent, Typography } from '@mui/material';

const FormulairePopup = ({ open, onClose }) => {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm" style={{ marginTop: '50px' }}>
      <DialogTitle sx={{ background: 'linear-gradient(45deg, #FF1744 30%, #E040FB 90%)', color: 'white', textAlign: 'center' }}>
        <Typography variant="h5">
          Apply for this job application
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Profile />
      </DialogContent>
    </Dialog>
  );
};

export default FormulairePopup;
