SELECT 
	c.id 
FROM 
	compte c 
WHERE 
	c.login=:login and 
	c.password=:password