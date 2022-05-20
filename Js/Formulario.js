
$(function(){
    limpiar();
    cargarUsuarios();


    $('#formdatos').submit(function (){
       
        var id_usuario = $('#id_usuario').val();
        var ulr = "http://localhost:54344/api/usuarios";//cambiar
         var metod = 'POST';
         
        if(id_usuario != 0 && id_usuario != ""){
         ulr = ulr + "/"+id_usuario;
             metod = 'PUT';
        }

        $.ajax({
            cache: false,
            async: true,
            type: metod,
            url: ulr ,
            data: '{ id_usuario:'+ id_usuario +', nombre: "' + $('#nombre').val() +'", contraseña: "'+ $('#clave').val() +'",correo :"'+ $('#correo').val()+ '",rol :'+ $('#tipo').val() +'}' ,
            contentType: "application/json; charset=utf-8",
            datetype: 'json',
            beforeSend: function () {
    
    
            },
            success: function (msg) {
                limpiar();
                cargarUsuarios();
                alert('Usuario creado')	
            }
    
        });

        return false;

    });
});


function cargarUsuarios(){ //Carga los usuarios en la tabla
    $.ajax({
        type: 'GET',
        url: "http://localhost:54344/api/usuarios", //cambiar
        data: '',
        contentType: "application/json; charset=utf-8",
        datetype: 'json',
        beforeSend: function () {


        },
        success: function (msg) {
            var tds = "";
            console.log(msg);
            $.each(msg, function () {

                var r = '';

                if (this.rol == 1) {
                     r = 'Administrador'
                 } else {

                    r = 'Gestor'
                 }

                tds += '<tr><td>'+this.id_usuario+'</td>';
                tds += '<td>'+this.nombre+'</td>';
                tds += '<td>'+this.correo+'</td>';
                tds += '<td>'+r+'</td>';
                tds += `<td><spam class='btn btn-ligth' onclick="MostarrenForm(${this.id_usuario},'${this.nombre}','${this.correo}','${this.clave}','${this.rol}')"> Editar </spam> <spam class='btn' style="background-color:gray; color:white;" onclick="Eliminar(${this.id_usuario})"> Eliminar</spam></td>`;
                tds += '</tr>';
            });
            $('#TablaUsuario').html(tds);

        }

    });
}


function MostarrenForm(id_usuario,nombre,correo,clave,rol){
    $('#id_usuario').val(id_usuario);
    $('#nombre').val(nombre);
    $('#correo').val(correo);
    $('#contraseña').val(clave);
    $('#tipo').val(rol);
}

function Eliminar(id_usuario){
    var ulr = "http://localhost:54344/api/usuarios/"+id_usuario; // cambiar
    var metod = 'DELETE';
        

        $.ajax({
            cache: false,
            async: true,
            type: metod,
            url: ulr ,
            data: '' ,
            contentType: "application/json; charset=utf-8",
            datetype: 'json',
            beforeSend: function () {
    
    
            },
            success: function (msg) {
                limpiar();
                cargarUsuarios();
                alert('Datos Eliminados')	
            }
    
        });

        return false;

        
}

function limpiar(){

    $('#id_usuario').val(0);
        $('#nombre').val(null);
        $('#correo').val(null);
        $('#tipo').val(null);
}