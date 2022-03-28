<?php
    include('./conexionBD.php');

    $id=$_POST['IdGrupo'];

    $query= "SELECT * FROM configuracion_juego_grupo WHERE id_grupo=$id";

    $result= mysqli_query($connection,$query);

    if (!$result) {
        die('CONSULTA DE PRUEBA FALLIDA!'.mysqli_error($connection));
    }

    $existe=false;
    
    if (mysqli_num_rows($result)>0) {
        $existe= true;
    }

    echo $existe;

?>