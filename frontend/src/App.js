/*import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import GlobalStyle from "./styles/global";
import Form from "./pages/Form";
import Grid from "./pages/Home";
import RouteApp from "./routes";
import { AuthProvider } from "./contexts/auth";

const Container = styled.div`
  width: 100%;
  max-width: 890px;
  margin: 20px auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const GridContainer = styled.div`
  width: 120%;
  max-width: 2000px;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  justify-content: flex-start;
`;

const Title = styled.h2``;

function App() {
  const [users, setUsers] = useState([]);
  const [onEdit, setOnEdit] = useState(null);

  const getUsers = async () => {
    try {
      const res = await axios.get("http://localhost:8800");
      setUsers(res.data.sort((a, b) => (a.nome > b.nome ? 1 : -1)));
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    getUsers();
  }, [setUsers]);

  return (
    <>
      <AuthProvider>
        <Container>
          <Title>Usuarios</Title>
          <Form onEdit={onEdit} setOnEdit={setOnEdit} getUsers={getUsers} />
        </Container>
        <GridContainer>
          <Grid users={users} setUsers={setUsers} setOnEdit={setOnEdit} />
        </GridContainer>

        <ToastContainer autoClose={3000} position="bottom-left" />

        <RouteApp />
        <GlobalStyle />
      </AuthProvider>
    </>
  );
}

export default App;*/

import React from "react";
import RoutesApp from "./routes";
import { AuthProvider } from "./contexts/auth";
import GlobalStyle from "./styles/global";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => (
  <AuthProvider>
    <RoutesApp />
    <ToastContainer />
    <GlobalStyle />
  </AuthProvider>
);

export default App;
