'use client'
import React, { useState } from "react";
import { GoogleMap, Marker, useJsApiLoader, Autocomplete, StandaloneSearchBox } from "@react-google-maps/api";

const mapContainerStyle = {
  width: "100%",
  height: "700px",
};

// Set the default center to Bangladesh (Dhaka coordinates)
const center = {
  lat: 23.6850, // Latitude for Bangladesh (Dhaka)
  lng: 90.3563, // Longitude for Bangladesh (Dhaka)
};

interface LatLng {
  lat: number;
  lng: number;
}

const Home: React.FC = () => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: `${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`,
    libraries: ["places"],
  });

  const [markerPosition, setMarkerPosition] = useState<LatLng>(center);
  const [address, setAddress] = useState<string>("");

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  const geocodeAddress = (address: string) => {
    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ address: address }, (results, status) => {
      if (status === "OK" && results && results[0]) {
        const location = results[0].geometry.location;
        setMarkerPosition({ lat: location.lat(), lng: location.lng() });
      } else {
        alert("Geocode was not successful for the following reason: " + status);
      }
    });
  };

  const reverseGeocode = (latLng: LatLng) => {
    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ location: latLng }, (results, status) => {
      if (status === "OK" && results && results[0]) {
        setAddress(results[0].formatted_address);
      } else {
        alert("Reverse geocode failed: " + status);
      }
    });
  };

  const handleMarkerDragEnd = (event: google.maps.MapMouseEvent) => {
    if (event.latLng) {
      const lat = event.latLng.lat();
      const lng = event.latLng.lng();
      console.log(lat,lng);
      
      setMarkerPosition({ lat, lng });
      reverseGeocode({ lat, lng });
    }
  };

  const handleAddressChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(event.target.value);
  };

  const handleAddressSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    geocodeAddress(address);
  };

  return (
    <div>
      <form onSubmit={handleAddressSubmit} className="flex">
        <StandaloneSearchBox>
          <input
            type="text"
            onChange={handleAddressChange}
            placeholder="Enter your address"
            className=" border outline-none rounded px-5 py-1"
          />
        </StandaloneSearchBox>

        <button type="submit" className=" bg-[#13bc2e] border rounded text-white px-5 py-1">Find Location</button>
      </form>
      <div className=" text-center">{address}</div>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={markerPosition}
        zoom={7}
        options={{
          mapTypeControl: true
        }}
        onClick={(event) => {
          if (event.latLng) {
            const lat = event.latLng.lat();
            const lng = event.latLng.lng();
            setMarkerPosition({ lat, lng });
            reverseGeocode({ lat, lng });
          }
        }}
      >
        <Marker
          position={markerPosition}
          draggable={true}
          onDragEnd={handleMarkerDragEnd}
        />
      </GoogleMap>
    </div>
  );
};

export default Home;
