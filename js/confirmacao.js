const API_URL =
  "https://script.google.com/macros/s/AKfycbw3CbALrF6YwnXNiHs-UCnZzZeCbDFi9aihl7y4F6irkD7b9A7ctrsb2Yy8HVNaLAi7/exec";

const codigo = localStorage.getItem("codigoConvite");

if (!codigo) {
  window.location.href = "index.html";
}

carregarConvidados();

async function carregarConvidados() {

  const loading = document.getElementById("loading-convidados");
  const conteudo = document.getElementById("conteudo-convite");

  loading.style.display = "flex";
  conteudo.style.display = "none";

  try {
    const response = await fetch(
      `${API_URL}?action=buscar&codigo=${encodeURIComponent(codigo)}`
    );

    const data = await response.json();

    if (!data.success) {
      localStorage.removeItem("codigoConvite");
      window.location.href = "index.html";
      return;
    }

    document.getElementById("familia").innerText = data.familia;
    renderizarConvidados(data.convidados);

    loading.style.display = "none";
    conteudo.style.display = "block";

  } catch (error) {
    console.error(error);
    alert("Erro ao carregar convidados. Tente novamente");
  }
}

function renderizarConvidados(convidados) {
  const container = document.getElementById("lista-convidados");
  container.innerHTML = "";

  convidados.forEach(convidado => {
    const card = document.createElement("div");
    card.className = "card-convidado";

    if (convidado.status === "Recusado") {
      card.innerHTML = `
        <span class="nome">${convidado.nome}</span>
        <span class="status">Não poderá comparecer 🤍</span>
      `;
    } else if (convidado.status === "Confirmado") {
      card.innerHTML = `
        <span class="nome">${convidado.nome}</span>
        <span class="status">Confirmado 💙</span>

        <div class="acoes">
          <button class="btn-recusar">Não vou mais</button>
        </div>
      `;

      card.querySelector(".btn-recusar").onclick = () =>
        enviar(convidado.id, "Recusado", card);

    } else {
      card.innerHTML = `
        <span class="nome">${convidado.nome}</span>

        <div class="acoes">
          <button class="btn-confirmar">Eu vou</button>
          <button class="btn-recusar">Não vou</button>
        </div>
      `;

      card.querySelector(".btn-confirmar").onclick = () =>
        enviar(convidado.id, "Confirmado", card);

      card.querySelector(".btn-recusar").onclick = () =>
        enviar(convidado.id, "Recusado", card);
    }

    container.appendChild(card);
  });
}

async function enviar(id, status, card) {
  const acoes = card.querySelector(".acoes");

  if (acoes) {
    acoes.innerHTML = `
      <div class="loading-confirmacao">
        <span class="spinner"></span>
        Registrando sua resposta...
      </div>
    `;
  }

  try {
    const response = await fetch(
      `${API_URL}?action=confirmar&id=${id}&status=${encodeURIComponent(status)}`
    );

    const data = await response.json();

    if (!data.success) {
      alert(data.message);
      carregarConvidados();
      return;
    }

    carregarConvidados();

  } catch (error) {
    console.error(error);
    alert("Erro ao salvar confirmação. Tente novamente.");
    carregarConvidados();
  }
}
