import { entrar } from "../api.js";
import { mensagem } from "../ui.js";

export function telaLogin(raiz, aoEntrar) {
  raiz.innerHTML = `
    <main class="login">
      <h1>Unidos Pela Causa</h1>
      <form id="form-login" class="cartao">
        <label>E-mail
          <input name="email" type="email" required autocomplete="username" />
        </label>
        <label>Senha
          <input name="senha" type="password" required autocomplete="current-password" />
        </label>
        <p id="msg-login" class="mensagem" hidden></p>
        <button type="submit">Entrar</button>
      </form>
    </main>
  `;
  const form = raiz.querySelector("#form-login");
  const msg = raiz.querySelector("#msg-login");

  form.addEventListener("submit", async (evento) => {
    evento.preventDefault();
    const botao = form.querySelector("button");
    botao.disabled = true;
    mensagem(msg, "Entrando...", "info");
    try {
      await entrar(form.email.value, form.senha.value);
      aoEntrar();
    } catch (erro) {
      mensagem(msg, erro.message);
      form.senha.value = "";
      form.senha.focus();
    } finally {
      botao.disabled = false;
    }
  });
}
