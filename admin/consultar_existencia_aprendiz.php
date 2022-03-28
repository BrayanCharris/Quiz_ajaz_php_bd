<?php

    include('./conexionBD.php');

    if (isset($_POST['correo'])) {

        $correo=$_POST['correo'];

        $query= "SELECT * from aprendices WHERE correo='$correo';";

        $result= mysqli_query($connection,$query);
        
        if (!$result) {
            die('ERROR AL CONSULTAR EXISTENCIA DE APRENDIZ '.  mysqli_error($connection));
        }

        $json=array();
        $exitencia=false;

        while ($row = mysqli_fetch_array($result)) {
            $exitencia=true;
        }

        echo $exitencia;

    }

?>