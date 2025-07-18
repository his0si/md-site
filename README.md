# 🏬Remarket
<img width="1920" height="1080" alt="Slide 16_9 - 1" src="https://github.com/user-attachments/assets/886b8e79-97f3-4422-b50c-04378fe717d8" />

## 📍프로젝트 개요
* remarket은 이화이언 2025년 **5월 행사 'remark'에서 판매할 굿즈에 대한 예약폼**을 받는 사이트입니다.
* 약 2주간 **331명의 가입자와 228건의 주문**으로 해당 사이트를 이용한 성공적인 판매를 할 수 있었습니다.
  
## 👥 Members
<table>
  <tr>
    <td align="center">
      <img src="https://github.com/topograp2.png" width="80"/><br/>
      <b>홍지형</b><br/>
      팀장 / BE / 배포
    </td>
    <td align="center">
      <img src="https://github.com/gimye.png" width="80"/><br/>
      <b>김예린</b><br/>
      BE
    </td>
    <td align="center">
      <img src="https://github.com/Jade0728.png" width="80"/><br/>
      <b>서영</b><br/>
      BE
    </td>
  </tr>
  <tr>
    <td align="center">
      <img src="https://github.com/his0si.png" width="80"/><br/>
      <b>김희서</b><br/>
      FE
    </td>
    <td align="center">
      <img src="https://github.com/laurenjung03.png" width="80"/><br/>
      <b>정채원</b><br/>
      FE
    </td>
    <td align="center">
      <img src="https://github.com/sung-eun2376015.png" width="80"/><br/>
      <b>곽성은</b><br/>
      FE
    </td>
  </tr>
</table>

## 💡 주요 기능
<img width="1920" height="1080" alt="aasd" src="https://github.com/user-attachments/assets/ce6cedda-2ae8-4b57-9354-823b774d9ad9" />

## 🔧사용 기술
<img src="https://img.shields.io/badge/Node.js-5FA04E?style=flat-square&logo=Node.js&logoColor=white"/> <img src="https://img.shields.io/badge/MongoDB-47A248?style=flat-square&logo=MongoDB&logoColor=white"/> <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=JavaScript&logoColor=white"/> <img src="https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=React&logoColor=white"/> <img src="https://img.shields.io/badge/Swagger-85EA2D?style=flat-square&logo=swagger&logoColor=white" />

## 💡How to Build / install
* git으로 프로젝트 클론
```
git clone https://github.com/Ewhaian-WebEngineering/md-site.git
```
* 라이브러리 설치
```
cd frontend
npm i
cd ../backend
npm i
```
* frontend/.env 설정
```
VITE_ADMIN_PASSWORD={관리자 비밀번호}
VITE_BASE_URL={백엔드 서버 base url}
```
* backend/.env 설정
```
PORT=5000
FRONTEND_URL={프론트엔드 배포 주소}
MONGO_URI={mongo db 주소}
KAKAO_REST_API_KEY={카카오 rest api key}
SESSION_SECRET={세션 키}
REDIRECT_URI={카카오 로그인용 redirect uri}
```
* frontend 실행
```
cd frontend
npm run dev
```
* backend 실행
```
cd backend
npm run dev
```



