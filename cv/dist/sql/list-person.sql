SELECT 
	id, 
	age, 
	last, 
	first 
FROM 
	person 
where 
	(:last is null or last=:last) and
	(:first is null or first=:first) and 
	(:age is null or age=:age)