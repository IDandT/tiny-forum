USE idandt_tinyforum;

DROP PROCEDURE IF EXISTS usp_UserUpdateAvatar;

DELIMITER $$

CREATE PROCEDURE usp_UserUpdateAvatar(
  IN in_username VARCHAR(20), 
  IN in_new_avatar VARCHAR(250))
BEGIN

  IF EXISTS(SELECT 1 FROM users WHERE username = in_username) THEN
  BEGIN
    UPDATE users SET avatar = in_new_avatar WHERE username = in_username;
  END;
  END IF;  

END$$

DELIMITER ;