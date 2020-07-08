/* In this module, three functions are for public use:
      1. showMap(latitude, longitude);
      2. showMarker(map, locations, coordinateValues, color='green');
      3. showLocationMarker(map, latitude, longitude);
   The rest are private and best left untouched! */


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


/* Show station markers on Kakao Map */
export function showMarker(map, locations, coordinateValues, color='green') {
    // map refers to map entity on which marker is showed
    // locations is list of name of stations
    // coordinateValues is list of latitude and longitude values of stations
    // color is either 'green' or 'yellow' and specifies color of marker
    console.log(locations);
    console.log(coordinateValues);

    let positions = [];
    for (let i=0; i<locations.length; i++) {
        positions.push({
            title: locations[i],
            latlng: new kakao.maps.LatLng(coordinateValues[2*i], coordinateValues[2*i+1])
        });
    }

    if (color == 'green') {
        let CircleSrc = 'https://www.bikeseoul.com/img/icon_big1.png'
        drawMarker(map, positions, CircleSrc);
    }
    else {
        let CircleSrc = 'https://www.bikeseoul.com/img/icon_big2.png';
        drawMarker(map, positions, CircleSrc);
    }
}

/* Shows my location as gif marker on Kakao Map */
export function showLocationMarker(map, latitude, longitude) {
    // map refers to map entity on which marker is showed
    // latitude and longitude refers to coordinate values at which marker is drawn
    let positions = {
        title: '현재 위치',
        latlng: new kakao.maps.LatLng(latitude, longitude)
        // latlng: new kakao.maps.LatLng(37.5363535, 126.85730799999999)
    };
    let markerSize = new kakao.maps.Size(40, 40);
    let markerOption = {offset: new kakao.maps.Point(20, 30)};
    let markerSrc = 'https://www.bikeseoul.com/img/my_location_bp.gif';
    let markerImage = new kakao.maps.MarkerImage(markerSrc, markerSize, markerOption);

    let marker = new kakao.maps.Marker({
       map: map,
       position: positions.latlng,
       title: positions.title,
       image: markerImage
    });
    marker.setMap(map);
}


/* =================================================== */
/* The following functions are intended to be private. */

// 마커를 생성합니다
function createMarker(map, positions, CircleSrc) {
    let CircleSize = new kakao.maps.Size(15, 18),   // 마커이미지의 크기입니다
        CircleOption = {offset: new kakao.maps.Point(3, 12)};   // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.
    // 마커의 이미지정보를 가지고 있는 마커이미지를 생성합니다
    let CircleImage = new kakao.maps.MarkerImage(CircleSrc, CircleSize, CircleOption)

    // TODO: see if there's a way to use let instead of var
    for (let i = 0; i < positions.length; i++) {
        // 마커를 생성합니다
        var CircleMarker = new kakao.maps.Marker({
            map: map,
            position: positions[i].latlng,
            title: positions[i].title,
            image: CircleImage // 마커이미지 설정
        });
    }
    return CircleMarker;
}

// 마커가 지도 위에 표시되도록 설정합니다.
function drawMarker(map, positions, CircleSrc) {
    let CircleMarker = createMarker(map, positions, CircleSrc);
    CircleMarker.setMap(map);
}
