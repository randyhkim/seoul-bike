let button = document.getElementById("search");
let resultBox = document.getElementById("results");

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
      let stationList = [4, 7, 9, 10, 3];
      console.log(stationList);
      stationList.forEach((i) => {
        stationUpdate(msg, i);
      });
    }
  };
  xhttp.open(
    "GET",
    "http://openapi.seoul.go.kr:8088/464c4c7a7968677235307061734167/json/bikeList/497/500/",
    true
  );
  xhttp.send();
}

button.onclick = update;
