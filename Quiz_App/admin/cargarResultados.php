<?php

    session_start();

    $key=$_POST['codigo'];

    if (array_key_exists($key,$_SESSION['resultadoCategoria'])) {
        $_SESSION['resultadoCategoria'][$key]=$_SESSION['resultadoCategoria'][$key]+1;
    }else{
        $_SESSION['resultadoCategoria'][$key]=1;
    }

    $_SESSION['resultadoGeneral']=$_SESSION['resultadoGeneral']+1;    

?>