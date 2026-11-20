-- Unidos Pela Causa · seed.sql
-- Dados de exemplo. Rode depois do schema.sql.
SET NAMES utf8mb4;
USE conectadoa;

-- Usuário de demonstração
-- e-mail: voluntario@exemplo.com   senha: conectadoa123
-- O banco guarda só o hash bcrypt da senha, nunca a senha.
INSERT INTO usuario (nome, email, senha_hash) VALUES
  ('Voluntário Demo', 'voluntario@exemplo.com',
   '$2b$10$gwz8X12zwrcAoLG.L6MwNeJZ0levIEyMj8LpnGWUyHLGvf4BWF5ay');

INSERT INTO categoria (nome) VALUES ('Alimento'), ('Higiene'), ('Vestuário');

INSERT INTO item (id_categoria, nome, unidade) VALUES
  (1, 'Arroz 5 kg', 'pacote'),
  (1, 'Feijão 1 kg', 'pacote'),
  (1, 'Óleo de soja 900 ml', 'garrafa'),
  (2, 'Sabonete', 'unidade'),
  (2, 'Creme dental', 'unidade'),
  (3, 'Agasalho', 'peça');

INSERT INTO doador (nome, email, telefone) VALUES
  ('Ana Souza', 'ana.souza@exemplo.com', '(14) 99999-0001'),
  ('Bruno Lima', 'bruno.lima@exemplo.com', NULL),
  ('Mercado Bom Preço', 'contato@bompreco.exemplo.com', '(14) 3333-0000'),
  ('Carla Mendes', NULL, '(14) 98888-0002');

INSERT INTO doacao (id_doador, data_doacao, observacao) VALUES
  (1, '2026-10-01', 'Entregue na sede'),
  (3, '2026-10-10', 'Campanha do mês');

INSERT INTO doacao_item (id_doacao, id_item, quantidade) VALUES
  (1, 1, 2), (1, 4, 10),
  (2, 1, 20), (2, 2, 20), (2, 3, 12);
