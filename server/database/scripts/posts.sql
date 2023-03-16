USE `idandt_tinyforum`;

CREATE TABLE `posts` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `id_topic` INT NOT NULL,
  `id_user` INT NOT NULL,
  `body` MEDIUMTEXT NULL,
  `created` DATETIME(3) DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`));

INSERT INTO `posts` (`id`, `id_topic`, `id_user`, `body`) VALUES (1, 1, 1,
"Aparte de las normas básicas de la comunidad, este foro cuenta con unos consejos a tomar en cuenta:
      El foro es general pero no quiere decir que temas exclusivos de Wii, XBOX 360 o PS3 puedan ir aquí también.
      Si se quiere anunciar un clan no se abrirá un tema, se publicará un mensaje aquí
      Si tienes un canal en Youtube y quieres compartirlo con la comunidad deberás publicar un mensaje aquí
      Los temas concernientes a historia de la cultura del videojuego irán en retrogaming
      Se pueden publicar todo tipo de noticias de tipo multiplataforma salvo los ya publicados por 3DJuegos en su foro correspondiente.
      El fin de este foro son los debates y la ayuda a temas generales de los videjuegos como pueden ser:
      -> Ayuda para comprar juegos por internet.
      -> Debate sobre sagas de videojuegos.
      -> Exponer vuestros juegos personales así como los del mundo web.
      Se considera SPAM la publicación de enlaces a juegos de internet donde el clickeo beneficie al usuario (Bruto, Mycity, etc). Tampoco se permite facilitar dirección de servidores de juegos.
      No se va a prohibir preguntar sobre un juego en concreto opiniones. Pero recuerdo a navegantes que cada juego lanzado suele tener bastantes análisis personales escritos (algunos cerca de un millar entre distintas versiones).
      Son pocos consejos, pero son los errores que más se repiten en el foro.");

INSERT INTO `posts` (`id`, `id_topic`, `id_user`, `body`) VALUES (2, 1, 2,
"Chronicles of Middle Ages
https://chronicles-roleplay.games/
Versión: Alfa
Plataforma: PC y Móvil
Elige un pais, estudia, trabaja, cultiva, mejora tu personaje, elige tu profesión, comercia, viaja y lucha por reino para competir con los otros reinos.
Buscamos hacer una comunidad hispanohablante, elige reino de Castilla nos estamos juntando allí. Nos vemos en el discord del juego o aquí en el foro.");

INSERT INTO `posts` (`id`, `id_topic`, `id_user`, `body`) VALUES (3, 2, 1,
"Creo este hilo para discutir acerca de Programacion");

INSERT INTO `posts` (`id`, `id_topic`, `id_user`, `body`) VALUES (4, 2, 3,
"Javascript lo uso mucho para desarrollo web");

INSERT INTO `posts` (`id`, `id_topic`, `id_user`, `body`) VALUES (5, 2, 3,
"Pues a mi me gusta un poco, aunque prefiero c#...");

INSERT INTO `posts` (`id`, `id_topic`, `id_user`, `body`) VALUES (6, 3, 1,
"Creo este hilo para discutir acerca de Cine");

