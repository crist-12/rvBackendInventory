-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Versión del servidor:         8.0.28 - MySQL Community Server - GPL
-- SO del servidor:              Win64
-- HeidiSQL Versión:             11.3.0.6295
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Volcando estructura de base de datos para rvinventory
CREATE DATABASE IF NOT EXISTS `rvinventory` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `rvinventory`;

-- Volcando estructura para tabla rvinventory.areas
CREATE TABLE IF NOT EXISTS `areas` (
  `IdArea` int NOT NULL AUTO_INCREMENT,
  `DescripcionArea` varchar(50) NOT NULL DEFAULT '0',
  PRIMARY KEY (`IdArea`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Volcando datos para la tabla rvinventory.areas: ~3 rows (aproximadamente)
DELETE FROM `areas`;
/*!40000 ALTER TABLE `areas` DISABLE KEYS */;
INSERT INTO `areas` (`IdArea`, `DescripcionArea`) VALUES
	(1, 'MKT'),
	(2, 'Finanzas'),
	(3, 'RRHH');
/*!40000 ALTER TABLE `areas` ENABLE KEYS */;

-- Volcando estructura para tabla rvinventory.asignaciones
CREATE TABLE IF NOT EXISTS `asignaciones` (
  `IdAsignacion` int NOT NULL AUTO_INCREMENT,
  `IdEmpleado` int DEFAULT NULL,
  `IdEquipo` int NOT NULL DEFAULT '0',
  `DetalleAsignacion` varchar(50) DEFAULT '0',
  `FechaAsignacion` datetime DEFAULT CURRENT_TIMESTAMP,
  `IncluyeMochila` bit(1) DEFAULT NULL,
  `IncluyeMouse` bit(1) DEFAULT NULL,
  `IncluyeCargador` bit(1) DEFAULT NULL,
  `IncluyeTeclado` bit(1) DEFAULT NULL,
  `IncluyeWebCam` bit(1) DEFAULT NULL,
  `FechaRemocion` datetime DEFAULT NULL,
  `UsuarioAsigna` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`IdAsignacion`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Volcando datos para la tabla rvinventory.asignaciones: ~1 rows (aproximadamente)
DELETE FROM `asignaciones`;
/*!40000 ALTER TABLE `asignaciones` DISABLE KEYS */;
INSERT INTO `asignaciones` (`IdAsignacion`, `IdEmpleado`, `IdEquipo`, `DetalleAsignacion`, `FechaAsignacion`, `IncluyeMochila`, `IncluyeMouse`, `IncluyeCargador`, `IncluyeTeclado`, `IncluyeWebCam`, `FechaRemocion`, `UsuarioAsigna`) VALUES
	(1, NULL, 0, '', '2022-03-03 13:58:34', NULL, NULL, NULL, NULL, NULL, '2022-03-04 13:56:04', NULL),
	(2, 1, 8, 'Probando asignacion', '2022-03-04 13:33:15', b'1', b'0', b'0', b'0', NULL, '2022-03-04 13:56:04', NULL),
	(3, 1, 8, 'Probando asignacion 2', '2022-03-04 13:35:32', b'0', b'1', b'1', b'1', b'0', '2022-03-04 13:56:04', NULL),
	(4, 1, 8, 'Hola 3', '2022-03-04 13:39:42', b'0', b'1', b'0', b'0', b'0', '2022-03-04 13:56:04', NULL),
	(5, 1, 8, 'ASIGNAR', '2022-03-04 13:40:17', b'0', b'0', b'0', b'1', b'0', '2022-03-04 13:56:04', 'crist12'),
	(6, 1, 8, 'Q', '2022-03-04 13:42:15', b'0', b'0', b'1', b'0', b'0', '2022-03-04 13:56:04', 'crist12'),
	(7, 1, 8, 'A', '2022-03-04 13:43:15', b'0', b'0', b'1', b'0', b'0', '2022-03-04 14:01:03', NULL),
	(8, 2, 9, 'A', '2022-03-04 13:44:03', b'0', b'0', b'0', b'0', b'0', '2022-03-04 14:01:33', NULL),
	(9, 3, 8, 'A', '2022-03-04 13:44:27', b'0', b'0', b'0', b'0', b'0', '2022-03-04 14:01:03', NULL),
	(10, 2, 9, 'ASDF', '2022-03-04 13:44:41', b'0', b'0', b'0', b'0', b'0', '2022-03-04 13:56:04', NULL);
/*!40000 ALTER TABLE `asignaciones` ENABLE KEYS */;

-- Volcando estructura para tabla rvinventory.bitacora
CREATE TABLE IF NOT EXISTS `bitacora` (
  `IdBitacora` int NOT NULL AUTO_INCREMENT,
  `Accion` varchar(300) NOT NULL DEFAULT '0',
  `Modulo` varchar(50) NOT NULL DEFAULT '0',
  PRIMARY KEY (`IdBitacora`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Volcando datos para la tabla rvinventory.bitacora: ~0 rows (aproximadamente)
DELETE FROM `bitacora`;
/*!40000 ALTER TABLE `bitacora` DISABLE KEYS */;
/*!40000 ALTER TABLE `bitacora` ENABLE KEYS */;

-- Volcando estructura para tabla rvinventory.caracteristica
CREATE TABLE IF NOT EXISTS `caracteristica` (
  `IdCategoria` int NOT NULL,
  `IdCaracteristica` int NOT NULL AUTO_INCREMENT,
  `CaracteristicaDescripcion` varchar(50) DEFAULT NULL,
  `Estado` bit(1) DEFAULT NULL,
  `Nivel` int DEFAULT NULL,
  `Requerido` bit(1) DEFAULT NULL,
  `FechaCreacion` datetime DEFAULT CURRENT_TIMESTAMP,
  `Placeholder` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `Tooltip` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `UsuarioCreo` varchar(50) DEFAULT NULL,
  `CaracteristicaTipo` int DEFAULT NULL,
  PRIMARY KEY (`IdCaracteristica`,`IdCategoria`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Volcando datos para la tabla rvinventory.caracteristica: ~19 rows (aproximadamente)
DELETE FROM `caracteristica`;
/*!40000 ALTER TABLE `caracteristica` DISABLE KEYS */;
INSERT INTO `caracteristica` (`IdCategoria`, `IdCaracteristica`, `CaracteristicaDescripcion`, `Estado`, `Nivel`, `Requerido`, `FechaCreacion`, `Placeholder`, `Tooltip`, `UsuarioCreo`, `CaracteristicaTipo`) VALUES
	(1, 1, 'Marca', b'1', 0, b'1', '2022-03-02 11:48:07', 'Ingresar marca', 'Marca', 'crist12', 4),
	(1, 2, 'Procesador', b'1', 4, b'1', '2022-03-02 11:48:07', 'Ingrese el procesador', 'Procesador', 'crist12', 1),
	(1, 3, 'Modelo', b'1', 1, b'1', '2022-03-02 11:48:07', 'Ingresar modelo', 'Modelo', 'crist12', 1),
	(1, 4, '¿Tiene SSD?', b'1', 5, b'1', '2022-03-02 11:48:07', 'Seleccione una opción', '¿Tiene SSD?', 'crist12', 4),
	(1, 5, 'Capacidad de disco', b'1', 6, b'1', '2022-03-02 11:48:07', 'Ingrese la capacidad del disco', 'Capacidad de disco', 'crist12', 1),
	(1, 6, 'Número de serie', b'1', 2, b'1', '2022-03-02 11:48:07', 'XXXXXXX', 'Número de serie', 'crist12', 1),
	(1, 7, 'Serie de cargador', b'1', 7, b'1', '2022-03-02 11:48:07', 'XXXXXXXXX', 'Serie de cargador', 'crist12', 1),
	(1, 8, 'Precio', b'1', 8, b'1', '2022-03-02 11:48:07', '0.00', 'Precio', 'crist12', 2),
	(1, 9, 'Adquirida el', b'1', 9, b'1', '2022-03-02 11:48:07', 'Adquirida el', 'Adquirida el', 'crist12', 5),
	(1, 10, 'Color', b'1', 3, b'1', '2022-03-02 11:48:07', 'Ingrese un color', 'Color', 'crist12', 1),
	(1, 11, 'Parte frontal', b'1', 10, b'1', '2022-03-02 11:48:07', 'Parte trasera', 'Parte trasera', 'crist12', 3),
	(1, 12, 'Parte trasera', b'1', 11, b'1', '2022-03-02 11:48:07', 'Parte trasera', 'Parte trasera', 'crist12', 3),
	(1, 13, 'Teclado', b'1', 12, b'1', '2022-03-02 11:48:07', 'Teclado', 'Teclado', 'crist12', 3),
	(1, 14, 'Imagen opcional', b'1', 13, b'0', '2022-03-02 11:48:07', 'Imagen opcional', 'Imagen opcional', 'crist12', 3),
	(1, 15, 'Foto del cargador', b'1', 14, b'0', '2022-03-02 11:48:07', 'Foto del cargador', 'Foto del cargador', 'crist12', 3),
	(2, 16, 'Ejemplo Numero', b'1', 1, b'0', '2022-03-02 14:43:34', 'Ejemplo Numero', 'Ejemplo Numero', NULL, 2),
	(2, 17, 'Ejemplo', b'1', 0, b'0', '2022-03-02 14:43:34', 'Ejemplo', 'Ejemplo', NULL, 1),
	(3, 18, 'Campo Texto', b'1', 0, b'0', '2022-03-03 09:00:14', NULL, 'Campo Texto', NULL, 1),
	(3, 19, 'Campo Numero', b'1', 1, b'0', '2022-03-03 09:00:14', NULL, 'Campo Numero', NULL, 2);
/*!40000 ALTER TABLE `caracteristica` ENABLE KEYS */;

-- Volcando estructura para tabla rvinventory.caracteristicaopcion
CREATE TABLE IF NOT EXISTS `caracteristicaopcion` (
  `IdOpcion` int NOT NULL AUTO_INCREMENT,
  `IdCategoria` int DEFAULT NULL,
  `IdCaracteristica` int DEFAULT NULL,
  `OpcionDescripcion` varchar(50) DEFAULT NULL,
  `Nivel` int DEFAULT NULL,
  `Estado` bit(1) DEFAULT NULL,
  PRIMARY KEY (`IdOpcion`)
) ENGINE=InnoDB AUTO_INCREMENT=40 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Volcando datos para la tabla rvinventory.caracteristicaopcion: ~7 rows (aproximadamente)
DELETE FROM `caracteristicaopcion`;
/*!40000 ALTER TABLE `caracteristicaopcion` DISABLE KEYS */;
INSERT INTO `caracteristicaopcion` (`IdOpcion`, `IdCategoria`, `IdCaracteristica`, `OpcionDescripcion`, `Nivel`, `Estado`) VALUES
	(33, 1, 1, 'Dell', 0, b'1'),
	(34, 1, 1, 'Toshiba', 1, b'1'),
	(35, 1, 1, 'Lenovo', 2, b'1'),
	(36, 1, 1, 'HP', 3, b'1'),
	(37, 1, 1, 'Asus', 4, b'1'),
	(38, 1, 4, 'Sí', 0, b'1'),
	(39, 1, 4, 'No', 1, b'1');
/*!40000 ALTER TABLE `caracteristicaopcion` ENABLE KEYS */;

-- Volcando estructura para tabla rvinventory.caracteristicarespuesta
CREATE TABLE IF NOT EXISTS `caracteristicarespuesta` (
  `IdEquipoIngresado` int DEFAULT NULL,
  `IdCategoria` int DEFAULT NULL,
  `IdCaracteristica` int DEFAULT NULL,
  `Respuesta` varchar(500) DEFAULT NULL,
  `FechaIngreso` datetime DEFAULT CURRENT_TIMESTAMP,
  `UsuarioCreo` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Volcando datos para la tabla rvinventory.caracteristicarespuesta: ~57 rows (aproximadamente)
DELETE FROM `caracteristicarespuesta`;
/*!40000 ALTER TABLE `caracteristicarespuesta` DISABLE KEYS */;
INSERT INTO `caracteristicarespuesta` (`IdEquipoIngresado`, `IdCategoria`, `IdCaracteristica`, `Respuesta`, `FechaIngreso`, `UsuarioCreo`) VALUES
	(1, 2, 17, 'Hola', '2022-03-03 08:52:54', NULL),
	(1, 2, 16, '25', '2022-03-03 08:52:54', NULL),
	(2, 2, 17, 'Hola', '2022-03-03 08:53:18', NULL),
	(2, 2, 16, '28', '2022-03-03 08:53:18', NULL),
	(3, 2, 17, 'Hola', '2022-03-03 08:59:17', NULL),
	(3, 2, 16, '28', '2022-03-03 08:59:17', NULL),
	(4, 3, 18, 'Probando', '2022-03-03 09:00:28', NULL),
	(4, 3, 19, '123', '2022-03-03 09:00:28', NULL),
	(5, 3, 19, '2', '2022-03-03 11:04:20', NULL),
	(5, 3, 18, 'Probando 2', '2022-03-03 11:04:20', NULL),
	(6, 2, 16, '6666', '2022-03-03 11:57:08', NULL),
	(6, 2, 17, 'XXXX', '2022-03-03 11:57:08', NULL),
	(7, 1, 1, '33', '2022-03-03 13:51:47', NULL),
	(7, 1, 3, 'Latitude', '2022-03-03 13:51:47', NULL),
	(7, 1, 6, '1234567', '2022-03-03 13:51:47', NULL),
	(7, 1, 8, '125.90', '2022-03-03 13:51:47', NULL),
	(7, 1, 4, '38', '2022-03-03 13:51:47', NULL),
	(7, 1, 2, 'i5 7ma Gen', '2022-03-03 13:51:47', NULL),
	(7, 1, 11, '', '2022-03-03 13:51:47', NULL),
	(7, 1, 10, 'Blanco', '2022-03-03 13:51:48', NULL),
	(7, 1, 7, '123456789', '2022-03-03 13:51:48', NULL),
	(7, 1, 5, '512 GB', '2022-03-03 13:51:48', NULL),
	(7, 1, 9, '2020-01-27', '2022-03-03 13:51:48', NULL),
	(7, 1, 15, '', '2022-03-03 13:51:48', NULL),
	(7, 1, 14, '', '2022-03-03 13:51:48', NULL),
	(7, 1, 13, '', '2022-03-03 13:51:48', NULL),
	(7, 1, 12, '', '2022-03-03 13:51:48', NULL),
	(8, 1, 7, '123456789', '2022-03-03 13:51:56', NULL),
	(8, 1, 3, 'Latitude', '2022-03-03 13:51:56', NULL),
	(8, 1, 1, '33', '2022-03-03 13:51:56', NULL),
	(8, 1, 10, 'Blanco', '2022-03-03 13:51:56', NULL),
	(8, 1, 9, '2020-01-27', '2022-03-03 13:51:56', NULL),
	(8, 1, 6, '1234567', '2022-03-03 13:51:56', NULL),
	(8, 1, 2, 'i5 7ma Gen', '2022-03-03 13:51:56', NULL),
	(8, 1, 4, '38', '2022-03-03 13:51:56', NULL),
	(8, 1, 8, '125.90', '2022-03-03 13:51:56', NULL),
	(8, 1, 5, '512 GB', '2022-03-03 13:51:56', NULL),
	(8, 1, 15, '', '2022-03-03 13:51:56', NULL),
	(8, 1, 12, '', '2022-03-03 13:51:56', NULL),
	(8, 1, 14, '', '2022-03-03 13:51:56', NULL),
	(8, 1, 11, '', '2022-03-03 13:51:56', NULL),
	(8, 1, 13, '', '2022-03-03 13:51:56', NULL),
	(9, 1, 6, '1234567', '2022-03-03 13:52:03', NULL),
	(9, 1, 5, '512 GB', '2022-03-03 13:52:03', NULL),
	(9, 1, 10, 'Blanco', '2022-03-03 13:52:03', NULL),
	(9, 1, 3, 'Latitude', '2022-03-03 13:52:03', NULL),
	(9, 1, 4, '38', '2022-03-03 13:52:03', NULL),
	(9, 1, 15, '', '2022-03-03 13:52:03', NULL),
	(9, 1, 14, '', '2022-03-03 13:52:03', NULL),
	(9, 1, 1, '33', '2022-03-03 13:52:03', NULL),
	(9, 1, 8, '1256', '2022-03-03 13:52:03', NULL),
	(9, 1, 2, 'i5 7ma Gen', '2022-03-03 13:52:03', NULL),
	(9, 1, 9, '2020-01-27', '2022-03-03 13:52:03', NULL),
	(9, 1, 7, '123456789', '2022-03-03 13:52:03', NULL),
	(9, 1, 12, '', '2022-03-03 13:52:03', NULL),
	(9, 1, 13, '', '2022-03-03 13:52:03', NULL),
	(9, 1, 11, '', '2022-03-03 13:52:03', NULL);
/*!40000 ALTER TABLE `caracteristicarespuesta` ENABLE KEYS */;

-- Volcando estructura para tabla rvinventory.caracteristicatipo
CREATE TABLE IF NOT EXISTS `caracteristicatipo` (
  `IdTipoCampo` int NOT NULL,
  `DescripcionTipo` varchar(50) DEFAULT NULL,
  `DisplayText` varchar(50) DEFAULT NULL,
  `Icono` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`IdTipoCampo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Volcando datos para la tabla rvinventory.caracteristicatipo: ~6 rows (aproximadamente)
DELETE FROM `caracteristicatipo`;
/*!40000 ALTER TABLE `caracteristicatipo` DISABLE KEYS */;
INSERT INTO `caracteristicatipo` (`IdTipoCampo`, `DescripcionTipo`, `DisplayText`, `Icono`) VALUES
	(1, 'text', 'Texto', 'icons10-pencil'),
	(2, 'number', 'Numérico', 'icons10-calculator'),
	(3, 'file', 'Imagen', 'icons10-image-file'),
	(4, 'select', 'Selección', 'icons10-todo-list'),
	(5, 'date', 'Fecha', 'icons10-calendar'),
	(6, 'textarea', 'Texto Largo', 'icons10-news');
/*!40000 ALTER TABLE `caracteristicatipo` ENABLE KEYS */;

-- Volcando estructura para tabla rvinventory.categorias
CREATE TABLE IF NOT EXISTS `categorias` (
  `IdCategoria` int NOT NULL AUTO_INCREMENT,
  `DescripcionCategoria` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `EstadoCategoria` bit(1) DEFAULT NULL,
  `FechaCreacion` datetime DEFAULT CURRENT_TIMESTAMP,
  `UsuarioCreo` varchar(50) DEFAULT NULL,
  `IdGrupo` int DEFAULT NULL,
  PRIMARY KEY (`IdCategoria`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Volcando datos para la tabla rvinventory.categorias: ~3 rows (aproximadamente)
DELETE FROM `categorias`;
/*!40000 ALTER TABLE `categorias` DISABLE KEYS */;
INSERT INTO `categorias` (`IdCategoria`, `DescripcionCategoria`, `EstadoCategoria`, `FechaCreacion`, `UsuarioCreo`, `IdGrupo`) VALUES
	(1, 'Laptops', b'1', '2022-03-02 11:48:06', 'crist12', 1),
	(2, 'Prueba', b'1', '2022-03-02 14:43:33', NULL, 1),
	(3, 'Campo2', b'1', '2022-03-03 09:00:12', NULL, 1);
/*!40000 ALTER TABLE `categorias` ENABLE KEYS */;

-- Volcando estructura para tabla rvinventory.ciudades
CREATE TABLE IF NOT EXISTS `ciudades` (
  `IdCiudad` int NOT NULL AUTO_INCREMENT,
  `NombreCiudad` varchar(50) NOT NULL DEFAULT '',
  PRIMARY KEY (`IdCiudad`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Volcando datos para la tabla rvinventory.ciudades: ~5 rows (aproximadamente)
DELETE FROM `ciudades`;
/*!40000 ALTER TABLE `ciudades` DISABLE KEYS */;
INSERT INTO `ciudades` (`IdCiudad`, `NombreCiudad`) VALUES
	(1, 'DC'),
	(3, 'Tela'),
	(4, 'Danli'),
	(5, 'Catacamas'),
	(6, 'San Nicolás');
/*!40000 ALTER TABLE `ciudades` ENABLE KEYS */;

-- Volcando estructura para tabla rvinventory.empleados
CREATE TABLE IF NOT EXISTS `empleados` (
  `IdEmpleado` int NOT NULL AUTO_INCREMENT,
  `NombreEmpleado` varchar(50) DEFAULT NULL,
  `Email` int DEFAULT NULL,
  `IdArea` int DEFAULT NULL,
  `IdSucursal` int DEFAULT NULL,
  `EstadoEmpleado` bit(1) DEFAULT b'1',
  PRIMARY KEY (`IdEmpleado`),
  KEY `IdAreaFK` (`IdArea`),
  CONSTRAINT `IdAreaFK` FOREIGN KEY (`IdArea`) REFERENCES `areas` (`IdArea`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Volcando datos para la tabla rvinventory.empleados: ~7 rows (aproximadamente)
DELETE FROM `empleados`;
/*!40000 ALTER TABLE `empleados` DISABLE KEYS */;
INSERT INTO `empleados` (`IdEmpleado`, `NombreEmpleado`, `Email`, `IdArea`, `IdSucursal`, `EstadoEmpleado`) VALUES
	(1, 'Christopher ', NULL, 1, 1, b'1'),
	(2, 'Hola', NULL, 1, 1, b'1'),
	(3, 'h', NULL, 1, 1, b'1'),
	(4, '<fsfasf', NULL, 1, 1, b'1'),
	(5, 'sdgsdg', NULL, 1, 1, b'1'),
	(6, 'segsd', NULL, 1, 1, b'1'),
	(7, 'Ejemplo', NULL, 2, 1, b'1');
/*!40000 ALTER TABLE `empleados` ENABLE KEYS */;

-- Volcando estructura para tabla rvinventory.equipos
CREATE TABLE IF NOT EXISTS `equipos` (
  `IdEquipo` int NOT NULL AUTO_INCREMENT,
  `MarcaEquipo` varchar(50) DEFAULT '0',
  `ModeloEquipo` varchar(50) DEFAULT '0',
  `NumeroSerie` varchar(50) DEFAULT '0',
  `Procesador` varchar(50) DEFAULT '0',
  `TipoDisco` varchar(50) DEFAULT '0',
  `PrecioEquipo` varchar(50) DEFAULT '0',
  `FechaAdquisicion` date DEFAULT NULL,
  `IdCategoria` int DEFAULT NULL,
  PRIMARY KEY (`IdEquipo`),
  KEY `IdCategoriaFK` (`IdCategoria`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Volcando datos para la tabla rvinventory.equipos: ~0 rows (aproximadamente)
DELETE FROM `equipos`;
/*!40000 ALTER TABLE `equipos` DISABLE KEYS */;
/*!40000 ALTER TABLE `equipos` ENABLE KEYS */;

-- Volcando estructura para tabla rvinventory.equiposestado
CREATE TABLE IF NOT EXISTS `equiposestado` (
  `IdEquipo` int DEFAULT NULL,
  `TipoEstado` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Volcando datos para la tabla rvinventory.equiposestado: ~9 rows (aproximadamente)
DELETE FROM `equiposestado`;
/*!40000 ALTER TABLE `equiposestado` DISABLE KEYS */;
INSERT INTO `equiposestado` (`IdEquipo`, `TipoEstado`) VALUES
	(1, 1),
	(5, 1),
	(6, 1),
	(14, 1),
	(15, 1),
	(16, 2),
	(7, 3),
	(8, 1),
	(9, 1);
/*!40000 ALTER TABLE `equiposestado` ENABLE KEYS */;

-- Volcando estructura para tabla rvinventory.estados
CREATE TABLE IF NOT EXISTS `estados` (
  `IdEstado` int NOT NULL AUTO_INCREMENT,
  `DescripcionEstado` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`IdEstado`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Volcando datos para la tabla rvinventory.estados: ~4 rows (aproximadamente)
DELETE FROM `estados`;
/*!40000 ALTER TABLE `estados` DISABLE KEYS */;
INSERT INTO `estados` (`IdEstado`, `DescripcionEstado`) VALUES
	(1, 'Sin asignar'),
	(2, 'Asignada'),
	(3, 'En mantenimiento'),
	(4, 'No disponible');
/*!40000 ALTER TABLE `estados` ENABLE KEYS */;

-- Volcando estructura para tabla rvinventory.grupos
CREATE TABLE IF NOT EXISTS `grupos` (
  `IdGrupo` int NOT NULL AUTO_INCREMENT,
  `DescripcionGrupo` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  PRIMARY KEY (`IdGrupo`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Volcando datos para la tabla rvinventory.grupos: ~1 rows (aproximadamente)
DELETE FROM `grupos`;
/*!40000 ALTER TABLE `grupos` DISABLE KEYS */;
INSERT INTO `grupos` (`IdGrupo`, `DescripcionGrupo`) VALUES
	(1, 'Computadora');
/*!40000 ALTER TABLE `grupos` ENABLE KEYS */;

-- Volcando estructura para tabla rvinventory.mantenimientos
CREATE TABLE IF NOT EXISTS `mantenimientos` (
  `IdMantenimiento` int NOT NULL AUTO_INCREMENT,
  `FechaMantenimiento` date DEFAULT NULL,
  `ObservacionesMantenimiento` varchar(50) NOT NULL DEFAULT '0',
  `IdEquipo` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`IdMantenimiento`),
  KEY `IdEquipo` (`IdEquipo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Volcando datos para la tabla rvinventory.mantenimientos: ~0 rows (aproximadamente)
DELETE FROM `mantenimientos`;
/*!40000 ALTER TABLE `mantenimientos` DISABLE KEYS */;
/*!40000 ALTER TABLE `mantenimientos` ENABLE KEYS */;

-- Volcando estructura para tabla rvinventory.sucursales
CREATE TABLE IF NOT EXISTS `sucursales` (
  `IdSucursal` int NOT NULL AUTO_INCREMENT,
  `NombreSucursal` varchar(50) NOT NULL DEFAULT '0',
  `IdCiudad` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`IdSucursal`),
  KEY `IdCiudadFK` (`IdCiudad`),
  CONSTRAINT `IdCiudadFK` FOREIGN KEY (`IdCiudad`) REFERENCES `ciudades` (`IdCiudad`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Volcando datos para la tabla rvinventory.sucursales: ~9 rows (aproximadamente)
DELETE FROM `sucursales`;
/*!40000 ALTER TABLE `sucursales` DISABLE KEYS */;
INSERT INTO `sucursales` (`IdSucursal`, `NombreSucursal`, `IdCiudad`) VALUES
	(1, 'Suyapa', 1),
	(2, 'San Nicolás', 1),
	(3, 'Hola', 6),
	(4, 'Centro', 5),
	(5, 'Sur', 5),
	(6, 'Este', 5),
	(7, 'Col 1', 5),
	(8, 'Sucursal 3', 1),
	(9, 's', 3);
/*!40000 ALTER TABLE `sucursales` ENABLE KEYS */;

-- Volcando estructura para tabla rvinventory.tiposasignaciones
CREATE TABLE IF NOT EXISTS `tiposasignaciones` (
  `IdTipoAsignacion` int NOT NULL AUTO_INCREMENT,
  `DescripcionTipoAsignacion` varchar(50) NOT NULL DEFAULT '0',
  PRIMARY KEY (`IdTipoAsignacion`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Volcando datos para la tabla rvinventory.tiposasignaciones: ~0 rows (aproximadamente)
DELETE FROM `tiposasignaciones`;
/*!40000 ALTER TABLE `tiposasignaciones` DISABLE KEYS */;
/*!40000 ALTER TABLE `tiposasignaciones` ENABLE KEYS */;

-- Volcando estructura para tabla rvinventory.usuarios
CREATE TABLE IF NOT EXISTS `usuarios` (
  `IdUsuario` int NOT NULL AUTO_INCREMENT,
  `NombreUsuario` varchar(50) DEFAULT NULL,
  `ContraseniaUsuario` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  PRIMARY KEY (`IdUsuario`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Volcando datos para la tabla rvinventory.usuarios: ~2 rows (aproximadamente)
DELETE FROM `usuarios`;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` (`IdUsuario`, `NombreUsuario`, `ContraseniaUsuario`) VALUES
	(1, 'crist12', '$2b$10$s/mdAw7kxP1O78PIL3dBT./EG6CmRZD/CDelNNDXWXdJb7/tp8Wc2'),
	(2, 'crist13', '$2b$10$8V2oSfTVITVPh/zJplp2c.9sAAM/u5bk7tBDGJ0lX62FANPJ/wh2O');
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;

-- Volcando estructura para procedimiento rvinventory.spProductsTable
DELIMITER //
CREATE PROCEDURE `spProductsTable`()
BEGIN

END//
DELIMITER ;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
