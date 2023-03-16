SELECT
  posts.id AS id,
  posts.id_topic AS id_topic,
  IFNULL(posts.body, "") AS body,
  users.username AS username,
  DATE_FORMAT(posts.created, "%d/%m/%Y") AS create_date,
  DATE_FORMAT(posts.created, "%H:%i:%S") AS create_time
FROM
  posts
INNER JOIN
  users ON posts.id_user = users.id
WHERE
  posts.id_topic = 1