SELECT p.id as id, p.age as age, p.last as last, p.first as first 
FROM friend f 
inner join person p on p.id = f.person2
where f.person1=:id