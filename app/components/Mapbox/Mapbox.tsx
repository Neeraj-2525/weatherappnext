"use client";
import React, { useEffect } from "react";
import { MapContainer, TileLayer, useMap, Marker, Popup } from "react-leaflet";
import {Icon} from 'leaflet'
import "leaflet/dist/leaflet.css";
import { useGlobalContext } from "@/app/context/globalContext";
import { Skeleton } from "@/components/ui/skeleton";

//@ts-ignore
const FlyToActiveCity = ({ activeCityCords }) => {
  const map = useMap();

  useEffect(() => {
    if (activeCityCords) {
      const zoomLev = 13;
      const flyToOptions = {
        duration: 1.5,
      };

      map.flyTo(
        [activeCityCords.lat, activeCityCords.lon],
        zoomLev,
        flyToOptions
      );
    }
  }, [activeCityCords, map]);

  return null;
}

const Mapbox = () => {
  const { forecast } = useGlobalContext(); // Your coordinates
  const activeCityCords = forecast?.coord;

  if (!forecast || !forecast.coord || !activeCityCords) {
    return (
      <Skeleton className="flex-1 basis-[50%]" />
    );
  }

  const coordinates = [activeCityCords.lat, activeCityCords.lon]
  return (
    <div className="flex-1 basis-[50%] border rounded-lg">
      <MapContainer
        center={coordinates}
        zoom={13}
        scrollWheelZoom={true}
        className="rounded-lg m-4"
        style={{ height: "calc(100% - 2rem)", width: "calc(100% - 2rem)" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        <Marker 
        position={coordinates}
        icon={new Icon({iconUrl: "/pin.png", iconSize: [25, 25], iconAnchor: [12, 12]})}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>

        <FlyToActiveCity activeCityCords={activeCityCords} />
      </MapContainer>
    </div>
  );
}

export default Mapbox;