var ordenes=[];
function Orden(id,fecha_pedido,fecha_entrega,codProveedor,codProducto,cantidad,nombreProd,estado){
    this.id = id;
    this.fecha_pedido = fecha_pedido;
    this.fecha_entrega = fecha_entrega;
    this.codProveedor = codProveedor;
    this.codProducto = codProducto;
    this.cantidad = cantidad;
    this.nombreProd = nombreProd;
    this.estado = estado;

}
function OrdenArray(){
    var combo = document.getElementById("c-prod");
    var selected = combo.options[combo.selectedIndex].text;
var order = new Orden(
    id = document.getElementById("n-o").value,
    fecha_pedido = document.getElementById("f-p").value,
    fecha_entrega = document.getElementById("f-e").value,
    codProveedor = document.getElementById("c-p").value,
    codProducto = document.getElementById("c-prod").value,
    cantidad = document.getElementById("c").value,
    nombreProd = selected,
    estado = 1
);
ordenes.push(order);
LlenarOrden();
}

function SearchOrder(id){
    for(let index=0; index<ordenes.length; index++){
    if(ordenes[index].id==id){
        return ordenes[index];
    }
}
}

function LlenarOrden(){
    var ContenidoTabla = "";
    for(let index=0; index<ordenes.length; index++ ){
        ContenidoTabla += "<tr>";
        ContenidoTabla += "<td>"+ordenes[index].id +"</td>";
        ContenidoTabla += "<td>"+ordenes[index].fecha_pedido +"</td>";
        ContenidoTabla += "<td>"+ordenes[index].fecha_entrega +"</td>";
        ContenidoTabla += "<td>"+ordenes[index].codProveedor +"</td>";
        ContenidoTabla += "<td>"+ordenes[index].codProducto +"</td>";
        ContenidoTabla += "<td>"+ordenes[index].nombreProd +"</td>";
        ContenidoTabla += "<td>"+ordenes[index].cantidad +"</td>";
        ContenidoTabla += "</tr>";
    }
    document.getElementById("TablaOrden").innerHTML = ContenidoTabla;
}

function ValidarCampos(){


    if (document.getElementById("n-o").value == "") {
        alert("Campo Obligatorio");
        return false;
    }
    if (document.getElementById("f-p").value == "") {
        alert("Campo obligatorio");
        return false;
    }
    if (document.getElementById("f-e").value == "") {
        alert("Campo obligatorio");
        return false;
    }

    if (document.getElementById("c-p").value == "") {
        alert("Campo obligatorio");
        return false;
    }
    if(document.getElementById("c-prod").value==""){
        alert("Campo obligatorio")
        return false;
    }
    if(document.getElementById("c").value==""){
        alert("Campo obligatorio")
        return false;
    }

}
function clean(){

    
    document.getElementById("n-o").value = "";
    document.getElementById("f-p").value = "";
    document.getElementById("f-e").value = "";
    document.getElementById("c-p").value = "";
    document.getElementById("c-prod").value = "";
    document.getElementById("c").value = "";

}
function CatchOrder(){
    if(localStorage.getItem('OrderLS')){
        ordenes=JSON.parse(localStorage.getItem('OrderLS'));
    }
    return;
}
function SerieOrden(){
    localStorage.setItem('OrderLS',JSON.stringify(ordenes));
}
function ObtenerOrden(){
    if(ValidarCampos() == false){
    return false;
}
CatchOrder();

OrdenArray();

SerieOrden();

LlenarOrden();
clean();
}
function LlenarOrden2(){
    var ContenidoTabla = "";
    for(let index=0; index<ordenes.length; index++ ){

        var Status = "";
        var estado =  ordenes[index].estado; 
        var btn = '';
        if(estado == 1){
            Status = 'Solicitado';
            btn = '<button class="btn btn-info" onclick="ChangeStatus('+index+','+estado+')">Act. Transito</button>';
        } else if(estado == 2){
            Status = 'Transito';
            btn = '<button class="btn btn-warning" onclick="ChangeStatus('+index+','+estado+')">Act. EN SITIO</button>';
        } else if(estado == 3){
            Status = 'EN SITIO';
        }


        ContenidoTabla += "<tr>";
        ContenidoTabla += "<td>"+ordenes[index].id +"</td>";
        ContenidoTabla += "<td>"+ordenes[index].fecha_pedido +"</td>";
        ContenidoTabla += "<td>"+ordenes[index].fecha_entrega +"</td>";
        ContenidoTabla += "<td>"+ordenes[index].codProveedor +"</td>";
        ContenidoTabla += "<td>"+ordenes[index].codProducto +"</td>";
        ContenidoTabla += "<td>"+ordenes[index].nombreProd +"</td>";
        ContenidoTabla += "<td>"+ordenes[index].cantidad +"</td>";
        ContenidoTabla += "<td>"+ Status +"</td>";
        ContenidoTabla += "<td>"+ btn +" <button class='btn btn-danger' style='margin-top:5px' onclick='DeleteOrder("+index+")'>ELIMINAR</button></td>";
        ContenidoTabla += "</tr>";
    }
    document.getElementById("TablaEstado").innerHTML = ContenidoTabla;
}

function GetProducts(){
    var llamarprod = document.getElementById('c-prod');
   
    var opcion = '<option value="0" seleccione producto></option>'
    if(localStorage.getItem("ProdLS") != null){
        var productos = JSON.parse(localStorage.getItem("ProdLS"));
        for(var index =  0 ;index < productos.length;index++){
            opcion += '<option value="'+ productos[index].codigo +'">'+ productos[index].nombre +'</option>'
        }
    }
   

    

    llamarprod.innerHTML = opcion;
}


function DeleteOrder(i){
    var save = [];
    save = JSON.parse(localStorage.getItem("OrderLS"));


    save.splice( i, 1 );

    localStorage.setItem("OrderLS", JSON.stringify(save));	
    alert('Orden eliminada')
    CatchOrder();
    LlenarOrden2();

}


function ChangeStatus(index,estado){
    var save = [];
    save = JSON.parse(localStorage.getItem("OrderLS"));
	save[index].estado = (estado + 1);
	localStorage.setItem("OrderLS", JSON.stringify(save));	

	if((estado+1) == 3){
		var  productos = JSON.parse(localStorage.getItem("ProdLS"));


		for(var i = 0;i<productos.length;i++){
			if(productos[i].codigo == save[index].codProducto){
				productos[i].cantidad =  parseInt(productos[i].cantidad) +  parseInt(save[index].cantidad);
				break;
			}
		}

		localStorage.setItem("ProdLS", JSON.stringify(productos));	

	}


	if((estado+1)  == 2 ){
		alert('Actualizada a Estado en Transito');

	}else if((estado+1)  == 3){
		alert('Actualizada.');

	}
	
    CatchOrder();
    LlenarOrden2();
}
function GetExistencias(){
	

	if(localStorage.getItem("ProdLS") != null){
		var  productos = JSON.parse(localStorage.getItem("ProdLS"));
 		var exs = '';
		for(var i = 0;i<productos.length;i++){
			 exs += `<tr>
				
				<td>${productos[i].codigo}</td>
				<td>${productos[i].nombre}</td>
				<td>${productos[i].precio}</td>
                <td>${productos[i].cantidad}</td>
                <td><img src="${productos[i].imagen}" width="75px"></td>
			</tr>`

		}
		
		document.getElementById('TablaExistencia').innerHTML = exs;

    }
}