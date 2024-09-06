import { DirectionsRenderer, DirectionsService, GoogleMap, LoadScript } from '@react-google-maps/api';
import React, { useCallback, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

function MapContainer() {
  const [mapCenter, setMapCenter] = useState({ lat: 43.65107, lng: -79.347015 }); // Centered on Ontario (Toronto)
  const [directions, setDirections] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false); // Loading state for the map
  const [loadingDirections, setLoadingDirections] = useState(false); // Track direction loading
  const [obstacles, setObstacles] = useState([]); // Store obstacles like bumps or potholes

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const origin = searchParams.get('origin');
  const destination = searchParams.get('destination');

  // Directions callback when route is calculated
  const directionsCallback = useCallback((result, status) => {
    if (status === 'OK') {
      setDirections(result);
      setLoadingDirections(false); // Stop loading directions
      fetchObstaclesNearRoute(result); // Fetch obstacles near the calculated route
    } else {
      console.log('Directions request failed due to ' + status);
      setLoadingDirections(false);
    }
  }, []);

  // Fetch obstacles (e.g., bumps, potholes) near the route using Overpass API
  const fetchObstaclesNearRoute = (route) => {
    const overpassUrl = 'https://overpass-api.de/api/interpreter?data=[out:json];node["highway"="path"]["wheelchair"="no"](43.6,-79.7,43.9,-79.0);out;';
    
    fetch(overpassUrl)
      .then(response => response.json())
      .then(data => {
        const nearbyObstacles = data.elements.filter(element => {
          // Check if obstacles are near the route's coordinates
          const lat = element.lat;
          const lon = element.lon;
          // Add your own logic to check if the obstacles are near the route
          return true; // For simplicity, assume all fetched obstacles are relevant
        });
        setObstacles(nearbyObstacles);
      })
      .catch(err => console.error("Failed to load obstacles: ", err));
  };

  useEffect(() => {
    if (origin && destination && isLoaded) {
      setLoadingDirections(true); // Set loading to true when starting request
      const geocoder = new window.google.maps.Geocoder();

      // Geocode origin
      geocoder.geocode({ address: origin }, (results, status) => {
        if (status === 'OK') {
          const originLocation = results[0].geometry.location;

          // Geocode destination
          geocoder.geocode({ address: destination }, (results, status) => {
            if (status === 'OK') {
              const destinationLocation = results[0].geometry.location;
              setMapCenter({
                lat: originLocation.lat(),
                lng: originLocation.lng(),
              });

              // Request directions
              const request = {
                origin: originLocation,
                destination: destinationLocation,
                travelMode: 'DRIVING',
              };

              const directionsService = new window.google.maps.DirectionsService();
              directionsService.route(request, directionsCallback);
            } else {
              alert('Geocode failed for destination: ' + status);
              setLoadingDirections(false); // Error case
            }
          });
        } else {
          alert('Geocode failed for origin: ' + status);
          setLoadingDirections(false); // Error case
        }
      });
    }
  }, [origin, destination, isLoaded, directionsCallback]);

  return (
    <div style={{ display: 'flex', height: '100vh', width: '100%' }}>
      <LoadScript
        googleMapsApiKey="AIzaSyBdGwH-dt5b9nbibcY7H3B9pzd20vcncsQ" // Use your actual API key
        onLoad={() => setIsLoaded(true)}
        onError={() => alert('Failed to load Google Maps API')}
      >
        {isLoaded ? (
          <GoogleMap
            center={mapCenter}
            zoom={12} // Adjust zoom level to be focused on Ontario
            mapContainerStyle={{ height: '100%', width: '70%' }} // Full-height map, 70% width
          >
            {loadingDirections && <p>Loading directions...</p>}
            {origin && destination && (
              <DirectionsService
                options={{
                  destination: destination,
                  origin: origin,
                  travelMode: 'DRIVING',
                }}
                callback={directionsCallback}
              />
            )}
            {directions && <DirectionsRenderer directions={directions} />}
          </GoogleMap>
        ) : (
          <p>Loading map...</p> // Show loading map message before the map is ready
        )}
      </LoadScript>
      
      {/* Side Panel for displaying obstacle warnings */}
      <div 
        style={{
          width: '30%', 
          padding: '20px', 
          backgroundColor: '#f0f0f0', 
          borderLeft: '2px solid #ddd',
          overflowY: 'auto', // Allow scrolling if the content overflows
        }}
      >
        <h3 style={{ fontSize: '24px', color: '#333', marginBottom: '20px' }}>Accessibility Warnings</h3>
        {obstacles.length > 0 ? (
          <ul style={{ listStyleType: 'none', padding: '0' }}>
            {obstacles.map((obstacle, index) => (
              <li 
                key={index} 
                style={{
                  backgroundColor: '#ffe6e6', 
                  padding: '10px', 
                  marginBottom: '10px', 
                  borderLeft: '5px solid #ff4d4d', 
                  fontSize: '18px', 
                  color: '#900',
                  borderRadius: '4px'
                }}
              >
                Obstacle at lat: {obstacle.lat}, lon: {obstacle.lon}
              </li>
            ))}
          </ul>
        ) : (
          <p style={{ fontSize: '16px', color: '#666' }}>No obstacles found near your route.</p>
        )}
      </div>
    </div>
  );
}

export default MapContainer;
