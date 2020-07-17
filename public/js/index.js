const weatherForm = document.querySelector("form");
const search = document.querySelector("input");

weatherForm.addEventListener("submit", (event) => {
  event.preventDefault();
  document.getElementById(
    "name"
  ).textContent = `Loading weather data for ${search.value}...`;
  document.getElementById("region").textContent = "";
  document.getElementById("country").textContent = "";
  document.getElementById("weather").textContent = "";

  fetch(`http://localhost:3000/weather?address=${search.value}`)
    .then((res) => res.json())
    .then((res) => {
      if (res.error) {
        document.getElementById("name").textContent = `${res.error}`;
        console.log(res.error);
      } else {
        const { name, region, country, weather } = res;
        document.getElementById("name").textContent = `City: ${name}`;
        document.getElementById("region").textContent = `Region: ${region}`;
        document.getElementById("country").textContent = `Country: ${country}`;
        document.getElementById("weather").textContent = `Weather: ${weather}`;
      }
    })
    .catch((err) => {
      console.log(err);
    });
});
