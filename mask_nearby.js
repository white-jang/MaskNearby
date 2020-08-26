var container = document.getElementById('map'); // 지도를 담을 영역의 DOM 레퍼런스
var options = {
    // 지도를 생성할 때 필요한 기본 옵션
    center: new kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심 좌표
    level: 3, // 지도의 레벨 (확대, 축소 정도)
};

var map = new kakao.maps.Map(container, options); // 지도 생성 및 객체 리턴
var ps = new kakao.maps.services.Places(); // 장소 검색 객체 생성
let base_mask_url = "https://8oi9s0nnth.apigw.ntruss.com/corona19-masks/v1/storesByGeo/json?" // 마스크 데이터 API 주소

map.setMaxLevel(5) // 지도 최대 레벨 설정

// 버튼 누르거나 Enter 눌렀을 때 검색이 되도록 만들기
let search_btn = document.querySelector(".search-btn");
let search_bar = document.querySelector("#search-bar");

search_btn.addEventListener("click", () => {
    let keyword = search_bar.value;
    if (keyword) { // 키워드가 존재하면 (검색 값이 존재하면)
        console.log(keyword + "검색하셨습니다.")
        keywordSearch(keyword);
    } else {
        alert("검색어를 입력해주세요.");
    }
});

// keyup 이벤트로 엔터키가 눌렸을 때를 감지
search_bar.addEventListener("keyup", () => {
    // keycode 13 : Enter key
    if (event.keyCode == 13) {
        search_btn.click(); // 버튼을 클릭한 것과 동일한 효과
    }
});

function keywordSearch(keyword) {
    ps.keywordSearch(keyword, keywordSearchCallback);
}

// 키워드 검색 완료 시 호출되는 콜백함수 입니다
function keywordSearchCallback(data, status, pagination) {
    if (status === kakao.maps.services.Status.OK) {

        const center = new kakao.maps.LatLng(data[0].y, data[0].x) // 검색된 첫 번째 값을 중심으로 설정
        map.setCenter(center);

    }
}