import { listarDoacoes, listarDoadores, listarItens, registrarDoacao } from "../api.js";
import { celula, mensagem } from "../ui.js";

export function telaDoacoes(raiz) {
  raiz.innerHTML = `
    <section>
      <h2>Doações</h2>
      <form id="form-doacao" class="cartao grade">
        <label>Doador <select name="id_doador" required></select></label>
        <label>Data <input name="data_doacao" type="date" required /></label>
        <label class="largo">Observação <input name="observacao" maxlength="255" /></label>
        <fieldset class="largo">
          <legend>Itens</legend>
          <div id="itens-doacao"></div>
          <button type="button" id="mais-item" class="secundario">+ Item</button>
        </fieldset>
        <p id="msg-doacao" class="mensagem" hidden></p>
        <div class="acoes"><button type="submit">Registrar doação</button></div>
      </form>
      <table>
        <thead><tr><th>Data</th><th>Doador</th><th>Itens</th></tr></thead>
        <tbody id="lista-doacoes"></tbody>
      </table>
    </section>
  `;
  const form = raiz.querySelector("#form-doacao");
  const msg = raiz.querySelector("#msg-doacao");
  const areaItens = raiz.querySelector("#itens-doacao");
  const corpo = raiz.querySelector("#lista-doacoes");
  let catalogo = [];

  function linhaItem() {
    const div = document.createElement("div");
    div.className = "linha-item";
    const select = document.createElement("select");
    select.required = true;
    for (const i of catalogo) select.add(new Option(`${i.nome} (${i.categoria})`, i.id_item));
    const qtd = document.createElement("input");
    qtd.type = "number";
    qtd.min = "1";
    qtd.value = "1";
    qtd.required = true;
    qtd.setAttribute("aria-label", "Quantidade");
    div.append(select, qtd);
    areaItens.append(div);
  }

  async function carregarLista() {
    const doacoes = await listarDoacoes();
    corpo.innerHTML = "";
    for (const d of doacoes) {
      const tr = document.createElement("tr");
      celula(tr, d.data_doacao.split("-").reverse().join("/"));
      celula(tr, d.doador);
      celula(tr, d.itens.map((i) => `${i.quantidade} ${i.unidade} de ${i.item}`).join(", "));
      corpo.append(tr);
    }
  }

  async function iniciar() {
    try {
      const [doadores, itens] = await Promise.all([listarDoadores(), listarItens()]);
      catalogo = itens;
      for (const d of doadores) form.id_doador.add(new Option(d.nome, d.id_doador));
      // "sv-SE" formata como AAAA-MM-DD no fuso do computador
      form.data_doacao.value = new Date().toLocaleDateString("sv-SE");
      linhaItem();
      await carregarLista();
    } catch (erro) {
      mensagem(msg, erro.message);
    }
  }

  raiz.querySelector("#mais-item").onclick = linhaItem;

  form.addEventListener("submit", async (evento) => {
    evento.preventDefault();
    const itens = [...areaItens.querySelectorAll(".linha-item")].map((div) => ({
      id_item: Number(div.querySelector("select").value),
      quantidade: Number(div.querySelector("input").value),
    }));
    try {
      await registrarDoacao({
        id_doador: Number(form.id_doador.value),
        data_doacao: form.data_doacao.value,
        observacao: form.observacao.value.trim(),
        itens,
      });
      mensagem(msg, "Doação registrada", "sucesso");
      form.observacao.value = "";
      areaItens.innerHTML = "";
      linhaItem();
      carregarLista();
    } catch (erro) {
      mensagem(msg, erro.message);
    }
  });

  iniciar();
}
