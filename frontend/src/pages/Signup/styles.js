import styled from "styled-components";

export const SignupContainer = styled.form`
  display: flex;
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

export const Input = styled.input`
  width: 100%;
  padding: 0 8px;
  border: 1px solid #bbb;
  border-radius: 5px;
  height: 40px;
`;

export const Label = styled.label``;

export const LabelSignin = styled.label`
  font-size: 16px;
  color: #676767;
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: -30px;
`;

export const Strong = styled.strong`
  cursor: pointer;

  a {
    text-decoration: none;
    color: #676767;
  }
`;

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
  background-color: #a82223;
  color: white;
  height: 42px;
`;

export const Select = styled.select`
  width: calc(103% - 0px);
  display: flex;
  padding: 0 10px;
  border: 1px solid #bbb;
  border-radius: 5px;
  height: 42px;
`;
