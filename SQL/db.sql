-- phpMyAdmin SQL Dump
-- version 4.9.3
-- https://www.phpmyadmin.net/
--
-- Host: localhost:8889
-- Generation Time: Aug 24, 2020 at 04:03 PM
-- Server version: 5.7.26
-- PHP Version: 7.4.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

--
-- Database: `appoyalos`
--

-- --------------------------------------------------------

--
-- Table structure for table `canal`
--

CREATE TABLE `canal` (
  `idcanal` int(11) NOT NULL,
  `usuario_remitente` int(11) DEFAULT NULL,
  `usuario_receptor` int(11) DEFAULT NULL,
  `iddonacion` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `categorias`
--

CREATE TABLE `categorias` (
  `idcategorias` int(11) NOT NULL,
  `nombre` varchar(32) NOT NULL,
  `descripcion` varchar(80) DEFAULT NULL,
  `imagenurl` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `categorias`
--

INSERT INTO `categorias` (`idcategorias`, `nombre`, `descripcion`, `imagenurl`) VALUES
(1, 'Ropa', 'Dona tu ropa', 'default.png'),
(2, 'Comida', 'Dona tu Comida', 'default.png'),
(3, 'Muebles', 'Dona tus Muebles', 'default.png'),
(4, 'Medicina', 'Dona tus Medicina', 'default.png');

-- --------------------------------------------------------

--
-- Table structure for table `direccion`
--

CREATE TABLE `direccion` (
  `iddireccion` int(11) NOT NULL,
  `pais` varchar(45) NOT NULL,
  `entidadfed` varchar(32) NOT NULL,
  `municipio` varchar(45) NOT NULL,
  `colonia` varchar(45) DEFAULT NULL,
  `calle` varchar(45) DEFAULT NULL,
  `numeroext` varchar(10) DEFAULT NULL,
  `numeroint` varchar(10) DEFAULT NULL,
  `referencia` varchar(45) DEFAULT NULL,
  `nombre` varchar(32) DEFAULT NULL,
  `latitud` decimal(10,0) DEFAULT NULL,
  `longitud` decimal(10,0) DEFAULT NULL,
  `idusuarios` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `donacion`
--

CREATE TABLE `donacion` (
  `iddonacion` int(11) NOT NULL,
  `idproductos` int(11) DEFAULT NULL,
  `id_usuario_beneficiario` int(11) DEFAULT NULL,
  `cantidad` decimal(10,0) DEFAULT NULL,
  `fecha` datetime DEFAULT NULL,
  `estado` varchar(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `mensaje`
--

CREATE TABLE `mensaje` (
  `idmensaje` int(11) NOT NULL,
  `idcanal` int(11) DEFAULT NULL,
  `mensaje` varchar(45) DEFAULT NULL,
  `fecha` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `opinion`
--

CREATE TABLE `opinion` (
  `idopinion` int(11) NOT NULL,
  `idproductos` int(11) NOT NULL,
  `id_usuarios` int(11) NOT NULL,
  `comentario` varchar(45) DEFAULT NULL,
  `calificacion` decimal(10,0) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `productos`
--

CREATE TABLE `productos` (
  `idproductos` int(11) NOT NULL,
  `nombre` varchar(32) NOT NULL,
  `descripcion` varchar(80) DEFAULT NULL,
  `imagenurl` varchar(45) DEFAULT NULL,
  `existencia` decimal(10,0) DEFAULT NULL,
  `idcategorias` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `activo` tinyint(1) DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `tiposusuarios`
--

CREATE TABLE `tiposusuarios` (
  `idtipouser` int(11) NOT NULL,
  `nombre` varchar(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tiposusuarios`
--

INSERT INTO `tiposusuarios` (`idtipouser`, `nombre`) VALUES
(1, 'Admin'),
(2, 'Usuario'),
(3, 'Admin'),
(4, 'User');

-- --------------------------------------------------------

--
-- Table structure for table `usuarios`
--

CREATE TABLE `usuarios` (
  `idusuarios` int(11) NOT NULL,
  `contrasena` varchar(100) NOT NULL,
  `correo` varchar(40) NOT NULL,
  `telefono` varchar(10) NOT NULL,
  `fechanac` date DEFAULT NULL,
  `imagenurl` varchar(45) DEFAULT NULL,
  `genero` varchar(1) DEFAULT NULL,
  `nombre` varchar(32) NOT NULL,
  `apellidomat` varchar(32) NOT NULL,
  `apellidopat` varchar(32) NOT NULL,
  `curp` varchar(18) DEFAULT NULL,
  `idtipouser` int(11) DEFAULT NULL,
  `idsocket` varchar(45) DEFAULT NULL,
  `activo` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `usuarios`
--

INSERT INTO `usuarios` (`idusuarios`, `contrasena`, `correo`, `telefono`, `fechanac`, `imagenurl`, `genero`, `nombre`, `apellidomat`, `apellidopat`, `curp`, `idtipouser`, `idsocket`, `activo`) VALUES
(1, 'e10adc3949ba59abbe56e057f20f883e', 'feldjesus@gmail.com', '9211684222', '1999-08-31', 'default.jpg', 'M', 'Felipe', 'Rodriguez', 'Ramirez', 'RARF990831HVZMDL02', NULL, NULL, 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `canal`
--
ALTER TABLE `canal`
  ADD PRIMARY KEY (`idcanal`),
  ADD KEY `canal_donacion_idx` (`iddonacion`),
  ADD KEY `canal_remitente_idx` (`usuario_remitente`),
  ADD KEY `canal_recepto_idx` (`usuario_receptor`);

--
-- Indexes for table `categorias`
--
ALTER TABLE `categorias`
  ADD PRIMARY KEY (`idcategorias`),
  ADD UNIQUE KEY `idcategorias_UNIQUE` (`idcategorias`);

--
-- Indexes for table `direccion`
--
ALTER TABLE `direccion`
  ADD PRIMARY KEY (`iddireccion`),
  ADD KEY `direccion_usuarios_idx` (`idusuarios`);

--
-- Indexes for table `donacion`
--
ALTER TABLE `donacion`
  ADD PRIMARY KEY (`iddonacion`),
  ADD KEY `donacion_usuario_idx` (`id_usuario_beneficiario`),
  ADD KEY `donacion_producto_idx` (`idproductos`);

--
-- Indexes for table `mensaje`
--
ALTER TABLE `mensaje`
  ADD PRIMARY KEY (`idmensaje`),
  ADD KEY `mensaje_canal_idx` (`idcanal`);

--
-- Indexes for table `opinion`
--
ALTER TABLE `opinion`
  ADD PRIMARY KEY (`idopinion`),
  ADD KEY `opinion_usuario_idx` (`id_usuarios`),
  ADD KEY `opinion_producto_idx` (`idproductos`);

--
-- Indexes for table `productos`
--
ALTER TABLE `productos`
  ADD PRIMARY KEY (`idproductos`),
  ADD UNIQUE KEY `idproductos_UNIQUE` (`idproductos`),
  ADD KEY `productos_usuarios_idx` (`id_usuario`),
  ADD KEY `productos_categorias_idx` (`idcategorias`);

--
-- Indexes for table `tiposusuarios`
--
ALTER TABLE `tiposusuarios`
  ADD PRIMARY KEY (`idtipouser`),
  ADD UNIQUE KEY `idtipouser_UNIQUE` (`idtipouser`);

--
-- Indexes for table `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`idusuarios`),
  ADD KEY `idtipouser` (`idtipouser`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `categorias`
--
ALTER TABLE `categorias`
  MODIFY `idcategorias` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `direccion`
--
ALTER TABLE `direccion`
  MODIFY `iddireccion` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `donacion`
--
ALTER TABLE `donacion`
  MODIFY `iddonacion` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `mensaje`
--
ALTER TABLE `mensaje`
  MODIFY `idmensaje` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `opinion`
--
ALTER TABLE `opinion`
  MODIFY `idopinion` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `productos`
--
ALTER TABLE `productos`
  MODIFY `idproductos` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tiposusuarios`
--
ALTER TABLE `tiposusuarios`
  MODIFY `idtipouser` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `idusuarios` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `canal`
--
ALTER TABLE `canal`
  ADD CONSTRAINT `canal_donacion` FOREIGN KEY (`iddonacion`) REFERENCES `donacion` (`iddonacion`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `canal_recepto` FOREIGN KEY (`usuario_receptor`) REFERENCES `usuarios` (`idusuarios`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `canal_remitente` FOREIGN KEY (`usuario_remitente`) REFERENCES `usuarios` (`idusuarios`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `direccion`
--
ALTER TABLE `direccion`
  ADD CONSTRAINT `direccion_usuarios` FOREIGN KEY (`idusuarios`) REFERENCES `usuarios` (`idusuarios`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `donacion`
--
ALTER TABLE `donacion`
  ADD CONSTRAINT `donacion_producto` FOREIGN KEY (`idproductos`) REFERENCES `productos` (`idproductos`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `donacion_usuario` FOREIGN KEY (`id_usuario_beneficiario`) REFERENCES `usuarios` (`idusuarios`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `mensaje`
--
ALTER TABLE `mensaje`
  ADD CONSTRAINT `mensaje_canal` FOREIGN KEY (`idcanal`) REFERENCES `canal` (`idcanal`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `opinion`
--
ALTER TABLE `opinion`
  ADD CONSTRAINT `opinion_producto` FOREIGN KEY (`idproductos`) REFERENCES `productos` (`idproductos`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `opinion_usuario` FOREIGN KEY (`id_usuarios`) REFERENCES `usuarios` (`idusuarios`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `productos`
--
ALTER TABLE `productos`
  ADD CONSTRAINT `productos_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`idusuarios`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `productos_ibfk_2` FOREIGN KEY (`idcategorias`) REFERENCES `categorias` (`idcategorias`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `usuarios`
--
ALTER TABLE `usuarios`
  ADD CONSTRAINT `usuarios_ibfk_1` FOREIGN KEY (`idtipouser`) REFERENCES `tiposusuarios` (`idtipouser`) ON DELETE NO ACTION ON UPDATE NO ACTION;
