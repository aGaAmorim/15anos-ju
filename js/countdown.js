const dataFesta = new Date("2026-12-11T20:00:00").getTime();

function atualizarContagem() {

  const agora = new Date().getTime();
  const diferenca = dataFesta - agora;

  const dias = Math.floor(diferenca / (1000 * 60 * 60 * 24));
  const horas = Math.floor((diferenca % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutos = Math.floor((diferenca % (1000 * 60 * 60)) / (1000 * 60));

  document.getElementById("timer").innerHTML =
    `${dias} dias • ${horas}h • ${minutos}min`;

}

setInterval(atualizarContagem, 1000);
