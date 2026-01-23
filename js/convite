function validarCodigo() {
  const codigo = document.getElementById("codigo").value.trim().toUpperCase();
  const erro = document.getElementById("erro");

  if (!convites[codigo]) {
    erro.innerText = "Código inválido. Verifique e tente novamente 💙";
    return;
  }

  // salva o código e redireciona
  localStorage.setItem("codigoConvite", codigo);
  window.location.href = "convidados.html";
}
