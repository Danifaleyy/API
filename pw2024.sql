-- Crear la tabla Clientes
CREATE TABLE clientes (
  id INT(11) NOT NULL AUTO_INCREMENT,
  nombre VARCHAR(200) DEFAULT NULL,
  direccion VARCHAR(300) DEFAULT NULL,
  telefono VARCHAR(15) DEFAULT NULL,
  correo_electronico VARCHAR(100) DEFAULT NULL,
  ciudad VARCHAR(100) DEFAULT NULL,
  PRIMARY KEY (id_cliente)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--Crear la tabla Personal
CREATE TABLE personal (
  id int(11) NOT NULL AUTO_INCREMENT,
  nombre varchar(200) DEFAULT NULL,
  direccion varchar(300) DEFAULT NULL,
  telefono varchar(15) DEFAULT NULL,
  estatus varchar(1) DEFAULT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- Crear la tabla Artículos
CREATE TABLE articulos (
  id_articulo INT(11) NOT NULL AUTO_INCREMENT,
  descripcion VARCHAR(300) DEFAULT NULL,
  precio DECIMAL(10, 2) DEFAULT NULL,
  cantidad_almacen INT(11) DEFAULT NULL,
  fecha_caducidad DATE DEFAULT NULL,
  PRIMARY KEY (id_articulo)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- Crear la tabla Ventas
CREATE TABLE ventas (
  id_venta INT(11) NOT NULL AUTO_INCREMENT,
  id_articulo INT(11) NOT NULL,
  id INT(11) NOT NULL,
  cantidad INT(11) NOT NULL,
  precio DECIMAL(10, 2) NOT NULL,
  iva DECIMAL(10, 2) NOT NULL,
  subtotal DECIMAL(10, 2) NOT NULL,
  total DECIMAL(10, 2) NOT NULL,
  fecha_venta DATE NOT NULL,
  PRIMARY KEY (id_venta),
  FOREIGN KEY (id_articulo) REFERENCES articulos(id_articulo),
  FOREIGN KEY (id) REFERENCES clientes(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- Crear la tabla Compras
CREATE TABLE compras (
  id_compra INT(11) NOT NULL AUTO_INCREMENT,
  id_articulo INT(11) NOT NULL,
  cantidad INT(11) NOT NULL,
  precio DECIMAL(10, 2) NOT NULL,
  iva DECIMAL(10, 2) NOT NULL,
  subtotal DECIMAL(10, 2) NOT NULL,
  total DECIMAL(10, 2) NOT NULL,
  fecha_compra DATE NOT NULL,
  PRIMARY KEY (id_compra),
  FOREIGN KEY (id_articulo) REFERENCES articulos(id_articulo)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- Crear la tabla Registro
CREATE TABLE registro (
  id_registro INT(11) NOT NULL AUTO_INCREMENT,
  id INT(11) NOT NULL,
  fecha DATE NOT NULL,
  hora TIME NOT NULL,
  movimiento ENUM('entrada', 'salida') NOT NULL,
  PRIMARY KEY (id_registro),
  FOREIGN KEY (id) REFERENCES personal(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;





--

--Proyecto finanzas

--Tabla cuentas
CREATE TABLE cuenta (
  id_cuenta INT(11) NOT NULL AUTO_INCREMENT,
  nombre VARCHAR(40) DEFAULT NULL,
  PRIMARY KEY (id_cuenta)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--Tabla Categoria_Ingreso
CREATE TABLE categoria_ingreso (
  id_categoria_ingreso INT(11) NOT NULL AUTO_INCREMENT,
  nombre VARCHAR(30) DEFAULT NULL,
  PRIMARY KEY (id_categoria_ingreso)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--Tabla Categoria_Gasto
CREATE TABLE categoria_gasto (
  id_categoria_gasto INT(11) NOT NULL AUTO_INCREMENT,
  nombre VARCHAR(30) DEFAULT NULL,
  PRIMARY KEY (id_categoria_gasto)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--Tabla Tipo_Gasto
CREATE TABLE tipo_gasto (
  id_tipo_gasto INT(11) NOT NULL AUTO_INCREMENT,
  nombre VARCHAR(30) DEFAULT NULL,
  PRIMARY KEY (id_tipo_gasto)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--Tabla Lugar de gasto
CREATE TABLE lugar_gasto (
  id_lugar_gasto INT(11) NOT NULL AUTO_INCREMENT,
  nombre VARCHAR(40) DEFAULT NULL,
  PRIMARY KEY (id_lugar_gasto)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--Tabla Ingreso
CREATE TABLE ingreso (
  id_ingreso INT(11) NOT NULL AUTO_INCREMENT,
  fk_id_cuenta INT(11) NOT NULL,
  fk_id_categoria_ingreso INT(11) NOT NULL,
  descripcion VARCHAR(100) DEFAULT NULL,
  monto DECIMAL(10, 2) NOT NULL,
  fecha_operacion DATE NOT NULL,
  --Primary Key
  PRIMARY KEY (id_ingreso),
  --Forgein Key
  FOREIGN KEY (fk_id_cuenta) REFERENCES cuenta(id_cuenta),
  FOREIGN KEY (fk_id_categoria_ingreso) REFERENCES categoria_ingreso(id_categoria_ingreso)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--Tabla Gasto
CREATE TABLE gasto (
  id_gasto INT(11) NOT NULL AUTO_INCREMENT,
  fk_id_cuenta INT(11) NOT NULL,
  fk_id_categoria_gasto INT(11) NOT NULL,
  fk_id_tipo_gasto INT(11) NOT NULL,
  fk_id_lugar_gasto INT(11) NOT NULL,
  descripcion VARCHAR(100) DEFAULT NULL,
  monto DECIMAL(10, 2) NOT NULL,
  fecha_operacion DATE NOT NULL,
  fecha_pago DATE NOT NULL,
  --Primary Key
  PRIMARY KEY (id_gasto),
  --Forgein Key
  FOREIGN KEY (fk_id_cuenta) REFERENCES cuenta(id_cuenta),
  FOREIGN KEY (fk_id_categoria_gasto) REFERENCES categoria_gasto(id_categoria_gasto),
  FOREIGN KEY (fk_id_tipo_gasto) REFERENCES tipo_gasto(id_tipo_gasto),
  FOREIGN KEY (fk_id_lugar_gasto) REFERENCES lugar_gasto(id_lugar_gasto)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--Tabla Transacciones
CREATE TABLE transaccion (
  id_transaccion INT(11) NOT NULL AUTO_INCREMENT,
  fk_id_cuenta_saliente INT(11) NOT NULL,
  fk_id_cuenta_entrante INT(11) NOT NULL,
  descripcion VARCHAR(100) DEFAULT NULL,
  monto DECIMAL(10, 2) NOT NULL,
  fecha DATE NOT NULL,
  --Primary Key
  PRIMARY KEY (id_transaccion),
  --Forgein Key
  FOREIGN KEY (fk_id_cuenta_saliente) REFERENCES cuenta(id_cuenta),
  FOREIGN KEY (fk_id_cuenta_entrante) REFERENCES cuenta(id_cuenta)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;