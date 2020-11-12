create table job (job_id bigint not null auto_increment, description varchar(255), interview_at date, interview_end_time time, interview_start_time time, level_of_education varchar(255), name varchar(255), status varchar(255), summary varchar(255), type varchar(255), primary key (job_id)) engine=InnoDB
create table job_applicant (applicant_id bigint not null auto_increment, email varchar(255), first_name varchar(255), last_name varchar(255), level_of_education varchar(255), phone varchar(255), years_of_experience integer, primary key (applicant_id)) engine=InnoDB
create table job_application (application_id bigint not null auto_increment, applied_at datetime(6), status varchar(255), applicant_id bigint, job_id bigint, primary key (application_id)) engine=InnoDB
create table job_type (job_type_id bigint not null auto_increment, name varchar(255), primary key (job_type_id)) engine=InnoDB
create table role (id bigint not null auto_increment, role varchar(255), primary key (id)) engine=InnoDB
create table user_role (user_id bigint not null, role_id bigint not null) engine=InnoDB
create table users (user_id bigint not null auto_increment, email varchar(255), first_name varchar(255), is_admin bit not null, last_name varchar(255), password varchar(255), phone varchar(255), primary key (user_id)) engine=InnoDB
alter table job add constraint UK_pdipevsavahd8scmtmk24tx0j unique (interview_at)
alter table job_applicant add constraint UK_3t7fiwpwqv74s7i3edoboban7 unique (email, phone)
alter table job_type add constraint UK_hw4xbpckp6665jemkaarc2pab unique (name)
alter table users add constraint UK_sx468g52bpetvlad2j9y0lptc unique (email, phone)
alter table users add constraint UKdu5v5sr43g5bfnji4vb8hg5s3 unique (phone)
alter table users add constraint UK6dotkott2kjsp8vw4d0m25fb7 unique (email)
alter table job_application add constraint FKfo98la0xdy7rxqjiwnjtvigbp foreign key (applicant_id) references job_applicant (applicant_id)
alter table job_application add constraint FKdepcvxeq3gyb4438ws0qjycc7 foreign key (job_id) references job (job_id)
alter table user_role add constraint FKa68196081fvovjhkek5m97n3y foreign key (role_id) references role (id)
alter table user_role add constraint FKj345gk1bovqvfame88rcx7yyx foreign key (user_id) references users (user_id)
create table job (job_id bigint not null auto_increment, description varchar(255), interview_at date, interview_end_time time, interview_start_time time, level_of_education varchar(255), name varchar(255), status varchar(255), summary varchar(255), type varchar(255), primary key (job_id)) engine=InnoDB
create table job_applicant (applicant_id bigint not null auto_increment, email varchar(255), first_name varchar(255), last_name varchar(255), level_of_education varchar(255), phone varchar(255), years_of_experience integer, primary key (applicant_id)) engine=InnoDB
create table job_application (application_id bigint not null auto_increment, applied_at datetime(6), status varchar(255), applicant_id bigint, job_id bigint, primary key (application_id)) engine=InnoDB
create table job_type (job_type_id bigint not null auto_increment, name varchar(255), primary key (job_type_id)) engine=InnoDB
create table role (id bigint not null auto_increment, role varchar(255), primary key (id)) engine=InnoDB
create table user_role (user_id bigint not null, role_id bigint not null) engine=InnoDB
create table users (user_id bigint not null auto_increment, email varchar(255), first_name varchar(255), is_admin bit not null, last_name varchar(255), password varchar(255), phone varchar(255), primary key (user_id)) engine=InnoDB
alter table job add constraint UK_pdipevsavahd8scmtmk24tx0j unique (interview_at)
alter table job_applicant add constraint UK_3t7fiwpwqv74s7i3edoboban7 unique (email, phone)
alter table job_type add constraint UK_hw4xbpckp6665jemkaarc2pab unique (name)
alter table users add constraint UK_sx468g52bpetvlad2j9y0lptc unique (email, phone)
alter table users add constraint UKdu5v5sr43g5bfnji4vb8hg5s3 unique (phone)
alter table users add constraint UK6dotkott2kjsp8vw4d0m25fb7 unique (email)
alter table job_application add constraint FKfo98la0xdy7rxqjiwnjtvigbp foreign key (applicant_id) references job_applicant (applicant_id)
alter table job_application add constraint FKdepcvxeq3gyb4438ws0qjycc7 foreign key (job_id) references job (job_id)
alter table user_role add constraint FKa68196081fvovjhkek5m97n3y foreign key (role_id) references role (id)
alter table user_role add constraint FKj345gk1bovqvfame88rcx7yyx foreign key (user_id) references users (user_id)
create table job (job_id bigint not null auto_increment, description varchar(255), interview_at date, interview_end_time time, interview_start_time time, level_of_education varchar(255), name varchar(255), status varchar(255), summary varchar(255), type varchar(255), primary key (job_id)) engine=InnoDB
create table job_applicant (applicant_id bigint not null auto_increment, email varchar(255), first_name varchar(255), last_name varchar(255), level_of_education varchar(255), phone varchar(255), years_of_experience integer, primary key (applicant_id)) engine=InnoDB
create table job_application (application_id bigint not null auto_increment, applied_at datetime(6), status varchar(255), applicant_id bigint, job_id bigint, primary key (application_id)) engine=InnoDB
create table job_type (job_type_id bigint not null auto_increment, name varchar(255), primary key (job_type_id)) engine=InnoDB
create table role (id bigint not null auto_increment, role varchar(255), primary key (id)) engine=InnoDB
create table user_role (user_id bigint not null, role_id bigint not null) engine=InnoDB
create table users (user_id bigint not null auto_increment, email varchar(255), first_name varchar(255), is_admin bit not null, last_name varchar(255), password varchar(255), phone varchar(255), primary key (user_id)) engine=InnoDB
alter table job add constraint UK_pdipevsavahd8scmtmk24tx0j unique (interview_at)
alter table job_applicant add constraint UK_3t7fiwpwqv74s7i3edoboban7 unique (email, phone)
alter table job_type add constraint UK_hw4xbpckp6665jemkaarc2pab unique (name)
alter table users add constraint UK_sx468g52bpetvlad2j9y0lptc unique (email, phone)
alter table users add constraint UKdu5v5sr43g5bfnji4vb8hg5s3 unique (phone)
alter table users add constraint UK6dotkott2kjsp8vw4d0m25fb7 unique (email)
alter table job_application add constraint FKfo98la0xdy7rxqjiwnjtvigbp foreign key (applicant_id) references job_applicant (applicant_id)
alter table job_application add constraint FKdepcvxeq3gyb4438ws0qjycc7 foreign key (job_id) references job (job_id)
alter table user_role add constraint FKa68196081fvovjhkek5m97n3y foreign key (role_id) references role (id)
alter table user_role add constraint FKj345gk1bovqvfame88rcx7yyx foreign key (user_id) references users (user_id)
create table job (job_id bigint not null auto_increment, description varchar(255), interview_at date, interview_end_time time, interview_start_time time, level_of_education varchar(255), name varchar(255), status varchar(255), summary varchar(255), type varchar(255), primary key (job_id)) engine=InnoDB
create table job_applicant (applicant_id bigint not null auto_increment, email varchar(255), first_name varchar(255), last_name varchar(255), level_of_education varchar(255), phone varchar(255), years_of_experience integer, primary key (applicant_id)) engine=InnoDB
create table job_application (application_id bigint not null auto_increment, applied_at datetime(6), status varchar(255), applicant_id bigint, job_id bigint, primary key (application_id)) engine=InnoDB
create table job_type (job_type_id bigint not null auto_increment, name varchar(255), primary key (job_type_id)) engine=InnoDB
create table role (id bigint not null auto_increment, role varchar(255), primary key (id)) engine=InnoDB
create table user_role (user_id bigint not null, role_id bigint not null) engine=InnoDB
create table users (user_id bigint not null auto_increment, email varchar(255), first_name varchar(255), is_admin bit not null, last_name varchar(255), password varchar(255), phone varchar(255), primary key (user_id)) engine=InnoDB
alter table job add constraint UK_pdipevsavahd8scmtmk24tx0j unique (interview_at)
alter table job_applicant add constraint UK_3t7fiwpwqv74s7i3edoboban7 unique (email, phone)
alter table job_type add constraint UK_hw4xbpckp6665jemkaarc2pab unique (name)
alter table users add constraint UK_sx468g52bpetvlad2j9y0lptc unique (email, phone)
alter table users add constraint UKdu5v5sr43g5bfnji4vb8hg5s3 unique (phone)
alter table users add constraint UK6dotkott2kjsp8vw4d0m25fb7 unique (email)
alter table job_application add constraint FKfo98la0xdy7rxqjiwnjtvigbp foreign key (applicant_id) references job_applicant (applicant_id)
alter table job_application add constraint FKdepcvxeq3gyb4438ws0qjycc7 foreign key (job_id) references job (job_id)
alter table user_role add constraint FKa68196081fvovjhkek5m97n3y foreign key (role_id) references role (id)
alter table user_role add constraint FKj345gk1bovqvfame88rcx7yyx foreign key (user_id) references users (user_id)
create table job (job_id bigint not null auto_increment, description varchar(255), interview_at date, interview_end_time time, interview_start_time time, level_of_education varchar(255), name varchar(255), status varchar(255), summary varchar(255), type varchar(255), primary key (job_id)) engine=InnoDB
create table job_applicant (applicant_id bigint not null auto_increment, email varchar(255), first_name varchar(255), last_name varchar(255), level_of_education varchar(255), phone varchar(255), years_of_experience integer, primary key (applicant_id)) engine=InnoDB
create table job_application (application_id bigint not null auto_increment, applied_at datetime(6), status varchar(255), applicant_id bigint, job_id bigint, primary key (application_id)) engine=InnoDB
create table job_type (job_type_id bigint not null auto_increment, name varchar(255), primary key (job_type_id)) engine=InnoDB
create table role (id bigint not null auto_increment, role varchar(255), primary key (id)) engine=InnoDB
create table user_role (user_id bigint not null, role_id bigint not null) engine=InnoDB
create table users (user_id bigint not null auto_increment, email varchar(255), first_name varchar(255), is_admin bit not null, last_name varchar(255), password varchar(255), phone varchar(255), primary key (user_id)) engine=InnoDB
alter table job add constraint UK_pdipevsavahd8scmtmk24tx0j unique (interview_at)
alter table job_applicant add constraint UK_3t7fiwpwqv74s7i3edoboban7 unique (email, phone)
alter table job_type add constraint UK_hw4xbpckp6665jemkaarc2pab unique (name)
alter table users add constraint UK_sx468g52bpetvlad2j9y0lptc unique (email, phone)
alter table users add constraint UKdu5v5sr43g5bfnji4vb8hg5s3 unique (phone)
alter table users add constraint UK6dotkott2kjsp8vw4d0m25fb7 unique (email)
alter table job_application add constraint FKfo98la0xdy7rxqjiwnjtvigbp foreign key (applicant_id) references job_applicant (applicant_id)
alter table job_application add constraint FKdepcvxeq3gyb4438ws0qjycc7 foreign key (job_id) references job (job_id)
alter table user_role add constraint FKa68196081fvovjhkek5m97n3y foreign key (role_id) references role (id)
alter table user_role add constraint FKj345gk1bovqvfame88rcx7yyx foreign key (user_id) references users (user_id)
create table job (job_id bigint not null auto_increment, description varchar(255), interview_at date, interview_end_time time, interview_start_time time, level_of_education varchar(255), name varchar(255), status varchar(255), summary varchar(255), type varchar(255), primary key (job_id)) engine=InnoDB
create table job_applicant (applicant_id bigint not null auto_increment, email varchar(255), first_name varchar(255), last_name varchar(255), level_of_education varchar(255), phone varchar(255), years_of_experience integer, primary key (applicant_id)) engine=InnoDB
create table job_application (application_id bigint not null auto_increment, applied_at datetime(6), status varchar(255), applicant_id bigint, job_id bigint, primary key (application_id)) engine=InnoDB
create table job_type (job_type_id bigint not null auto_increment, name varchar(255), primary key (job_type_id)) engine=InnoDB
create table role (id bigint not null auto_increment, role varchar(255), primary key (id)) engine=InnoDB
create table user_role (user_id bigint not null, role_id bigint not null) engine=InnoDB
create table users (user_id bigint not null auto_increment, email varchar(255), first_name varchar(255), is_admin bit not null, last_name varchar(255), password varchar(255), phone varchar(255), primary key (user_id)) engine=InnoDB
alter table job add constraint UK_pdipevsavahd8scmtmk24tx0j unique (interview_at)
alter table job_applicant add constraint UK_3t7fiwpwqv74s7i3edoboban7 unique (email, phone)
alter table job_type add constraint UK_hw4xbpckp6665jemkaarc2pab unique (name)
alter table users add constraint UK_sx468g52bpetvlad2j9y0lptc unique (email, phone)
alter table users add constraint UKdu5v5sr43g5bfnji4vb8hg5s3 unique (phone)
alter table users add constraint UK6dotkott2kjsp8vw4d0m25fb7 unique (email)
alter table job_application add constraint FKfo98la0xdy7rxqjiwnjtvigbp foreign key (applicant_id) references job_applicant (applicant_id)
alter table job_application add constraint FKdepcvxeq3gyb4438ws0qjycc7 foreign key (job_id) references job (job_id)
alter table user_role add constraint FKa68196081fvovjhkek5m97n3y foreign key (role_id) references role (id)
alter table user_role add constraint FKj345gk1bovqvfame88rcx7yyx foreign key (user_id) references users (user_id)
