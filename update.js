import * as lib from './kakao.js'

let button = document.getElementById("search");
let resultBox = document.getElementById("results");
let stationList = [4, 7, 9, 10, 3]; // index of stations interested in
let locations = [];         // list of text of stationName
let coordinateValues = [];  // list of floats of stationLatitude and stationLongitude
// let locations = new Array();
// let coordinateValues = new Array();
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

  locations.push(msg.rentBikeStatus.row[index].stationName);
  coordinateValues.push(parseFloat(msg.rentBikeStatus.row[index].stationLatitude));
  coordinateValues.push(parseFloat(msg.rentBikeStatus.row[index].stationLongitude));
  // locations[index] = (msg.rentBikeStatus.row[index].stationName);
  // coordinateValues[index] = (parseFloat(msg.rentBikeStatus.row[index].stationLatitude));
  // coordinateValues[index] = (parseFloat(msg.rentBikeStatus.row[index].stationLongitude));
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
      console.log(stationList);
      stationList.forEach((i) => {
        stationUpdate(msg, i, locations, coordinateValues);
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
    lib.showMarker(locations, coordinateValues);
  }, 2000);
  // without timeout, showMarker will attempt to access locations and coordinateValues before they are updated
  // refer https://stackoverflow.com/questions/48120547/array-list-length-is-zero-but-array-is-not-empty for more
  // compare console.log(locations); and console.log(coordinateValues); below and those in lib.showMarker
  console.log(locations);
  console.log(coordinateValues);
};
