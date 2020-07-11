import * as kakao from './kakao.js'
import * as naver from './naverMap.js'
import * as google from './googleMaps.js'

// Define button, resultBox, mapContainer elements
let button = document.getElementById("search");
let resultBox = document.getElementById("results");
let kakaoMapContainer = document.getElementById("KakaoMap");
let naverMapContainer = document.getElementById("NaverMap")
let googleMapContainer = document.getElementById("GoogleMap");

/* 이하 코드에서는 Green과 Yellow는 각각 구형(LCD)과 신형(QR) 대여소를 지칭함을 알림. */
// ST-1772 (466. 롯데호텔) is the first yellow station (for now).
// TODO: this value is only provisional; actual value required
// TODO: import API data into Excel file for better data analysis
// TODO: check 486. 평창동주민센터 앞 anomaly
// All stations with id numbers larger than this are yellow stations
let FIRST_YELLOW_STATION_ID = 1772;

// Url sources for marker images
let GREEN_CIRCLE_SRC = 'https://www.bikeseoul.com/img/icon_big1.png';
let YELLOW_CIRCLE_SRC = 'https://www.bikeseoul.com/img/icon_big2.png';
let MY_LOCATION_SRC = 'https://www.bikeseoul.com/img/my_location_bp.gif';

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

        /* function when button is clicked */
        // async waits for update() to be finished before drawing markers
        button.onclick = async function() {
          // Clear kakaoMapContainer and reinitialize Kakao Map
          kakaoMapContainer.innerHTML = "";
          let kakaoMap = kakao.showMap(kakaoMapContainer, myLatitude, myLongitude);
          kakao.showLocationMarker(kakaoMap, myLatitude, myLongitude, MY_LOCATION_SRC);

          // read area from dropdown option areaSelect and create stationsLists
          // stationList1 is a list of indices from the first API call
          // stationList2 is a list of indices from the second API call
          let e = document.getElementById("areaSelect");
          let area = e.options[e.selectedIndex].value;
          let {stationList1, stationList2} = createStationList(area);

          // TODO: fix bug that requires setTimeout despite await statement
          // update locations and coordinateValues
          let {locationsGreen, coordinateValuesGreen, locationsYellow, coordinateValuesYellow}
            = await update(stationList1, stationList2);
          /* locationsGreen: the names of green stations
             coordinateValuesGreen: the coordinate values of green stations
             locationsYellow: the names of yellow stations
             coordinateValuesYellow: the coordinate values of yellow stations */
          setTimeout(function() {
            console.log(locationsGreen);
            console.log(coordinateValuesGreen);
            console.log(locationsYellow);
            console.log(coordinateValuesYellow);
            // show green and yellow markers on Kakao Map
            kakao.showMarker(kakaoMap, locationsGreen, coordinateValuesGreen, GREEN_CIRCLE_SRC);
            kakao.showMarker(kakaoMap, locationsYellow, coordinateValuesYellow, YELLOW_CIRCLE_SRC);
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


/* Clear resultBox and returns stations object based on stationList1 and stationList2 */
// AJAX from bike api and parse responseText into json
function update(stationList1, stationList2) {
  return new Promise(resolve => {
      resultBox.innerHTML = "";     // Clear resultBox
      let stations = {
        locationsGreen: [],
        coordinateValuesGreen: [],
        locationsYellow: [],
        coordinateValuesYellow: []
      };
      // request2 must be followed by request1, but the use of setTimeout causes
      // conflict with the async button function. Thus, this if-else statmenet
      // takes a sync approach.
      if (stationList2.length != 0) {
          request1(stationList1, stations);
          request2(stationList2, stations);
      } else {
          request1(stationList1, stations);
      }
      resolve(stations);
  });
}

/* Request 1st API between BIKE_START and BIKE_END */
function request1(stationList1, stations) {
  var xhttp1 = new XMLHttpRequest();
  xhttp1.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      let msg = JSON.parse(this.responseText);
      console.log(msg);
      alert(msg.rentBikeStatus.RESULT.MESSAGE);
      // take only stationList1
      stationList1.forEach((i) => {
          stationUpdate(msg, i, stations);
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

/* Request 2nd API between BIKE_START2 and BIKE_END2 */
function request2(stationList2, stations) {
  var xhttp2 = new XMLHttpRequest();
  xhttp2.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      let msg = JSON.parse(this.responseText);
      console.log(msg);
      alert(msg.rentBikeStatus.RESULT.MESSAGE);
      // take only stationList2
      stationList2.forEach((i) => {
        stationUpdate(msg, i, stations);
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

/* Each station's info is shown on the web page
   and name/latitude/longitude is appended to either locationsGreen and coordinateValuesGreen
   or locationsYellow and coordinateValuesYellow depending on index value */
function stationUpdate(msg, index, stations) {
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
    "<div class=contents>stationId = " +
    msg.rentBikeStatus.row[index].stationId +
    "</div>" +
    "<div class=coordinates>" +
    msg.rentBikeStatus.row[index].stationLatitude +
    ", " +
    msg.rentBikeStatus.row[index].stationLongitude +
    "</div>";

  // if stationId is smaller than id of first yellow station, the station is Green (LCD)
  // stationId is a string in the form "ST-####", so only the number is sliced and
  // compared with the stationId of the first yellow station
  if (parseInt(msg.rentBikeStatus.row[index].stationId.slice(3, )) < FIRST_YELLOW_STATION_ID) {
    stations.locationsGreen.push(msg.rentBikeStatus.row[index].stationName);
    stations.coordinateValuesGreen.push(parseFloat(msg.rentBikeStatus.row[index].stationLatitude));
    stations.coordinateValuesGreen.push(parseFloat(msg.rentBikeStatus.row[index].stationLongitude));
  }
  // Else, the station is Yellow (QR)
  else {
    stations.locationsYellow.push(msg.rentBikeStatus.row[index].stationName);
    stations.coordinateValuesYellow.push(parseFloat(msg.rentBikeStatus.row[index].stationLatitude));
    stations.coordinateValuesYellow.push(parseFloat(msg.rentBikeStatus.row[index].stationLongitude));
  }
}

function createStationList(area) {
    let stationList1 = [];
    let stationList2 = [];

    // add station indices to stationList1 and stationList2 according to area
    if (area === "gangseo") {
        stationList1 = gangseo1;
        stationList2 = gangseo2;
    }
    else if (area === "mapo") {
        stationList1 = mapo1;
        stationList2 = mapo2;
    }
    else if (area === "yangcheon") {
        stationList1 = yangcheon1;
    }
    else if (area === "yeongdeungpo") {
        stationList1 = yeongdeungpo1;
        stationList2 = yeongdeungpo2;
    }
    return {stationList1, stationList2};
}