

USE FC;

CREATE TABLE Usuario (
  nome VARCHAR(100),
  login VARCHAR(100),
  senha VARCHAR(25),
  email VARCHAR(100) CHECK (email LIKE '%@%.%'),
  cpf VARCHAR(20) PRIMARY KEY CHECK (cpf LIKE '___.___.___-__'),
  dt_nascimento DATE,
  nome_mae VARCHAR(100),
  status VARCHAR(100),
  dt_inclusao DATE,
  dt_alteracao DATE,
  tel_residencial VARCHAR(25) CHECK (tel_residencial LIKE '(__)____-____'),
  tel_celular VARCHAR(25) CHECK (tel_celular LIKE '(__)9____-____')
);

ALTER TABLE Usuario
DROP COLUMN login,
DROP COLUMN senha;

CREATE TABLE Login (
  login VARCHAR(100) PRIMARY KEY,
  email VARCHAR(100) CHECK (email LIKE '%@%.%'),
  senha VARCHAR(8)
);

DROP TABLE IF EXISTS Login;

ALTER TABLE Usuario
ADD COLUMN dt_inclusao DATE,
ADD COLUMN dt_alteracao DATE;

DELIMITER //
CREATE TRIGGER usuario_insert_trigger
BEFORE INSERT ON usuario
FOR EACH ROW
BEGIN
  SET NEW.dt_inclusao = CURRENT_TIMESTAMP;
END;
DELIMITER ;

DELIMITER //
CREATE TRIGGER usuario_update_trigger
BEFORE UPDATE ON usuario
FOR EACH ROW
BEGIN
  SET NEW.dt_alteracao = CURRENT_TIMESTAMP;
END;
DELIMITER ;
