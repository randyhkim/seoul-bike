/* Naver Map API Module */


/* Draws Naver Map on mapContainer centered at inputted latitude and longitude */
export function initMap(mapContainer, latitude, longitude) {
    let mapOptions = {
        center: new naver.maps.LatLng(latitude, longitude),
        zoom: 15
    };
    return new naver.maps.Map(mapContainer, mapOptions);
    // initMap returns map entity which is used in the following functions
}


/* Show bicycle layer on map entity */
export function showBicycleLayer(map) {
    let bicycleLayer = new naver.maps.BicycleLayer();
    naver.maps.Event.once(map, 'init_stylemap', function() {
       bicycleLayer.setMap(map);
    });
}


/* Shows my location as marker on map entity */
export function showLocationMarker(map, latitude, longitude) {
    let markerOptions = {
        position: new naver.maps.LatLng(latitude, longitude),
        map: map,
        title: '현재 위치',
        icon: {
            url: 'https://www.bikeseoul.com/img/my_location_bp.gif',
            // size: new naver.maps.Size(30, 30),
            // origin: new naver.maps.Point(10, 0),
            anchor: new naver.maps.Point(11, 35)
        }
    }
    let marker = new naver.maps.Marker(markerOptions);
}
