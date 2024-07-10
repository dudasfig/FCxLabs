import { createContext, useEffect, useState } from "react";
export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userToken = localStorage.getItem("user_token");
    if (userToken) {
      // Aqui, você pode fazer uma verificação adicional se o token é válido
      // e buscar as informações do usuário no backend se necessário
      setUser({ token: userToken });
    }
  }, []);

  const signin = (login, senha) => {
    // Aqui você faria uma requisição ao backend para autenticar o usuário
    // e, se for bem-sucedido, definiria o token de usuário e possivelmente
    // buscaria informações adicionais do usuário no backend
    const token = "token_gerado_pelo_backend";
    localStorage.setItem("user_token", token);
    setUser({ token });
  };

  const signup = (login, senha) => {
    signin(login, senha);
  };

  const signout = () => {
    localStorage.removeItem("user_token");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, signed: !!user, signin, signup, signout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
