const URL =
  "https://geo.ipify.org/api/v1?apiKey=at_PYGvqHqBThM53saBGsE7htlVh1VMn";

let map;

// a function that creates the map
// shows the current location when the site is opened/refreshed
const newMap = function (lat, lon) {
  map = new L.map("map", { zoomControl: false }).setView([lat, lon], 17);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);

  L.marker([lat, lon]).addTo(map).openPopup();
};

// a function that updates the map
const updateMap = function (lat, lng) {
  map.panTo([lat, lng]);
};

// a function that updates and shows us the values
const updateView = function (ipAddress, location, timezone, isp, id) {
  const elementIP = document.getElementById("ip-Address");
  const elementLocation = document.getElementById("location");
  const elementTimezone = document.getElementById("timezone");
  const elementISP = document.getElementById("isp");

  elementIP.innerHTML = ipAddress;
  elementLocation.innerHTML = location + ", " + id;
  elementTimezone.innerHTML = "UCT " + timezone;
  elementISP.innerHTML = isp;
};

// a function that gets the data
// and passes it on to updateMap() and updateView()
const displayIP = function (data) {
  const { lat, lng, city, timezone, geonameId } = data.location;
  const { ip, isp } = data;

  newMap(lat, lng);
  updateView(ip, city, timezone, isp, geonameId);
};

// a function that updates the IP info in view
const displayNewIP = function (data) {
  const { lat, lng, city, timezone, geonameId } = data.location;
  const { ip, isp } = data;

  updateMap(lat, lng);
  updateView(ip, city, timezone, isp, geonameId);
};

// a function that returns the object data as a JSON from the API
const getAPI = async function (URL) {
  try {
    const response = await fetch(URL);

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      alert("Wrong IP Address Entered");
    }
  } catch (err) {
    alert("Invalid IP Address");
  }
};

const getData = async function (URL) {
  const data = await getAPI(URL);

  displayIP(data);
};

const updateData = async function (URL) {
  const data = await getAPI(URL);
  displayNewIP(data);
};

getData(URL);

const formButton = document.querySelector(".form__button");
const formInput = document.getElementById("ip_input");

formButton.addEventListener("click", function () {
  const newURL = URL + "&ipAddress=" + formInput.value;
  formInput.value = "";
  updateData(newURL);
});
