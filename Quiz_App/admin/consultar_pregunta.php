<?php

    session_start();

    $pos=$_POST['posicion'];


    $preguntaMostrar=$_SESSION['preguntas'][$pos];

    $json='{';

        foreach ($preguntaMostrar as $key => $value) {
            if (gettype($value)=="array") {
                $respuestas = '"'.$key.'":[';
                for ($i=0; $i < count($value); $i++) { 
                    $respuestas= $respuestas. '"'.$value[$i].'"';
                    if ($i < count($value)-1) {
                        $respuestas= $respuestas. ',';
                    }
                }
                $respuestas= $respuestas."]";
                $json= $json . $respuestas;
            }else{
                $json= $json . '"'.$key.'"' . ":" .  '"'.trim($value).'"' . ",";
            }
        }
    
        $json= $json . "}";
    
    echo $json;

?>