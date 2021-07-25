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
### app.js
node express app의 entry point 입니다.

### frontend / backend
실질적인 코드들이 들어가는 부분입니다. frontend / backend 코드는 각각에 존재합니다.

#### frontend - component
Page에서 사용될 Page보다는 작은 단위의 Component입니다.

#### frontend - pages
Component 들을 사용하여 만든 하나의 Page단위 객체입니다. 해당 객체들은 Router에 의해 변경되고, 사용됩니다

#### frontend - constant
개발에 사용되는 상수 변수들 입니다.

#### frontend - lib
frontend 개발에서 쓰이는 Framework입니다.
* ElementBuilder.js : 저희가 사용한 Component 구성 기본 Class입니다. 자세한 설명은 [링크](https://github.com/woowa-techcamp-2021/deal-1/wiki/React-같은-Component를-위하여)를 참고하세요!
* router.js : Application Routing ( SPA Routing ) 을 구현 한 곳입니다. 자세한 설명은 [링크](https://github.com/woowa-techcamp-2021/deal-1/wiki/ElementBuilder용-Router-사용하기)를 참고하세요!

#### frontend - util
각종 utility 함수들, wrapper 함수들을 모아둔 곳입니다.

#### backend - routes
api routing 경로르 정의해두 파일입니다.

#### backend - model
sql 과 query 문을 정리해 둔 디렉토리입니다.

#### backend - middleware
session 인증등에 관련된 로직이 개발되어있는 내용입니다.

#### backend - lib
websocket routing를 위한 express와 비슷한 router를 개발해두었습니다.

### PROJ_INFO
프로젝트 설명과 wiki 작성을 위한 이미지들이 들어가는 곳입니다.


## Backend 구조
### DB 구조
![deal1 ERD](https://user-images.githubusercontent.com/35404137/126738632-42c64d13-419d-4959-afeb-1d6b6749d2dc.png)
