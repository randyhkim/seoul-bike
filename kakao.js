var mapContainer = document.getElementById("map");
var mapOption = {
  center: new kakao.maps.LatLng(37.520503, 126.869097),
  level: 5,
};
var map = new kakao.maps.Map(mapContainer, mapOption);

var node = document.getElementsByClassName("stationName");
var stationName = node.textContent;
var node1 = document.getElementsByClassName("coordinates");
var coordinatesString = node1.textContent;

//TODO: automate process
var positions = [
  {
    title: "703",
    latlng: new kakao.maps.LatLng(37.52406311, 126.87557983),
  },
  {
    title: "785",
    latlng: new kakao.maps.LatLng(37.51732635, 126.86630249),
  },
  {
    title: stationName,
    latlng: new kakao.maps.LatLng(),
  },
];

// Yellow circle markers
var yellowCircleSrc = "https://www.bikeseoul.com/img/icon_big2.png";

for (var i = 0; i < positions.length; i++) {
  var yellowCircleSize = new kakao.maps.Size(15, 18), // 마커이미지의 크기입니다
    yellowCircleOption = { offset: new kakao.maps.Point(3, 12) }; //마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.

  // 마커의 이미지정보를 가지고 있는 마커이미지를 생성합니다
  var yellowCircleImage = new kakao.maps.MarkerImage(
    yellowCircleSrc,
    yellowCircleSize,
    yellowCircleOption
  );

  // 마커를 생성합니다
  var yellowCircle = new kakao.maps.Marker({
    map: map,
    position: positions[i].latlng,
    title: positions[i].title,
    image: yellowCircleImage, // 마커이미지 설정
  });
}

// Green circle markers
// var greenCircleSrc = 'https://www.bikeseoul.com/img/icon_big1.png',
//     greenCircleSize = new kakao.map.Size(15, 18),
//     greenCircleOption = {offset: new kakao.maps.Point(3, 12)};
//
// var greenCircleImage = new kakao.maps.MarkerImage(greenCircleSrc, greenCircleSize, greenCircleOption),
//     greenCirclePosition = new kakao.maps.LatLng(37.5240631, 126.87557983);
//
// var greenCircle = new kakao.maps.Marker({
//     position: greenCirclePosition,
//     image: greenCircleImage
// });

// 마커가 지도 위에 표시되도록 설정합니다
yellowCircle.setMap(map);
// greenCircle.setMap(map);
