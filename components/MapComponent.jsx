import React, { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

function MapComponent() {
  useEffect(() => {
    // Initialize the map
    const map = L.map('map').setView([51.505, -0.09], 13);

    // Add OpenStreetMap tiles
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Add a marker with a popup
    L.marker([51.5, -0.09]).addTo(map)
      .bindPopup('<div class="map_infocard_content"><div class="map_infocard_title">Custom Popup</div><div class="map_infocard_body"><p>This is a Leaflet popup!</p></div></div>')
      .openPopup();
  }, []);

  return (
    <div id="map" className="leaflet-container"></div>
  );
}

export default MapComponent;
