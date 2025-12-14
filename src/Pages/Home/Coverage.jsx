import React, { useEffect, useRef, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { toast } from "react-toastify";
import "leaflet/dist/leaflet.css"


const Coverage = () => {
  const [serviceCenters, setServiceCenters] = useState([]);
  const position = [23.685, 90.3563];
  const mapRef = useRef(null);

  useEffect(() => {
    fetch("/serviceCenters.json")
      .then((res) => res.json())
      .then((data) => setServiceCenters(data))
      .catch((err) => toast.error(err));
  }, []);
  console.log(serviceCenters);

  return (
    <div>
      <h2>We are available at 64 districts</h2>

      {/* map */}
      <div className="border w-full h-[800px]">
        <MapContainer
          center={position}
          zoom={8}
          scrollWheelZoom={false}
          className="h-[800px]"
          ref={mapRef}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {serviceCenters.map((center, index) => (
            <Marker key={index}  position={[center.latitude, center.longitude]}>
              <Popup>
               <strong>{center.district}</strong>
               <br></br>Service Area: {" "}
               {center.covered_area.join(" , ")}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default Coverage;
