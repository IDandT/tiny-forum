USE idandt_tinyforum;

DROP PROCEDURE IF EXISTS usp_UserLogin;

DELIMITER $$

CREATE PROCEDURE usp_UserLogin(
  IN in_username VARCHAR(20))
BEGIN
  
  SELECT id, username, password, admin, disabled, avatar, session_expires
  FROM users 
  WHERE username = in_username;

END$$

DELIMITER ;