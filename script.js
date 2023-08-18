const filterBtn = document.querySelector(".filter-btn");
const filterText = document.querySelector(".filter-text");
const dropDown = document.querySelector(".drop-down");

// Add click event listener on Filter Button
filterBtn.addEventListener("click", () => {
  dropDown.classList.add("show");
  filterBtn.classList.add("active");
  if (dropDown.classList.contains("show")) {
    document.body.addEventListener("mousedown", () => {
      dropDown.classList.remove("show");
      filterBtn.classList.remove("active");
    });
  }
});

const modeEl = document.getElementById("mode");

body = document.body;
// Add click event listener on Dark mode Button
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

// Get isDark from local Storage
let isDark = getLocalStorageItem();
// set to Local Storage wheatear it is dark or light
localStorage.setItem("mode", JSON.stringify(isDark || false));
if (isDark) {
  body.classList.add("dark");
  selectMode(true);
} else {
  body.classList.remove("dark");
  selectMode(false);
}

// Change The Text of the Light mode and Dark mode
function selectMode(isDark) {
  if (isDark) {
    modeEl.innerHTML = '<i class="fa-solid fa-sun"></i><p>Light Mode';
    document.body.classList.add("dark");
  } else {
    document.body.classList.remove("dark");
    modeEl.innerHTML = '<i class="fa-regular fa-moon"></i><p>Dark Mode</p>';
  }
}

// Get items from Local Storage
function getLocalStorageItem() {
  let isDark = JSON.parse(localStorage.getItem("mode"));
  selectMode(isDark);
  return isDark;
}

let countries = [];
// Fetch data form Data.json File
const myPromise = fetch("data.json")
  .then((data) => data.json())
  .then((result) => {
    addAllCountry(result);
    countries = result;
    localStorage.setItem("allCountries", JSON.stringify(result));
  })
  .catch(() => console.error("Something went to wrong"));

const allCountryEl = document.querySelector(".all-country");
const filterType = document.querySelectorAll(".filter-type");

function addAllCountry(allData) {
  // For Filtering Element

  filterType.forEach((type) => {
    type.addEventListener("click", () => {
      filterType.forEach((type) => type.classList.remove("active"));
      type.classList.add("active");
      filterText.innerHTML = type.innerHTML;
      dropDown.classList.remove("show");
      filterBtn.classList.remove("active");
      allCountryEl.innerHTML = "";

      let showData = countries.filter((country) => {
        if (type.getAttribute("id") !== "all") {
          return country.region.toLowerCase() === type.getAttribute("id");
        } else {
          return country;
        }
      });

      showAllData(showData);
      const countryEl = document.querySelectorAll(".country");
      showCountryDetails(showData, countryEl);
    });
  });

  showAllData(allData);

  const countryEl = document.querySelectorAll(".country");
  // localStorage.setItem("country", "");
  showCountryDetails(allData, countryEl);
}

function showCountryDetails(allData, countryEl) {
  countryEl.forEach((country) => {
    country.addEventListener("click", () => {
      const showCountry = allData.filter(
        (data) => data.name.toLowerCase() === country.dataset.name.toLowerCase()
      );
      localStorage.setItem("country", JSON.stringify(showCountry));
    });
  });
}

function showAllData(showData) {
  showData.forEach((data) => {
    let country = document.createElement("a");
    country.classList.add("country");
    country.dataset.region = data.region;
    country.dataset.name = data.name;
    country.href = "./detailPage.html";
    country.innerHTML = `
     <img
      src="${data.flags.svg}"
      alt="Country Image"
      class="country-img"
      loading="lazy"
    />
    <div class="country-details no-margin">
      <h2 class="country-name">${data.name}</h2>
      <p class="country-population">
        <span>Population:</span> ${data.population}
      </p>
      <p class="country-region"><span>Region:</span> ${data.region}</p>
      <p class="country-capital"><span>Capital:</span> ${
        data.capital || "has no capital"
      }</p>
    </div>
    `;
    allCountryEl.appendChild(country);
  });
}

// For search Element
const searchEl = document.getElementById("search");

searchEl.addEventListener("input", () => {
  if (searchEl.value) {
    const isVisible = countries.filter((country) =>
      country.name.toLowerCase().includes(searchEl.value.toLowerCase())
    );
    filterType.forEach((type) => {
      type.classList.remove("active");
    });

    allCountryEl.innerHTML = "";
    showAllData(isVisible);

    const countryEl = document.querySelectorAll(".country");
    showCountryDetails(isVisible, countryEl);
  } else {
    showAllData(countries);
  }
});
