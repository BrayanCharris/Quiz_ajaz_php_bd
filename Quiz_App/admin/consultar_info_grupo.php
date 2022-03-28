<?php

    include('../../admin/conexionBD.php');

    session_start();
    
    $idGrupo=$_SESSION['idGrupo'];

    $query="SELECT codigo_categoria,numero_preguntas FROM configuracion_juego_grupo WHERE id_grupo=$idGrupo";

    $result= mysqli_query($connection,$query);

    if (!$result) {
        die("Consulta de config de juego fallida!". mysqli_error($connection));
    }

    $json=array();

    while ($row = mysqli_fetch_array($result)) {
        $json[]=array(
            'codCategoria'=>$row['codigo_categoria'],
            'numeroPreguntas'=>$row['numero_preguntas'],
        );
    }

    $jsonString = json_encode($json);

    echo $jsonString;


?>