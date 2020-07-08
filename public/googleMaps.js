/* Google Maps API Module */

export function initMap(GoogleMapContainer, latitude, longitude) {
    let map =new google.maps.Map(GoogleMapContainer, {
       center: {lat: latitude, lng: longitude},
       zoom: 15
    });

    let locations = [
        {lat: 37.530566, lng: 126.862992},
        {lat: 37.530277, lng: 126.864376},
        {lat: 37.526364, lng: 126.864828}
    ]

    // array of characters to be used to label the markers
    let labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

    // Add some markers to the map.
    // Note: the map() function has nothing to do with the Google Maps API.
    let markers = locations.map(function(location, i) {
        return new google.maps.Marker({
            position: location,
            label: labels[i % labels.length]
        });
    });

    // Add a marker clusterer to manage the markers.
    let markerCluster = new MarkerClusterer(map, markers,
        {imagePath: './cluster/m'});
}
