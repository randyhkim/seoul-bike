/* Station Data File */

/* 서울시에서 대여소 리스트를 계속 업데이트하기 때문에 START, END 값이 계속 변경됨.
   또한, First API Call, Second API Call으로 구분돼있는 이유는 서울 공공자전거 API
   를 한 번 요청 시, 1000개 대여소 이상으로 정보를 주지 않기 때문에
   두 번에 나누어서 요청한다. */

/* First API Call */
let BIKE_START = 1;             // 따릉이 API 요청 시작 index
let BIKE_END = 1000;             // 따릉이 API 요청 끝 index

/* Second API Call */
// API로 대여소 1000개 이상 정보 요청시 두 번에 나눠서 요청해야함.
let BIKE_START2 = 1001;
let BIKE_END2 = 2000;


/* 구별 stationList */
/* 강서구 */
// 1101. 개화동상사마을종점 버스정류장 ~ 1200. 개화광역환승센터
let gangseo1 = [];
for (let i = 797; i <= 878; i++) gangseo1.push(i)
let gangseo2 = [];
// 2701. 마곡나루역 5번출구 뒤편 ~ 2746. 수명산파크 4단지 411동 앞
// first yellow station: 2703. 서울도시가스 앞
for (let i = 800; i <= 841; i++) gangseo2.push(i)

/* 양천구 */
// 700. KB국민은행 염창역 지점 앞 ~ 797.목동아파트 1422동 1434동 사잇길
// first yellow station: 767. 신정숲속마을아파트
let yangcheon1 = [];
for (let i=498; i<=577; i++) yangcheon1.push(i)

/* 영등포구 */
// 200. 국회의원회관 ~ 299. 여의도 순복음교회
// first yellow station: 295. 영등포공원 분수대 앞
let yeongdeungpo1 = [];
for (let i = 88; i <= 180; i++) {yeongdeungpo1.push(i);}
// 3201. 당산skv1센터 ~ 3221. 서울특별시 남부교육지원청
let yeongdeungpo2 = [];
for (let i = 923; i <= 937; i++) {yeongdeungpo2.push(i);}

/* 마포구 */
// TODO: change to actual values
let MAPO_START = 0;                     // 102. 망원역 1번출구 앞
let MAPO_MIDDLE1_END = 87;              // 199. 서울 월드컵 경기장 (200 ~ 399는 마포구 아님)
let MAPO_MIDDLE1_START = 263;           // 400. 상암한화오벨리스크 1차 앞
let MAPO_MIDDLE2_END = 341;             // 487. 신석초교앞 교차로 교통섬
let MAPO_MIDDLE2_START = 349;           // 498. 연남동주민센터 앞
let MAPO_END = 301;                     // 440. 하늘공원 입구
let mapo1 = [];
for (let i = MAPO_START; i <= MAPO_MIDDLE2_START; i++) {mapo1.push(i);}
let MAPO_START2 = 882;                  // 3002. 벽산상암스마트큐브
let MAPO_END2 = 890;                    // 3011. 경의선(노고산동)
let mapo2 = [];
for (let i = MAPO_START2; i <= 1040; i++) {mapo2.push(i);}
