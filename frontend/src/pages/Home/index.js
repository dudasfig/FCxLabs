import React, { useState, useEffect } from "react";
import axios from "axios";
import * as C from "./styles";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import "jspdf-autotable";
import {
  Document,
  Packer,
  Paragraph,
  Table,
  TableRow,
  TableCell,
  WidthType,
  HeadingLevel,
} from "docx";
import { saveAs } from "file-saver";

const Grid = ({ users, setUsers, getUsers, setOnEdit, onEdit }) => {
  const navigate = useNavigate();

  const handleEdit = (item) => {
    if (item.status === "BLOQUEADO") {
      toast.error("Usuário bloqueado. Não é possível editar.");
    } else {
      setOnEdit(item);
      navigate("/form", { state: { onEdit: item } });
    }
  };

  const handleBlock = async (item) => {
    try {
      await axios.put(`http://localhost:8800/${item.cpf}`, {
        status: "BLOQUEADO",
      });
      toast.success("Usuário bloqueado com sucesso.");
    } catch (error) {
      toast.error(error.response.data);
    }
  };

  const handleDelete = async (cpf) => {
    try {
      const response = await axios.delete("http://localhost:8800/" + cpf);
      const data = response.data;

      const newArray = users.filter((user) => user.cpf !== cpf);
      setUsers(newArray);

      toast.success(data);
    } catch (error) {
      toast.error(error.response.data);
    }

    setOnEdit(null);
  };

  const handleDeleteAllUsers = async () => {
    try {
      await axios.delete("http://localhost:8800/deleteAllUsers");
      setUsers([]);
      toast.success("Todos os usuários foram deletados com sucesso.");
    } catch (error) {
      toast.error(error.response.data);
    }
  };

  const printPage = () => {
    window.print();
  };

  return (
    <C.Table>
      <C.Thead>
        <C.Tr>
          <C.Th>Nome</C.Th>
          <C.Th>Email</C.Th>
          <C.Th onlyWeb>Telefone Celular</C.Th>
          <C.Th onlyWeb>Telefone Residencial</C.Th>
          <C.Th onlyWeb>Data de Nascimento</C.Th>
          <C.Th onlyWeb>CPF</C.Th>
          <C.Th onlyWeb>Nome da Mae</C.Th>
          <C.Th onlyWeb>Status</C.Th>
          <C.Th>
            <C.AddIcon onClick={() => navigate("/form")} />

            <C.TrashIcon onClick={() => handleDeleteAllUsers} />

            <C.PrintIcon onClick={printPage} />
          </C.Th>
          <C.Th></C.Th>
          <C.Th></C.Th>
        </C.Tr>
      </C.Thead>
      <C.Tbody>
        {users.map((item, i) => (
          <C.Tr key={i}>
            <C.Td>{item.nome}</C.Td>
            <C.Td>{item.email}</C.Td>
            <C.Td onlyWeb>{item.tel_celular}</C.Td>
            <C.Td onlyWeb>{item.tel_residencial}</C.Td>
            <C.Td onlyWeb>{item.dt_nascimento}</C.Td>
            <C.Td onlyWeb>{item.cpf}</C.Td>
            <C.Td onlyWeb>{item.nome_mae}</C.Td>
            <C.Td onlyWeb>{item.status}</C.Td>
            <C.Td>
              <C.EditIcon onClick={() => handleEdit(item)} />
              <C.TrashIcon onClick={() => handleDelete(item.cpf)} />
              <C.LockIcon onClick={() => handleBlock(item)} />
            </C.Td>
          </C.Tr>
        ))}
      </C.Tbody>
    </C.Table>
  );
};

const Home = () => {
  const [users, setUsers] = useState([]);
  const [onEdit, setOnEdit] = useState(null);
  const [filterBy, setFilterBy] = useState("nome");
  const [filterValue, setFilterValue] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const { signout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const getUsers = async () => {
      try {
        const res = await axios.get("http://localhost:8800");
        const usersData = res.data.sort((a, b) => (a.nome > b.nome ? 1 : -1));
        setUsers(usersData);
        setTotalUsers(usersData.length);
        setTotalPages(Math.ceil(usersData.length / 10));
      } catch (error) {
        toast.error(error);
      }
    };

    getUsers();
  }, []);

  const handleSearch = () => {
    const filteredResults = users.filter((user) => {
      if (filterBy === "idade") {
        const userAge = calculateAge(user.birthdate);
        return userAge.toString().includes(filterValue.toLowerCase());
      } else if (filterBy === "status") {
        return user.status.toLowerCase().startsWith(filterValue.toLowerCase());
      } else if (filterBy === "cpf") {
        return user.cpf.includes(filterValue);
      } else if (filterBy === "dt_nascimento") {
        return user.dt_nascimento >= startDate && user.dt_nascimento <= endDate;
      } else if (filterBy === "login") {
        return user.login?.toLowerCase().includes(filterValue.toLowerCase());
      } else if (filterBy === "dt_inclusao") {
        return user.dt_inclusao >= startDate && user.dt_inclusao <= endDate;
      } else if (filterBy === "dt_alteracao") {
        return user.dt_alteracao >= startDate && user.dt_alteracao <= endDate;
      } else {
        return [user[filterBy].toLowerCase()].some((field) =>
          field.includes(filterValue.toLowerCase())
        );
      }
    });
    setFilteredUsers(filteredResults);
    setCurrentPage(1);
  };

  const calculateAge = (birthdate) => {
    const today = new Date();
    const birthDate = new Date(birthdate);
    let age = today.getFullYear() - birthDate.getFullYear();
    const month = today.getMonth() - birthDate.getMonth();

    if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    return age;
  };

  const formatCPF = (item) => {
    let onlynumbers = item.target.value;

    onlynumbers = onlynumbers.replace(/\D/g, "");
    onlynumbers = onlynumbers.replace(
      /(\d{3})(\d{3})(\d{3})(\d{2})/,
      "$1.$2.$3-$4"
    );
    setFilterValue(onlynumbers);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(users);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Usuarios");
    XLSX.writeFile(workbook, "usuarios.xlsx");
  };

  const exportToPDF = () => {
    const doc = new jsPDF("l", "pt", "a4");

    doc.text("Lista de Usuários", 40, 20);

    const tableHeaders = [
      "Nome",
      "Email",
      "Telefone Celular",
      "Telefone Residencial",
      "Data de Nascimento",
      "CPF",
      "Nome da Mãe",
      "Status",
      "Data de Inserção",
      "Data de Alteração",
    ];
    const tableData = users.map((user) => [
      user.nome || "N/A",
      user.email || "N/A",
      user.tel_celular || "N/A",
      user.tel_residencial || "N/A",
      user.dt_nascimento || "N/A",
      user.cpf || "N/A",
      user.nome_mae || "N/A",
      user.status || "N/A",
      user.dt_inclusao || "N/A",
      user.dt_alteracao || "N/A",
    ]);

    doc.autoTable({
      head: [tableHeaders],
      body: tableData,
      startY: 40,
      theme: "plain",
      styles: {
        cellPadding: 4,
        overflow: "linebreak",
        fontSize: 9,
      },
      columnStyles: {
        0: { cellWidth: 80 },
        1: { cellWidth: 80 },
        2: { cellWidth: 100 },
        3: { cellWidth: 70 },
        4: { cellWidth: 80 },
        5: { cellWidth: 100 },
        6: { cellWidth: 100 },
        7: { cellWidth: 50 },
        8: { cellWidth: 70 },
        9: { cellWidth: 70 },
      },
    });

    doc.save("usuarios.pdf");
  };

  const exportToWord = (users) => {
    const doc = new Document({
      sections: [
        {
          children: [
            new Paragraph({
              text: "Lista de Usuários",
              heading: HeadingLevel.TITLE,
            }),
            new Table({
              width: {
                size: 100,
                type: WidthType.PERCENTAGE,
              },
              rows: [
                new TableRow({
                  children: [
                    new TableCell({
                      children: [new Paragraph("Nome")],
                    }),
                    new TableCell({
                      children: [new Paragraph("Email")],
                    }),
                    new TableCell({
                      children: [new Paragraph("Telefone Celular")],
                    }),
                    new TableCell({
                      children: [new Paragraph("Telefone Residencial")],
                    }),
                    new TableCell({
                      children: [new Paragraph("Data de Nascimento")],
                    }),
                    new TableCell({
                      children: [new Paragraph("CPF")],
                    }),
                    new TableCell({
                      children: [new Paragraph("Nome da Mãe")],
                    }),
                    new TableCell({
                      children: [new Paragraph("Status")],
                    }),
                  ],
                }),
                ...users.map(
                  (user) =>
                    new TableRow({
                      children: [
                        new TableCell({
                          children: [new Paragraph(user.nome || "N/A")],
                        }),
                        new TableCell({
                          children: [new Paragraph(user.email || "N/A")],
                        }),
                        new TableCell({
                          children: [new Paragraph(user.tel_celular || "N/A")],
                        }),
                        new TableCell({
                          children: [
                            new Paragraph(user.tel_residencial || "N/A"),
                          ],
                        }),
                        new TableCell({
                          children: [
                            new Paragraph(user.dt_nascimento || "N/A"),
                          ],
                        }),
                        new TableCell({
                          children: [new Paragraph(user.cpf || "N/A")],
                        }),
                        new TableCell({
                          children: [new Paragraph(user.nome_mae || "N/A")],
                        }),
                        new TableCell({
                          children: [new Paragraph(user.status || "N/A")],
                        }),
                      ],
                    })
                ),
              ],
            }),
          ],
        },
      ],
    });

    Packer.toBlob(doc).then((blob) => {
      saveAs(blob, "usuarios.docx");
    });
  };

  const handleExport = (option) => {
    switch (option) {
      case "excel":
        exportToExcel();
        break;
      case "pdf":
        exportToPDF();
        break;
      case "word":
        exportToWord(users);
        break;

      default:
        console.log("Opção inválida");
    }
  };

  return (
    <C.Container>
      <br />
      <C.Title>Usuarios</C.Title>

      <C.FilterContainer>
        <C.Select
          value={filterBy}
          onChange={(e) => setFilterBy(e.target.value)}
        >
          <option value="nome">Nome</option>
          <option value="email">Email</option>
          <option value="status">Status</option>
          <option value="idade">Idade</option>
          <option value="cpf">CPF</option>
          <option value="dt_nascimento">Período de Nascimento</option>
          <option value="login">Login</option>
          <option value="dt_inclusao">Data de Inserção</option>
          <option value="dt_alteracao">Data de Alteração</option>
        </C.Select>
        {filterBy !== "idade" &&
        filterBy !== "status" &&
        filterBy !== "cpf" &&
        filterBy !== "dt_nascimento" &&
        filterBy !== "dt_inclusao" &&
        filterBy !== "dt_alteracao" ? (
          <C.FilterInput
            type="text"
            placeholder={`Digite o ${filterBy} de busca`}
            value={filterValue}
            onChange={(e) => setFilterValue(e.target.value)}
          />
        ) : (
          <>
            {filterBy === "idade" && (
              <C.Select
                value={filterValue}
                onChange={(e) => setFilterValue(e.target.value)}
              >
                <option value="">Selecione a faixa etária</option>
                <option value="18-25">18 - 25</option>
                <option value="26-30">26 - 30</option>
                <option value="31-35">31 - 35</option>
                <option value="36-40">36 - 40</option>
                <option value="41+">41+</option>
              </C.Select>
            )}
            {filterBy === "status" && (
              <C.Select
                value={filterValue}
                onChange={(e) => setFilterValue(e.target.value)}
              >
                <option value="">Selecione o status</option>
                <option value="ativo">Ativo</option>
                <option value="inativo">Inativo</option>
                <option value="bloqueado">Bloqueado</option>
              </C.Select>
            )}
            {filterBy === "cpf" && (
              <C.FilterInput
                type="text"
                placeholder="Digite o CPF de busca"
                value={filterValue}
                onChange={formatCPF}
              ></C.FilterInput>
            )}
            {filterBy === "dt_nascimento" && (
              <div>
                <C.FilterInput
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
                <span>- </span>
                <C.FilterInput
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </div>
            )}
            {filterBy === "dt_inclusao" && (
              <div>
                <C.FilterInput
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
                <span>- </span>
                <C.FilterInput
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </div>
            )}
            {filterBy === "dt_alteracao" && (
              <div>
                <C.FilterInput
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
                <span>- </span>
                <C.FilterInput
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </div>
            )}
          </>
        )}
        <C.SearchButton onClick={handleSearch}>Buscar</C.SearchButton>

        <C.ExportContainer>
          <C.ExportDropdown onChange={(e) => handleExport(e.target.value)}>
            <C.ExportOption value="">Exportar</C.ExportOption>
            <C.ExportOption value="pdf">PDF</C.ExportOption>
            <C.ExportOption value="excel">Excel</C.ExportOption>
            <C.ExportOption value="word">Word</C.ExportOption>
          </C.ExportDropdown>
        </C.ExportContainer>
      </C.FilterContainer>

      <Grid
        users={
          filteredUsers.length
            ? filteredUsers.slice((currentPage - 1) * 10, currentPage * 10)
            : users.slice((currentPage - 1) * 10, currentPage * 10)
        }
        setUsers={setUsers}
        setOnEdit={setOnEdit}
        onEdit={onEdit}
      />
      <C.Pagination>
        <C.PaginationButton
          onClick={() =>
            handlePageChange(currentPage > 1 ? currentPage - 1 : 1)
          }
        >
          {"<"}
        </C.PaginationButton>
        <span>{`Página ${currentPage} de ${totalPages}`}</span>

        <C.PaginationButton
          onClick={() =>
            handlePageChange(
              currentPage < totalPages ? currentPage + 1 : totalPages
            )
          }
        >
          {">"}
        </C.PaginationButton>
      </C.Pagination>
      <C.TotalUsers>Total de Usuários: {totalUsers}</C.TotalUsers>
      <C.Button onClick={() => [signout(), navigate("/")]}>Sair</C.Button>
    </C.Container>
  );
};

export default Home;
