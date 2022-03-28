<?php
    session_start();

    $posicion= $_POST['posicion'];

    $pregunta=$_SESSION['preguntas'][$posicion];

    $correcta=$pregunta["respCorrecta"];

    $arr=$pregunta["opciones"];
    $nuevoArreglo=array($correcta);

    $valorElim=0;
    if (count($arr)>2) {
        $valorElim=1;
    }else{
        $nuevoArreglo=$arr;
    }

    while ($valorElim>0) {
        $posEliminar=rand(0,count($arr)-1);
        $valorSeleccionado=$arr[$posEliminar];
        if ($valorSeleccionado != $correcta) {
            if (!in_array($valorSeleccionado,$nuevoArreglo)) {
                $nuevoArreglo[1]=$valorSeleccionado;
            }
            $valorElim--;
        }
    }

    $_SESSION['preguntas'][$posicion]["opciones"]=$nuevoArreglo;

?>