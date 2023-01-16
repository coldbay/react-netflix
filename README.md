# react-netflix

```
참고한 강의: react-todo와 동일
강의노트 필기: https://natural-dracopelta-45d.notion.site/netflix-b83e90e68614436dbc2df7b92dda3d2c
```

## 사용한 개념
......................................................
```
react-router-dom
```

## 구현한 js

### App.js와 ./api
```
App.js - react-router-dom을 이용하여 중첩 라우팅을 구현해 path에 따라 Outlet에 보여질 서브 페이지가 달라지도록 했다. 

//axios 라이브러리를 위한 js

./api/axios.js - axios Promise API를 활용하는 HTTP 비동기 통신
./api/requests.js - 다른 컴포넌트에서 사용될 주소들을 정리한 requests 선언
```

### 공통적인 ./componenets
```

nav.js - 클릭하면 홈으로 라우팅하는 netflix 로고, 
입력하면 SearchPage로 라우팅하는 검색창, 그리고 유저 로고를 담고 있는 nav이다.
useEffect를 사용하여 일정수치 이상 scroll를 내리면 css 스타일을 변화하게 하였다. 


footer.js - 고객센터, 이용약관 링크 등이 있는 footer다. 
styled-compoenets를 이용하여 따로 css 생성없이 바로 스타일을 지정했다.
```

### path에 따라 달라지는 컨포넌트

**index -> MainPage**
Banner와 row 컴포넌트를 렌더링하는 메인페이지이다.

row는 title, id, fetchUrl, isLargeROW를 파라미터로 받는다.

```
banner.js - 배너에 NowPlaying 영화 중 임의로 렌더링한다. 
isClicked가 디폴트값인 false일때 배너의 제목, 설명, 배경이미지, 
isClicked를 true로 만드는 play버튼, 그리고 DetailPage로 라우팅하는
info버튼을 렌더링한다.
isclicked가 true일때 이 영화의 예고편을 담고 있는 iframe태그를 렌더링한다.

row.js - 크게 slider__arrow-left, slider__arrow-right,
그리고 row__posters클래스의 div 태그들로 나뉜다.
slider__들은 onClick시 scrollLeft 값을 변화시켜 스크롤한다.
row__poster는 파라미터로 받은 isLargeRow에 따라 img태그가 다르게 렌더링되며,
onClick시 movie 객체정보를 담은 movieSelected를 파라미터하여 MovieModal이라는 모달창을 연다.

./moviemodal/index.js - row.js에서 row__posters를 클릭할 시 나타나는 모달창이다.
영화 이미지, 평점, 개봉날짜, 제목, 설명 등을 보여준다.


// path=":movieId" -> DetailPage
useParams로 path에 있는 파라미터(:movieId)를 가져온다.
movie.backdrop_path가 있으면 img 태그를 렌더링하는 페이지이다.

// path="search" -> SearchPage


```