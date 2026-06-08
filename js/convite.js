const API_URL =
  "https://script.google.com/macros/s/AKfycbw3CbALrF6YwnXNiHs-UCnZzZeCbDFi9aihl7y4F6irkD7b9A7ctrsb2Yy8HVNaLAi7/exec";

async function validarCodigo(event) {
  event.preventDefault();

  const codigo = document
    .getElementById("codigo")
    .value
    .trim()
    .toUpperCase();

  try {

    const response = await fetch(
      `${API_URL}?action=buscar&codigo=${encodeURIComponent(codigo)}`
    );

    const data = await response.json();

    if (data.success) {

      localStorage.setItem(
        "codigoConvite",
        codigo
      );

      window.location.href =
        "convidados.html";

    } else {

      mostrarErro(
        "Código inválido 😕"
      );

    }

  } catch (error) {

    console.error(error);

    mostrarErro(
      "Erro ao consultar convite 😕"
    );
  }
}

function mostrarErro(msg) {
  document.getElementById("erro").innerText = msg;
}
