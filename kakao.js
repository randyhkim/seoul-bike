// Show Kakao Map element
var mapContainer = document.getElementById("map");
var mapOption = {
  center: new kakao.maps.LatLng(37.520503, 126.869097),
  // level: 5,
  level: 7
};
var map = new kakao.maps.Map(mapContainer, mapOption);

// TODO: reduce showMarkerYellow and showMarkerGreen to a single universal function
// Show Yellow station markers on Kakao Map
export function showMarkerYellow(locationsYellow, coordinateValuesYellow) {
    console.log(locationsYellow);
    console.log(coordinateValuesYellow);
    let positions = createPositions(locationsYellow, coordinateValuesYellow);

    // Yellow circle markers
    var yellowCircleSrc = 'https://www.bikeseoul.com/img/icon_big2.png';
    
    let yellowCircle = createMarkers(positions, yellowCircleSrc);
    yellowCircle.setMap(map);   //마커가 지도 위에 표시되도록 설정합니다
}

// Show Green station markers on Kakao Map
export function showMarkerGreen(locationsGreen, coordinateValuesGreen) {
    console.log(locationsGreen);
    console.log(coordinateValuesGreen);
    let positions = createPositions(locationsGreen, coordinateValuesGreen);

    // Green circle markers
    var greenCircleSrc = 'https://www.bikeseoul.com/img/icon_big1.png';

    let greenCircle = createMarkers(positions, greenCircleSrc);
    greenCircle.setMap(map);    // 마커가 지도 위에 표시되도록 설정합니다
}

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

function createMarkers(positions, CircleSrc) {
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
