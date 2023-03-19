USE idandt_tinyforum;

START TRANSACTION;

-- User: "Administrador"
-- Pass: "Ab123456"
INSERT INTO users(id, username, password, admin, disabled, avatar, session_expires)
VALUES (1, 'Administrador', '$2b$10$RHhv6Mo3sEaDiuOpNwUb1emDUSZUXrbGLn49OaKeJpw3fJaRpS/EC', 1, 0, NULL, NULL);

INSERT INTO topics(id, title, description) 
VALUES (1, 'Presentaciones', 'Presentate! Hablanos sobre ti y cuentanos sobre tus gustos y aficiones');

INSERT INTO posts (id, id_topic, id_user, body, created)
VALUES (1, 1, 1, '<p class=\"ql-align-center\"><strong class=\"ql-size-huge\">Bienvenid@s a </strong><strong class=\"ql-size-huge\" style=\"color: rgb(107, 36, 178);\">Tiny-Forum</strong></p><p class=\"ql-align-center\"><br></p><p class=\"ql-align-center\"><strong class=\"ql-size-large\">Programado por </strong><strong class=\"ql-size-large\" style=\"color: rgb(230, 0, 0);\">IDandT</strong></p><p class=\"ql-align-center\"><br></p>', '2023-03-18 20:37:08.313');

COMMIT;