import { Router } from "express";
import db from "../db.js";
import { validarDoacao } from "../validacao.js";

const router = Router();

router.get("/", async (req, res) => {
  const [linhas] = await db.execute(
    `SELECT d.id_doacao, d.data_doacao, d.observacao, dr.nome AS doador,
            i.nome AS item, i.unidade, di.quantidade
       FROM doacao d
       JOIN doador dr ON dr.id_doador = d.id_doador
       JOIN doacao_item di ON di.id_doacao = d.id_doacao
       JOIN item i ON i.id_item = di.id_item
      ORDER BY d.data_doacao DESC, d.id_doacao DESC`,
  );
  const doacoes = [];
  for (const l of linhas) {
    let doacao = doacoes.find((d) => d.id_doacao === l.id_doacao);
    if (!doacao) {
      doacao = {
        id_doacao: l.id_doacao,
        data_doacao: l.data_doacao,
        observacao: l.observacao,
        doador: l.doador,
        itens: [],
      };
      doacoes.push(doacao);
    }
    doacao.itens.push({ item: l.item, unidade: l.unidade, quantidade: l.quantidade });
  }
  res.json(doacoes);
});

router.post("/", async (req, res) => {
  const erro = validarDoacao(req.body);
  if (erro) return res.status(400).json({ erro });
  const { id_doador, data_doacao, itens } = req.body;
  const observacao = req.body.observacao || null;

  const conexao = await db.getConnection();
  try {
    await conexao.beginTransaction();
    const [resultado] = await conexao.execute(
      "INSERT INTO doacao (id_doador, data_doacao, observacao) VALUES (?, ?, ?)",
      [id_doador, data_doacao, observacao],
    );
    for (const item of itens) {
      await conexao.execute(
        "INSERT INTO doacao_item (id_doacao, id_item, quantidade) VALUES (?, ?, ?)",
        [resultado.insertId, item.id_item, item.quantidade],
      );
    }
    await conexao.commit();
    res.status(201).json({ id_doacao: resultado.insertId });
  } catch (e) {
    await conexao.rollback();
    if (e.code === "ER_NO_REFERENCED_ROW_2") {
      return res.status(400).json({ erro: "Doador ou item inexistente" });
    }
    if (e.code === "ER_DUP_ENTRY") {
      return res.status(400).json({ erro: "O mesmo item foi informado duas vezes" });
    }
    throw e;
  } finally {
    conexao.release();
  }
});

export default router;
