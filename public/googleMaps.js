
export function initGoogleMap(GoogleMapContainer, latitude, longitude) {
    return new google.maps.Map(GoogleMapContainer, {
       center: {lat: latitude, lng: longitude},
       zoom: 15
    });
}