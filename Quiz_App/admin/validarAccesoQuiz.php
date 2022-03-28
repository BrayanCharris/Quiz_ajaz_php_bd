<?php
    session_start();

    $acceder=false;

    if (isset($_SESSION['idGrupo'])) {
        $acceder=true;
    }

    echo $acceder;

?>