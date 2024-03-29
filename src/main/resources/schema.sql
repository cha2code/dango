create table role_master
(
    role_code   varchar(40) primary key comment '권한코드',
    role_name   varchar(40) not null comment '권한명칭',
    memo        varchar(200) comment '비고',
    create_user varchar(40) not null comment '생성자',
    create_date datetime default current_timestamp comment '생성일자',
    modify_user varchar(40) comment '수정자',
    modify_date datetime comment '수정일자'
) COMMENT '권한 정보 테이블';

create table user_master
(
    user_id       varchar(40) primary key comment '사용자ID',
    user_password varchar(256) not null comment '사용자 비밀번호',
    nickname      varchar(20)  not null comment '닉네임',
    email         varchar(256) not null comment '이메일',
    user_role     varchar(400) not null comment '권한코드',
    password_modified_at datetime comment '비밀번호 변경일시',
    create_user   varchar(40)  not null comment '생성자',
    create_date   datetime default current_timestamp comment '생성일자',
    modify_user   varchar(40) comment '수정자',
    modify_date   datetime comment '수정일자',
    constraint fk_user_master_role_code foreign key (user_role) references role_master (role_code)
) COMMENT '사용자 정보 테이블';

create table menu_master
(
    menu_seq    int unsigned auto_increment primary key comment '메뉴코드',
    menu_name   varchar(200) not null comment '메뉴이름',
    menu_url    varchar(256) not null comment '페이지 url',
    parent_menu integer      not null comment '상위메뉴',
    menu_sort   int          not null comment '메뉴정렬',
    create_user varchar(40)  not null comment '생성자',
    create_date datetime default current_timestamp comment '생성일자',
    modify_user varchar(40) comment '수정자',
    modify_date datetime comment '수정일자'
) COMMENT '메뉴 정보 테이블';

create table menu_role
(
    menu_seq    int unsigned primary key comment '권한별 접근 메뉴',
    role_code   varchar(40) not null comment '권한코드',
    # 오늘 요거랑 동일한 구조로 플젝 개발하고 있었는데 솔직히 지금 주석다는 부분 아래 4개 쓸데없음
    # 굉장히 귀찮기만 함;
    # 씁...이란 단어가 입에서 나오는 순간 삭제 ㄱㄱ
    create_user varchar(40) not null comment '생성자',
    create_date datetime default current_timestamp comment '생성일자',
    modify_user varchar(40) comment '수정자',
    modify_date datetime comment '수정일자',
    constraint fk_menu_role_role_code foreign key (role_code) references role_master (role_code),
    constraint fk_menu_role_menu_seq foreign key (menu_seq) references menu_master (menu_seq)
) COMMENT '권한별 메뉴 테이블';