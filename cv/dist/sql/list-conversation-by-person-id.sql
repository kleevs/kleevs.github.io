SELECT DISTINCT c.id as id, c.objet as objet, c.createdBy as createdBy
FROM conversation c
inner join participant p on p.conversation = c.id
where p.person=:personId