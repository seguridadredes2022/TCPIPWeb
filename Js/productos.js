$(function(){
    limpiar();
    cargarProductos();


    $('#btn-save').click(function (){
       
        var id_producto = $('#id_producto').val();
        var ulr = "http://localhost:54344/api/productoes";
         var metod = 'POST';
         
        if(id_producto != 0 && id_producto != ""){
         ulr = ulr + "/"+id_producto;
             metod = 'PUT';
        }



        if($('#imgn').val() == null && id_producto > 0 ){
          
    
                    $.ajax({
                        cache: false,
                        async: false,
                        type: metod,
                        url: ulr,
                        data: '{ id_producto: '+ id_producto +', codigo: "' + $('#Codigo').val() +'", nombre: "'+ $('#Nombre').val() +'",precio :"'+ $('#Precio').val()+ '", imagen: "'+ $('#imgen').val() +'"}' ,
                        contentType: "application/json; charset=utf-8",
                        datetype: 'json',
                        beforeSend: function () {
                
                
                        },
                        success: function (msg) {
                            limpiar();
                            cargarProductos();
                            alert('Producto agregado')	
                        }
                
                    });
            


        }else  if($('#imgn').val() == null && id_producto == 0 ){
            alert('Seleccione una imagen')
        }else{ 
            var file = 'adsas';
            if (file != '') {
                var fileToLoad1 = $('#imgn')[0].files[0];
                var fileReader1 = new FileReader();
                fileReader1.readAsDataURL(fileToLoad1);
                fileReader1.onload = function (fileLoadedEvent1) {
                    img = fileLoadedEvent1.target.result;
    
                    $.ajax({
                        cache: false,
                        async: false,
                        type: metod,
                        url: ulr,
                        data: '{ id_producto: '+ id_producto +', codigo: "' + $('#Codigo').val() +'", nombre: "'+ $('#Nombre').val() +'",precio :"'+ $('#Precio').val()+ '", imagen: "'+ imagen +'"}' ,
                        contentType: "application/json; charset=utf-8",
                        datetype: 'json',
                        beforeSend: function () {
                
                
                        },
                        success: function (msg) {
                            limpiar();
                            cargarProductos();
                            alert('Producto actualizado')	
                        }
                
                    });
                }
            }
        }

       
        
      
        return false;

    });
});

function getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }
  
function cargarProductos(){ 
    $.ajax({
        type: 'GET',
        url: "http://localhost:54344/api/productoes",
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
               
               
                tds += '<tr><td>'+this.id_producto+'</td>';
                tds += '<td>'+this.codigo+'</td>';
                tds += '<td>'+this.nombre+'</td>';
                tds += '<td>'+this.precio+'</td>';
                tds += '<td><img src="'+this.imagen+'" alt="IMG NOT LOAD"/></td>';
                tds += `<td><spam class='btn btn-ligth' onclick="MostarrenForm(${this.id_producto},'${this.codigo}','${this.nombre}','${this.precio}','${this.imagen}')"> Editar </spam> <spam class='btn ' style="background-color:gray; color:white;" onclick="Eliminar(${this.id_producto})"> Eliminar</spam></td>`;

                tds += '</tr>';
            });
            $('#Tabla').html(tds);

        }

    });

}


function MostarrenForm(id_producto,codigo,nombre,precio,imagen){
    $('#id_producto').val(id_producto);
    $('#codigo').val(codigo);
    $('#Nombre').val(nombre);
    $('#Precio').val(precio);
    $('#imgen').val(imagen)
}


function Eliminar(id_producto){
var ulr = "http://localhost:54344/api/productoes/"+id_producto;
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
            cargarProductos();
            alert('Producto Eliminado')	
        }

    });

    return false;

    
}

function limpiar(){

$('#id_producto').val(0);
    $('#Codigo').val(0);
    $('#Nombre').val(null);
    $('#Precio').val(null);
    $('#imgn').val(null);
}