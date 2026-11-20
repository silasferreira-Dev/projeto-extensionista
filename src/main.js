import "./style.css";
import { lerNomeUsuario, lerToken, sair } from "./api.js";
import { telaDoacoes } from "./pages/doacoes.js";
import { telaDoadores } from "./pages/doadores.js";
import { telaLogin } from "./pages/login.js";

const app = document.querySelector("#app");

function mostrarApp() {
  app.innerHTML = `
    <header class="topo">
      <strong>Unidos Pela Causa</strong>
      <nav>
        <button data-tela="doadores">Doadores</button>
        <button data-tela="doacoes">Doações</button>
      </nav>
      <span class="usuario"></span>
      <button id="sair" class="secundario">Sair</button>
    </header>
    <div id="conteudo"></div>
  `;
  app.querySelector(".usuario").textContent = lerNomeUsuario();
  const conteudo = app.querySelector("#conteudo");
  const telas = { doadores: telaDoadores, doacoes: telaDoacoes };
  for (const botao of app.querySelectorAll("nav button")) {
    botao.onclick = () => telas[botao.dataset.tela](conteudo);
  }
  app.querySelector("#sair").onclick = () => {
    sair();
    iniciar();
  };
  telaDoadores(conteudo);
}

function iniciar() {
  if (lerToken()) mostrarApp();
  else telaLogin(app, mostrarApp);
}

iniciar();
