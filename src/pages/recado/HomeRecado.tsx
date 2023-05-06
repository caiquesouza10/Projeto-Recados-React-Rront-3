import React, { useEffect, useState } from 'react';
import {
  Grid,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField
} from '@mui/material';
import { Botao } from '../../components/botao/Botao';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  adicionarRecado,
  adicionarTodosRecados,
  buscarTodosRecados,
  deletarRecado
} from '../../store/modules/recados/recadosSlice';
import { v4 as uuidv4 } from 'uuid';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import Recados from '../../types/RecadosType';
import { atualizarUser, buscarUsuarioPorEmail } from '../../store/modules/users/usersSlice';
import Modal from '../../components/modal/modal';
import './stylesRecados.css';

const HomeRecado: React.FC = () => {
  const [detail, setDetail] = useState('');
  const [description, setDescription] = useState('');
  const [openModal, setOpenModal] = React.useState(false);
  const [recadoEdit, setRecadoEdit] = useState<Recados | undefined>();
  const [valid, setValid] = useState<boolean>(false);

  const userLogged = useAppSelector(state => state.userLogged);
  const userRedux = useAppSelector(state => buscarUsuarioPorEmail(state, userLogged));
  const recadosRedux = useAppSelector(buscarTodosRecados);
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    if (detail.length >= 5 && description.length >= 5) {
      setValid(true);
    } else {
      setValid(false);
    }
  }, [detail, description]);

  useEffect(() => {
    if (userRedux?.recados) {
      dispatch(adicionarTodosRecados(userRedux.recados));
    }
  }, []);

  useEffect(() => {
    dispatch(atualizarUser({ id: userLogged, changes: { recados: recadosRedux } }));
  }, [recadosRedux]);

  useEffect(() => {
    if (!userLogged) {
      navigate('/');
    }
  }, [userLogged]);

  const handleSave = () => {
    console.log('clicou em salvar');

    Swal.fire({
      title: 'Sucesso!',
      text: 'Recado cadastrado com sucesso.',
      icon: 'success',
      confirmButtonText: 'Confirmar',
      timer: 2000
    });

    dispatch(
      adicionarRecado({
        id: uuidv4(),
        description,
        detail
      })
    );

    clearInput();
  };

  const handleDelete = (itemDelete: Recados) => {
    Swal.fire({
      title: 'Tem certeza que deseja excluir?',
      text: 'Você não poderá reverter isso!',
      icon: 'error',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#0dab61',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Sim, quero deletar!'
    }).then(result => {
      if (result.isConfirmed) {
        dispatch(deletarRecado(itemDelete.id));
        // chamar outro dispatch para remover o intem e salvar
        Swal.fire('Deletado!', 'Sua transação foi excluida.', 'success');
      }
    });
  };

  const handleClickOpen = (itemEdit: Recados) => {
    setRecadoEdit(itemEdit);
    setOpenModal(true);
  };

  const handleClose = () => {
    setOpenModal(false);
  };

  const clearInput = () => {
    setDetail('');
    setDescription('');
  };
  return (
    <>
      <Grid container spacing={7}>
        
        <Grid item xs={12} sm={5} width="30vw">
          <TextField
            label="Descrição"
            name="Descrição"
            type="text"
            value={description}
            onChange={e => setDescription(e.target.value)}
            fullWidth
            variant="filled"
            color="success"
            required
            sx={{ backgroundColor: '#ffffff', borderRadius: '10px' }}
          />
        </Grid>

        <Grid item xs={12} sm={5} width="30vw">
          <TextField
            label="Detalhamento"
            name="Detalhamento"
            type="text"
            value={detail}
            onChange={e => setDetail(e.target.value)}
            fullWidth
            required
            variant="filled"
            color="success"
            sx={{ backgroundColor: '#ffffff', borderRadius: '10px' }}
          />
        </Grid>

        <Grid item xs={12} sm={2}>
          <Botao tipoBotao="button" onClick={handleSave} disable={!valid}>
            Cadastrar
          </Botao>
        </Grid>
        <img src="./andrew.png" className="andrew" style={{position:'absolute'}}/>
      </Grid>

      <Grid container>
        <TableContainer sx={{ marginTop: '1%', width: '90vw' }} component={Paper} elevation={5}>
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: '#032a186b' }}>
                <TableCell sx={{ color: 'white', fontSize: 15, fontWeight: 900, border: '1px solid #fff' }}>
                  {' '}
                  # ID
                </TableCell>
                <TableCell
                  align="center"
                  sx={{ color: 'white', fontSize: 15, fontWeight: 900, border: '1px solid #fff' }}
                >
                  DESCIÇÃO
                </TableCell>
                <TableCell
                  align="center"
                  sx={{ color: 'white', fontSize: 15, fontWeight: 900, border: '1px solid #fff' }}
                >
                  DETALHAMENTO
                </TableCell>
                <TableCell
                  align="center"
                  sx={{ color: 'white', fontSize: 15, fontWeight: 900, border: '1px solid #fff' }}
                >
                  AÇÕES
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody style={{ backgroundColor: '#43385e' }}>
              {recadosRedux.map((recado, index) => (
                <TableRow sx={{ border: '1px solid #fff' }} key={recado.id}>
                  <TableCell align="center" sx={{ color: 'white', border: '1px solid #fff' }}>
                    {index + 1}
                  </TableCell>
                  <TableCell align="center" sx={{ color: 'white', border: '1px solid #fff' }}>
                    {recado.description}
                  </TableCell>
                  <TableCell align="center" sx={{ color: 'white', border: '1px solid #fff' }}>
                    {recado.detail}
                  </TableCell>
                  <TableCell align="center" sx={{ color: 'white', border: '1px solid #fff' }}>
                    <IconButton edge="end" aria-label="edit" onClick={() => handleClickOpen(recado)}>
                      <EditIcon sx={{ color: '#ffffff' }} />
                    </IconButton>
                    <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(recado)}>
                      <DeleteIcon sx={{ color: '#ffffff' }} />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>

      <Modal
        openDialog={openModal}
        detail={recadoEdit?.detail ?? ''}
        description={recadoEdit?.description ?? ''}
        id={recadoEdit?.id}
        actionCancel={handleClose}
      />
    </>
  );
};

export default HomeRecado;
