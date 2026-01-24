const SCRIPT_URL = "https://script.google.com/macros/s/AKfycby4NarO7bCPakroVlc-Bv9ErTZ_JyHevPKnwDPsdPu_XTItqFArqUAkdzPx4zK7UvTX/exec";

const codigo = localStorage.getItem("codigoConvite");
const dados = convites[codigo];

if (!dados) {
  window.location.href = "convite.html";
}

document.getElementById("familia").innerText = dados.familia;

const container = document.getElementById("lista-convidados");

dados.convidados.forEach(nome => {
  const card = document.createElement("div");
  card.className = "card-convidado";

  card.innerHTML = `
    <span class="nome">${nome}</span>

    <div class="acoes">
      <button class="btn-confirmar">Eu vou 🎉</button>
      <button class="btn-recusar">Não vou 😢</button>
    </div>
  `;

  const btnConfirmar = card.querySelector(".btn-confirmar");
  const btnRecusar = card.querySelector(".btn-recusar");

  btnConfirmar.onclick = () => enviar(nome, "Confirmado", card);
  btnRecusar.onclick = () => enviar(nome, "Não vai", card);

  container.appendChild(card);
});

function enviar(nome, resposta, card) {
  fetch(SCRIPT_URL, {
    method: "POST",
    mode: "no-cors",
    body: JSON.stringify({
      codigo: codigo,
      familia: dados.familia,
      convidado: nome,
      resposta: resposta
    })
  });

  // feedback visual
  card.classList.add("respondido");
  card.querySelector(".acoes").innerHTML =
    `<span class="status">${resposta === "Confirmado" ? "Confirmado 💙" : "Não poderá comparecer 🤍"}</span>`;
}
