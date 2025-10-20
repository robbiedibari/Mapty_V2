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
  alert("You clicked at position " + e.latlng);
  console.log("You clicked map at " + e.latlng);
}
_getPosition();
