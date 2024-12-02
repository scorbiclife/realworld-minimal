-- article auto_increment
alter table article_tag drop foreign key article_tag_fk_article;
alter table `comment` drop foreign key `comment_fk_article`;
alter table article modify column article_id int not null auto_increment;
alter table `comment` add constraint `comment_fk_article` foreign key (article_id) references article(article_id);
alter table article_tag add constraint article_tag_fk_article foreign key (article_id) references article(article_id);
