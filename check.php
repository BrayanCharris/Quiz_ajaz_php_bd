<?php

    include("./admin/conexionBD.php");
    include("./admin/consultar_preguntas.php");

    session_start();

    $idGrupo=$_SESSION['idGrupo'];

    $query="SELECT codigo_categoria,numero_preguntas FROM configuracion_juego_grupo WHERE id_grupo=$idGrupo;";

    $result=mysqli_query($connection,$query);

    if (!$result) {
        die('CONSULTA FALLIDA'.mysqli_error($connection));
    }

    $categorias=array();

    while ($reg = mysqli_fetch_array($result)) {
        $categorias[]=array(
            "codigo" => $reg['codigo_categoria'],
            "numero" => $reg['numero_preguntas']
        );
    }

    for ($i=0; $i < count($categorias); $i++) { 
        $codigo=$categorias[$i]['codigo'];
        $numeroPreguntas=$categorias[$i]['numero'];

        consultarPreguntas($codigo,$numeroPreguntas);
    }


    $_SESSION['npreguntas']=count($_SESSION['preguntas']);
    $_SESSION['resultadoGeneral']=0;
    $_SESSION['resultadoCategoria']=array();

    header('Location: Quiz_App/quizz.html');

?>