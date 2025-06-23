#체크리스트 시스템 벡엔드 만들기

## 첫번째 요구사항

여행을 갈 경우

- 2025년 여름 휴가 준비물: 여권, 충전기, 세면도구 ... 옷류, 점퍼, 코드, 반팔티, 반바지
- 캠핑 준비물: 텐트, 의자, 랜턴, 침낭 ....

-> 벡엔드를 만들어보는 겁니다.
-> 테이블 설계도:
캠핑준비물,
여름휴가 준비물 담을 수 있는 그룹핑 항목, category text
실제 준비해야 할 물건, item text
아이디 PK, id integer
수량, integer amount
체크여부, boolean checkYn

-> REST API
POST / checklist -> 체크리스트 입력
GET / checklist?category -> 여름휴가 준비물
PUT / checklist/:id -> 체크 여부를 toggle 0->1 1->0
DELETE / checklist/:id
