DROP table if exists weekdays, waiters, bhelekazi;

--database name waiter_tests
create table weekdays(
id serial not null primary key,
days text not null
);
insert into weekdays(days) values ('Monday');
insert into weekdays(days) values ('Tuesday');
insert into weekdays(days) values ('Wednesday');
insert into weekdays(days) values ('Thursday');
insert into weekdays(days) values ('Friday');
insert into weekdays(days) values ('Saturday');
insert into weekdays(days) values ('Sunday');

create table waiters(
id serial not null primary key,
names text not null
);

create table bhelekazi(
id serial not null primary key,
waiters_id int not null,
weekdays_id int not null,
foreign key (waiters_id) references waiters(id),
foreign key (weekdays_id) references weekdays(id)
);



