# 우아마켓 ( 배달의 민족 중고 거래 Appliction )
![우아마켓 로고와 글자](https://user-images.githubusercontent.com/35404137/126738630-ce243f9b-408a-4f2a-bbe1-5897af394f07.png)

## To Run
먼저 Project를 Clone합니다. 이후 module을 설치합니다.

```
npm i
```

dev server를 돌리는 방법
```
npm run dev 
```
이후 http://woowamarket.space 으로 접속하면 됩니다.

## Project Architecture
### asset
실질적인 코드들이 들어가는 부분입니다.
#### component
Page에서 사용될 Page보다는 작은 단위의 Component입니다.
* ElementBuilder.js : 저희가 사용한 Component 구성 기본 Class입니다. 자세한 설명은 [링크](https://github.com/woowa-techcamp-2021/deal-1/wiki/React-같은-Component를-위하여)를 참고하세요!
#### css
css 파일들을 모아둔 곳입니다.

#### util
각종 utility 함수들, wrapper 함수들을 모아둔 곳입니다.

#### js 파일
* globalInit.js : liveReload 를 위한 전처리 코드를 실행합니다.
* router.js : Application Routing ( SPA Routing ) 을 구현 한 곳입니다. 자세한 설명은 [링크](https://github.com/woowa-techcamp-2021/deal-1/wiki/ElementBuilder용-Router-사용하기)를 참고하세요!
### public
배포할 때 들어갈 이미지 등의 자원이 들어가는 곳입니다.
bundling 된 js들도 여기로 들어가게 됩니다.

### PROJ_INFO
프로젝트 설명과 wiki 작성을 위한 이미지들이 들어가는 곳입니다.


## Backend 구조
### DB 구조
![deal1 ERD](https://user-images.githubusercontent.com/35404137/126738632-42c64d13-419d-4959-afeb-1d6b6749d2dc.png)

## 폴더 구조
```
+-- frontend
        +-- component
        +-- pages
        +-- constant
        +-- lib
        +-- util
+-- backend
        +-- routes
        +-- model
        +-- middleware
        +-- lib
+-- public
+-- views
+-- app.js
```
