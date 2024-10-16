const inputEl = document.querySelector(".input-el");
const cardEl = document.querySelector(".card");
const loadingEl = document.querySelector(".loading");
const searchBtn = document.querySelector(".search__btn");

function search() {
  const cityName = inputEl.value;

  if (cityName) {
    fetchData(cityName);
  } else {
    displayError("Type a city name");
  }
}

let loading = false;

async function fetchData(name) {
  loading = true;
  renderLoading();
  try {
    const apiKey = "97886286f5a4377a411388811e8c1d09";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=${apiKey}`;

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("City Not Found");
    }

    const data = await response.json();
    if (data) {
      displayWeatherData(data);
      loading = false;
      renderLoading();
    }
  } catch (e) {
    loading = false;
    renderLoading();
    displayError(e);
  }
}

function displayWeatherData(data) {
  cardEl.textContent = "";
  const {
    name,
    main: { humidity },
    base,
    sys: { country },
    weather: [{ main, description }],
  } = data;
  const displayName = document.createElement("h2");
  const displayHum = document.createElement("h2");
  const displayBase = document.createElement("h2");
  const displayCountry = document.createElement("h2");
  const displayMain = document.createElement("h2");
  const displayDesc = document.createElement("h2");

  displayName.textContent = "City : " + name;
  displayHum.textContent = "Humidity " + humidity;
  displayBase.textContent = "Base : " + base;
  displayCountry.textContent = "Country : " + country;
  displayMain.textContent = "Main : " + main;
  displayDesc.textContent = "Description : " + description;

  cardEl.appendChild(displayName);
  cardEl.appendChild(displayHum);
  cardEl.appendChild(displayBase);
  cardEl.appendChild(displayCountry);
  cardEl.appendChild(displayMain);
  cardEl.appendChild(displayDesc);
}

function displayError(error) {
  cardEl.textContent = "";
  const el = document.createElement("p");
  el.classList.add("error");
  el.textContent = error;
  cardEl.append(el);
}

function renderLoading() {
  if (loading) {
    loadingEl.style.display = "block";
  } else {
    loadingEl.style.display = "none";
  }
}
