function validarCodigo(event) {
  event.preventDefault();
  
  const codigo = document.getElementById("codigo").value.trim().toUpperCase();
  const erro = document.getElementById("erro");

  if (convites[codigo]) {
    localStorage.setItem("codigoConvite", codigo);
    window.location.href = "confirmacao.html";
  } else {
    mostrarErro("Código inválido 😕");
  }
  
}
