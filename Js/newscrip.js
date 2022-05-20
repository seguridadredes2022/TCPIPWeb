
var pedidos=[];
var actual=[];
var estado  = 1;
 
function validarPedido(){

	if(document.getElementById("idCodigo").value == ""){
		alert("El campo Orden se encuentra vacio!");
		return false;
	}
	
	if(document.getElementById("idSocio").value == ""){
		alert("El campo Socio de Negocios se encuentra vacio!");
		return false;
	}
	
	if(document.getElementById("idProducto").value == ""){
		alert("El campo Poructo se encuentra vacio!");
		return false;
	}
	
	if(document.getElementById("idCantidad").value == ""){
		alert("El campo Cantidad se encuentra vacio!");
		return false;
	}
	
	if(document.getElementById("fecha_diaria").value == ""){
		alert("El campo Fecha Diaria se encuentra vacio!");
		return false;
	}
	if(document.getElementById("fecha_vencimiento").value == ""){
		alert("El campo Fecha de vencimineto se encuentra vacio!");
		return false;
	}
	if(document.getElementById("free_text").value == ""){
		return false;
	}
}
function llenarArreglo1(){
	var codigo = document.getElementById("idCodigo").value;
	var socio = document.getElementById("idSocio").value;
    var producto = document.getElementById("idProducto").value;
    var combo = document.getElementById("idProducto");
    var productoTxt = combo.options[combo.selectedIndex].text;
	var cantidad = document.getElementById("idCantidad").value;
	var fechadiaria = document.getElementById("fecha_diaria").value;
	var fechavenciiento = document.getElementById("fecha_vencimiento").value;
	var freetext = document.getElementById("free_text").value;

	var codigoEx1 = false;
	if(localStorage.getItem("odenCompra") != null){
		pedidos = JSON.parse(localStorage.getItem("odenCompra"));
	
			for(var i =0; i<pedidos.length; i++){

				/*if (pedido[i].codigo == codigo){
                    codigoEx1 = true;
				}*/
			}
	}
	if(codigoEx1 == false){
       var status =  1;
	var ordenc = new objpedido(codigo, socio, producto, cantidad, fechadiaria, fechavenciiento, freetext,status,productoTxt);
	actual.push(ordenc);
	pedidos.push(ordenc);


	localStorage.setItem("odenCompra", JSON.stringify(pedidos));	
	}

}
function objpedido(codigo, socio, producto, cantidad, fechadiaria, fechavenciiento, freetext,estado,productoTxt){
	this.codigo = codigo,
	this.socio = socio,
	this.producto = producto,
	this.cantidad = cantidad,
	this.fechadiaria = fechadiaria,
	this.fechavenciiento = fechavenciiento,
    this.freetext = freetext,
    this.estado = estado,
    this.productoTxt = productoTxt
}
function actualizarTabla1(){
	
	var scriptTabla="";
	for(var index=0; index<actual.length; index++){

		scriptTabla+="<tr>";
		scriptTabla+="<td>"+actual[index].codigo+"</td>";
		scriptTabla+="<td>"+actual[index].socio+"</td>";
        scriptTabla+="<td>"+actual[index].producto+"</td>";
        scriptTabla+="<td>"+actual[index].productoTxt+"</td>";
		scriptTabla+="<td>"+actual[index].cantidad+"</td>";
		scriptTabla+="<td>"+actual[index].fechadiaria+"</td>";
		scriptTabla+="<td>"+actual[index].fechadiaria+"</td>";
		scriptTabla+="<td>"+actual[index].freetext+"</td>";
		scriptTabla+="</tr>";
	}
	document.getElementById("idTableOrden").innerHTML = scriptTabla;
}
function limpiarOrden(){
	document.getElementById("idCodigo").value ="";
	document.getElementById("idSocio").value ="";
	document.getElementById("idProducto").value ="";
	document.getElementById("idCantidad").value ="";
	document.getElementById("fecha_diaria").value ="";
	document.getElementById("fecha_vencimiento").value="";
	document.getElementById("free_text").value ="";
}

function ordenesCompra(){
    //localStorage.clear();
    

    var JSondata  =  JSON.parse(localStorage.getItem("odenCompra"));
    var guarda2 = [];
    

    if(JSondata  != null || JSondata != []){
        guarda2  = JSondata;

        var scriptTabla = "";
    

        console.log(guarda2.length);

	for(var index=0; index<guarda2.length; index++){
        var estatus = '';
        var btn =  '';
        var btn2 = '<button class="btn btn-danger" type="button" onclick="eliminarOrden('+index+')">Eliminar</button>';
        var estadox  = guarda2[index].estado;
            if(estadox == 1 ){
                status = 'Solicitado';
                btn = '<button class="btn btn-success" type="button" onclick="cambiarEstado('+index+','+guarda2[index].estado +')">Transito</button>'
            }else if(estadox == 2){
                status = 'Transito';
                btn = '<button class="btn btn-info" type="button" onclick="cambiarEstado('+index+','+guarda2[index].estado +')">Recibido</button>'
            }else if(estadox == 3){
                status = 'Recibido';
                
            }

		scriptTabla+="<tr>";
		scriptTabla+="<td>"+guarda2[index].codigo+"</td>";
        scriptTabla+="<td>"+guarda2[index].producto+"</td>";
        scriptTabla+="<td>"+guarda2[index].productoTxt+"</td>";
		scriptTabla+="<td>"+guarda2[index].cantidad+"</td>";
		scriptTabla+="<td>"+guarda2[index].freetext+"</td>";
        scriptTabla+="<td>"+status+"</td>";
        scriptTabla+="<td>"+btn+" "+ btn2 +"</td>";
		scriptTabla+="</tr>";
    }
	document.getElementById("idTableOrden").innerHTML = scriptTabla;
    }





	
}
function agregarOrden(){
	if(validarPedido()==false){
		return false;
	}
	llenarArreglo1();
	actualizarTabla1();
    limpiarOrden();
    alert ("Orden de Compra Generada con Exito");
}


function eliminarOrden(index){
    var guarda2 = [];
    guarda2 = JSON.parse(localStorage.getItem("odenCompra"));


    guarda2.splice( index, 1 );

    localStorage.setItem("odenCompra", JSON.stringify(guarda2));	

    ordenesCompra();

}

function cambiarEstado(index,estado){
    var guarda2 = [];
    guarda2 = JSON.parse(localStorage.getItem("odenCompra"));
	
	



	guarda2[index].estado = (estado + 1);
	localStorage.setItem("odenCompra", JSON.stringify(guarda2));	

	if((estado+1) == 3){
		var  productos = JSON.parse(localStorage.getItem("registro"));


		for(var i = 0;i<productos.length;i++){
			if(productos[i].codigo = guarda2[index].producto){
				productos[i].cantidad =  parseInt(productos[i].cantidad) +  parseInt(guarda2[index].cantidad);
				break;
			}
		}

		localStorage.setItem("registro", JSON.stringify(productos));	

	}


	if((estado+1)  == 2 ){
		alert('Orden de Compra Movida a Estado en Transito');

	}else if((estado+1)  == 3){
		alert('Orden de Compra Movida a Recibida ademas existencia Actualizada.');

	}
	

    ordenesCompra();
}

function obtenerProductos(){
    
    var productoSelct = document.getElementById('idProducto');

    var  productos = JSON.parse(localStorage.getItem("registro"));

    var  opts= '<option value="0">Seleccione un producto</option>'
    for(var index =  0 ;index < productos.length;index++){
        opts += '<option value="'+ productos[index].codigo +'">'+ productos[index].nombre +'</option>'
    }

    

    productoSelct.innerHTML = opts;
    

}



function cargarExistencias(){
	

	if(localStorage.getItem("registro") != null){
		var  productos = JSON.parse(localStorage.getItem("registro"));
 		var tds = '';
		for(var i = 0;i<productos.length;i++){
			 tds += `<tr>
				<td><img src="${productos[i].imagen}" width="75px"></td>
				<td>${productos[i].codigo}</td>
				<td>${productos[i].nombre}</td>
				<td>${productos[i].precio}</td>
				<td>${productos[i].cantidad}</td>
			</tr>`

		}
		
		document.getElementById('idTableExistencia').innerHTML = tds;

	}

	
	


}