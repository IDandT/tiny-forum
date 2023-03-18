USE idandt_tinyforum;

DROP PROCEDURE IF EXISTS usp_UserCreate;

DELIMITER $$

CREATE PROCEDURE usp_UserCreate(
    IN in_username VARCHAR(20), 
    IN in_password VARCHAR(60))
BEGIN

    INSERT INTO users (username, password)
    VALUES (in_username, in_password);
  
END$$

DELIMITER ;