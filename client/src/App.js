import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Room from './components/Room/Room'
import styled from 'styled-components';
import Login from './components/Main/Login';
import Register from './components/Main/Register';
import Dashboard from './components/Main/dashboard';
import Logout from './components/Main/Logout';
import InputName from './components/Main/NameInput';

function App() {
  const loggedin_user_data = JSON.parse(sessionStorage.getItem("UserData"));
  const user = sessionStorage.getItem("user");
  const isLoggedIn = loggedin_user_data ? loggedin_user_data.loggedIn : null
  return (
    <BrowserRouter>
      <AppContainer>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={isLoggedIn ? <Dashboard /> : <Navigate replace to="/" />} />
          <Route path="/Logout" element={isLoggedIn ? <Logout /> : <Navigate replace to="/" />} />
          <Route path="/room/:roomId" element={user ? <Room /> : <InputName />} />
        </Routes>
      </AppContainer>
    </BrowserRouter>
  );
}

const AppContainer = styled.div`


`;

export default App;
