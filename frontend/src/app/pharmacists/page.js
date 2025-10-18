"use client";
import React, { useState, useEffect } from "react";
import styles from "../../styles/Pharmacists.module.css";

export default function Pharmacists() {
  const [map, setMap] = useState(null);
  const [pharmacies, setPharmacies] = useState([]);
  const [location, setLocation] = useState("");
  const [useGeolocation, setUseGeolocation] = useState(true);
  const [hoveredPharmacy, setHoveredPharmacy] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [markers, setMarkers] = useState([]);
  const logoUrl = "/images/location.png";

  const defaultLocation = { lat: 12.9716, lng: 77.5946 };

  useEffect(() => {
   const loadGoogleMapsScript = () => {
  const existingScript = document.querySelector(
    'script[src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAIvOQ5TMxm9IdWuZeipj4OyASsOyiKLTo&libraries=places"]'
  );
  
  if (!existingScript) {
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyAIvOQ5TMxm9IdWuZeipj4OyASsOyiKLTo&libraries=places`;
    script.async = true;
    script.defer = true;
    script.onload = () => initMap();
    document.head.appendChild(script);
  } else {
    // If the script is already loaded, directly initialize the map
    if (window.google) {
      initMap();
    } else {
      existingScript.addEventListener("load", initMap);
    }
  }
};


    const initMap = () => {
      if (useGeolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const userCoordinates = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            };
            setUserLocation(userCoordinates);
            initializeMap(userCoordinates);
          },
          () => {
            console.warn("Geolocation failed. Using default location.");
            setUserLocation(defaultLocation);
            initializeMap(defaultLocation);
          }
        );
      } else {
        setUserLocation(defaultLocation);
        initializeMap(defaultLocation);
      }
    };

    loadGoogleMapsScript();
  }, [useGeolocation]);

  const initializeMap = (location) => {
    const mapOptions = {
      center: location,
      zoom: 13,
    };

    const newMap = new window.google.maps.Map(
      document.getElementById("map"),
      mapOptions
    );
    setMap(newMap);
    fetchNearbyPharmacies(location, newMap);
  };

  const fetchNearbyPharmacies = (location, mapInstance) => {
    if (!location) {
      console.error("User location is not set.");
      return;
    }

    const service = new window.google.maps.places.PlacesService(mapInstance);

    const request = {
      location: new window.google.maps.LatLng(location.lat, location.lng),
      radius: "40000",
      type: ["store", "hospital", "pharmacy"],
      keyword: `
        agriculture supplies, farm equipment, herbicide, pesticide, agriculture store, farm supplies, fertilizers,
        agronomist, crop advisor, irrigation equipment, organic farming tools, crop insurance, veterinary supplies
      `,
    };

    service.nearbySearch(request, (results, status) => {
      if (status === window.google.maps.places.PlacesServiceStatus.OK) {
        const pharmaciesWithDistance = results
          .filter((pharmacy) => pharmacy.business_status === "OPERATIONAL")
          .map((pharmacy) => ({
            ...pharmacy,
            distance: calculateDistance(
              location.lat,
              location.lng,
              pharmacy.geometry.location.lat(),
              pharmacy.geometry.location.lng()
            ),
          }));
        setPharmacies(pharmaciesWithDistance);
        placeMarkers(pharmaciesWithDistance, mapInstance);
      } else {
        console.warn("No relevant places found");
      }
    });
  };

  const calculateDistance = (lat1, lng1, lat2, lng2) => {
    const R = 6371; // Radius of the Earth in kilometers
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLng = ((lng2 - lng1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLng / 2) *
        Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return (R * c).toFixed(2);
  };


  const placeMarkers = (pharmacies, mapInstance) => {
    const newMarkers = [];
    pharmacies.forEach((pharmacy, index) => {
      const marker = new window.google.maps.Marker({
        position: pharmacy.geometry.location,
        map: mapInstance,
        icon: {
          url: logoUrl,
          scaledSize: new window.google.maps.Size(50, 50),
        },
      });

      newMarkers.push(marker);

      const infoWindow = new window.google.maps.InfoWindow({
        content: `
          <div style="font-family: Arial, sans-serif; max-width: 350px; padding: 10px; line-height: 1.5;">
            <h3 style="margin-bottom: 8px; color: #007bff;">${pharmacy.name}</h3>
            <p style="margin: 0; font-size: 14px; color: #333;"><strong>Address:</strong> ${pharmacy.vicinity}</p>
            <p style="margin: 5px 0; font-size: 14px; color: #333;">
              <strong>Rating:</strong> ${pharmacy.rating || "N/A"} 
              <span style="color: gold;">${"★".repeat(Math.round(pharmacy.rating))}${"☆".repeat(
          5 - Math.round(pharmacy.rating)
        )}</span>
            </p>
            <p style="margin: 5px 0; font-size: 14px; color: #333;"><strong>Distance:</strong> ${pharmacy.distance} km</p>
            ${
              pharmacy.photos
                ? `<img src="${pharmacy.photos[0].getUrl({
                    maxHeight: 200,
                    maxWidth: 300,
                  })}" alt="${pharmacy.name}" style="display: block; margin-top: 10px; max-width: 100%; height: auto; border-radius: 8px;" />`
                : ""
            }
            ${
              pharmacy.formatted_phone_number
                ? `<p style="margin: 5px 0; font-size: 14px; color: #333;"><strong>Phone:</strong> ${pharmacy.formatted_phone_number}</p>`
                : ""
            }
            <a href="https://www.google.com/maps/dir/?api=1&destination=${pharmacy.geometry.location.lat()},${pharmacy.geometry.location.lng()}" target="_blank" rel="noopener noreferrer">
              <button style="margin-top: 10px; padding: 10px; background-color: #28a745; color: white; border: none; border-radius: 5px; cursor: pointer; font-size: 14px;">
                Get Directions
              </button>
            </a>
          </div>
        `,
      });

      marker.addListener("click", () => {
        infoWindow.open(mapInstance, marker);
        setHoveredPharmacy(pharmacy);
      });

      marker.addListener("mouseover", () => {
        setHoveredPharmacy(pharmacy);
      });

      marker.addListener("mouseout", () => {
        setHoveredPharmacy(null);
      });
    });
    setMarkers(newMarkers);
  };

  const handleLocationSubmit = () => {
    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ address: location }, (results, status) => {
      if (status === window.google.maps.GeocoderStatus.OK) {
        const userCoordinates = results[0].geometry.location;
        setUserLocation({
          lat: userCoordinates.lat(),
          lng: userCoordinates.lng(),
        });
        initializeMap({ lat: userCoordinates.lat(), lng: userCoordinates.lng() });
      } else {
        alert("Location not found");
      }
    });
  };

  const handleCardHover = (pharmacy, index) => {
    setHoveredPharmacy(pharmacy);
    markers[index]?.setAnimation(window.google.maps.Animation.BOUNCE);
  };

  const handleCardLeave = (index) => {
    setHoveredPharmacy(null);
    markers[index]?.setAnimation(null);
  };

  return (
    <div>
       <div className={styles.header}>
       <h1>Find Nearby Agricultural Resources, Supplies and Agronomists</h1>
    </div>
  
    <div className={styles.container}>
      <div className={styles.mapContainer}>
        <div id="map" className={styles.map}></div>
      </div>
      <div className={styles.cardContainer}>
        <div className={styles.controls}>
          <label>
            <input
              type="radio"
              checked={useGeolocation}
              onChange={() => setUseGeolocation(true)}
            />
            Use My Location
          </label>
          <label>
            <input
              type="radio"
              checked={!useGeolocation}
              onChange={() => setUseGeolocation(false)}
            />
            Enter Location Manually
          </label>
          {!useGeolocation && (
            <div className={styles.manualLocation}>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Enter your location"
              />
              <button onClick={handleLocationSubmit}>Search</button>
            </div>
          )}
        </div>
        {pharmacies.map((pharmacy, index) => (
          <div
            key={index}
            className={`${styles.card} ${
              hoveredPharmacy === pharmacy ? styles.hoveredCard : ""
            }`}
            onMouseEnter={() => handleCardHover(pharmacy, index)}
            onMouseLeave={() => handleCardLeave(index)}
          >
            <h3>{pharmacy.name}</h3>
            <p><strong>Address:</strong> {pharmacy.vicinity}</p>
           <p>
            <strong>Rating:</strong> {pharmacy.rating || "N/A"}{" "}
            <span style={{ color: "gold" }}>
              {"★".repeat(Math.round(pharmacy.rating || 0))}
              {"☆".repeat(5 - Math.round(pharmacy.rating || 0))}
            </span>
          </p>
            <p><strong>Distance:</strong> {pharmacy.distance} km</p>
            {pharmacy.formatted_phone_number && (
              <p><strong>Phone:</strong> {pharmacy.formatted_phone_number}</p>
            )}
            <a
              href={`https://www.google.com/maps/dir/?api=1&destination=${pharmacy.geometry.location.lat()},${pharmacy.geometry.location.lng()}`}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.directionLink}
            >
              Get Directions
            </a>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
}