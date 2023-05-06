import React, { useEffect, useState } from 'react';
import { Grid, Link, Paper, TextField, Typography } from '@mui/material';
import { Botao } from '../../components/botao/Botao';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { buscarTodosUsuarios } from '../../store/modules/users/usersSlice';
import { createUserLogged } from '../../store/modules/users/userLogged';
import Imagemlado from '../../components/imgLado/ImagemLado';
import './stylesLogin.css';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://www.growdev.com.br/" target="_blank">
        Growdev
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timerProgressBar: true,
  didOpen: toast => {
    toast.addEventListener('mouseenter', Swal.stopTimer);
    toast.addEventListener('mouseleave', Swal.resumeTimer);
  }
});

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [valid, setValid] = useState<boolean>(false);
  const usersRedux = useAppSelector(buscarTodosUsuarios);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (email.length >= 5 && password.length >= 5) {
      setValid(true);
    } else {
      setValid(false);
    }
  }, [email, password]);

  const handleClick = () => {
    console.log('teste');

    if (!verifyInputs()) {
      return;
    }

    dispatch(createUserLogged(email));
    clearInput();
    setTimeout(() => {
      navigate('/HomeRecado');
    }, 1000);
  };

  const clearInput = () => {
    setEmail('');
    setPassword('');
  };

  const verifyInputs = (): boolean => {
    if (!email || !password) {
      Swal.fire({
        title: 'Existem campos vazios, favor preencher',
        icon: 'warning',
        confirmButtonText: 'Confirmar',
        timer: 3000
      });
      return false;
    }

    // addOne = email já existir substitui, se não existir adiciona
    const userFound = usersRedux.find(user => user.email === email && user.password === password);

    if (!userFound) {
      Swal.fire({
        title: 'Usuario não encontrado! Verifique!!!',
        icon: 'warning',
        confirmButtonText: 'Confirmar',
        timer: 3000
      });
      return false;
    }

    Toast.fire({
      icon: 'success',
      title: 'Logado com sucesso',
      timer: 2000
    });
    return true;
  };

  return (
    <>
      <Grid container sx={{ width: '100vw', height: '100vh' }}>
        <Grid item xs={12} sm={6} sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
          <Typography
            component="h1"
            variant="h5"
            className="titulo"
            sx={{
              mt: 5,
              fontSize: '3vw',
              fontFamily: 'Monoton',
              fontWeight: '800',
              textAlign: 'center',
              color: '#00ff88',
              letterSpacing: '3px',
              textTransform: 'uppercase'
            }}
          >
            Recados
          </Typography>

          <Imagemlado />
        </Grid>

        <Grid
          item
          xs={12}
          sm={6}
          sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}
        >
          <Paper
            elevation={5}
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column',
              backgroundColor: '#2f2841',
              borderRadius: '20px',
              boxShadow: '0px 10px 40px #00000056'
            }}
          >
            <Grid item xs={12} width="30vw">
              <Typography
                component="h1"
                variant="h5"
                className="titulo"
                sx={{
                  mt: 4,
                  fontSize: '2vw',
                  fontFamily: 'Monoton',
                  fontWeight: '800',
                  textAlign: 'center',
                  color: '#00ff88',
                  letterSpacing: '3px',
                  textTransform: 'uppercase'
                }}
              >
                Login
              </Typography>
            </Grid>

            <Grid item xs={12} width="25vw">
              <TextField
                label="E-mail"
                name="email"
                type="email"
                variant="filled"
                value={email}
                onChange={e => setEmail(e.target.value)}
                fullWidth
                required
                sx={{ mt: 4, backgroundColor: '#514869', borderRadius: '10px' }}
              />
            </Grid>

            <Grid item xs={12} width="25vw">
              <TextField
                label="Senha"
                name="password"
                type="password"
                variant="filled"
                value={password}
                onChange={e => setPassword(e.target.value)}
                fullWidth
                required
                sx={{ mt: 5, backgroundColor: '#514869', borderRadius: '10px' }}
              />
            </Grid>

            <Grid item xs={12} width="25vw" sx={{ mt: 2 }}>
              <Botao tipoBotao="button" onClick={handleClick} disable={!valid}>
                Logar
              </Botao>
            </Grid>

            <Grid container>
              <Grid item xs={12} width="30vw" sx={{ textAlign: 'center', mb: '20px', cursor: 'pointer' }}>
                <Link variant="body2" onClick={() => navigate('/Cadastro')}>
                  Não tem uma conta? Inscrever-se
                </Link>
              </Grid>
            </Grid>

            <Copyright sx={{ mt: 1, mb: 1, textAlign: 'center', color: '#c0b7eb' }} />
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};

export default Login;
