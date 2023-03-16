SELECT DISTINCT
  topics.id AS id,
  topics.title AS title,
  IFNULL(topics.description, "") AS description,
  IFNULL(COUNT(posts.id), 0) AS msgcount,
  IFNULL(MAX(posts.created), "") AS datelast,
  DATE_FORMAT(MAX(posts.created), "%d/%m/%Y") AS last_date,
  DATE_FORMAT(MAX(posts.created), "%H:%i:%S") AS last_time,
  IFNULL(users.username, "") AS lastpostby
FROM 
  topics
LEFT JOIN 
  posts ON topics.id = posts.id_topic
LEFT JOIN 
  users ON posts.id_user = users.id
GROUP BY
  topics.id,
  topics.title,
  topics.description
	