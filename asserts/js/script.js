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
poidsEssieu.value = "0 kg";
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
numPese.value = "0 kg";
categoryVehi.value = "---";
longueur.value = "0 mm";
poindsTotal.value = "0 kg";
surchage.value = "0";
infractionGabarit.value = "0";

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
function get() {}

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

// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal
btn.onclick = function () {
  modal.style.display = "block";
};

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
  modal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
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
  poidsEssieu.value = "0 kg";
  messageAlert.value = "---";

  date2.value = currentDateTime;
  numPese.value = "0 kg";
  categoryVehi.value = "---";
  longueur.value = "0 mm";
  poindsTotal.value = "0 kg";
  surchage.value = "0";
  infractionGabarit.value = "0";

  save();

  await sleep(5000);
  alertFinPesage.style.display = "none";
}
