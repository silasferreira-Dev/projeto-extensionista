import { cadastrarDoador, editarDoador, excluirDoador, listarDoadores } from "../api.js";
import { celula, mensagem } from "../ui.js";

export function telaDoadores(raiz) {
  raiz.innerHTML = `
    <section>
      <h2>Doadores</h2>
      <form id="form-doador" class="cartao grade">
        <input type="hidden" name="id" />
        <label>Nome <input name="nome" required maxlength="150" /></label>
        <label>E-mail <input name="email" type="email" maxlength="100" /></label>
        <label>Telefone <input name="telefone" maxlength="20" /></label>
        <p id="msg-doador" class="mensagem" hidden></p>
        <div class="acoes">
          <button type="submit">Salvar</button>
          <button type="reset" class="secundario">Limpar</button>
        </div>
      </form>
      <table>
        <thead><tr><th>Nome</th><th>E-mail</th><th>Telefone</th><th></th></tr></thead>
        <tbody id="lista-doadores"></tbody>
      </table>
    </section>
  `;
  const form = raiz.querySelector("#form-doador");
  const msg = raiz.querySelector("#msg-doador");
  const corpo = raiz.querySelector("#lista-doadores");

  async function carregar() {
    corpo.innerHTML = "<tr><td colspan='4'>Carregando...</td></tr>";
    try {
      const doadores = await listarDoadores();
      corpo.innerHTML = "";
      for (const d of doadores) {
        const tr = document.createElement("tr");
        celula(tr, d.nome);
        celula(tr, d.email);
        celula(tr, d.telefone);
        const acoes = celula(tr, "");
        const editar = document.createElement("button");
        editar.textContent = "Editar";
        editar.className = "secundario";
        editar.onclick = () => {
          form.id.value = d.id_doador;
          form.nome.value = d.nome;
          form.email.value = d.email ?? "";
          form.telefone.value = d.telefone ?? "";
          form.nome.focus();
        };
        const excluir = document.createElement("button");
        excluir.textContent = "Excluir";
        excluir.className = "perigo";
        excluir.onclick = async () => {
          if (!confirm(`Excluir ${d.nome}?`)) return;
          try {
            await excluirDoador(d.id_doador);
            mensagem(msg, "Doador excluído", "sucesso");
            carregar();
          } catch (erro) {
            mensagem(msg, erro.message);
          }
        };
        acoes.append(editar, excluir);
        corpo.append(tr);
      }
    } catch (erro) {
      corpo.innerHTML = "";
      mensagem(msg, erro.message);
    }
  }

  form.addEventListener("submit", async (evento) => {
    evento.preventDefault();
    const dados = {
      nome: form.nome.value.trim(),
      email: form.email.value.trim(),
      telefone: form.telefone.value.trim(),
    };
    try {
      if (form.id.value) await editarDoador(form.id.value, dados);
      else await cadastrarDoador(dados);
      mensagem(msg, "Doador salvo", "sucesso");
      form.reset();
      form.id.value = "";
      carregar();
    } catch (erro) {
      mensagem(msg, erro.message);
    }
  });
  form.addEventListener("reset", () => {
    form.id.value = "";
  });

  carregar();
}
