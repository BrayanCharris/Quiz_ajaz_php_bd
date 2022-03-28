$(function(){
    $('#inicioAprendiz').submit(function(e){

        let correo= $('#email').val();
        let contra= $('#password').val();

        $.ajax({
            url: './admin/consultar_Aprendiz.php',
            type:'POST',
            data:{correo},
            success: function(response){
              let json= JSON.parse(response);
              if (json.length > 0) {
                  let aprendiz= json[0].id_aprendiz;
                  let contraseñaConsulta= json[0].contra;
                  let IdGrupo= json[0].grupo;
  
                  if (contra === contraseñaConsulta) {

                    $.ajax({
                        url:'./admin/consultar_prueba.php',
                        type:'POST',
                        data: {IdGrupo},
                        success: function(response){
                            if (response ==  true) {
                                agregarValores(aprendiz,IdGrupo);         
                            } else {
                                Swal.fire(
                                    'INFORMATION',
                                    'Lo sentimos en este momento no se encuentra prueba para usted!',
                                    'info'
                                )
                            }
                        }
                    });
                  }else{
                    Swal.fire(
                        'WARNING',
                        'La contraseña es incorrecta',
                        'warning'
                    )
                  }
                  
              } else {
                  Swal.fire(
                      'INFORMATION',
                      'No existe un usuario con este correo',
                      'question'
                  )
              }
            }
        });

        e.preventDefault();   
    })

    function agregarValores(aprendiz,IdGrupo) {
        $.ajax({
            url: './admin/subir_info_usuario.php',
            type:'POST',
            data: {aprendiz,IdGrupo},
            success: function(response){                
                window.location.href= "./check.php";
            }
        })
    }
})