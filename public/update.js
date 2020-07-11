import * as kakao from './kakao.js'
import * as naver from './naverMap.js'
import * as google from './googleMaps.js'

// Define button, resultBox, mapContainer elements
let button = document.getElementById("search");
let resultBox = document.getElementById("results");
let kakaoMapContainer = document.getElementById("KakaoMap");
let naverMapContainer = document.getElementById("NaverMap")
let googleMapContainer = document.getElementById("GoogleMap");

/* 서울시에서 대여소 리스트를 계속 업데이트하기 때문에 START, END 값이 계속 변경됨.
   YELLOW_STATION_START를 포함한 이후 순번 대여소부터는 신형(QR형, Yellow) 대여소임.
   그 이전은 구형(LCD형, Green) 대여소임.
   이하 코드에서는 Green과 Yellow는 각각 구형(LCD)과 신형(QR) 대여소를 지칭함을 알림.
   또한, First API Call, Second API Call으로 구분돼있는 이유는 서울 공공자전거 API
   를 한 번 요청 시, 1000개 대여소 이상으로 정보를 주지 않기 때문에
   두 번에 나누어서 요청한다. */

/* First API Call */
let BIKE_START = 1;             // 따릉이 API 요청 시작 index
let BIKE_END = 1000;             // 따릉이 API 요청 끝 index
/* 양천구 */
let YANGCHEON_START = 498;              // 700. KB국민은행 염창역 지점 앞
let YANGCHEON_END = 577;                // 797.목동아파트 1422동 1434동 사잇길
// let YANGCHEON_YELLOW_START = 552;       // 767. 신정숲속마을아파트
/* 강서구1 */
let GANGSEO_START = 797;                // 1101. 개화동상사마을종점 버스정류장
let GANGSEO_END = 878;                  // 1200. 개화광역환승센터
// let GANGSEO_YELLOW_START = 1201;        // yellow stations start at 2703
/* 영등포구1 */
let YEONGDEUNGPO_START = 88;            // 200. 국회의원회관
let YEONGDEUNGPO_END = 180;             // 299. 여의도 순복음교회
// let YEONGDEUNGPO_YELLOW_START = 176;    // 295. 영등포공원 분수대 앞

/* Second API Call */
// API로 대여소 1000개 이상 정보 요청시 두 번에 나눠서 요청해야함.
let BIKE_START2 = 1001;
let BIKE_END2 = 2000;
/* 강서구2 */
let GANGSEO_START2 = 800;               // 2701. 마곡나루역 5번출구 뒤편
let GANGSEO_END2 = 841;                 // 2746. 수명산파크 4단지 411동 앞
// let GANGSEO_YELLOW_START = 803;         // 2703. 서울도시가스 앞

// ST-1993 (767. 신정숲속마을아파트) is the first yellow station (for now).
// TODO: this value is only provisional; actual value required
// TODO: import API data into Excel file for better data analysis
// All stations with id numbers larger than this are yellow stations
let FIRST_YELLOW_STATION_ID = 1993;

// Url sources for marker images
let GREEN_CIRCLE_SRC = 'https://www.bikeseoul.com/img/icon_big1.png';
let YELLOW_CIRCLE_SRC = 'https://www.bikeseoul.com/img/icon_big2.png';
let MY_LOCATION_SRC = 'https://www.bikeseoul.com/img/my_location_bp.gif';

// list of indices of all stations in area
let stationList1 = [];      // indices from first API call only
let stationList2 = [];      // indices from second API call only

let locationsGreen = [];            // list of text of Green stationName
let coordinateValuesGreen = [];     // list of floats of Green stationLatitude and stationLongitude
let locationsYellow = [];           // list of text of Yellow stationName
let coordinateValuesYellow = [];    // list of floats of Yellow stationLatitude and stationLongitude

// API key for seoul bike API is saved in a private file
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
        let kakaoMap = kakao.showMap(kakaoMapContainer, myLatitude, myLongitude);    // draw map and return map entity
        kakao.showLocationMarker(kakaoMap, myLatitude, myLongitude, MY_LOCATION_SRC);     // show marker on user location

        // Naver Map init
        let naverMap = naver.initMap(naverMapContainer, myLatitude, myLongitude);
        naver.showLocationMarker(naverMap, myLatitude, myLongitude);
        naver.showBicycleLayer(naverMap);

        // Google Map init
        google.initMap(googleMapContainer, myLatitude, myLongitude);

        /* Function when button is clicked */
        button.onclick = function() {
          // Clear kakaoMapContainer and reinitialize Kakao Map
          kakaoMapContainer.innerHTML = "";
          let kakaoMap = kakao.showMap(kakaoMapContainer, myLatitude, myLongitude);
          kakao.showLocationMarker(kakaoMap, myLatitude, myLongitude, MY_LOCATION_SRC);

          // read selected area
          let e = document.getElementById("areaSelect");
          let area = e.options[e.selectedIndex].value;
          console.log(area);
          // clear stationList before adding new station indices
          stationList1 = [];
          stationList2 = [];
          // add station indices to stationList1 and stationList2
          if (area === "gangseo") {
            for (let i = GANGSEO_START; i <= GANGSEO_END; i++) {stationList1.push(i);}
            for (let i = GANGSEO_START2; i <= GANGSEO_END2; i++) {stationList2.push(i);}
          }
          else if (area === "yangcheon") {
            for (let i = YANGCHEON_START; i <= YANGCHEON_END; i++) {stationList1.push(i);}
          }
          else if (area === "yeongdeungpo") {
            for (let i = YEONGDEUNGPO_START; i <= YEONGDEUNGPO_END; i++) {stationList1.push(i);}
          }

          // update locations and coordinateValues
          update();
          setTimeout(function() {
            console.log(locationsGreen);
            console.log(coordinateValuesGreen);
            console.log(locationsYellow);
            console.log(coordinateValuesYellow);
            // show green and yellow markers on Kakao Map
            kakao.showMarker(kakaoMap, locationsGreen, coordinateValuesGreen, GREEN_CIRCLE_SRC);
            kakao.showMarker(kakaoMap, locationsYellow, coordinateValuesYellow, YELLOW_CIRCLE_SRC);
          }, 1500);
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
  resetElements();
  request1();
  // slight delay to ensure request2 is followed by request1
  setTimeout(function() {
      request2();
    }, 10);
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

  // if stationId is smaller than id of first yellow station, the station is Green (LCD)
  // stationId is a string in the form "ST-####", so only the number is sliced and
  // compared with the stationId of the first yellow station
  if (parseInt(msg.rentBikeStatus.row[index].stationId.slice(3, )) <= FIRST_YELLOW_STATION_ID) {
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

/* Clears resultBox and */
function resetElements() {
  resultBox.innerHTML = "";     // Clear resultBox
  locationsGreen = [];
  coordinateValuesGreen = [];
  locationsYellow = [];
  coordinateValuesYellow = [];  // Clear location and coordinates list
}

/* Request API between BIKE_START and BIKE_END */
function request1() {
  var xhttp1 = new XMLHttpRequest();
  xhttp1.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      let msg = JSON.parse(this.responseText);
      console.log(msg);
      alert(msg.rentBikeStatus.RESULT.MESSAGE);
      // take only stationList1
      stationList1.forEach((i) => {
          stationUpdate(msg, i);
      });
    }
  };
  xhttp1.open(
    "GET",
    "http://openapi.seoul.go.kr:8088/" + seoul_bike_api_key
        + "/json/bikeList/" + BIKE_START + "/" + BIKE_END + "/",
    true
  );
  xhttp1.send();
}

/* Request API between BIKE_START2 and BIKE_END2 */
function request2() {
  var xhttp2 = new XMLHttpRequest();
  xhttp2.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      let msg = JSON.parse(this.responseText);
      console.log(msg);
      alert(msg.rentBikeStatus.RESULT.MESSAGE);
      // take only stationList2
      stationList2.forEach((i) => {
        stationUpdate(msg, i);
      });
    }
  };
  xhttp2.open(
    "GET",
    "http://openapi.seoul.go.kr:8088/" + seoul_bike_api_key
        + "/json/bikeList/" + BIKE_START2 + "/" + BIKE_END2 + "/",
    true
  );
  xhttp2.send();
}