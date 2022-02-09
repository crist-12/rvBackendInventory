-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Versión del servidor:         8.0.25 - MySQL Community Server - GPL
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
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- La exportación de datos fue deseleccionada.

-- Volcando estructura para tabla rvinventory.asignaciones
CREATE TABLE IF NOT EXISTS `asignaciones` (
  `IdAsignacion` int NOT NULL AUTO_INCREMENT,
  `IdTipoAsignacion` int NOT NULL DEFAULT '0',
  `IdEmpleado` int DEFAULT NULL,
  `IdEquipo` int NOT NULL DEFAULT '0',
  `DetalleAsignacion` varchar(50) DEFAULT '0',
  `FechaAsignacion` varchar(50) DEFAULT '0',
  `IncluyeMochila` int DEFAULT NULL,
  `IncluyeMouse` int DEFAULT NULL,
  `IncluyeCargador` int DEFAULT NULL,
  `IncluyeTeclado` int DEFAULT NULL,
  PRIMARY KEY (`IdAsignacion`),
  KEY `IdEquipoFK` (`IdEquipo`),
  KEY `IdEmpleadoFK` (`IdEmpleado`),
  KEY `IdTipoAsignacionFK` (`IdTipoAsignacion`),
  CONSTRAINT `IdEmpleadoFK` FOREIGN KEY (`IdEmpleado`) REFERENCES `empleados` (`IdEmpleado`),
  CONSTRAINT `IdEquipoFK` FOREIGN KEY (`IdEquipo`) REFERENCES `equipos` (`IdEquipo`),
  CONSTRAINT `IdTipoAsignacionFK` FOREIGN KEY (`IdTipoAsignacion`) REFERENCES `tiposasignaciones` (`IdTipoAsignacion`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- La exportación de datos fue deseleccionada.

-- Volcando estructura para tabla rvinventory.bitacora
CREATE TABLE IF NOT EXISTS `bitacora` (
  `IdBitacora` int NOT NULL AUTO_INCREMENT,
  `Accion` varchar(300) NOT NULL DEFAULT '0',
  `Modulo` varchar(50) NOT NULL DEFAULT '0',
  PRIMARY KEY (`IdBitacora`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- La exportación de datos fue deseleccionada.

-- Volcando estructura para tabla rvinventory.categorias
CREATE TABLE IF NOT EXISTS `categorias` (
  `IdCategoria` int NOT NULL AUTO_INCREMENT,
  `DescripcionCategoria` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`IdCategoria`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- La exportación de datos fue deseleccionada.

-- Volcando estructura para tabla rvinventory.ciudades
CREATE TABLE IF NOT EXISTS `ciudades` (
  `IdCiudad` int NOT NULL AUTO_INCREMENT,
  `NombreCiudad` varchar(50) NOT NULL DEFAULT '',
  PRIMARY KEY (`IdCiudad`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- La exportación de datos fue deseleccionada.

-- Volcando estructura para tabla rvinventory.empleados
CREATE TABLE IF NOT EXISTS `empleados` (
  `IdEmpleado` int NOT NULL AUTO_INCREMENT,
  `NombreEmpleado` varchar(50) DEFAULT NULL,
  `EstadoEmpleado` bit(1) DEFAULT NULL,
  `IdArea` int DEFAULT NULL,
  PRIMARY KEY (`IdEmpleado`),
  KEY `IdAreaFK` (`IdArea`),
  CONSTRAINT `IdAreaFK` FOREIGN KEY (`IdArea`) REFERENCES `areas` (`IdArea`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- La exportación de datos fue deseleccionada.

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
  KEY `IdCategoriaFK` (`IdCategoria`),
  CONSTRAINT `IdCategoriaFK` FOREIGN KEY (`IdCategoria`) REFERENCES `categorias` (`IdCategoria`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- La exportación de datos fue deseleccionada.

-- Volcando estructura para tabla rvinventory.mantenimientos
CREATE TABLE IF NOT EXISTS `mantenimientos` (
  `IdMantenimiento` int NOT NULL AUTO_INCREMENT,
  `FechaMantenimiento` date DEFAULT NULL,
  `ObservacionesMantenimiento` varchar(50) NOT NULL DEFAULT '0',
  `IdEquipo` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`IdMantenimiento`),
  KEY `IdEquipo` (`IdEquipo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- La exportación de datos fue deseleccionada.

-- Volcando estructura para tabla rvinventory.sucursales
CREATE TABLE IF NOT EXISTS `sucursales` (
  `IdSucursal` int NOT NULL AUTO_INCREMENT,
  `NombreSucursal` varchar(50) NOT NULL DEFAULT '0',
  `IdCiudad` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`IdSucursal`),
  KEY `IdCiudadFK` (`IdCiudad`),
  CONSTRAINT `IdCiudadFK` FOREIGN KEY (`IdCiudad`) REFERENCES `ciudades` (`IdCiudad`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- La exportación de datos fue deseleccionada.

-- Volcando estructura para tabla rvinventory.tiposasignaciones
CREATE TABLE IF NOT EXISTS `tiposasignaciones` (
  `IdTipoAsignacion` int NOT NULL AUTO_INCREMENT,
  `DescripcionTipoAsignacion` varchar(50) NOT NULL DEFAULT '0',
  PRIMARY KEY (`IdTipoAsignacion`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- La exportación de datos fue deseleccionada.

-- Volcando estructura para tabla rvinventory.usuarios
CREATE TABLE IF NOT EXISTS `usuarios` (
  `IdUsuario` int NOT NULL AUTO_INCREMENT,
  `NombreUsuario` varchar(50) DEFAULT NULL,
  `ContraseniaUsuario` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  PRIMARY KEY (`IdUsuario`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- La exportación de datos fue deseleccionada.

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
