
$(function(){
    limpiar();
    cargarProveedores();


    $('#formdatos').submit(function (){
       var id_proveedor = $('#id_proveedor').val();
       var ulr = "http://localhost:54344/api/proveedors"; //cambiar
        var metod = 'POST';
        
       if(id_proveedor != 0 && id_proveedor != ""){
        ulr = ulr + "/"+id_proveedor;
        	metod = 'PUT';
       }

      
       

        $.ajax({
            cache: false,
            async: true,
            type: metod,
            url: ulr ,
            data: '{ id_proveedor:'+ id_proveedor +', nit: "' + $('#Nit').val() +'", nombre: "'+ $('#Nombre').val() +'",direccion :"'+ $('#Direccion').val()+ '"}' ,
            contentType: "application/json; charset=utf-8",
            datetype: 'json',
            beforeSend: function () {
    
    
            },
            success: function (msg) {
                limpiar();
                cargarProveedores();
                alert('Proveedor actualizadoo')	
            }
    
        });

        return false;

    });
});


function cargarProveedores(){ 
    $.ajax({
        type: 'GET',
        url: "http://localhost:54344/api/proveedors",
        data: '',
        contentType: "application/json; charset=utf-8",
        datetype: 'json',
        beforeSend: function () {


        },
        success: function (msg) {
            var tds = "";
            console.log(msg);
            $.each(msg, function () {

               
                tds += '<tr><td>'+this.id_proveedor+'</td>';
                tds += '<td>'+this.nit+'</td>';
                tds += '<td>'+this.nombre+'</td>';
                tds += '<td>'+this.direccion+'</td>';
                tds += `<td><spam class='btn btn-ligth'  onclick="MostarrenForm(${this.id_proveedor},'${this.nit}','${this.nombre}','${this.direccion}')"> Editar </spam> <spam class='btn ' style="background-color: gray; color:white;" onclick="Eliminar(${this.id_proveedor})"> Eliminar</spam></td>`;
                tds += '</tr>';
            });
            $('#TablaProveedor').html(tds);

        }

    });

}

function MostarrenForm(id_proveedor,nit,nombre,direccion){
        $('#id_proveedor').val(id_proveedor);
        $('#Nit').val(nit);
        $('#Nombre').val(nombre);
        $('#Direccion').val(direccion);
}


function Eliminar(id_proveedor){
    var ulr = "http://localhost:54344/api/proveedors/"+id_proveedor;
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
                cargarProveedores();
                alert('Proveedor eliminado')	
            }
    
        });

        return false;

        
}

function limpiar(){

    $('#id_proveedor').val(0);
        $('#Nit').val(0);
        $('#Nombre').val(null);
        $('#Direccion').val(null);
}