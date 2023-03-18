USE idandt_tinyforum;

DROP PROCEDURE IF EXISTS usp_UserUpdateSession;

DELIMITER $$

CREATE PROCEDURE usp_UserUpdateSession(
  IN in_username VARCHAR(20), 
  IN in_new_session_expires TIMESTAMP(3))
BEGIN

  IF EXISTS(SELECT 1 FROM users WHERE username = in_username) THEN
  BEGIN
    UPDATE users SET session_expires = in_new_session_expires WHERE username = in_username;
  END;
  END IF;  

END$$

DELIMITER ;