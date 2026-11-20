import { listarDoadores, listarDoacoes, listarItens } from "../api.js";
import { el, estado } from "../ui.js";

export async function renderizarRelatorios(container) {
  const containerEstatisticas = el("div", { class: "estatisticas-grid" }, estado("A calcular relatórios..."));

  container.append(
    el("h2", {}, "Relatórios e Estatísticas"),
    el("p", {}, "Visão geral consolidada das doações e doadores registados no sistema."),
    containerEstatisticas
  );

  try {
    const [doadores, doacoes, itens] = await Promise.all([
      listarDoadores(),
      listarDoacoes(),
      listarItens(),
    ]);

    const totalDoadores = doadores?.length || 0;
    const totalDoacoes = doacoes?.length || 0;
    const totalItensCadastrados = itens?.length || 0;

    containerEstatisticas.innerHTML = "";
    containerEstatisticas.append(
      criarCardRelatorio("Total de Doadores", totalDoadores),
      criarCardRelatorio("Total de Doações Efetuadas", totalDoacoes),
      criarCardRelatorio("Itens Disponíveis", totalItensCadastrados)
    );
  } catch (erro) {
    containerEstatisticas.innerHTML = "";
    containerEstatisticas.append(estado("Erro ao gerar os relatórios do sistema."));
  }
}

function criarCardRelatorio(titulo, valor) {
  return el(
    "div",
    { class: "card-estatistica" },
    el("h4", {}, titulo),
    el("p", { class: "valor-estatistica" }, String(valor))
  );
}