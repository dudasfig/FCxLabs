import styled from "styled-components";

export const FormContainer = styled.form`
  display: flex;
  align-items: flex-start;
  gap: 50px;
  flex-wrap: wrap;
  background-color: #fff;
  padding: 20px;
  padding-right: 35px;
  box-shadow: 0px 0px 5px #ccc;
  border-radius: 5px;
`;

export const InputArea = styled.div`
  display: flex;
  flex-direction: column;
  width: calc(50% - 25px);
`;

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 100vh;
  gap: 20px;
`;

export const Title = styled.h2``;

export const Input = styled.input`
  width: 100%;
  padding: 0 8px;
  border: 1px solid #bbb;
  border-radius: 5px;
  height: 40px;
`;

export const Label = styled.label``;

export const ButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

export const Button = styled.button`
  padding: 10px;
  cursor: pointer;
  border-radius: 5px;
  border: none;
  background-color: cd cd;
  color: ;
  height: 42px;
`;

export const Select = styled.select`
  width: calc(106% - 0px);
  display: flex;
  padding: 0 10px;
  border: 1px solid #bbb;
  border-radius: 5px;
  height: 42px;
`;

export const ButtonF = styled.button`
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

export const InputF = styled.input`
  outline: none;
  padding: 16px 8px;
  width: 100%;
  border-radius: 5px;
  font-size: 16px;

  background-color: #f0f2f5;
  border: none;
`;

export const ErrorMessage = styled.div`
  color: red;
  display: flex;
  align-items: center;
  gap: 5px;
`;
