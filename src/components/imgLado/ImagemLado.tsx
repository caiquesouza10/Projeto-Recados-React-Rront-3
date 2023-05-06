import { Grid } from '@mui/material';
import React from 'react';

const Imagemlado: React.FC = () => {
  return (
    <Grid item xs={12} sm={6} >
      <img
        src="animate.svg"
        alt="Animação"
        style={{
          width: '30vw',
          marginTop: 15,
        }}
      />
    </Grid>
  );
};

export default Imagemlado;
