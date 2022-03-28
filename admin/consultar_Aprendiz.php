<?php

    include('./conexionBD.php');

    $email=$_POST['correo'];

    $query= "SELECT id_aprendiz,contrasena,id_grupo FROM aprendices WHERE correo='$email'";

    $result= mysqli_query($connection,$query);

    if (!$result) {
        die('CONSULTA FALLIDA'. mysqli_error($connection));
    }

    $json=array();

    while ($row = mysqli_fetch_array($result)) {
        $json[]=array(
            'id_aprendiz'=> $row['id_aprendiz'],
            'contra'=> $row['contrasena'],
            'grupo'=> $row['id_grupo'],
        );
    }

    $jsonString = json_encode($json);

    echo $jsonString;

?>