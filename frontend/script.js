var map;
var defaultZoom = 17;

function _getPosition() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(_loadMap);
  } else {
    alert("Geolocation is not supported by this browser");
    _loadMap({ coords: { latitude: 51.505, longitude: -0.09 } });
  }
}

function _loadMap(position) {
  const { latitude, longitude } = position.coords;

  map = L.map("map").setView([latitude, longitude], defaultZoom);

  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution:
      '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(map);

  L.marker([latitude, longitude])
    .addTo(map)
    .bindPopup("You are here!")
    .openPopup();

  map.on("click", onMapClick);
}

function onMapClick(e) {
  // Get lat and long
  const lat = e.latlng.lat;
  const lng = e.latlng.lng;

  fetch("http://127.0.0.1:8000/api/coordinates", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      latitude: lat,
      longitude: lng,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("succes", data);
      alert("Coordinates saved");
    })
    .catch((error) => {
      console.error("Error", error);
    });
}
_getPosition();
