SELECT c.id as id, c.objet as objet, c.createdBy as createdBy
FROM conversation c
where c.id=:conversationId