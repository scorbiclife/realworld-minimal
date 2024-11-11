drop table if exists `article_tag`;
drop table if exists `tag`;
drop table if exists `comment`;
drop table if exists `article`;
drop table if exists `user_follower`;
drop table if exists `user`;

create table `user` (
    user_id integer not null,
    username varchar(50) not null,
    email varchar(200) not null,
    password_hash varchar(200) not null,
    bio text not null,
    created_at timestamp not null default current_timestamp,
    updated_at timestamp not null default current_timestamp on update current_timestamp,
    deleted_at timestamp null default null,
    constraint user_pk primary key auto_increment (user_id)
);

create table `follower` (
    user_id integer not null,
    follower_id integer not null,
    followed_at timestamp null default current_timestamp,
    constraint follower_fk_user foreign key (user_id) references `user` (user_id),
    constraint follower_fk_follower foreign key (follower_id) references `user` (user_id),
    constraint follower_pk primary key auto_increment (user_id, follower_id)
);

create table `article` (
    article_id integer not null,
    author_id integer not null,
    title varchar(100) not null,
    slug varchar(100) not null,
    description varchar(1000) not null,
    body text not null,
    created_at timestamp not null default current_timestamp,
    updated_at timestamp not null default current_timestamp on update current_timestamp,
    deleted_at timestamp null default null,
    constraint article_fk_author foreign key (author_id) references `user` (user_id),
    constraint article_pk primary key auto_increment (article_id)
);

create table `comment` (
    comment_id integer not null,
    article_id integer not null,
    commenter_id integer not null,
    body varchar(100) not null,
    created_at timestamp not null default current_timestamp,
    updated_at timestamp not null default current_timestamp on update current_timestamp,
    deleted_at timestamp null default null,
    constraint comment_fk_article foreign key (article_id) references `article` (article_id),
    constraint comment_fk_commenter foreign key (commenter_id) references `user` (user_id),
    constraint comment_pk primary key auto_increment (comment_id)
);

create table `tag` (
    tag_id integer not null,
    `name` varchar(100) not null,
    constraint tag_pk primary key auto_increment (tag_id)
);

create table `article_tag` (
    article_id integer not null,
    tag_id integer not null,
    constraint article_tag_fk_article foreign key (article_id) references `article` (article_id),
    constraint article_tag_fk_tag foreign key (tag_id) references `tag` (tag_id),
    constraint article_tag_pk primary key auto_increment (article_id, tag_id)
);