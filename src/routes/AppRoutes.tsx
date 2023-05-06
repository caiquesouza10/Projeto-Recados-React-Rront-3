import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import DefaultLayout from '../config/layout/DefaultLayout';
import WelcomeLayout from '../config/layout/WelcomeLayout';
import TesteLogin from '../pages/login/Login';
import TesteCadastro from '../pages/cadastro/Cadastro';
import TesteHome from '../pages/recado/HomeRecado';

const AppRoutes: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TesteLogin />} />
        <Route path="/Cadastro" element={<TesteCadastro />} />
        <Route path="/Homerecado" element={<DefaultLayout component={TesteHome} />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
