import { Button } from '@mui/material';
import React from 'react';

type buttonType = 'submit' | 'button' | 'reset';

interface IButtonProps {
  tipoBotao: buttonType;
  children: string;
  onClick?: () => void;
  disable?: boolean
}

export const Botao: React.FC<IButtonProps> = ({ tipoBotao, children, onClick, disable }) => {
  return (
    <>
      <Button
        sx={{
          mt: 1,
          mb: 2,
          padding:'10px',
          color: '#ffffff',
          backgroundColor: '#0dab61',
          fontWeight: '800',
          letterSpacing: '3px',
          textTransform: 'uppercase'
        }}
        type={tipoBotao}
        onClick={onClick}
        variant="contained"
        color="success"
        fullWidth
        disabled={disable}
      >
        {children}
      </Button>
    </>
  );
};
