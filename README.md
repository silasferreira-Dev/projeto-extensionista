# Unidos Pela Causa

Sistema de gestão de doações para ONGs. Projeto de referência do PIE II, Aula 3: MVP sem login, com banco, API e telas integradas.

## Requisitos

- Git
- Vite+ (comando vp): https://viteplus.dev
- MySQL ou MariaDB rodando localmente

## Como rodar

1. Clone o repositório e entre na pasta do projeto
2. Instale as dependências: vp install
3. Crie o banco: no cliente do MySQL, rode database/schema.sql e depois database/seed.sql
4. Copie .env.example para .env e preencha usuário e senha do seu MySQL
5. Terminal 1, inicie a API: vp run api
6. Terminal 2, inicie o frontend: vp dev
7. Abra http://localhost:5173

## Telas

| Endereço       | Tela                                              |
| -------------- | ------------------------------------------------- |
| #/doadores     | Listagem, cadastro, edição e exclusão de doadores |
| #/doacoes/nova | Registro de doação com um ou mais itens           |
| #/doacoes      | Listagem de doações com doador, data e itens      |

## Estrutura

```
index.html          página principal: topo, navegação e <main id="app">
src/main.js         escolhe a tela pelo endereço depois do #
src/api.js          todas as chamadas fetch para a API
src/ui.js           funções de apoio (criar elementos, mensagens, datas)
src/pages/          doadores.js e doacoes.js
src/style.css       estilos mobile-first
server/             API Express (index.js, db.js, validacao.js, routes/)
database/           schema.sql e seed.sql
api.http            testes manuais da API (extensão REST Client)
```

## Verificar e gerar a versão de produção

- vp check: formatação e lint
- vp build: gera a pasta dist/
