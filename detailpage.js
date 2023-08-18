const modeEl = document.getElementById("mode");
body = document.body;

// Add click event listener on Dark mode Button

let isDark = JSON.parse(localStorage.getItem("mode"));

if (isDark) {
  body.classList.add("dark");
  selectMode(true);
} else {
  body.classList.remove("dark");
  selectMode(false);
}

modeEl.addEventListener("click", () => {
  body.classList.toggle("dark");
  if (body.classList.contains("dark")) {
    localStorage.setItem("mode", JSON.stringify(true));
    selectMode(true);
  } else {
    localStorage.setItem("mode", JSON.stringify(false));
    selectMode(false);
  }
});

function selectMode(isDark) {
  if (isDark) {
    modeEl.innerHTML = '<i class="fa-solid fa-sun"></i><p>Light Mode';
    document.body.classList.add("dark");
  } else {
    document.body.classList.remove("dark");
    modeEl.innerHTML = '<i class="fa-regular fa-moon"></i><p>Dark Mode</p>';
  }
}

const backEl = document.getElementById("back");

backEl.addEventListener("click", () => {
  history.back();
});

const flag = document.querySelector(".flag-img");
const name = document.getElementById("name");
const otherDetails = document.querySelector(".other-details");

const nativeName = document.getElementById("native-name");
const population = document.getElementById("population");
const region = document.getElementById("region");
const subregion = document.getElementById("subregion");
const capital = document.getElementById("capital");
const topLevelDomain = document.getElementById("topLevelDomain");
const currencies = document.getElementById("currencies");
const languages = document.getElementById("languages");
const borderCountry = document.querySelector(".border-country");

showData();

function showData() {
  const data = JSON.parse(localStorage.getItem("country"));

  name.innerText = data[0].name;
  flag.src = data[0].flag;
  nativeName.innerText = data[0].nativeName;
  population.innerText = data[0].population;
  region.innerText = data[0].region;
  subregion.innerText = data[0].subregion;
  capital.innerText = data[0].capital;
  topLevelDomain.innerText = data[0].topLevelDomain;
  currencies.innerHTML = `<span>Code: </span>${data[0].currencies[0].code}, <span>Name: </span>${data[0].currencies[0].name}, <span>Symbol: </span>${data[0].currencies[0].symbol}`;

  const langName = data[0].languages.map(
    (element) => element.name + ` ( ${element.nativeName} )`
  );
  languages.innerHTML = langName.join(", ");

  borderCountry.innerHTML = data[0].borders
    ? data[0].borders
        .map((element) => `<span class="b-country">${element}</span>`)
        .join("")
    : "Border Countries Not Available";

  if (data[0].borders) {
    borderCountry.classList.remove("not-available");
  } else {
    borderCountry.classList.add("not-available");
  }

  let bCountry = document.querySelectorAll(".b-country");
  const allCountries = JSON.parse(localStorage.getItem("allCountries"));

  bCountry = Array.from(bCountry);

  bCountry.filter((b) => {
    b.addEventListener("click", () => {
      let a = allCountries.filter((c) => c.alpha3Code === b.innerText);
      localStorage.setItem("country", JSON.stringify(a));
      showData();
    });
  });
}
