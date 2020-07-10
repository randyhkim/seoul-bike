import * as kakao from './kakao.js'
import * as naver from './naverMap.js'
import * as google from './googleMaps.js'

// Define button, resultBox, mapContainer elements
let button = document.getElementById("search");
let resultBox = document.getElementById("results");
let KakaoMapContainer = document.getElementById("KakaoMap");
let NaverMapContainer = document.getElementById("NaverMap")
let GoogleMapContainer = document.getElementById("GoogleMap");

// Variable integer values declared for ease of edit
// 서울시에서 대여소 리스트를 계속 업데이트하기 때문에 START, END 값이 계속 변경됨.
// YELLOW_STATION_START를 포함한 이후 순번 대여소부터는 신형(QR형, Yellow) 대여소임.
// 그 이전은 구형(LCD형, Green) 대여소임.
// 이하 코드에서는 Green과 Yellow는 각각 구형(LCD)과 신형(QR) 대여소를 지칭함을 알림.
let YANGCHEONGU_START = 3;      // 700. KB국민은행 염창역 지점 앞
let YANGCHEONGU_END = 83;       // 797.목동아파트 1422동 1434동 사잇길
let YELLOW_STATION_START = 57   // 767. 신정숲속마을아파트

// Url sources for marker images
let GREEN_CIRCLE_SRC = 'https://www.bikeseoul.com/img/icon_big1.png';
let YELLOW_CIRCLE_SRC = 'https://www.bikeseoul.com/img/icon_big2.png';
let MY_LOCATION_SRC = 'https://www.bikeseoul.com/img/my_location_bp.gif';

// list of indices of all stations in Yangcheon-gu
let stationList = [];
for (let i = YANGCHEONGU_START; i < YANGCHEONGU_END; i++) {stationList.push(i);}

let locationsGreen = [];         // list of text of Green stationName
let coordinateValuesGreen = [];  // list of floats of Green stationLatitude and stationLongitude
let locationsYellow = [];         // list of text of Yellow stationName
let coordinateValuesYellow = [];  // list of floats of Yellow stationLatitude and stationLongitude
let seoul_bike_api_key = config.SEOUL_BIKE_API_KEY;


// main function starts when web page is loaded
window.onload = function() {
    main();
}

/* The main function */
function main() {
    // Function when user is successfully located
    function success(position) {
        let myLatitude = position.coords.latitude;
        let myLongitude = position.coords.longitude;
        console.log(myLatitude, myLongitude);

        // Kakao Map init
        let kakaoMap = kakao.showMap(KakaoMapContainer, myLatitude, myLongitude);    // draw map and return map entity
        kakao.showLocationMarker(kakaoMap, myLatitude, myLongitude, MY_LOCATION_SRC);     // show marker on user location

        // Naver Map init
        let naverMap = naver.initMap(NaverMapContainer, myLatitude, myLongitude);
        naver.showLocationMarker(naverMap, myLatitude, myLongitude);
        naver.showBicycleLayer(naverMap);

        // Google Map init
        google.initMap(GoogleMapContainer, myLatitude, myLongitude);

        // Function when button is clicked
        button.onclick = function() {
          let kakaoMap = kakao.showMap(KakaoMapContainer, myLatitude, myLongitude);
          kakao.showLocationMarker(kakaoMap, myLatitude, myLongitude, MY_LOCATION_SRC);
          update();
          // TODO: clear markers first when clicking again
          setTimeout(function() {
            console.log(locationsGreen);
            console.log(coordinateValuesGreen);
            console.log(locationsYellow);
            console.log(coordinateValuesYellow);

            let greenPositions = kakao.createPositions(locationsGreen, coordinateValuesGreen);
            let yellowPositions = kakao.createPositions(locationsYellow, coordinateValuesYellow);
            let greenMarkerList = kakao.createMarkerList(kakaoMap, greenPositions, GREEN_CIRCLE_SRC);
            let yellowMarkerList = kakao.createMarkerList(kakaoMap, yellowPositions, YELLOW_CIRCLE_SRC);

            kakao.showMarker(kakaoMap, greenMarkerList);
            kakao.showMarker(kakaoMap, yellowMarkerList);
          }, 1000);
          // without timeout, showMarker will attempt to access locations and coordinateValues before they are updated
          // refer https://stackoverflow.com/questions/48120547/array-list-length-is-zero-but-array-is-not-empty for more
        };
    }
    // Alerts error when geolocation is true but location cannot be retrieved
    function error() {
        alert('ERROR: Unable to retrieve your location');
    }

    // Check if geolocation is retrieved
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(success, error);
    }
    else {
        alert("This browser does not support HTML Geolocation.");
    }
}


// AJAX from bike api and parse responseText into json
function update() {
  resultBox.innerHTML = "";     // Clear resultBox
  locationsGreen = [];
  coordinateValuesGreen = [];
  locationsYellow = [];
  coordinateValuesYellow = [];  // Clear location and coordinates list
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      let msg = JSON.parse(this.responseText);
      console.log(msg);
      alert(msg.rentBikeStatus.RESULT.MESSAGE);
      stationList.forEach((i) => {
        stationUpdate(msg, i);
      });
    }
  };
  xhttp.open(
    "GET",
    "http://openapi.seoul.go.kr:8088/" + seoul_bike_api_key + "/json/bikeList/497/500/",
    true
  );
  xhttp.send();
}

/* Each station's info is shown on the web page
   and name/latitude/longitude is appended to either locationsGreen and coordinateValuesGreen
   or locationsYellow and coordinateValuesYellow depending on index value */
function stationUpdate(msg, index) {
  resultBox.innerHTML +=
    "<div class=stationName>" +
    msg.rentBikeStatus.row[index].stationName +
    "</div>" +
    "<div class=contents>parkingBikeTotCnt = " +
    msg.rentBikeStatus.row[index].parkingBikeTotCnt +
    "</div>" +
    "<div class=contents>rackTotCnt = " +
    msg.rentBikeStatus.row[index].rackTotCnt +
    "</div>" +
    "<div class=contents>shared = " +
    msg.rentBikeStatus.row[index].shared +
    "</div>" +
    "<div class=coordinates>" +
    msg.rentBikeStatus.row[index].stationLatitude +
    ", " +
    msg.rentBikeStatus.row[index].stationLongitude +
    "</div>";

  // If index is smaller than YELLOW_STATION_START, the station is Green (LCD)
  if (index < YELLOW_STATION_START) {
    locationsGreen.push(msg.rentBikeStatus.row[index].stationName);
    coordinateValuesGreen.push(parseFloat(msg.rentBikeStatus.row[index].stationLatitude));
    coordinateValuesGreen.push(parseFloat(msg.rentBikeStatus.row[index].stationLongitude));
  }
  // Else, the station is Yellow (QR)
  else {
    locationsYellow.push(msg.rentBikeStatus.row[index].stationName);
    coordinateValuesYellow.push(parseFloat(msg.rentBikeStatus.row[index].stationLatitude));
    coordinateValuesYellow.push(parseFloat(msg.rentBikeStatus.row[index].stationLongitude));
  }
}
