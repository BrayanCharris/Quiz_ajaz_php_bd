-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 23-03-2022 a las 05:09:53
-- Versión del servidor: 10.4.22-MariaDB
-- Versión de PHP: 8.1.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `preguntadosena`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `aprendices`
--

CREATE TABLE `aprendices` (
  `id_aprendiz` bigint(20) NOT NULL,
  `nombre_aprendiz` varchar(50) NOT NULL,
  `correo` varchar(30) NOT NULL,
  `contrasena` varchar(50) DEFAULT NULL,
  `id_grupo` bigint(20) DEFAULT NULL,
  `numeroGrupo` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `aprendices`
--

INSERT INTO `aprendices` (`id_aprendiz`, `nombre_aprendiz`, `correo`, `contrasena`, `id_grupo`, `numeroGrupo`) VALUES
(1, 'BRAYAN JESUS CHARRIS CANTILLO', 'bjcharris4@misena.edu.co', '123456789', 1, '2154080');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categorias`
--

CREATE TABLE `categorias` (
  `codigo_categoria` bigint(20) NOT NULL,
  `nombre_categoria` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `categorias`
--

INSERT INTO `categorias` (`codigo_categoria`, `nombre_categoria`) VALUES
(123, 'DESARROLLO WEB'),
(1234, 'BASE DE DATOS'),
(12345, 'SISTEMA OPERATIVO'),
(123456, 'PYTHON');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `configuracion_juego_grupo`
--

CREATE TABLE `configuracion_juego_grupo` (
  `id_config` bigint(20) NOT NULL,
  `id_grupo` bigint(20) DEFAULT NULL,
  `codigo_categoria` bigint(20) DEFAULT NULL,
  `numero_preguntas` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `configuracion_juego_grupo`
--

INSERT INTO `configuracion_juego_grupo` (`id_config`, `id_grupo`, `codigo_categoria`, `numero_preguntas`) VALUES
(1, 1, 123, 2),
(2, 1, 1234, NULL),
(3, 1, 12345, NULL),
(4, 1, 12346, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `grupos`
--

CREATE TABLE `grupos` (
  `id_grupo` bigint(20) NOT NULL,
  `nombre_grupo` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `grupos`
--

INSERT INTO `grupos` (`id_grupo`, `nombre_grupo`) VALUES
(1, 'ADSI'),
(2, 'MULTIMEDIA'),
(3, 'ADSO'),
(4, 'TSCC'),
(5, 'SISTEMAS'),
(6, 'TPS');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `preguntas`
--

CREATE TABLE `preguntas` (
  `codigo_pregunta` varchar(50) NOT NULL,
  `pregunta` varchar(1000) NOT NULL,
  `codigo_categoria` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `preguntas`
--

INSERT INTO `preguntas` (`codigo_pregunta`, `pregunta`, `codigo_categoria`) VALUES
('ABC', '¿Qué significa HTML?', 123),
('ABCD', '¿Qué significa CSS?', 123),
('ABCD1234', '¿Como se imprime en pyhton?', 123456),
('ABCDE', '¿Qué significa PHP?', 123),
('ABCDEF', 'What does XML stand for?', 123),
('ABCDEFG', 'Como hacer una consulta en SQL?', 1234),
('ABCDEFGh', '¿Cuál es la distribución de Linux más usada?', 12345);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `punatjes_categorias`
--

CREATE TABLE `punatjes_categorias` (
  `id_pun_cat` bigint(20) NOT NULL,
  `codigo_puntaje` bigint(20) DEFAULT NULL,
  `codigo_categoria` bigint(20) DEFAULT NULL,
  `puntaje` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `puntajes`
--

CREATE TABLE `puntajes` (
  `codigo_puntaje` bigint(20) NOT NULL,
  `id_aprendiz` bigint(20) DEFAULT NULL,
  `puntaje_total` varchar(50) DEFAULT NULL,
  `fecha` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `respuestas`
--

CREATE TABLE `respuestas` (
  `id_respuesta` bigint(20) NOT NULL,
  `resp_correcta` varchar(50) NOT NULL,
  `resp_incorrecta1` varchar(50) NOT NULL,
  `resp_incorrecta2` varchar(50) DEFAULT NULL,
  `resp_incorrecta3` varchar(50) DEFAULT NULL,
  `codigo_pregunta` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `respuestas`
--

INSERT INTO `respuestas` (`id_respuesta`, `resp_correcta`, `resp_incorrecta1`, `resp_incorrecta2`, `resp_incorrecta3`, `codigo_pregunta`) VALUES
(1, 'Hyper Text Markup Language', 'Hyper Text Preprocessor', 'Hyper Text Multiple Language', 'Hyper Tool Multi Language', 'ABC'),
(2, 'Cascading Style Sheet', 'Common Style Sheet', 'Colorful Style Sheet', 'Computer Style Sheet', 'ABCD'),
(3, 'Hypertext Preprocessor', 'Hypertext Programming', 'Hypertext Preprogramming', 'Hometext Preprocessor', 'ABCDE'),
(4, 'eXtensible Markup Language', 'eXecutable Multiple Language', 'eXTra Multi-Program Language', 'eXamine Multiple Language', 'ABCDEF'),
(5, 'Select * from Nombre tabla', 'Selected campos from Tabla Wheer condicion', 'Update Nombre Table where condicion', 'Insert into Nombre Table values (valor1,valor2)', 'ABCDEFG'),
(6, 'Ubuntu', 'Fedora', 'Mint', 'Debian', 'ABCDEFGh'),
(7, 'print', 'cosole.log()', 'echo', 'system.out.print()', 'ABCD1234');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id_user` bigint(20) NOT NULL,
  `nombre_usuario` varchar(50) NOT NULL,
  `usuario` varchar(50) NOT NULL,
  `contrasena` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id_user`, `nombre_usuario`, `usuario`, `contrasena`) VALUES
(1, 'INSTRUCTORES SENA', 'adminSena', '8d9e85181c58ec55e0fee74c7ec1ec87');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `aprendices`
--
ALTER TABLE `aprendices`
  ADD PRIMARY KEY (`id_aprendiz`);

--
-- Indices de la tabla `categorias`
--
ALTER TABLE `categorias`
  ADD PRIMARY KEY (`codigo_categoria`);

--
-- Indices de la tabla `configuracion_juego_grupo`
--
ALTER TABLE `configuracion_juego_grupo`
  ADD PRIMARY KEY (`id_config`);

--
-- Indices de la tabla `grupos`
--
ALTER TABLE `grupos`
  ADD PRIMARY KEY (`id_grupo`);

--
-- Indices de la tabla `preguntas`
--
ALTER TABLE `preguntas`
  ADD PRIMARY KEY (`codigo_pregunta`);

--
-- Indices de la tabla `punatjes_categorias`
--
ALTER TABLE `punatjes_categorias`
  ADD PRIMARY KEY (`id_pun_cat`);

--
-- Indices de la tabla `puntajes`
--
ALTER TABLE `puntajes`
  ADD PRIMARY KEY (`codigo_puntaje`);

--
-- Indices de la tabla `respuestas`
--
ALTER TABLE `respuestas`
  ADD PRIMARY KEY (`id_respuesta`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id_user`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `aprendices`
--
ALTER TABLE `aprendices`
  MODIFY `id_aprendiz` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `configuracion_juego_grupo`
--
ALTER TABLE `configuracion_juego_grupo`
  MODIFY `id_config` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `grupos`
--
ALTER TABLE `grupos`
  MODIFY `id_grupo` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `punatjes_categorias`
--
ALTER TABLE `punatjes_categorias`
  MODIFY `id_pun_cat` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `respuestas`
--
ALTER TABLE `respuestas`
  MODIFY `id_respuesta` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id_user` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
