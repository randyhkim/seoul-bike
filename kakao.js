// Show Kakao Map element
let mapContainer = document.getElementById("map");
let mapOption = {
  center: new kakao.maps.LatLng(37.520503, 126.869097),
  // level: 5,
  level: 7
};
let map = new kakao.maps.Map(mapContainer, mapOption);

// Show station markers on Kakao Map
export function showMarker(locations, coordinateValues, color='green') {
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
        drawMarker(positions, CircleSrc);
    }
    else {
        let CircleSrc = 'https://www.bikeseoul.com/img/icon_big2.png';
        drawMarker(positions, CircleSrc);
    }
}

// 마커를 생성합니다
function createMarker(positions, CircleSrc) {
    for (var i = 0; i < positions.length; i++) {
        var CircleSize = new kakao.maps.Size(15, 18), // 마커이미지의 크기입니다
            CircleOption = {offset: new kakao.maps.Point(3, 12)}; //마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.

        // 마커의 이미지정보를 가지고 있는 마커이미지를 생성합니다
        var CircleImage = new kakao.maps.MarkerImage(CircleSrc, CircleSize, CircleOption)

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
function drawMarker(positions, CircleSrc) {
    let CircleMarker = createMarker(positions, CircleSrc);
    CircleMarker.setMap(map);
}

// show my location as marker on Kakao Map
// TODO: use HTML Geolocation API
export function showLocationMarker() {
    let positions = {
        title: '현재 위치',
        // latlng: new kakao.maps.LatLng(position.coords.latitude, position.coords.longitude)
        latlng: new kakao.maps.LatLng(37.5363535, 126.85730799999999)
    };

    let markerSize = new kakao.maps.Size(40, 40);
    let markerOption = {offset: new kakao.maps.Point(3, 12)};
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
