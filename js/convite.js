function validarCodigo(event) {
  event.preventDefault();
  
  const codigo = document.getElementById("codigo").value.trim().toUpperCase();
  const erro = document.getElementById("erro");

  if (!codigo) {
    alert("Digite o código do convite 💙");
    return;
  }
  if (codigo === "JU123") {
    window.location.href = "confirmacao.html?codigo=" + codigo;
  } else {
    alert("Código inválido 😕");
  }
}
