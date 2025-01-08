<br>

# <img height="27px" width="27px" src="https://github.com/user-attachments/assets/9c7482c9-e6d0-4416-93ae-35b52f4701ea"/> 영화 사이트 제작 | WATCHA

<br>

## 🎈 개요

![영화 목록 사이트](https://github.com/user-attachments/assets/9a7288d4-5c83-4811-96c9-61839af4d6fd)

- [TMDB 사이트](https://www.themoviedb.org/?language=ko#play=eknj5_0tF2s) API를 사용
- WATCHA/Netflix를 참고
- React를 익히며 각종 Hook들을 사용하여 제작

<br>

## 🛠️ 기능 및 구현
> ### ⛓️‍💥 Routing
>
> - `React Router` 사용
>    - root-layout에서 `navbar, sidebar, outlet, footer`로 나누어 작성
>    - App.jsx에서 각 페이지들을 링크와 연결
>
> ### 🤗 회원
> 
> - **로그인/회원가입**
>     - `FormData`유효성 검사`(useForm, react-hook-form, yup)`를 통해 옳지 않은 정보 `POST`방지
>     - [서버](https://github.com/jjjuni/UMC_webstudy/tree/main/UMC-7th-WATCHA-BE) API 호출을 통해 회원가입 및 로그인 기능 구현
>     - `POST`요청 시 `useMutation`사용
> 
> ### 🏠 홈
> 
> - **인기 영화 리스트에서 랜덤으로 하나의 영화 정보 출력**
>     - 새로고침 버튼 클릭 시 새로운 랜덤 영화 정보 출력
> - **카테고리 별 영화 리스트 출력**
>     - 양쪽 화살표 클릭 시 둘러보기 가능
> 
> ### 📽️ 영화
> 
> - **영화 리스트 페이지**
>     - 카테고리 별로 다른 영화들을 받아와 페이지에 렌더링
>     - `param`에 카테고리 정보를 넘겨 `useParam`을 통해 API 요청 할 카테고리를 받아옴
>     - `API url`만 다르게 요청하여 영화 리스트를 받아옴
    → `MoviePage`재사용 가능
>     - `useInfiniteQuery`를 사용하여 API 요청 최소화 및 무한 스크롤 구현
>     - `useInView`를 사용하여 맨 아래로 스크롤 시 감지하여 추가로 영화 리스트 요청으로 무한 스크롤 구현
>     - API 요청 중(로딩 중)일 시 `skeleton UI` 및 `Spinner(React Spinner 라이브러리)`로 로딩 화면 렌더링
> - **영화 상세 페이지**
>     - `movieId`를 통해 영화 정보 API 요청
>     - `useQuery`를 사용하여 API 요청 최소화
>     - 받아온 정보 출력 (영화 정보, 크레딧 등)
>     - API 요청중(로딩 중)일 시 `Spinner(React Spinner 라이브러리)`로 로딩 화면 렌더링
> - **검색**
>     - `useDebounce`훅을 만들어 `Debounce`적용하여 불필요한 렌더링 방지
>     - `useInfiniteQuery`를 사용하여 API 요청 최소화
> 
> ### 🪄 디자인(CSS)
> 
> - `Stlyled-component` 사용
> - `media쿼리`를 사용한 반응형 웹 디자인

<br>

## 💻시연 영상

https://github.com/user-attachments/assets/a1603454-d8be-415b-86a9-71bdc3c0717d

### 반응형 디자인 구현

https://github.com/user-attachments/assets/b3970855-b0c4-448e-92b6-2fe80dd88878

<br>
