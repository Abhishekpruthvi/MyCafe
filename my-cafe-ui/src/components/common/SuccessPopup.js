import React from 'react';
import { Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';

const SuccessPopup = ({ open, message, handleClose , autoHideDuration=30000 }) => {
  return (
    <Snackbar 
    open={open} 
    autoHideDuration={autoHideDuration} 
    onClose={handleClose} 
    anchorOrigin={{ vertical: 'center', horizontal: 'center' }}
    style={{ display:"flex", justifyContent: 'center', alignItems: 'center', height: '100vh' }}
    >
      <MuiAlert onClose={handleClose} severity="success" elevation={6} variant="filled" style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '10vh'}}>
        {message}
      </MuiAlert>
    </Snackbar>
  );
};

export default SuccessPopup;
