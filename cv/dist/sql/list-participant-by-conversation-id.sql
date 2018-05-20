SELECT p.id as id, p.age as age, p.last as last, p.first as first 
FROM participant pa
inner join person p on p.id = pa.person
where pa.conversation=:conversationId