<?php
    $idaprendiz=$_POST['aprendiz'];
    $idGrupo=$_POST['IdGrupo'];

    session_start();

    $_SESSION['idAprendiz']=$idaprendiz;
    $_SESSION['idGrupo']=$idGrupo;

    echo true;
?>