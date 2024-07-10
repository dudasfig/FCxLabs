import React, { useRef } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import * as C from "./styles";

const Signup = ({ getUsers }) => {
  const ref = useRef();

  const navigate = useNavigate();

  const formatCPF = (value) => {
    let onlyNumbers = value.replace(/[^\d]/g, "");
    onlyNumbers = onlyNumbers.replace(
      /(\d{3})(\d{3})(\d{3})(\d{2})/,
      "$1.$2.$3-$4"
    );
    return onlyNumbers;
  };

  const formatPhoneNumber = (value) => {
    let onlyNumbers = value.replace(/[^\d]/g, "");
    onlyNumbers = onlyNumbers.replace(/(\d{2})(\d{5})(\d{4})/, "($1)$2-$3");
    return onlyNumbers;
  };

  const formatPhone = (value) => {
    let onlyNumbers = value.replace(/[^\d]/g, "");
    onlyNumbers = onlyNumbers.replace(/(\d{2})(\d{4})(\d{4})/, "($1)$2-$3");
    return onlyNumbers;
  };

  const capitalizeFirstLetter = (str) => {
    return str
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = ref.current;

    const userData = {
      nome: capitalizeFirstLetter(user.nome.value),
      login: user.login.value,
      senha: user.senha.value,
      email: user.email.value,
      tel_celular: user.tel_celular.value,
      tel_residencial: user.tel_residencial.value,
      dt_nascimento: user.dt_nascimento.value,
      cpf: user.cpf.value,
      nome_mae: capitalizeFirstLetter(user.nome_mae.value),
      status: user.status.value,
    };

    try {
      const response = await axios.post("http://localhost:8800", userData);

      if (response.status === 200) {
        toast.success(response.data);
        getUsers();
        navigate("/"); // Navega para a página de entrada
      }
      user.reset();
    } catch (error) {
      if (error.response && error.response.status === 400) {
        toast.error(error.response.data.error);
      } else {
        console.error("Erro na inserção:", error);
        toast.error("Ocorreu um erro ao cadastrar o usuário.");
      }
    }
  };

  return (
    <C.SignupContainer ref={ref} onSubmit={handleSubmit}>
      <C.InputArea>
        <C.Label>Nome</C.Label>
        <C.Input name="nome" />
      </C.InputArea>
      <C.InputArea>
        <C.Label>Email</C.Label>
        <C.Input name="email" type="email" />
      </C.InputArea>
      <C.InputArea>
        <C.Label>Telefone Celular</C.Label>
        <C.Input
          name="tel_celular"
          onChange={(e) => {
            const value = formatPhoneNumber(e.target.value);
            if (value.length < 14) {
              toast.error(
                "Por favor, insira um número de celular válido com (XX)9XXXX-XXXX."
              );
            }
            e.target.value = value;
          }}
        />
      </C.InputArea>
      <C.InputArea>
        <C.Label>Telefone Residencial</C.Label>
        <C.Input
          name="tel_residencial"
          onChange={(e) => {
            e.target.value = formatPhone(e.target.value);
          }}
        />
      </C.InputArea>
      <C.InputArea>
        <C.Label>Data de Nascimento</C.Label>
        <C.Input name="dt_nascimento" type="date" />
      </C.InputArea>
      <C.InputArea>
        <C.Label>CPF</C.Label>
        <C.Input
          name="cpf"
          onChange={(e) => {
            e.target.value = formatCPF(e.target.value);
          }}
        />
      </C.InputArea>
      <C.InputArea>
        <C.Label>Nome da Mãe</C.Label>
        <C.Input name="nome_mae" />
      </C.InputArea>
      <C.InputArea>
        <C.Label>Status</C.Label>
        <C.Select name="status">
          <option value="ativo">Ativo</option>
          <option value="inativo">Inativo</option>
        </C.Select>
      </C.InputArea>
      <C.InputArea>
        <C.Label>Login</C.Label>
        <C.Input name="login" />
      </C.InputArea>
      <C.InputArea>
        <C.Label>Senha</C.Label>
        <C.Input name="senha" />
      </C.InputArea>
      <C.ButtonWrapper>
        <C.Button
          type="submit"
          onClick={(e) => {
            handleSubmit(e);
          }}
        >
          Cadastrar
        </C.Button>
      </C.ButtonWrapper>

      <C.LabelSignin>
        Já tem uma conta?
        <C.Strong>
          <Link to="/">&nbsp;Entre</Link>
        </C.Strong>
      </C.LabelSignin>
    </C.SignupContainer>
  );
};

export default Signup;
