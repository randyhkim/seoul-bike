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


/* Create Kakao Positions object with station names (locations) and coordinate values */
export function createPositions(locations, coordinateValues) {
    let greenPositions = [];
    for (let i=0; i<locations.length; i++) {
        greenPositions.push({
            title: locations[i],
            latlng: new kakao.maps.LatLng(coordinateValues[2*i], coordinateValues[2*i+1])
        });
    }
    return greenPositions;
}


/* Create a list of markers */
export function createMarkerList(map, positions, circleSrc) {
    let circleSize = new kakao.maps.Size(15, 18),   // 마커이미지의 크기입니다
        circleOption = {offset: new kakao.maps.Point(3, 12)};   // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.
    let circleImage = new kakao.maps.MarkerImage(circleSrc, circleSize, circleOption)   // 마커의 이미지정보를 가지고 있는 마커이미지를 생성합니다

    let circleMarkerList = [];
    for (let i = 0; i < positions.length; i++) {
        // 마커를 생성합니다
        let CircleMarker = new kakao.maps.Marker({
            map: map,
            position: positions[i].latlng,
            title: positions[i].title,
            image: circleImage // 마커이미지 설정
        });
        circleMarkerList.push(CircleMarker)
    }
    return circleMarkerList;
}


/* Show station markers on Kakao Map */
export function showMarker(map, markerList) {
    // map refers to map entity on which marker is showed
    // markerList refers to list of markers
    drawMarker(map, markerList);
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
    // let positions = {
    //     title: '현재 위치',
    //     latlng: new kakao.maps.LatLng(latitude, longitude)
    // };
    let markerSize = new kakao.maps.Size(40, 40);
    let markerOption = {offset: new kakao.maps.Point(20, 30)};
    let markerImage = new kakao.maps.MarkerImage(myLocationSrc, markerSize, markerOption);

    let marker = new kakao.maps.Marker({
        map: map,
        // position: positions.latlng,
        position: new kakao.maps.LatLng(latitude, longitude),
        // title: positions.title,
        title: '현재 위치',
        image: markerImage
    });
    marker.setMap(map);
}


/* =================================================== */
/* The following functions are intended to be private. */

// 마커가 지도 위에 표시되도록 설정합니다.
function drawMarker(map, markerList) {
    for (let i = 0; i < markerList.length; i++) {
        markerList[i].setMap(map);
    }
}

// function clearGreenMarker(map, positions) {
//     let circleMarkerList = createMarkerList(map, positions, GREEN_CIRCLE_SRC);
//     for (let i = 0; i < circleMarkerList.length; i++) {
//         circleMarkerList[i].setMap(null);
//     }
// }