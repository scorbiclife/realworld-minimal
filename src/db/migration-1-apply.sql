-- user_id auto increment

alter table `follower` drop foreign key `follower_fk_user`;
alter table `follower` drop foreign key `follower_fk_follower`;
alter table `article` drop foreign key `article_fk_author`;
alter table `comment` drop foreign key `comment_fk_commenter`;

alter table `user` modify column `user_id` int not null auto_increment;

alter table `follower` add constraint `follower_fk_user` foreign key (user_id) references `user` (user_id);
alter table `follower` add constraint `follower_fk_follower` foreign key  (follower_id) references `user` (user_id);
alter table `article` add constraint `article_fk_author` foreign key  (author_id) references `user` (user_id);
alter table `comment` add constraint `comment_fk_commenter` foreign key (commenter_id) references `user` (user_id);
