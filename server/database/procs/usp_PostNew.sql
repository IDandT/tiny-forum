USE idandt_tinyforum;

DROP PROCEDURE IF EXISTS usp_PostNew;

DELIMITER $$

CREATE PROCEDURE usp_PostNew(
    IN in_id_topic INT,
    IN in_id_user INT,
    IN in_body MEDIUMTEXT,
    OUT out_id INT
)
BEGIN
  
    INSERT INTO posts (id_topic, id_user, body) VALUES (in_id_topic, in_id_user, in_body);
    
    SET out_id = LAST_INSERT_ID();
    
END$$

DELIMITER ;