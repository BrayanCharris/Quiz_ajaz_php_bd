create database preguntadosena;
use preguntadosena;
#ROLES
CREATE TABLE usuarios(
	id_user bigint primary key auto_increment,
	nombre_usuario varchar(50) not null,
    usuario varchar(50) not null,
    contrasena varchar(50) not null
);

#CATEGORIAS DE LOS APRENDICEZ
CREATE TABLE grupos(
	id_grupo bigint primary key auto_increment,
    nombre_grupo varchar(50) not null
);


CREATE TABLE aprendices(
	id_aprendiz bigint primary key auto_increment,
    nombre_aprendiz varchar(50) not null,
    correo varchar(30) not null,
    contrasena varchar(50),
    id_grupo bigint references grupos(id_grupo),
    numeroGrupo varchar(10) not null
);


#JUEGO

CREATE TABLE categorias(
	codigo_categoria bigint primary key,#GENERADO POR LA APLICACION(NUMERICO)
    nombre_categoria varchar(50) not null
);

CREATE TABLE preguntas(
	codigo_pregunta varchar(50) primary key,#GENERADO POR LA APLICACION(ALFANUMERICO)
    pregunta varchar(1000) not null,
    codigo_categoria bigint references categorias(codigo_categoria)
);

CREATE TABLE respuestas(
	id_respuesta bigint primary key auto_increment,
    resp_correcta varchar(50) not null,
    resp_incorrecta1 varchar(50) not null,
    resp_incorrecta2 varchar(50),
    resp_incorrecta3 varchar(50),
    codigo_pregunta varchar(50) references preguntas(codigo_pregunta)
);


#CONFIG JUEGO

CREATE TABLE configuracion_juego_grupo(
	id_config bigint primary key auto_increment,
    id_grupo bigint references grupos(id_grupo),
    codigo_categoria bigint references categorias(codigo_categoria),
    numero_preguntas bigint
);


#PUNTAJES

CREATE TABLE puntajes(
	codigo_puntaje bigint primary key,
    id_aprendiz bigint references aprendices(id_aprendiz),
    puntaje_total varchar(50),
    fecha DATETIME DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE punatjes_categorias(
	id_pun_cat bigint primary key auto_increment,
    codigo_puntaje bigint references puntajes(codigo_puntaje),
    codigo_categoria bigint references categorias(codigo_categoria),
    puntaje varchar(50) not null
);

/*REGISTRO*/
INSERT INTO usuarios VALUES (1,"INSTRUCTORES SENA","adminSena",md5("SenaTic2022"));

INSERT INTO grupos(nombre_grupo) values('ADSI'),('MULTIMEDIA'),('ADSO'),('TSCC'),('SISTEMAS'),('TPS');

INSERT INTO categorias values (123,'DESARROLLO WEB'),(1234,'BASE DE DATOS'),(12345,'SISTEMA OPERATIVO'),(123456,'PYTHON');

INSERT INTO preguntas values ('ABC','¿Qué significa HTML?',123),('ABCD','¿Qué significa CSS?',123),('ABCDE','¿Qué significa PHP?',123),
							 ('ABCDEF','What does XML stand for?',123),('ABCDEFG','Como hacer una consulta en SQL?',1234),
                             ('ABCDEFGh','¿Cuál es la distribución de Linux más usada?',12345),
                             ('ABCD1234','¿Como se imprime en pyhton?',123456);

INSERT INTO respuestas values
		(null,'Hyper Text Markup Language','Hyper Text Preprocessor','Hyper Text Multiple Language','Hyper Tool Multi Language','ABC'),
		(null,'Cascading Style Sheet','Common Style Sheet','Colorful Style Sheet','Computer Style Sheet','ABCD'),
        (null,'Hypertext Preprocessor','Hypertext Programming','Hypertext Preprogramming','Hometext Preprocessor','ABCDE'),
        (null,'eXtensible Markup Language','eXecutable Multiple Language','eXTra Multi-Program Language','eXamine Multiple Language','ABCDEF'),
        (null,'Select * from Nombre tabla','Selected campos from Tabla Wheer condicion','Update Nombre Table where condicion','Insert into Nombre Table values (valor1,valor2)','ABCDEFG'),
        (null,'Ubuntu','Fedora','Mint','Debian','ABCDEFGh'),
        (null,'print','cosole.log()','echo','system.out.print()','ABCD1234');
        
        
INSERT INTO configuracion_juego_grupo values(null,1,123,2),
											(null,1,1234,null),
											(null,1,12345,null),
                                            (null,1,12346,null);
                                            
SELECT c.codigo_categoria,nombre_categoria,pregunta,resp_correcta,resp_incorrecta1,resp_incorrecta2,resp_incorrecta3 FROM categorias AS c INNER JOIN preguntas as p ON p.codigo_categoria=c.codigo_categoria INNER JOIN respuestas AS r ON R.codigo_pregunta=P.codigo_pregunta ORDER BY rand() limit 2;
                                            

#select * from preguntas order by rand() limit 2;

