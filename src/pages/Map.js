import { DirectionsRenderer, DirectionsService, GoogleMap, LoadScript } from '@react-google-maps/api';
import React, { useCallback, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

function MapContainer() {
  const [mapCenter, setMapCenter] = useState({ lat: 40.712776, lng: -74.005974 });
  const [directions, setDirections] = useState(null);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const address = searchParams.get('address');

  useEffect(() => {
    if (address) {
      const geocoder = new window.google.maps.Geocoder();
  
      geocoder.geocode({ address }, (results, status) => {
        if (status === 'OK') {
          const destination = results[0].geometry.location;
          setMapCenter({
            lat: destination.lat(),
            lng: destination.lng(),
          });
        } else {
          console.error('Geocode başarısız oldu: ' + status);
        }
      });
    }
  }, [address]); // Adres değiştiğinde yalnızca çalışır
  

  const directionsCallback = useCallback((result, status) => {
    if (status === 'OK') {
      setDirections(result);
    } else {
      console.log('Yönlendirme işlemi başarısız oldu: ' + status);
    }
  }, []);

  return (
    <LoadScript googleMapsApiKey="AIzaSyBdGwH-dt5b9nbibcY7H3B9pzd20vcncsQ">
      <GoogleMap
        center={mapCenter}
        zoom={14}
        mapContainerStyle={{ height: '500px', width: '100%' }} // Harita boyutunu artırdık
      >
        {address && (
          <DirectionsService
            options={{
              destination: address,
              origin: { lat: 40.712776, lng: -74.005974 }, // Sabit bir başlangıç noktası
              travelMode: 'DRIVING',
            }}
            callback={directionsCallback}
          />
        )}

        {directions && <DirectionsRenderer directions={directions} />}
      </GoogleMap>
    </LoadScript>
  );
}

export default MapContainer;
