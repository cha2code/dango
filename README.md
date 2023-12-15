# Dango

## 작성이력
| 작성일시       | 작성자 | 비고    |
|------------|-----|-------|
| 2023.12.11 | hys | 최초 작성 |
| 2023.12.12 | cha2code | 기능 작성 |
| 2023.12.15 | cha2code | 수정 |


## 목차
* [개요](#개요)
* [기능정의서](#기능-정의서)
    * [유저 서비스](#유저-서비스)
    * [관리자 서비스](#관리자-서비스)
* [개발환경 설정 방법](#개발환경-설정-방법)
* [배포방법](#배포방법)


## 개요
본 프로젝트는 Toy 프로젝트로, `Dango`라는 임의의 서비스를 제공하기 위해 진행되는 프로젝트입니다. \
프로젝트 사용자는 `유저` 및 `관리자`로 구분하여, 각각의 사용자마다 다른 서비스를 제공하는 것을 목표로 합니다.


## 기능 정의서
> 하기 내역은 임의로 작성된 내역으로, 차후 업데이트할 예정입니다.

### `유저` 서비스
* [ ] 로그인 페이지
   * 로그인
   * 회원가입
   * 아이디/비밀번호 찾기
      
* [ ] 메인 페이지
   * 메뉴
      * 로고 (홈버튼)
      * 거래게시판
      * 커뮤니티
      * 로그인, 회원가입 버튼
      * 고객센터
   * 커뮤니티 최신글 5개 조회
   * 거래게시판 최신글 5개 조회
  
* [ ] 게시판 (일반 게시판/갤러리)
   * 커뮤니티
      * 댓글
   * 공지사항
   * 문의사항
   * 거래 게시판 (갤러리)
      * 마음에 드는 거래글에 좋아요 가능
      * 파일 업로드
  
* [ ] 회원페이지
   * 회원 정보 수정
   * 좋아요 누른 글 내역 조회
   * 거래 내역 조회 (판매/구매) 

### `관리자` 서비스
* [ ] 로그인 페이지
   * `유저` 서비스의 로그인 페이지와 분리  
     
* [ ] 사용자 관리
   * 관리자 계정, 일반 사용자 계정 분리
   * 일반 사용자 계정 삭제

* [ ] 권한 관리
   * 관리자
   * 게시판 관리자
   * 일반 사용자
     
* [ ] 문의사항 관리
   * 사용자가 작성한 문의사항 확인 및 답변
      
* [ ] 게시물 관리
   * 게시판별 등록된 글 조회 및 수정/삭제 기능

## 개발환경 설정 방법
> TBD. 

## 배포방법
> TBD.