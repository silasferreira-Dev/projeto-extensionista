const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Rota de Health Check exigida pelo projeto
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'API rodando com sucesso!' });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
