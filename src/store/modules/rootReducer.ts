import { combineReducers } from '@reduxjs/toolkit';

import userLogged from './users/userLogged';
import recados from './recados/recadosSlice';
import users from './users/usersSlice';

export default combineReducers({

  userLogged,
  recados,
  users
});
