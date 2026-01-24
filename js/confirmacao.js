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

  const chave = `resposta_${codigo}_${nome}`;
  const respostaSalva = localStorage.getItem(chave);

  if (respostaSalva) {
    // já respondeu
    card.innerHTML = `
      <span class="nome">${nome}</span>
      <span class="status">
        ${respostaSalva === "Confirmado"
          ? "Confirmado 💙"
          : "Não poderá comparecer 🤍"}
      </span>
    `;
  } else {
    // ainda não respondeu
    card.innerHTML = `
      <span class="nome">${nome}</span>

      <div class="acoes">
        <button class="btn-confirmar">Oba, eu vou 🎉</button>
        <button class="btn-recusar">Não vou 😢</button>
      </div>
    `;

    const btnConfirmar = card.querySelector(".btn-confirmar");
    const btnRecusar = card.querySelector(".btn-recusar");

    btnConfirmar.onclick = () => enviar(nome, "Confirmado", card);
    btnRecusar.onclick = () => enviar(nome, "Não vai", card);
  }

  container.appendChild(card);
});


function enviar(nome, resposta, card) {
  const chave = `resposta_${codigo}_${nome}`;

  // trava imediatamente (anti duplo clique)
  card.querySelector(".acoes").innerHTML =
    `<span class="status">Salvando...</span>`;

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

  // salva localmente
  localStorage.setItem(chave, resposta);

  // feedback final
  card.querySelector(".status").innerText =
    resposta === "Confirmado"
      ? "Confirmado 💙"
      : "Não poderá comparecer 🤍";
}
