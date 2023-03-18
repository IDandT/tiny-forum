USE idandt_tinyforum;

CREATE TABLE topics (
  id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(80) NOT NULL,
  description VARCHAR(250) NULL,
  PRIMARY KEY (id));

