$(function(){
    
    let idGrupo=0;
    
    consutarGrupos();    

    $('#registroAprendiz').submit(function(e){
        let group=$('#grupo').val();

        if (group != "select") {
            
            let Ngroup=$('#ngrupo').val();
    
            
            
            let name=$('#name').val();
            let mail=$('#email').val()
            
            let pass=$('#password').val()
    
    
            consutarIdGrupo(group,function(resp){
                let idGrupo=resp;
                consultarExstenciaAprendiz(mail,function (resp) {
                    try {
                        let json=resp;
                        console.log(resp);
                        if (json==true) {
                            Swal.fire(
                                'ALERTA',
                                'Lo sentimos ya existe un aprendiz con este correo',
                                'warning'
                            );
                        }else{
    
                            $.ajax({
                                type: 'POST',
                                url: './admin/registrarAprendiz.php',
                                data: {
                                    'nombre':name,
                                    'correo': mail,
                                    'contraseña':pass,
                                    'idgrupo':idGrupo,
                                    'numeroFicha':Ngroup
                                },
                                success: function(response){
                                    try {
                                        if (response==true) {
                                            Swal.fire(
                                                'LISTO',
                                                'Registro Completado!',
                                                'success'
                                            )
        
                                            setTimeout(() => {
                                                window.location.href="index.html";
                                            }, 1100);
                                        }
                                    } catch (error) {
                                        console.log(response);
                                    }
                                }
                            });
                        }
                    }catch (error) {
                        console.log(resp);
                    }
                });
            });
        }else{
            Swal.fire(
                'ALERTA',
                'Seleccione un grupo para registrarse',
                'warning'
            )
        }



        /* console.log("Usted pertence al grupo : "+group+"-"+Ngroup);
        console.log("Su nombre es :"+name);
        console.log("Su correo es :"+mail);
        console.log("Su contraseña es :"+pass); */
        

        e.preventDefault();
    });

    function show() {
        console.log(hola)
    }


    function consutarGrupos() {
        $.ajax({
            url: './admin/consultar_grupos.php',
            type: 'POST',
            success: function(response){
                try {
                    let grupos = JSON.parse(response);
    
                    let opciones='<option value="select">Grupo</option>';
                    grupos.forEach(grupo => {
    
                        opciones+=`
                            <option value="${grupo.nombre}">${grupo.nombre}</option>
                        `;
    
                    });
    
                    $('#grupo').html(opciones);
                } catch (error) {
                    console.log(response);
                }
                
            }
        });
    }

    function consultarExstenciaAprendiz(correo,my_callback) {
        $.ajax({
            type: 'POST',
            url: './admin/consultar_existencia_aprendiz.php',
            data: {correo},
            success: function(response){
                try {
                    my_callback(response)
                } catch (error) {
                    console.log(response);
                }
            }  

        });
    }

    function consutarIdGrupo(nombre,my_callback){
        $.ajax({
            url: './admin/consultar_ID_grupo.php',
            type:'POST',
            data: {nombre},
            success: function(response) {
                try {
                    let id= JSON.parse(response)[0].id;
                    my_callback(id);
                } catch (error) {
                    console.log(response);
                }
            }
        })
    }

});