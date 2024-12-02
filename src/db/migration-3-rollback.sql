alter table article_tag drop foreign key article_tag_fk_tag;
alter table tag modify column tag_id int not null;
alter table article_tag add constraint article_tag_fk_tag foreign key (tag_id) references tag(tag_id);
