USE `idandt_tinyforum`;

CREATE TABLE `users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(25) NOT NULL,
  `is_admin` TINYINT NOT NULL,
  `avatar` VARCHAR(255) NULL,
  `disabled` TINYINT GENERATED ALWAYS AS (false),
  PRIMARY KEY (`id`));

INSERT INTO `users` (`id`, `username`, `is_admin`, `avatar`) VALUES (1, "Admin", true, null);
INSERT INTO `users` (`id`, `username`, `is_admin`, `avatar`) VALUES (2, "IDandT", false, null);
INSERT INTO `users` (`id`, `username`, `is_admin`, `avatar`) VALUES (3, "Troll", false, null);
