const URL =
  "https://geo.ipify.org/api/v1?apiKey=at_PYGvqHqBThM53saBGsE7htlVh1VMn";

let map;
let data;

const updateMap = function (lat, lon) {
  map = new L.map("map", { zoomControl: false }).setView([lat, lon], 17);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);

  L.marker([lat, lon]).addTo(map).openPopup();
};

const updateView = function (ipAddress, location, timezone, isp, id) {
  const elementIP = document.getElementById("ip-Address");
  const elementLocation = document.getElementById("location");
  const elementTimezone = document.getElementById("timezone");
  const elementISP = document.getElementById("isp");

  elementIP.innerHTML = ipAddress;
  elementLocation.innerHTML = location + ", " + id;
  elementTimezone.innerHTML = "UCT " + timezone;
  elementISP.innerHTML = isp;
  console.log(elementIP, elementLocation, elementTimezone, elementISP);
};

const getLocationAPI = async function (URL) {
  const response = await fetch(URL);
  data = await response.json();
  console.log(data);
};

const displayIP = function (data) {
  const { lat, lng, city, timezone, geonameId } = data.location;
  const { ip, isp } = data;

  updateMap(lat, lng);
  updateView(ip, city, timezone, isp, geonameId);
  console.log(data);
};

const showIP = function () {
  getLocationAPI(URL);
  console.log(data);
  displayIP(data);
};

showIP();

// a function to get the value in the input box after entering the submit button
const formButton = document.querySelector(".form__button");
const formInput = document.getElementById("ip_input");

formButton.addEventListener("click", function () {
  const newURL = URL + "&ipAddress=" + formInput.value;
  map.flyTo([8.69, 77]);
});

console.log(formButton);
console.log(formInput);
