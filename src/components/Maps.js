import React, { useEffect } from 'react';

const Maps = () => {
  useEffect(() => {
    const initAutocomplete = () => {
      const input = document.getElementById('searchInput');
      const autocomplete = new window.google.maps.places.Autocomplete(input);

      // Listen for place changes
      autocomplete.addListener('place_changed', () => {
        const place = autocomplete.getPlace();
        console.log(place); // You can do something with the selected place
      });

      // Create the autocomplete search box
      const searchBox = new window.google.maps.places.SearchBox(input);

      // Listen for the event fired when the user selects a prediction and retrieve
      // more details for that place.
      searchBox.addListener('places_changed', () => {
        const places = searchBox.getPlaces();

        if (places.length === 0) {
          return;
        }

        const suggestions = document.getElementById('suggestions');
        suggestions.innerHTML = '';

        // Create a list of suggestions
        places.forEach(place => {
          const name = place.name;
          const address = place.formatted_address;
          suggestions.innerHTML += '<div>' + name + ' - ' + address + '</div>';
        });
      });
    };

    // Load Google Maps API script and initialize autocomplete
    const loadScript = () => {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyANx7woFc4uXzI5JWnt1Wwtltmi-fGoEPY&libraries=places&callback=initAutocomplete`;
      script.async = true;
      document.body.appendChild(script);
    };

    loadScript();

    // Clean up
    return () => {
      const googleScript = document.querySelector('script[src^="https://maps.googleapis.com"]');
      if (googleScript) {
        googleScript.remove();
      }
    };
  }, []);

  return (
    <div>
      <input id="searchInput" type="text" placeholder="Enter a location" />
      <div id="suggestions"></div>
    </div>
  );
};

export default Maps;
