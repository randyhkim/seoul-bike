/* Kakao Map API Module */


/* Shows Kakao Map and returns 'map' entity */
export function showMap(mapContainer, latitude, longitude) {
    // mapContainer refers to the HTML element on which Kakao Map is drawn
    // latitude and longitude are coordinate values at which
    // the map will be centered when initially shown on the webpage
    let mapOption = {
      center: new kakao.maps.LatLng(latitude, longitude),
      level: 5
    };
    return new kakao.maps.Map(mapContainer, mapOption);
    // Map entity is inputted in other functions to specify which map to perform those functions on
}


/* Shows marker on Kakao Map */
export function showMarker(map, locations, coordinateValues, markerSrc) {
    // map refers to 'map' entity returned from showMap()
    // locations refers to list of station names
    // coordinateValues refers to list of coordinates of stations
    // markerSrc is the url for marker image
    let positions = createPositions(locations, coordinateValues);
    let markerList = createMarkerList(map, positions, markerSrc);
    for (let i = 0; i < markerList.length; i++) {
        markerList[i].setMap(map);
    }
}


// /* Clear station markers on Kakao Map */
// export function clearMarker(markerList) {
//     for (let i = 0; i < markerList.length; i++) {
//         markerList[i].setMap(null);
//     }
// }


/* Shows my location marker on Kakao Map */
export function showLocationMarker(map, latitude, longitude, myLocationSrc) {
    // map refers to map entity on which marker is showed
    // latitude and longitude refers to coordinate values at which marker is drawn
    let markerSize = new kakao.maps.Size(40, 40);
    let markerOption = {offset: new kakao.maps.Point(20, 30)};
    let markerImage = new kakao.maps.MarkerImage(myLocationSrc, markerSize, markerOption);

    let marker = new kakao.maps.Marker({
        map: map,
        position: new kakao.maps.LatLng(latitude, longitude),
        title: '현재 위치',
        image: markerImage
    });
    marker.setMap(map);
}


/* =================================================== */
/* The following functions are intended to be private. */

/* Create Kakao Positions object with station names (locations) and coordinate values */
function createPositions(locations, coordinateValues) {
    let positions = [];
    for (let i=0; i<locations.length; i++) {
        positions.push({
            title: locations[i],
            latlng: new kakao.maps.LatLng(coordinateValues[2*i], coordinateValues[2*i+1])
        });
    }
    return positions;
}


/* Create a list of markers */
function createMarkerList(map, positions, markerSrc) {
    let markerSize = new kakao.maps.Size(15, 18),   // 마커이미지의 크기입니다
        markerOption = {offset: new kakao.maps.Point(3, 12)};   // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.
    let markerImage = new kakao.maps.MarkerImage(markerSrc, markerSize, markerOption)   // 마커의 이미지정보를 가지고 있는 마커이미지를 생성합니다

    let markerList = [];
    for (let i = 0; i < positions.length; i++) {
        // 마커를 생성합니다
        let marker = new kakao.maps.Marker({
            map: map,
            position: positions[i].latlng,
            title: positions[i].title,
            image: markerImage // 마커이미지 설정
        });
        markerList.push(marker)
    }
    return markerList;
}
