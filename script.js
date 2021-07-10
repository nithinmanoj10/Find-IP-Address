console.log("Hello World");

const URL =
  "https://geo.ipify.org/api/v1?apiKey=at_PYGvqHqBThM53saBGsE7htlVh1VMn";

const updateMap = function (lat, lon) {
  const map = L.map("map").setView([lat, lon], 17);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);

  L.marker([lat, lon])
    .addTo(map)
    .bindPopup("A pretty CSS3 popup.<br> Easily customizable.")
    .openPopup();
};

const getLocationAPI = async function () {
  const response = await fetch(URL);
  const data = await response.json();
  const { lat, lng } = data.location;

  updateMap(lat, lng);
  console.log(lat, lng);
};

// getLocationAPI();
