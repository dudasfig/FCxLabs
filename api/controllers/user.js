import { bd } from "../db.js";

export const getUsers = (_, res) => {
  const q = "SELECT * FROM usuario";

  bd.query(q, (err, data) => {
    if (err) {
      console.error("Erro ao obter usuários:", err);
      return res.status(500).json({ error: "Erro interno do servidor" });
    }

    return res.status(200).json(data);
  });
};

export const signin = (req, res) => {
  const { login, senha } = req.body;

  const q = "SELECT * FROM usuario WHERE login = ? AND senha = ?";
  const values = [login, senha];

  bd.query(q, values, (err, result) => {
    if (err) {
      console.error("Erro ao tentar fazer login:", err);
      return res.status(500).json({ error: "Erro interno do servidor" });
    }

    if (result.length === 0) {
      return res.status(401).json({ error: "E-mail ou senha incorretos" });
    }

    return res
      .status(200)
      .json({ message: "Login bem-sucedido", user: result[0] });
  });
};

export const addUser = (req, res) => {
  const checkUserQuery = "SELECT * FROM usuario WHERE login = ? OR cpf = ?";
  const checkUserValues = [req.body.login, req.body.cpf];

  bd.query(checkUserQuery, checkUserValues, (checkErr, checkResults) => {
    if (checkErr) {
      console.error("Erro ao verificar usuário:", checkErr);
      return res.status(500).json({ error: "Erro interno do servidor" });
    }

    if (checkResults.length > 0) {
      // Verifique se o login ou o CPF já existe
      const existingUser = checkResults[0];
      if (existingUser.login === req.body.login) {
        return res.status(400).json({ error: "O login já existe." });
      }
      if (existingUser.cpf === req.body.cpf) {
        return res.status(400).json({ error: "O CPF já existe." });
      }
      if (
        existingUser.cpf === req.body.cpf &&
        existingUser.login === req.body.login
      ) {
        return res
          .status(400)
          .json({ error: "O login e CPF já estão cadastrados." });
      }
    }

    const q =
      "INSERT INTO usuario (`nome`, `email`, `tel_celular`, `tel_residencial`, `dt_nascimento`, `cpf`, `nome_mae`, `status`,`login`,`senha`,`dt_inclusao`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())";

    const values = [
      req.body.nome,
      req.body.email,
      req.body.tel_celular,
      req.body.tel_residencial,
      req.body.dt_nascimento,
      req.body.cpf,
      req.body.nome_mae,
      req.body.status,
      req.body.login,
      req.body.senha,
    ];

    bd.query(q, values, (err) => {
      if (err) {
        console.error("Erro na inserção:", err);
        return res.json(err);
      }

      return res.status(200).json("Usuário cadastrado com sucesso");
    });
  });
};

export const updateUser = (req, res) => {
  let q, values;

  if (req.body.status === "BLOQUEADO") {
    q =
      "UPDATE usuario SET `status` = ?, `dt_alteracao` = NOW() WHERE `cpf` = ?";
    values = [req.body.status, req.params.cpf];
  } else {
    q =
      "UPDATE usuario SET `nome` = ?, `email` = ?, `tel_celular` = ?, `tel_residencial` = ?, `dt_nascimento` = ?, `nome_mae` = ?, `status` = ?, `dt_alteracao` = NOW() WHERE `cpf` = ?";
    values = [
      req.body.nome,
      req.body.email,
      req.body.tel_celular,
      req.body.tel_residencial,
      req.body.dt_nascimento,
      req.body.nome_mae,
      req.body.status,
      req.params.cpf,
    ];
  }

  bd.query(q, values, (err) => {
    if (err) {
      console.error("Erro na atualização:", err);
      return res.status(500).json({ error: "Erro interno do servidor" });
    }

    return res.status(200).json("Usuário atualizado com sucesso.");
  });
};

export const updatePassword = (req, res) => {
  const cpf = req.params.cpf;
  const newPassword = req.body.senha;

  // Verifica se o CPF existe no banco de dados
  const checkCPFQuery = "SELECT * FROM usuario WHERE cpf = ?";
  bd.query(checkCPFQuery, [cpf], (cpfErr, cpfResult) => {
    if (cpfErr) {
      console.error("Erro na verificação do CPF:", cpfErr);
      return res.status(500).json({ error: "Erro interno do servidor" });
    }

    // Se o CPF não foi encontrado, retorna um erro 404
    if (cpfResult.length === 0) {
      return res.status(404).json({ error: "CPF não encontrado" });
    }

    // Verifica se a nova senha já está cadastrada
    const checkPasswordQuery = "SELECT * FROM usuario WHERE senha = ?";
    bd.query(
      checkPasswordQuery,
      [newPassword],
      (passwordErr, passwordResult) => {
        if (passwordErr) {
          console.error("Erro na verificação da senha:", passwordErr);
          return res.status(500).json({ error: "Erro interno do servidor" });
        }

        // Se a nova senha já estiver cadastrada, retorna um erro 400
        if (passwordResult.length > 0) {
          return res.status(400).json({ error: "Senha já cadastrada" });
        }

        // Atualiza a senha se o CPF existir e a senha não estiver cadastrada
        const updateQuery = "UPDATE usuario SET senha = ? WHERE cpf = ?";
        bd.query(updateQuery, [newPassword, cpf], (updateErr) => {
          if (updateErr) {
            console.error("Erro na atualização da senha:", updateErr);
            return res.status(500).json({ error: "Erro interno do servidor" });
          }

          // Retorna uma resposta de sucesso
          return res.status(200).json("Senha atualizada com sucesso.");
        });
      }
    );
  });
};

/*export const deleteUser = (req, res) => {
  const q = "UPDATE usuario SET status = 'Inativo' WHERE `cpf` = ?";

  bd.query(q, [req.params.cpf], (err) => {
    if (err) return res.json(err);

    return res.status(200).json("Usuário marcado como Inativo com sucesso.");
  });
};*/

export const deleteUser = (req, res) => {
  const q = "DELETE FROM usuario WHERE `cpf` = ?";

  bd.query(q, [req.params.cpf], (err) => {
    if (err) return res.json(err);

    return res.status(200).json("Usuário deletado com sucesso.");
  });
};

export const deleteAllUsers = (req, res) => {
  const q = "DELETE FROM usuario";

  bd.query(q, (err) => {
    if (err) return res.json(err);

    return res
      .status(200)
      .json("Todos os usuários foram deletados com sucesso.");
  });
};
