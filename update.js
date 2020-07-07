import * as lib from './kakao.js'

let button = document.getElementById("search");
let resultBox = document.getElementById("results");

// Variable integer values declared for ease of edit
// 서울시에서 대여소 리스트를 계속 업데이트하기 때문에 START, END 값이 계속 변경됨.
// YELLOW_STATION_START를 포함한 이후 순번 대여소부터는 신형(QR형, Yellow) 대여소임.
// 그 이전은 구형(LCD형, Green) 대여소임.
let YANGCHEONGU_START = 3;      // 700. KB국민은행 염창역 지점 앞
let YANGCHEONGU_END = 82;       // 797.목동아파트 1422동 1434동 사잇길
let YELLOW_STATION_START = 57   // 767. 신정숲속마을아파트

// list of indices of all Green (LCD) stations in Yangcheon-gu
let stationListGreen = [];
for (let i = YANGCHEONGU_START; i < YELLOW_STATION_START; i++) {stationListGreen.push(i);}

// list of indices of all Yellow (QR) stations in Yangcheon-gu
let stationListYellow = [];
for (let i = YELLOW_STATION_START; i <= YANGCHEONGU_END; i++) {stationListYellow.push(i);}

let locationsGreen = [];         // list of text of Green stationName
let coordinateValuesGreen = [];  // list of floats of Green stationLatitude and stationLongitude
let locationsYellow = [];         // list of text of Yellow stationName
let coordinateValuesYellow = [];  // list of floats of Yellow stationLatitude and stationLongitude
let seoul_bike_api_key = config.SEOUL_BIKE_API_KEY;

// append info about each indexed station to result box
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

  if (index < YELLOW_STATION_START) {
    locationsGreen.push(msg.rentBikeStatus.row[index].stationName);
    coordinateValuesGreen.push(parseFloat(msg.rentBikeStatus.row[index].stationLatitude));
    coordinateValuesGreen.push(parseFloat(msg.rentBikeStatus.row[index].stationLongitude));
  }
  else {
    locationsYellow.push(msg.rentBikeStatus.row[index].stationName);
    coordinateValuesYellow.push(parseFloat(msg.rentBikeStatus.row[index].stationLatitude));
    coordinateValuesYellow.push(parseFloat(msg.rentBikeStatus.row[index].stationLongitude));
  }
}

// AJAX from bike api and parse responseText into json
function update() {
  resultBox.innerHTML = "";
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      let msg = JSON.parse(this.responseText);
      console.log(msg);
      alert(msg.rentBikeStatus.RESULT.MESSAGE);
      // console.log(stationList);
      stationListGreen.forEach((i) => {
        // stationUpdate(msg, i, locations, coordinateValues);
        stationUpdate(msg, i);
      });
      stationListYellow.forEach((i) => {
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

button.onclick = function() {
  update();
  setTimeout(function() {
    lib.showMarkerGreen(locationsGreen, coordinateValuesGreen);
    lib.showMarkerYellow(locationsYellow, coordinateValuesYellow);
  }, 2000);
  // without timeout, showMarker will attempt to access locations and coordinateValues before they are updated
  // refer https://stackoverflow.com/questions/48120547/array-list-length-is-zero-but-array-is-not-empty for more
  // compare console.log(locations); and console.log(coordinateValues); below and those in lib.showMarker
  console.log(locationsGreen);
  console.log(coordinateValues);
};
