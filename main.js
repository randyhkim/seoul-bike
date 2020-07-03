$(document).ready(function () {
  $("#search").click(function () {
    $.ajax({
      method: "GET",
      url:
        "http://openapi.seoul.go.kr:8088/464c4c7a7968677235307061734167/json/bikeList/497/500/",
      data: {},
      // success: function(response) {}
    }).done(function (msg) {
      alert(msg.rentBikeStatus.RESULT.MESSAGE);
      console.log(msg);

      $(".results").append(
        "<div class=stationName>" +
          msg.rentBikeStatus.row[3].stationName +
          "</div>"
      );
      $(".results").append(
        "<div class=contents>parkingBikeTotCnt = " +
          msg.rentBikeStatus.row[3].parkingBikeTotCnt +
          "</div>"
      );
      $(".results").append(
        "<div class=contents>rackTotCnt = " +
          msg.rentBikeStatus.row[3].rackTotCnt +
          "</div>"
      );
      $(".results").append(
        "<div class=contents>shared = " +
          msg.rentBikeStatus.row[3].shared +
          "</div>"
      );
      $(".results").append(
        "<div class=coordinates>" +
          msg.rentBikeStatus.row[3].stationLatitude +
          ", " +
          msg.rentBikeStatus.row[3].stationLongitude +
          "</div>"
      );

      $(".results").append(
        "<div class=stationName>" +
          msg.rentBikeStatus.row[4].stationName +
          "</div>"
      );
      $(".results").append(
        "<div class=contents>parkingBikeTotCnt = " +
          msg.rentBikeStatus.row[4].parkingBikeTotCnt +
          "</div>"
      );
      $(".results").append(
        "<div class=contents>rackTotCnt = " +
          msg.rentBikeStatus.row[4].rackTotCnt +
          "</div>"
      );
      $(".results").append(
        "<div class=contents>shared = " +
          msg.rentBikeStatus.row[4].shared +
          "</div>"
      );
      $(".results").append(
        "<div class=coordinates>" +
          msg.rentBikeStatus.row[4].stationLatitude +
          ", " +
          msg.rentBikeStatus.row[4].stationLongitude +
          "</div>"
      );

      $(".results").append(
        "<div class=stationName>" +
          msg.rentBikeStatus.row[7].stationName +
          "</div>"
      );
      $(".results").append(
        "<div class=contents>parkingBikeTotCnt = " +
          msg.rentBikeStatus.row[7].parkingBikeTotCnt +
          "</div>"
      );
      $(".results").append(
        "<div class=contents>rackTotCnt = " +
          msg.rentBikeStatus.row[7].rackTotCnt +
          "</div>"
      );
      $(".results").append(
        "<div class=contents>shared = " +
          msg.rentBikeStatus.row[7].shared +
          "</div>"
      );
      $(".results").append(
        "<div class=coordinates>" +
          msg.rentBikeStatus.row[7].stationLatitude +
          ", " +
          msg.rentBikeStatus.row[7].stationLongitude +
          "</div>"
      );

      $(".results").append(
        "<div class=stationName>" +
          msg.rentBikeStatus.row[13].stationName +
          "</div>"
      );
      $(".results").append(
        "<div class=contents>parkingBikeTotCnt = " +
          msg.rentBikeStatus.row[13].parkingBikeTotCnt +
          "</div>"
      );
      $(".results").append(
        "<div class=contents>rackTotCnt = " +
          msg.rentBikeStatus.row[13].rackTotCnt +
          "</div>"
      );
      $(".results").append(
        "<div class=contents>shared = " +
          msg.rentBikeStatus.row[13].shared +
          "</div>"
      );
      $(".results").append(
        "<div class=coordinates>" +
          msg.rentBikeStatus.row[13].stationLatitude +
          ", " +
          msg.rentBikeStatus.row[13].stationLongitude +
          "</div>"
      );

      $(".results").append(
        "<div class=stationName>" +
          msg.rentBikeStatus.row[16].stationName +
          "</div>"
      );
      $(".results").append(
        "<div class=contents>parkingBikeTotCnt = " +
          msg.rentBikeStatus.row[16].parkingBikeTotCnt +
          "</div>"
      );
      $(".results").append(
        "<div class=contents>rackTotCnt = " +
          msg.rentBikeStatus.row[16].rackTotCnt +
          "</div>"
      );
      $(".results").append(
        "<div class=contents>shared = " +
          msg.rentBikeStatus.row[16].shared +
          "</div>"
      );
      $(".results").append(
        "<div class=coordinates>" +
          msg.rentBikeStatus.row[16].stationLatitude +
          ", " +
          msg.rentBikeStatus.row[16].stationLongitude +
          "</div>"
      );

      $(".results").append(
        "<div class=stationName>" +
          msg.rentBikeStatus.row[52].stationName +
          "</div>"
      );
      $(".results").append(
        "<div class=contents>parkingBikeTotCnt = " +
          msg.rentBikeStatus.row[52].parkingBikeTotCnt +
          "</div>"
      );
      $(".results").append(
        "<div class=contents>rackTotCnt = " +
          msg.rentBikeStatus.row[52].rackTotCnt +
          "</div>"
      );
      $(".results").append(
        "<div class=contents>shared = " +
          msg.rentBikeStatus.row[52].shared +
          "</div>"
      );
      $(".results").append(
        "<div class=coordinates>" +
          msg.rentBikeStatus.row[52].stationLatitude +
          ", " +
          msg.rentBikeStatus.row[52].stationLongitude +
          "</div>"
      );

      $(".results").append(
        "<div class=stationName>" +
          msg.rentBikeStatus.row[68].stationName +
          "</div>"
      );
      $(".results").append(
        "<div class=contents>parkingBikeTotCnt = " +
          msg.rentBikeStatus.row[68].parkingBikeTotCnt +
          "</div>"
      );
      $(".results").append(
        "<div class=contents>rackTotCnt = " +
          msg.rentBikeStatus.row[68].rackTotCnt +
          "</div>"
      );
      $(".results").append(
        "<div class=contents>shared = " +
          msg.rentBikeStatus.row[68].shared +
          "</div>"
      );
      $(".results").append(
        "<div class=coordinates>" +
          msg.rentBikeStatus.row[68].stationLatitude +
          ", " +
          msg.rentBikeStatus.row[68].stationLongitude +
          "</div>"
      );

      $(".results").append(
        "<div class=stationName>" +
          msg.rentBikeStatus.row[76].stationName +
          "</div>"
      );
      $(".results").append(
        "<div class=contents>parkingBikeTotCnt = " +
          msg.rentBikeStatus.row[76].parkingBikeTotCnt +
          "</div>"
      );
      $(".results").append(
        "<div class=contents>rackTotCnt = " +
          msg.rentBikeStatus.row[76].rackTotCnt +
          "</div>"
      );
      $(".results").append(
        "<div class=contents>shared = " +
          msg.rentBikeStatus.row[76].shared +
          "</div>"
      );
      $(".results").append(
        "<div class=coordinates>" +
          msg.rentBikeStatus.row[76].stationLatitude +
          ", " +
          msg.rentBikeStatus.row[76].stationLongitude +
          "</div>"
      );
    });
  });
  // $.ajax({
  //     method: "GET",
  //     url: "//dapi.kakao.com/v2/maps/sdk.js?appkey=d41ef9ca3911495e4ad4aaa33aa2387d",
  //     data: {}
  // })
  // .done(functino (data) {
  //     alert("Successful");
  //     console.log(data);
  // });
});
