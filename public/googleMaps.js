
export function initMap(GoogleMapContainer, latitude, longitude) {
    new google.maps.Map(GoogleMapContainer, {
       center: {lat: latitude, lng: longitude},
       zoom: 15
    });
}