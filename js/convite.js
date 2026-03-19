function validarCodigo(event) {
  event.preventDefault();
  
  const codigo = document.getElementById("codigo").value.trim().toUpperCase();
  console.log("Código digitado: ", codigo);
  if (convites[codigo]) {
    localStorage.setItem("codigoConvite", codigo);
    window.location.href = "convidados.html";
  } else {
    mostrarErro("Código inválido 😕");
  }  
}

function mostrarErro(msg) {
  document.getElementById("erro").innerText = msg;
}
