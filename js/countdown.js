/*const dataFesta = new Date("2026-12-11T19:00:00").getTime();

function atualizarContagem() {

  const agora = new Date().getTime();
  const diferenca = dataFesta - agora;

  const dias = Math.floor(diferenca / (1000 * 60 * 60 * 24));
  const horas = Math.floor((diferenca % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutos = Math.floor((diferenca % (1000 * 60 * 60)) / (1000 * 60));
  const segundos = Math.floor((diferenca % (1000 * 60)) / 1000);

  document.getElementById("dias").innerText = dias;
  document.getElementById("horas").innerText = horas;
  document.getElementById("minutos").innerText = minutos;
  document.getElementById("segundos").innerText = segundos;
}

setInterval(atualizarContagem, 1000);
atualizarContagem();
*/

const dataFesta = new Date(2026, 11, 11, 19, 0, 0);

function atualizarContagem() {

    const agora = new Date();

    let anos = dataFesta.getFullYear() - agora.getFullYear();
    let meses = dataFesta.getMonth() - agora.getMonth();
    let dias = dataFesta.getDate() - agora.getDate();
    let horas = dataFesta.getHours() - agora.getHours();
    let minutos = dataFesta.getMinutes() - agora.getMinutes();
    let segundos = dataFesta.getSeconds() - agora.getSeconds();

    if (segundos < 0) {
        segundos += 60;
        minutos--;
    }

    if (minutos < 0) {
        minutos += 60;
        horas--;
    }

    if (horas < 0) {
        horas += 24;
        dias--;
    }

    if (dias < 0) {
        const ultimoDiaMesAnterior = new Date(
            dataFesta.getFullYear(),
            dataFesta.getMonth(),
            0
        ).getDate();

        dias += ultimoDiaMesAnterior;
        meses--;
    }

    if (meses < 0) {
        meses += 12;
        anos--;
    }

    document.getElementById("meses").innerText = anos * 12 + meses;
    document.getElementById("dias").innerText = dias;
    document.getElementById("horas").innerText = horas;
    document.getElementById("minutos").innerText = minutos;
    document.getElementById("segundos").innerText = segundos;
}

setInterval(atualizarContagem, 1000);
atualizarContagem();
