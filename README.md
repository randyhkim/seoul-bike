# 서울 공공자전거 (따릉이) 개인 프로젝트

## 목적
오픈 API를 이용하여 따릉이 분포 지도, 시간대별 사용량, 길찾기 서비스를 웹사이트를 통해 제공함.


## 개발방향
1. 따릉이 실시간 데이터를 HTML파일에 Text형식으로 정리
2. 따릉이 실시간 데이터를 지도API를 이용하여 시각화
3. 시간대별 데이터를 통해 통계적인 분석 실시
4. 길찾기 API를 사용하여 따릉이 네비게이션 개발
5. Interactive Web-based App 완성


## 현재 개발진척도
2020/7/3: Jquery와 AJAX를 이용하여 Daum 웹문서 및 도서검색 API 사용법 및 HTML파일에 정보 표시 연습.
특정 따릉이 대여소에 대한 실시간 정보를 보여주는 간단한 HTML파일 개발중.

2020/7/5: AJAX를 Jquery를 대신하여 Javascript로 사용함. seoulbike_API_test는 미리 
정해둔 stationList를 통해 특정 station(따릉이 대여소를 지칭함) of interest에 한해서만 
작동하지만, 버튼을 클릭했을 때 정해둔 대여소의 실시간 정보 및 카카오맵상에서 위치를 
마커로 표시하는 기능을 구현하는데 성공함. 
추후에는 stationList를 미리 정해둔 특정 리스트가 아닌 현재위치에서 가장 가까운 
대여소들이나 사용자의 검색사항에 부합하는 대여소들을 보여주는 등 능동적인 데이터 전달을
구현하고자 함.

2020/7/8: 웹페이지 실행 시 현재 위치를 기반으로 카카오지도와 구글지도가 그려짐. 구형(LCD)과
신형(QR) 대여소를 구별하여 각각 초록색 원과 노란색 원으로 지도 상에 표출 가능. 현재 이런 식으로
양천구의 모든 대여소를 카카오 지도상에 표시함. 웹페이지 또한 Google Firebase에 웹호스팅하여
아래 링크를 통해 가장 최신으로 Deploy된 버전을 접속할 수 있음.
[https://randy-seoul-bike.web.app/](https://randy-seoul-bike.web.app/)
[https://randy-seoul-bike.firebaseapp.com/](https://randy-seoul-bike.firebaseapp.com/)

## 참고사항

[서울자전거 따릉이 대여소 조회 공식 사이트](https://www.bikeseoul.com/app/station/moveStationRealtimeStatus.do)

| 사용 API                                                                                                     |
| ----------------------------------------------------------------------------------------------------------- |
| [Daum 검색 API Kakao Developers](https://developers.kakao.com/docs/latest/ko/daum-search/dev-guide)          |
| [Kakao 지도 API Kakao Developers](https://apis.map.kakao.com/web/guide/)                                     |
| [서울특별시 공공자전거 실시간 대여정보 Open API](http://data.seoul.go.kr/dataList/OA-15493/A/1/datasetView.do#)    |

| 참고 영상                                                                                                                |
| ----------------------------------------------------------------------------------------------------------------------- |
| [[JavaScript 기초와 활용 #2] API의 개념과 활용! 카카오 책 검색 기능 구현하기](https://www.youtube.com/watch?v=QPEUU89AOg8&list=PLU9-uwewPMe0ynomccdrAX2CtVbahN4hD&index=10) |
