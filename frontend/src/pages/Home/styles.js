import styled from "styled-components";
import { FaTrash, FaEdit, FaPlus, FaPrint, FaLock } from "react-icons/fa";

export const Table = styled.table`
  width: 100%;
  background-color: #fff;
  padding: 10px;
  box-shadow: 0px 0px 5px #ccc;
  border-radius: 5px;
  max-width: 2000px;
  margin: 20px auto;
  word-break: break-all;
  border-collapse: collapse;
`;

export const Thead = styled.thead``;

export const Tbody = styled.tbody``;

export const Tr = styled.tr``;

export const Th = styled.th`
  text-align: start;
  border-bottom: 2px solid #ccc;
  padding: 10px;
  font-size: 13px;
  @media (max-width: 500px) {
    ${(props) => props.onlyWeb && "display: none"}
  }
`;

export const Td = styled.td`
  padding: 10px;
  font-size: 13px;
  @media (max-width: 500px) {
    ${(props) => props.onlyWeb && "display: none"}
  }
`;

export const EditIcon = styled(FaEdit)`
  margin-right: 5px;
  color: #007bff; /* Azul */
  cursor: pointer;
`;

export const TrashIcon = styled(FaTrash)`
  margin-right: 5px;
  color: #dc3545; /* Vermelho */
  cursor: pointer;
`;

export const AddIcon = styled(FaPlus)`
  margin-right: 5px;
  color: #28a745; /* Verde */
  cursor: pointer;
`;

export const SearchButton = styled.button`
  padding: 8px 18px;
  background-color: #a82223;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #28a745;
  }
`;

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 100vh;
  gap: 20px;
`;

export const Title = styled.h2`
  margin-bottom: -10px;
`;
export const FilterContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

export const FilterInput = styled.input`
  height: 37px;
  margin-right: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
`;

export const Select = styled.select`
  border-radius: 5px;
  height: 37px;
  margin-right: 10px;
  border: 1px solid #ccc;
`;

export const Button = styled.button`
  padding: 10px 0px;
  outline: none;
  border: none;
  border-radius: 5px;
  width: calc(100% - 200px);
  cursor: pointer;
  background-color: #a82223;
  color: white;
  font-weight: 600;
  font-size: 16px;
  max-width: 350px;
`;

export const Input = styled.input`
  outline: none;
  padding: 16px 8px;
  width: 100%;
  border-radius: 5px;
  font-size: 16px;

  background-color: #f0f2f5;
  border: none;
`;

export const Pagination = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

export const PaginationButton = styled.button`
  background-color: #a82223;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  margin: 0 5px;
  cursor: pointer;
  outline: none;

  &:hover {
    background-color: #0056b3;
  }
`;

export const TotalUsers = styled.div`
  display: flex;
  justify-content: center;
  margin-top: -5px;
`;

export const PrintIcon = styled(FaPrint)`
  margin-right: 5px;
  color: #000; /* Preto */
  cursor: pointer;
`;

export const LockIcon = styled(FaLock)`
  margin-right: 5px;
  color: #ffc107; /* Cor amarela */
  cursor: pointer;
`;

export const ExportDropdown = styled.select`
border-radius: 5px;
height: 37px;
margin-right: 10px;
margin-left: 350px;
border: 1px solid #ccc;
background-color: #a82223;
color: #fff;
padding: 8px 20px;

s`;

export const ExportOption = styled.option`
  background-color: #fff;
  color: #000;
  cursor: pointer;
  border: 1px solid #ccc;
`;

export const ExportContainer = styled.div`
  width: 0px;
`;
