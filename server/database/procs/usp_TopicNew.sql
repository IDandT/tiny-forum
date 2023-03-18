USE idandt_tinyforum;

DROP PROCEDURE IF EXISTS usp_TopicNew;

DELIMITER $$

CREATE PROCEDURE usp_TopicNew(
    IN in_title VARCHAR(80),
    IN in_description VARCHAR(250),
    OUT out_id INT
)
BEGIN
  
    INSERT INTO topics (title, description) VALUES (in_title, in_description);
  
    SET out_id = LAST_INSERT_ID();

END$$

DELIMITER ;