import React, { useState, useEffect } from "react";
import * as C from "./styles";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const RecoverPassword = ({ getUsers, setOnEdit }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { onEdit } = location.state || {};
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");
  const [cpf, setCPF] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");

  useEffect(() => {
    if (onEdit) {
      setSenha(onEdit.senha);
    }
  }, [onEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!cpf || !senha || !confirmarSenha) {
      setError("Preencha todos os campos");
      return;
    }

    if (senha !== confirmarSenha) {
      setError("As senhas não correspondem");
      return;
    }

    if (onEdit && senha === onEdit.senha) {
      setError("A nova senha é igual à senha atual");
      return;
    }

    try {
      const response = await axios.put(
        `http://localhost:8800/updatePassword/${cpf}`,
        {
          senha: senha,
        }
      );
      if (response.status === 200) {
        toast.success(response.data);
        getUsers();
        navigate("/signin");
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        toast.error(error.response.data.error);
      } else if (error.response && error.response.status === 404) {
        // CPF não encontrado no banco de dados
        toast.error("CPF não encontrado no banco de dados");
      } else {
        console.error("Erro na atualização:", error);
        toast.error("Erro ao atualizar a senha.");
      }
    }
    setOnEdit(null);
  };

  const formatCPF = (value) => {
    let onlyNumbers = value.replace(/[^\d]/g, "");
    onlyNumbers = onlyNumbers.replace(
      /(\d{3})(\d{3})(\d{3})(\d{2})/,
      "$1.$2.$3-$4"
    );
    return onlyNumbers;
  };

  return (
    <C.Container>
      <C.Label>Redefinir senha</C.Label>
      <C.Content>
        <C.Input
          type="text"
          placeholder="Digite seu CPF"
          value={cpf}
          onChange={(e) => {
            const formattedCPF = formatCPF(e.target.value);
            setCPF(formattedCPF);
          }}
        />
        <C.Input
          type="password"
          placeholder="Digite sua nova senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />
        <C.Input
          type="password"
          placeholder="Confirme sua nova senha"
          value={confirmarSenha}
          onChange={(e) => setConfirmarSenha(e.target.value)}
        />
        <C.LabelError>{error}</C.LabelError>{" "}
        <C.Button
          type="submit"
          onClick={(e) => {
            handleSubmit(e);
            /* handleSignin();*/
          }}
        >
          Redefinir
        </C.Button>
      </C.Content>
    </C.Container>
  );
};

const PasswordRecoveryPage = () => {
  const [onEdit, setOnEdit] = useState(null);
  const { setUsers } = useState(null);

  const getUsers = async () => {
    try {
      const res = await axios.get("http://localhost:8800");
      setUsers(res.data.sort((a, b) => (a.nome > b.nome ? 1 : -1)));
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <div>
      <RecoverPassword
        onEdit={onEdit}
        setOnEdit={setOnEdit}
        getUsers={getUsers}
      />
    </div>
  );
};

export default PasswordRecoveryPage;
