import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 10px;
  height: 100vh;
`;

export const Content = styled.div`
  gap: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  box-shadow: 0 1px 2px #0003;
  background-color: white;
  max-width: 350px;
  padding: 20px;
  border-radius: 5px;
`;

export const Label = styled.label`
  font-size: 30px;
  font-weight: 600;
  color: #676767;
`;

export const LabelRoutes = styled.label`
  font-size: 16px;
  color: #676767;
`;

export const LabelError = styled.label`
  font-size: 14px;
  color: red;
`;

export const Strong = styled.strong`
  cursor: pointer;

  a {
    text-decoration: none;
    color: #676767;
  }
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
