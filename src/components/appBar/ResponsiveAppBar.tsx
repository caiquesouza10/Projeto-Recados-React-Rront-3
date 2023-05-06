import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate } from 'react-router-dom';
import routes from '../../routes/routes';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { clearUserLogged } from '../../store/modules/users/userLogged';

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const userLogged = useAppSelector(state => state.userLogged);
  // const recadosRedux = useAppSelector(buscarTodosRecados);
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const updatedUser = (url: string) => {
    console.log('Clicou no link esta no meu ResponsiveAppBar', url);
    // dispatch(atualizarUser({ id: userLogged, changes: { recados: recadosRedux } }));

    dispatch(clearUserLogged());
    // dispatch(deletarTodos());
    navigate(url);
  };

  return (
    <AppBar position="static" style={{ backgroundColor: '#685792' }}>
      
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            className="titulo"
            sx={{
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'cursive',
              color: '#ffffff'
            }}
          >
            Olá! Seja bem vindo novamente :{' '}
            <i style={{ marginLeft: '20px', fontFamily: 'sans-serif', fontWeight: '900' }}> {userLogged} </i>
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left'
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left'
              }}
              open={Boolean(anchorElNav)}
              onClose={updatedUser}
              sx={{
                display: { xs: 'block', md: 'none' }
              }}
            >
              {routes.map(page => (
                <MenuItem key={page.url} onClick={() => updatedUser(page.url)}>
                  <Typography textAlign="center">{page.label}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Typography
            variant="h6"
            noWrap
            component="a"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 900,
              color: 'inherit'
            }}
          >
            Bem vindo a pagina de recados
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: { md: 'flex-end' } }}>
            {routes.map(page => (
              <Button
                key={page.url}
                onClick={() => updatedUser(page.url)}
                variant="contained"
                color="success"
                sx={{ my: 2, color: '#ffffff', display: 'block', fontWeight: '800', background: '#0dab61' }}
              >
                {page.label}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default ResponsiveAppBar;
