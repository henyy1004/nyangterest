# 회원가입 불가

## 현상

### 1.텍스트 입력시 뚝딱뚝딱(?) 입력됨

-   해결방법 : 이메일 validate를 하기위해 서버로 fetch하여 반환값을 받아올때마다 setState로 value값을 update해주고 있었다. 이 부분을 fetch 밖으로 이동시키니 정상작동하였다.
-   발생원인 : input event 발생시 바로 value가 update되지 않고 fetch->반환값리턴->value update 이 순서로 update가 되어 시간차 때문에 뚝딱(?)거린게 아닌가 싶다.(정확하지않다.)

### 2.입력된 텍스트를 전체선택하여 지우는게 안됨

-   해결방법 : 1번과 동일
-   발생원인 : 전체선택하여 지웠을때 value는 공백이 되고 if(value==""){return}가 적용되어 함수는 바로 종료된다. value를 update해주는 setState는 공백이 아닐때 실행되는 fetch문 안에 있기때문에 실행되지 않아, value값은 업데이트 되지 않은 값이 그대로 내 ui에 보이게 되며 지워지지 않는 것 처럼 보이는 것 같다.

이 이슈는 처음엔 왜 발생하는건지 감이 잡히지 않았었는데, 차근차근 emailOnChange가 실행되는 순서를 생각해보니 알 수 있었다.
state의 update 순서를 잘 이해하는게 중요한 것 같다.

### 3.회원가입 후 인증메일이 내 메일로 오지않음(서버에서는 보냈다는 sign보냄)

-   해결방법 : 1번과 2번이 해결되니 자동으로 해결되었다.