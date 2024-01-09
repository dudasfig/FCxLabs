use FC;

create table Usuario(
nome varchar(100),
login varchar(100),
senha varchar(25),
email varchar(100)check (email like '%@%.%'),
cpf varchar(20) primary key check (cpf like '___.___.___-__'),
dt_nascimento date,
nome_mae varchar(100),
status varchar(100),
dt_inclusao date,
dt_alteracao date,
tel_residencial varchar(25)check (tel_residencial like '(__)____-____'),
tel_celular varchar(25) check (tel_celular like '(__)9____-____')
);

