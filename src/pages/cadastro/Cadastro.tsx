import React, { useEffect, useState } from 'react';
import { Grid, Link, Paper, TextField, Typography } from '@mui/material';
import { Botao } from '../../components/botao/Botao';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { adicionarUser, buscarTodosUsuarios } from '../../store/modules/users/usersSlice';
import Swal from 'sweetalert2';
import Imagemlado from '../../components/imgLado/ImagemLado';
import './stylesCadastro.css';

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

// eslint-disable-next-line no-useless-escape
const regexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

const Cadastro: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repassword, setRepassword] = useState('');
  const [valid, setValid] = useState<boolean>(false);
  const usersRedux = useAppSelector(buscarTodosUsuarios);
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    if (email.length >= 5 && password.length >= 5 && repassword.length >= 5) {
      setValid(true);
    } else {
      setValid(false);
    }
  }, [email, password, repassword]);

  const handleSave = () => {
    console.log('clicou em salvar');

    if (!verifyInputs()) {
      return;
    }

    // addOne = email já existir substitui, se não existir adiciona
    const userFound = usersRedux.find(user => user.email === email);

    if (userFound) {
      Swal.fire({
        title: 'Já existe esse usuário!!',
        icon: 'warning',
        confirmButtonText: 'Confirmar',
        timer: 2000
      });
      return;
    }

    dispatch(
      adicionarUser({
        email,
        password,
        recados: []
      })
    );

    clearInput();
    Swal.fire({
      title: 'Sucesso!',
      text: 'Usuario cadastro com sucesso',
      icon: 'success',
      confirmButtonText: 'Confirmar',
      timer: 2000
    });
    setTimeout(() => {
      navigate('/');
    }, 3000);
  };

  const clearInput = () => {
    setEmail('');
    setPassword('');
    setRepassword('');
  };

  const verifyInputs = (): boolean => {
    if (!email || !password || !repassword) {
      Swal.fire({
        title: 'Existem campos vazios, favor preencher',
        icon: 'warning',
        confirmButtonText: 'Confirmar',
        timer: 3000
      });
      return false;
    }

    if (!email || !email.match(regexEmail)) {
      Swal.fire({
        title: 'E-mail preenchido incorretamente!!',
        icon: 'warning',
        confirmButtonText: 'Confirmar',
        timer: 3000
      });
      return false;
    }

    if (password !== repassword) {
      Swal.fire({
        title: 'Por favor preencha as senhas corretamente!!',
        icon: 'warning',
        confirmButtonText: 'Confirmar',
        timer: 3000
      });
      return false;
    }

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
                Cadastro
              </Typography>
            </Grid>

            <Grid item xs={12} width="25vw">
              <TextField
                label="E-mail"
                name="email"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                fullWidth
                variant="filled"
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

            <Grid item xs={12} width="25vw">
              <TextField
                label="Repita a Senha"
                name="repetir o password"
                type="password"
                variant="filled"
                value={repassword}
                onChange={e => setRepassword(e.target.value)}
                fullWidth
                required
                sx={{ mt: 5, mb: '5', backgroundColor: '#514869', borderRadius: '10px' }}
              />
            </Grid>

            <Grid item xs={12} width="25vw" sx={{ mt: 2 }}>
              <Botao tipoBotao="button" onClick={handleSave} disable={!valid}>
                Criar Conta
              </Botao>
            </Grid>

            <Grid container>
              <Grid item xs={12} width="30vw" sx={{ textAlign: 'center', mb: '20px', cursor: 'pointer' }}>
                <Link variant="body2" onClick={() => navigate('/')}>
                  Ja tem uma conta ? Voltar para pagina de Login
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

export default Cadastro;
