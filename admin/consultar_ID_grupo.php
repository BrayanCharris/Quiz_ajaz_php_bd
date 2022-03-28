<?php

    include('./conexionBD.php');

    if (isset($_POST['nombre'])) {
        $nombre=$_POST['nombre'];

        $query= "SELECT id_grupo FROM grupos WHERE nombre_grupo='$nombre';";

        $result= mysqli_query($connection,$query);

        if (!$result) {
            die('CONSULTA FALLIDA'.mysqli_error($connection));
        }

        $json=array();

        while ($row = mysqli_fetch_array($result)) {
            $json[]=array(
                'id'=>$row['id_grupo']
            );
        }

        $jsonString= json_encode($json);

        echo $jsonString;
    }


?>