<?php
    include('./conexionBD.php');

    $nombre = $_POST['nombre'];
    $correo = $_POST['correo'];
    $contraseña = $_POST['contraseña'];
    $idgrupo = $_POST['idgrupo'];
    $numeroFicha = $_POST['numeroFicha'];

    $nombre=strtoupper($nombre);

    $query="INSERT INTO aprendices VALUES(null,'$nombre','$correo','$contraseña',$idgrupo,'$numeroFicha');";

    $result= mysqli_query($connection,$query);

    if (!$result) {
        die('REGISTRO FALLIDO! '. mysqli_error($connection));
    }

    echo true;
?>