function acessarConvite() {
  const codigo = document.getElementById("codigo").value.trim().toUpperCase();

  if (CONVITES[codigo]) {
    localStorage.setItem("convite", codigo);
    window.location.href = "convidados.html";
  } else {
    document.getElementById("erro").innerText = "Código inválido. Verifique e tente novamente.";
  }
}


