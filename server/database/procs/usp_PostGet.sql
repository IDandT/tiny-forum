USE idandt_tinyforum;

DROP PROCEDURE IF EXISTS usp_PostGet;

DELIMITER $$

CREATE PROCEDURE usp_PostGet(
    IN in_idtopic INT
)
BEGIN
  
    SELECT
        posts.id AS id,
        posts.id_topic AS id_topic,
        IFNULL(posts.body, "") AS body,
        users.username AS username,
        users.avatar AS avatar,
        DATE_FORMAT(posts.created, "%d/%m/%Y") AS create_date,
        DATE_FORMAT(posts.created, "%H:%i:%S") AS create_time
    FROM
        posts
    INNER JOIN
        users ON posts.id_user = users.id
    WHERE
        posts.id_topic = in_idtopic;

END$$

DELIMITER ;