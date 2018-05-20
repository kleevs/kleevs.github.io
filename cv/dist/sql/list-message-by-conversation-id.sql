SELECT i.id as id, writtenBy, conversation, message, date, p.last as last, p.first as first
FROM inbox i
inner join person p on p.id = i.writtenBy
where i.conversation=:conversationId