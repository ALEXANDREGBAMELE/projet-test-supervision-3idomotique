/**
 * @author : Alexandre Gbamélé
 * @Date : 12/07/2024
 * @Description : une application web de supervision
 */

const date1 = document.querySelector(".date .date1");
const poidsEssieu = document.querySelector(".poids .poidsEssieu");
const messageAlert = document.querySelector(".message .alert");
let currentDateTime = "---";
date1.value = currentDateTime;
poidsEssieu.value = "---";
messageAlert.value = "---";

let barriereDetection,
  feuBicolor,
  bariereAutomatique,
  barriereGbarit,
  panneauGabarit,
  capteurFin = false;
const date2 = document.querySelector("td input.date2");
const numPese = document.querySelector("td input.numepese");
const categoryVehi = document.querySelector("td input.categoryVehi");
const longueur = document.querySelector("td input.longueur");
const poindsTotal = document.querySelector("td input.poindsTotal");
const surchage = document.querySelector("td input.surchage");
const infractionGabarit = document.querySelector("td input.infractionGabarit");
// const icon = document.querySelector("i").style.color = '#ff4757';

date2.value = currentDateTime;
numPese.value = "---";
categoryVehi.value = "---";
longueur.value = "---";
poindsTotal.value = "---";
surchage.value = "---";
infractionGabarit.value = "---";

// Storage Data

function save() {
  let nbrePese = localStorage.getItem("nbrePese");
  if (nbrePese !== 0) {
    nbrePese++;
    localStorage.setItem("nbrePese", ` ${nbrePese} `);
  } else {
    localStorage.setItem("nbrePese", ` ${nbrePese} `);
  }
}

let loaders = document.querySelectorAll(".loader");
let etatBorneDetection = document.querySelectorAll(".fa-xmark");
let color;
let condition = false;

etatBorneDetection.forEach((element) => {
  if (condition) {
    color = "#2ed573";
  } else {
    color = "#ff4757";
  }
  element.style.color = color;
});

let loading = false;
loaders.forEach((loader) => {
  loading ? (loader.style.display = "block") : (loader.style.display = "none");
});

let messageEtat = document.querySelectorAll(".etat");
messageEtat.forEach((element) => {
  element.innerHTML = false ? "EN SERVICE" : "HORS SERVICE";
});

let conditionAlert = false;
let alertFinPesage = document.querySelector(".alertFinPesage");
conditionAlert
  ? (alertFinPesage.style.display = "block")
  : (alertFinPesage.style.display = "none");

var modal = document.getElementById("myModal");

var btn = document.getElementById("myBtn");

var span = document.getElementsByClassName("close")[0];

btn.onclick = function () {
  modal.style.display = "block";
};

span.onclick = function () {
  modal.style.display = "none";
};

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function onClickYes() {
  modal.style.display = "none";
  let length = Math.min(etatBorneDetection.length, messageEtat.length);

  for (let i = 0; i < length; i++) {
    await sleep(2000);
    if (i >= 0) {
      loading = true;
      loaders.forEach((loader) => {
        loading
          ? (loader.style.display = "block")
          : (loader.style.display = "none");
      });
    }
    if (i === length - 1) {
      loaders.forEach((loader) => {
        loader.style.display = "none";
      });
    }

    let elementEtatBorne = etatBorneDetection[i];
    condition = true;
    let color = condition ? "#2ed573" : "#ff4757";
    elementEtatBorne.style.color = color;

    let elementMessageEtat = messageEtat[i];
    elementMessageEtat.innerHTML = condition ? "EN SERVICE" : "HORS SERVICE";
  }

  loading = false;
  conditionAlert = true;
  conditionAlert
    ? (alertFinPesage.style.display = "block")
    : (alertFinPesage.style.display = "none");

  let currentDate = new Date();

  let year = currentDate.getFullYear();
  let month = currentDate.getMonth() + 1;
  let day = currentDate.getDate();

  let hours = currentDate.getHours();
  let minutes = currentDate.getMinutes();

  let formattedDate = `${day}/${month}/${year} ${hours}:${minutes}`;

  let currentDateTime = formattedDate;
  date1.value = currentDateTime;
  poidsEssieu.value = "4500 kg";
  messageAlert.value = "Ce vehicule est en surpoids";

  date2.value = currentDateTime;
  numPese.value = "PA001";
  categoryVehi.value = "P11";
  longueur.value = "4200 mm";
  poindsTotal.value = "15600 kg";
  surchage.value = "600 kg";
  infractionGabarit.value = "---";

  save();

  await sleep(5000);
  alertFinPesage.style.display = "none";
}
