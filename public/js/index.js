const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const currentLocationButton = document.querySelector("#currentLocation");

//event listener callbacksw
const currentLocationCallback = (event) => {
  event.preventDefault();
  search.value = "";
  showLoadingText();
  navigator.geolocation.getCurrentPosition(async (pos) => {
    const {latitude, longitude} = pos.coords;
    const response = await fetch(`/weather?latitude=${latitude}&longitude=${longitude}`);
    const data = await response.json();
    setTextFields(data);
  })
}

const searchLocationCallback = async (event) => {
  event.preventDefault();
  showLoadingText(search.value);
  const response = await fetch(`/weather?address=${search.value}`)
  const data = await response.json();
  setTextFields(data);
}

//Helper functions 
const showLoadingText = (text = "current location") => {
  document.getElementById(
    "name"
  ).textContent = `Loading weather data for ${text}...`;
  document.getElementById("region").textContent = "";
  document.getElementById("country").textContent = "";
  document.getElementById("weather").textContent = "";
}


const setTextFields = (data) => {
  if (data.error) {
    document.getElementById("name").textContent = `${data.error}`;
    console.log(data.error);
  } else {
    const { name, region, country, weather } = data;
    document.getElementById("name").textContent = `City: ${name}`;
    document.getElementById("region").textContent = `Region: ${region}`;
    document.getElementById("country").textContent = `Country: ${country}`;
    document.getElementById("weather").textContent = `Weather: ${weather}`;
  }
}

//event listeners registered
currentLocationButton.addEventListener('click', currentLocationCallback);

weatherForm.addEventListener("submit", searchLocationCallback);