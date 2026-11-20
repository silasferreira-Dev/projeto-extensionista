import { listarDoadores, listarItens, registrarDoacao } from "../api.js";
import { el, mostrarMensagem, esconderMensagem, hoje } from "../ui.js";

export async function renderizarNovaDoacao(container) {
  const caixaMensagem = el("div", { class: "mensagem", hidden: true });

  const selectDoador = el("select", { name: "doador_id", required: true }, el("option", { value: "" }, "A carregar doadores..."));
  const selectItem = el("select", { name: "item_id", required: true }, el("option", { value: "" }, "A carregar itens..."));

  const form = el(
    "form",
    { class: "formulario-cadastro", onsubmit: handleSubmit },
    el("h3", {}, "Registar Nova Doação"),
    el("div", { class: "campo" },
      el("label", {}, "Selecionar Doador:"),
      selectDoador
    ),
    el("div", { class: "campo" },
      el("label", {}, "Selecionar Item:"),
      selectItem
    ),
    el("div", { class: "campo" },
      el("label", {}, "Quantidade:"),
      el("input", { type: "number", name: "quantidade", min: "1", value: "1", required: true })
    ),
    el("div", { class: "campo" },
      el("label", {}, "Data da Doação:"),
      el("input", { type: "date", name: "data", value: hoje(), required: true })
    ),
    el("button", { type: "submit", class: "btn-primario" }, "Registar Doação")
  );

  container.append(
    el("h2", {}, "Registo de Doação"),
    caixaMensagem,
    form
  );

  // Carrega opções para os selects em paralelo
  try {
    const [doadores, itens] = await Promise.all([listarDoadores(), listarItens()]);
    
    selectDoador.innerHTML = '<option value="">Selecione um doador...</option>';
    for (const d of doadores) {
      selectDoador.append(el("option", { value: d.id }, d.nome));
    }

    selectItem.innerHTML = '<option value="">Selecione um item...</option>';
    for (const i of itens) {
      selectItem.append(el("option", { value: i.id }, `${i.nome} (Categoria: ${i.categoria || "Geral"})`));
    }
  } catch (erro) {
    mostrarMensagem(caixaMensagem, "Erro ao carregar dados para o formulário.", "erro");
  }

  async function handleSubmit(e) {
    e.preventDefault();
    esconderMensagem(caixaMensagem);

    const formData = new FormData(form);
    const dadosDoacao = {
      doador_id: Number(formData.get("doador_id")),
      item_id: Number(formData.get("item_id")),
      quantidade: Number(formData.get("quantidade")),
      data: formData.get("data"),
    };

    try {
      await registrarDoacao(dadosDoacao);
      mostrarMensagem(caixaMensagem, "Doação registada com sucesso!", "sucesso");
      form.reset();
      form.querySelector("input[name='data']").value = hoje();
    } catch (erro) {
      mostrarMensagem(caixaMensagem, erro.message, "erro");
    }
  }
}