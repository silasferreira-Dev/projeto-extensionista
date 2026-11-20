const FORMATO_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const FORMATO_DATA = /^\d{4}-\d{2}-\d{2}$/;

export function validarDoador(dados) {
  if (!dados.nome || !dados.nome.trim()) return "Nome é obrigatório";
  if (dados.nome.length > 150) return "Nome pode ter no máximo 150 caracteres";
  if (dados.email && !FORMATO_EMAIL.test(dados.email)) return "E-mail inválido";
  return null;
}

export function validarDoacao(dados) {
  if (!Number.isInteger(dados.id_doador)) return "Doador é obrigatório";
  if (!FORMATO_DATA.test(dados.data_doacao || "")) return "Data inválida (use AAAA-MM-DD)";
  if (!Array.isArray(dados.itens) || dados.itens.length === 0) {
    return "Informe pelo menos um item";
  }
  for (const item of dados.itens) {
    if (!Number.isInteger(item.id_item)) return "Item inválido";
    if (!Number.isInteger(item.quantidade) || item.quantidade <= 0) {
      return "Quantidade deve ser um número inteiro maior que zero";
    }
  }
  return null;
}

export function validarLogin(dados) {
  if (!dados.email || !dados.senha) return "Informe e-mail e senha";
  return null;
}
