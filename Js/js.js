var actual=[];
 
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
	var cantidad = document.getElementById("idCantidad").value;
	var fechadiaria = document.getElementById("fecha_diaria").value;
	var fechavenciiento = document.getElementById("fecha_vencimiento").value;
	var freetext = document.getElementById("free_text").value;

	/*var codigoEx1 = false;
	if(localStorage.getItem("registro") != null){
		pedido = JSON.parse(localStorage.getItem("registro"));
	
			for(var i =0; i<pedido.length; i++){

				if (pedido[i].codigo == codigo){
					codigoEx1 = true;
				}
			}
	}*/
	//if(codigoEx1 == false){
	var ordenc = new objpedido(codigo, socio, producto, cantidad, fechadiaria, fechavenciiento, freetext);
	actual.push(ordenc);
	//pedido.push(ordenc);

	/*localStorage.clear();
	localStorage.setItem("registro", JSON.stringify(pedido));	
	}*/

}
function objpedido(codigo, socio, producto, cantidad, fechadiaria, fechavenciiento, freetext){
	this.codigo = codigo,
	this.socio = socio,
	this.producto = producto,
	this.cantidad = cantidad,
	this.fechadiaria = fechadiaria,
	this.fechavenciiento = fechavenciiento,
	this.freetext = freetext
}
function actualizarTabla1(){
	debugger;
	var scriptTabla="";
	for(var index=0; index<actual.length; index++){

		scriptTabla+="<tr>";
		scriptTabla+="<td>"+actual[index].codigo+"</td>";
		scriptTabla+="<td>"+actual[index].socio+"</td>";
		scriptTabla+="<td>"+actual[index].producto+"</td>";
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
function agregarOrden(){
	if(validarPedido()==false){
		return false;
	}
	llenarArreglo1();
	actualizarTabla1();
	limpiarOrden();
}