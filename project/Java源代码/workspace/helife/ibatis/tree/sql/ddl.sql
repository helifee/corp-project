create table r(
	id varchar(8),
	txt varchar(20),
	checked int(1),
	dispSeq varchar(10)
);

insert into r values('001', 'aaa', 0, '0100000000');
insert into r values('002', 'bbb', 1, '0102000000');
insert into r values('004', 'ddd', 0, '0200000000');
insert into r values('009', 'iii', 0, '0302000000');
insert into r values('005', 'eee', 0, '0201000000');
insert into r values('006', 'fff', 0, '0202000000');
insert into r values('003', 'ccc', 0, '0103000000');
insert into r values('008', 'hhh', 0, '0301000000');
insert into r values('007', 'ggg', 0, '0300000000');


select * from r order by dispSeq;