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
Jquery와 AJAX를 이용하여 Daum 웹문서 및 도서검색 API 사용법 및 HTML파일에 정보 표시 연습.
특정 따릉이 대여소에 대한 실시간 정보를 보여주는 간단한 HTML파일 개발중.

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
