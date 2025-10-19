class App {
  #map;
  #mapZoomLevel = 10;
  #mapevent;

  constructor() {
    // get user postion:
    this._getPosition();
  }

  _getPosition() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        this._loadMap.bind(this),
        function () {
          alert("Cannot get your position");
        },
      );
    }
  }

  _loadMap(position) {
    const { latitude } = position.coords;
    const { longitude } = position.coords;
    console.log(`https://www/google.pt/maps/@${latitude},${longitude}`);
    const coords = [latitude, longitude];
    this.#map = L.map("map").setView(coords, this.#mapZoomLevel);

    //var map = L.map("map").setView([51.505, -0.09], 13);
    L.tileLayer(
      "https://{s}.basemaps.cartocdn.com/rastertiles/voyager_labels_under/{z}{x}/{y}{r}.png",
      {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright>OpenStreetMap</a> contributors &copy; <a href"https://carto.com/attributions">CARTO</a>',
        subdomains: "abcd",
      },
    ).addTo(this.#map);
  }

  //     var marker = L.marker([51.5, -0.09]).addTo(map);

  //     var circle = L.circle([51.508, -0.11], {
  //       color: "red",
  //       fillColor: "#f03",
  //       fillOpacity: 0.5,
  //       radious: 5000,
  //     }).addTo(map);

  //     var polygon = L.polygon([
  //       [51.509, -0.08],
  //       [51.503, -0.06],
  //       [51.51, -0.047],
  //     ]).addTo(map);

  //     var popup = L.popup()
  //       .setLatLng([51.513, -0.09])
  //       .setContent("I am a standalone popup.")
  //       .openOn(map);

  //   function onMapClick(e) {
  //     alert("You clicked the map at " + e.latlng);

  //   map.on("click", onMapClick);

  // }
}
const app = new App();
