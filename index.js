const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());

app.get('/api/health', (req, res) => {
  res.json({ status: "OK", message: "API rodando com sucesso!" });
});

app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});
