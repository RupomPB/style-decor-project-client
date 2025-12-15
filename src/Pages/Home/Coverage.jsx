import React, { useEffect, useRef, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { toast } from "react-toastify";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

/* Fix default marker issue */
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const Coverage = () => {
  const [serviceCenters, setServiceCenters] = useState([]);
  const position = [23.685, 90.3563]; // Bangladesh center
  const mapRef = useRef(null);

  useEffect(() => {
    fetch("/serviceCenters.json")
      .then((res) => res.json())
      .then((data) => setServiceCenters(data))
      .catch(() => toast.error("Failed to load service coverage data"));
  }, []);

  return (
    <section className="max-w-7xl mx-auto px-6 py-20">
      {/* Section Header */}
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-bold text-base-content">
          Our <span className="text-primary">Service Coverage</span>
        </h2>
        <p className="mt-4 text-base-content/70 max-w-2xl mx-auto">
          We proudly provide decoration services across all 64 districts of
          Bangladesh with dedicated local support.
        </p>
      </div>

      {/* Map Container */}
      <div className="border border-base-300 rounded-2xl overflow-hidden shadow-xl">
        <MapContainer
          center={position}
          zoom={7}
          scrollWheelZoom={false}
          className="h-[600px] w-full"
          ref={mapRef}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {serviceCenters.map((center, index) => (
            <Marker
              key={index}
              position={[center.latitude, center.longitude]}
            >
              <Popup>
                <div className="space-y-1">
                  <h4 className="font-semibold text-sm">
                    {center.district}
                  </h4>
                  <p className="text-xs text-gray-600">
                    <span className="font-medium">Covered Areas:</span>{" "}
                    {center.covered_area.join(", ")}
                  </p>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </section>
  );
};

export default Coverage;
