$(function(){
    limpiar();
    cargarPedido();
    cargarProveedores();
    cargarProductos();

    $('#formdatos').submit(function (){
      var fecha_emision = $('#f-p').val();
      var fecha_entrega = $('#f-e').val();

      
      var id_pedido = $('#id_pedido').val();
      var ulr = "http://localhost:54344/api/pedidoes";
       var metod = 'POST'; 
      if(id_pedido != 0 && id_pedido != ""){
       ulr = ulr + "/"+id_pedido;
           metod = 'PUT';
      }

        $.ajax({
            cache: false,
            async: true,
            type: metod,
            url: ulr,
            data: '{ id_pedido:'+ id_pedido +', producto: "' + $('#c-prod').val() +'",cantidad: "' + $('#c').val() +'", proveedor: "'+ $('#c-p').val() +'",fecha_emision :"'+ fecha_emision+ '",fecha_entrega :"'+ fecha_entrega+'"}' ,
            contentType: "application/json; charset=utf-8",
            datetype: 'json',
            beforeSend: function () {
    
    
            },
            success: function (msg) {
                limpiar();
                cargarPedido();
                alert('Pedido creado')	
            }
    
        });

        return false;

    });
});


function cargarPedido(){ //Carga los pedidos
    $.ajax({
        type: 'GET',
        url: "http://localhost:54344/api/pedidoes",
        data: '',
        contentType: "application/json; charset=utf-8",
        datetype: 'json',
        beforeSend: function () {


        },
        success: function (msg) {
            var tds = "";
            console.log(msg);
            $.each(msg, function () {

                tds += '<tr><td>'+this.id_pedido+'</td>';
                tds += '<td>'+this.proveedor+'</td>';
                tds += '<td>'+this.producto+'</td>';
                tds += '<td>'+this.cantidad+'</td>';
                tds += '<td>'+this.fecha_emision+'</td>';
                tds += '<td>'+this.fecha_entrega+'</td>';
                tds += `<td><spam class='btn btn-ligth' onclick="MostarrenForm(${this.id_pedido},'${this.proveedor}','${this.producto}','${this.cantidad}','${this.fecha_emision}','${this.fecha_entrega}')"> Editar </spam> <spam class='btn' style="background-color:gray; color:white;" onclick="Eliminar(${this.id_pedido})"> Eliminar</spam></td>`;

                tds += '</tr>';
            });
            $('#TablaOrden').html(tds);

        }

    });

}

function MostarrenForm(id_pedido,proveedor,producto,cantidad,fecha_emision,fecha_entrega){
    $('#id_pedido').val(id_pedido);
    $('#c-p').val(proveedor);
    $('#c-prod').val(producto);
    $('#c').val(cantidad);
    $('#f-p').val(fecha_emision);
    $('#f-e').val(fecha_entrega);
    
}

function cargarProveedores(){ //Carga los proveedoress en la tabla
    $.ajax({
        type: 'GET',
        url: "http://localhost:54344/api/proveedors",
        data: '',
        contentType: "application/json; charset=utf-8",
        datetype: 'json',
        beforeSend: function () {


        },
        success: function (msg) {
            var tds = "http://localhost:54344/api/proveedors";
            console.log(msg);
            $.each(msg, function () {


                tds += '<option value="'+ this.id_proveedor + '">'+this.nombre +' - '+ this.nit+'</option>';
            });
            $('#c-p').html(tds);

        }

    });

}
function cargarProductos(){ //Carga los productos en la tabla
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

                tds += '<option value="'+ this.id_producto + '">'+this.nombre +' - '+'</option>';
            });
            $('#c-prod').html(tds);

        }

    });

}

function Eliminar(id_pedido){
    var ulr = "http://localhost:54344/api/pedidoes/"+id_pedido;
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
                alert('Pedido eliminado')	
            }
    
        });

        return false;

        
}

function limpiar(){

    $('#id_pedido').val(0);
    $('#c-p').val(null);
    $('#c-prod').val(null);
    $('#c').val(null);
    $('#f-p').val(null);
    $('#f-e').val(null);
}
