import React, { useState } from "react";
import * as C from "./styles";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import axios from "axios";

const SignIn = () => {
  const { signin } = useAuth();
  const navigate = useNavigate();

  const [login, setlogin] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    if (!login || !senha) {
      setError("Preencha todos os campos");
      return;
    }

    try {
      const res = await axios.post("http://localhost:8800/signin", {
        login,
        senha,
      });

      if (res && res.data.error) {
        setError(res.data.error);
        return;
      }

      if (res && res.data.user) {
        signin(res.data.user);
        navigate("/home");
      }
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      setError("E-mail ou senha incorretos");
    }
  };

  const handlePasswordReset = () => {
    navigate("/password");
  };

  return (
    <C.Container>
      <C.Label>Login</C.Label>
      <C.Content>
        <C.Input
          type="login"
          placeholder="Digite seu E-mail"
          value={login}
          onChange={(e) => setlogin(e.target.value)}
        />
        <C.Input
          type="password"
          placeholder="Digite sua Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />
        <C.LabelError>{error}</C.LabelError>{" "}
        {error && (
          <C.LabelRoutes>
            Senha incorreta.{" "}
            <C.Strong>
              <Link to="/password" onClick={handlePasswordReset}>
                Redefinir senha
              </Link>
            </C.Strong>
          </C.LabelRoutes>
        )}
        <C.Button onClick={handleLogin}>Entrar</C.Button>
        <C.LabelRoutes>
          Não tem uma conta?
          <C.Strong>
            <Link to="/signup">&nbsp;Registre-se</Link>
          </C.Strong>
        </C.LabelRoutes>
      </C.Content>
    </C.Container>
  );
};

export default SignIn;
