USE `idandt_tinyforum`;

CREATE TABLE `topics` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(80) NOT NULL,
  `description` VARCHAR(250) NULL,
  PRIMARY KEY (`id`));

INSERT INTO `topics` (`id`,`title`,`description`) VALUES (1, "Videojuegos en general", "Temas sobre juegos en general. Lanzamientos, actualidad, gustos, preguntas...");
INSERT INTO `topics` (`id`,`title`,`description`) VALUES (2, "Programacion de videojuegos", "¿Estás creando un videojuego? ¿Buscas formar un equipo? ¿Compartir ideas?");
INSERT INTO `topics` (`id`,`title`,`description`) VALUES (3, "Cine, series y libros", "Estrenos de cine y TV, películas y series recomendadas y opiniones sobre libros.");
