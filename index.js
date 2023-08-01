let APIKEY = "cd6ff022bd93b02d6352390f077c9077";
const URL_BASE = "https://api.openweathermap.org/data/2.5/weather";
const btnBusqueda = document.querySelector("#btnBusqueda");

let difKelvin = 273.16;

btnBusqueda.addEventListener("click", () => {
  const ciudad = document.querySelector("#ciudadEntrada").value;
  if (ciudad) {
    datosClima(ciudad);
  }
});

function datosClima(ciudad) {
  fetch(`${URL_BASE}?q=${ciudad}&appid=${APIKEY}&lang=es`)
    .then((resp) => resp.json())
    .then((resp) => mostrarDatosClima(resp));
}

function mostrarDatosClima(resp) {
  const divDatosClima = document.querySelector("#datosClima");
  divDatosClima.innerHTML = "";

  const cuidadNombre = resp.name;
  const paisNombre = resp.sys.country;
  const temperatura = resp.main.temp;
  const humedad = resp.main.humidity;
  const temperaturaMax = resp.main.temp_max;
  const temperaturaMin = resp.main.temp_min;
  const descripcion = resp.weather[0].description;
  const icono = resp.weather[0].icon;

  const containerDiv = document.createElement("div");
  containerDiv.classList.add("clima-container");

  const leftColumn = document.createElement("div");
  leftColumn.classList.add("clima-column");

  const cuidadTitulo = document.createElement("h2");
  cuidadTitulo.textContent = `${cuidadNombre}, ${paisNombre}`;
  leftColumn.appendChild(cuidadTitulo);

  const tempInfo = document.createElement("p");
  tempInfo.textContent = `La temperatura es: ${Math.floor(temperatura - difKelvin)} °C`;
  leftColumn.appendChild(tempInfo);


  const rightColumn = document.createElement("div");
  rightColumn.classList.add("clima-column");

  const iconoInfo = document.createElement("img");
  iconoInfo.src = `https://openweathermap.org/img/wn/${icono}@2x.png`;
  rightColumn.appendChild(iconoInfo);

  const humInfo = document.createElement("p");
  humInfo.textContent = `La humedad es: ${humedad}%`;
  rightColumn.appendChild(humInfo);

  const temp = document.createElement("p");
  temp.textContent = `MAX ${Math.ceil(temperaturaMax - difKelvin)}°C - MIN ${Math.floor(temperaturaMin - difKelvin)}°C `;
  rightColumn.appendChild(temp);


  containerDiv.appendChild(leftColumn);
  containerDiv.appendChild(rightColumn);

  divDatosClima.appendChild(containerDiv);
}
