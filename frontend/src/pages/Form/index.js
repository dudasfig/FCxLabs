import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import * as C from "./styles";

const Edit = ({ getUsers, setOnEdit }) => {
  const ref = useRef();
  const navigate = useNavigate();
  const location = useLocation();
  const { onEdit } = location.state || {};

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

  const cpfExists = (cpf, userList) => {
    return userList.some((user) => user.cpf === cpf);
  };

  useEffect(() => {
    if (onEdit) {
      const user = ref.current;

      user.nome.value = onEdit.nome;
      user.email.value = onEdit.email;
      user.tel_celular.value = onEdit.tel_celular;
      user.tel_residencial.value = onEdit.tel_residencial;
      user.dt_nascimento.value = onEdit.dt_nascimento;
      user.cpf.value = onEdit.cpf;
      user.nome_mae.value = onEdit.nome_mae;
      user.status.value = onEdit.status;
    }
  }, [onEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = ref.current;

    const userData = {
      nome: capitalizeFirstLetter(user.nome.value),
      email: user.email.value,
      tel_celular: user.tel_celular.value,
      tel_residencial: user.tel_residencial.value,
      dt_nascimento: user.dt_nascimento.value,
      cpf: user.cpf.value,
      nome_mae: capitalizeFirstLetter(user.nome_mae.value),
      status: user.status.value,
    };

    const users = await axios.get("http://localhost:8800");

    if (onEdit) {
      await axios
        .put("http://localhost:8800/" + onEdit.cpf, userData)
        .then(({ data }) => {
          toast.success(data);
          getUsers();
        })
        .catch(({ response }) => {
          console.error("Erro na atualização:", response.data);
          toast.error(response.data);
        });
    } else {
      await axios
        .post("http://localhost:8800", userData)
        .then(({ data }) => {
          toast.success(data);
          getUsers();
        })
        .catch(({ response }) => {
          if (response && response.data) {
            console.error("Erro na inserção:", response.data);
            toast.error(response.data);
          }
        });
    }

    user.reset();
    setOnEdit(null);
  };
  const handleForm = () => {
    navigate("/Home");
  };

  return (
    <C.FormContainer ref={ref} onSubmit={handleSubmit}>
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
          disabled={!!onEdit}
          onChange={(e) => {
            e.target.value = formatCPF(e.target.value);
            if (cpfExists) {
              toast.error("CPF ja cadastrado");
            }
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
          <option value="Ativo">Ativo</option>
          <option value="Inativo">Inativo</option>
        </C.Select>
      </C.InputArea>
      <C.ButtonWrapper>
        <C.ButtonF
          type="submit"
          onClick={(e) => {
            handleSubmit(e);
            handleForm();
          }}
        >
          SALVAR
        </C.ButtonF>
      </C.ButtonWrapper>
    </C.FormContainer>
  );
};

const Form = () => {
  const [onEdit, setOnEdit] = useState(null);
  const { setUsers } = useState([]);

  const getUsers = async () => {
    try {
      const res = await axios.get("http://localhost:8800");
      setUsers(res.data.sort((a, b) => (a.nome > b.nome ? 1 : -1)));
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <C.Container>
      <C.Title>Usuarios</C.Title>
      <Edit onEdit={onEdit} setOnEdit={setOnEdit} getUsers={getUsers} />
    </C.Container>
  );
};

export default Form;
