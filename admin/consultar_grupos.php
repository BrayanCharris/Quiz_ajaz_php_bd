<?php

    include('./conexionBD.php');

    $query="SELECT * FROM grupos ORDER BY  nombre_grupo";

    $result=mysqli_query($connection,$query);

    if (!$result) {
        die("ERROR AL CONSULTA DE GRUPOS!".mysqli_error($connection));
    }

    $json=array();

    while ($row = mysqli_fetch_array($result)) {
        $json[]=array(
            'nombre'=> $row['nombre_grupo']
        );
    }

    $jsonString = json_encode($json);

    echo $jsonString;

?>