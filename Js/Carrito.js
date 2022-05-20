var Cart = [];
var Total = 0;

function Pedido(producto, cantidad){
    this.producto = producto;
    this.cantidad = cantidad;
}
function CatchCarrito(){
if(localStorage.getItem('PedidoLS')){
    Cart = JSON.parse(localStorage.getItem('PedidoLS'));
}
return;
}
function SeriePedido(){
    localStorage.setItem('PedidoLS',JSON.stringify(Cart));
}
function LlenarCart(){
    var ContenidoTabla="";
    var Total =0;
    for(let index = 0; index<Cart.length; index++){
        ContenidoTabla += '<tr>';
        ContenidoTabla += '<td>'+ Cart[index].producto.codigo +'</td>';
        ContenidoTabla += '<td>'+ Cart[index].producto.nombre +'<img src="'+ Cart[index].producto.imagen+'"></td>';
        ContenidoTabla += '<td>' 
        ContenidoTabla += '<p id="Cantidad' + Cart[index].producto.codigo +'">'+Cart[index].cantidad+ '</p>';
        ContenidoTabla +='<br>';
        ContenidoTabla += '<div class="cd">';
        ContenidoTabla += '<button type="button" class="suma" onclick="Sumar('+index+')">'+'+'+'</button>';
        ContenidoTabla += '<button type="button" class="resta" onclick="Restar('+index+')">'+'-'+'</button>';
        ContenidoTabla +=  '<img src= "../Images/bote.png" alt = "eliminar" onclick = "Delete('+index+')">';
        ContenidoTabla += '</div>';
        ContenidoTabla += '</td>'
        ContenidoTabla += '<td class="tdright">'+ Cart[index].producto.precio +'</td>';
        ContenidoTabla += '<td class = "tdright" id= "sb'+Cart[index].producto.codigo+'">' + (Cart[index].cantidad*Cart[index].producto.precio) + '</td>';
        ContenidoTabla +=  '</tr>'
        Total += (Cart[index].cantidad*Cart[index].producto.precio);

    }
    document.getElementById("Tabla3").innerHTML = ContenidoTabla;
    document.getElementById("TotalPedido").innerHTML = "Total de Compra :"+ Total;
}
function Exist(id){
    for(var i = 0; i<Cart.length;i++){
        if(Cart[i].producto.codigo == id){
            return true;
        }
    }
    return false;
}
function Update(){
    var temporal=0;
    for(var i=0; i<Cart.length; i++){
        temporal += (Cart[i].producto.precio * Cart[i].cantidad);
    }
    return temporal;
}
function Sumar(i){
    Cart[i].cantidad++;
    localStorage.setItem('PedidoLS',JSON.stringify(Cart));
    document.getElementById('Cantidad'+Cart[i].producto.codigo).innerHTML=Cart[i].cantidad;
    document.getElementById('sb'+Cart[i].producto.codigo).innerHTML = (Cart[i].producto.precio*Cart[i].cantidad);
    document.getElementById("TotalPedido").innerHTML = "Total de compra: "+Update();
}
function Restar(i){
    Cart[i].cantidad--;
    localStorage.setItem('PedidoLS',JSON.stringify(Cart));
    document.getElementById('Cantidad'+Cart[i].producto.codigo).innerHTML=Cart[i].cantidad;
    document.getElementById('sb'+Cart[i].producto.codigo).innerHTML = (Cart[i].producto.precio*Cart[i].cantidad);
    document.getElementById("TotalPedido").innerHTML = "Total de compra: "+Update();   
}
function AddCart(IdPedido){
CatchCarrito();
console.log(IdPedido);
if(Validate(IdPedido)==false){
    return false;
}
if(Exist(IdPedido)){
    for(var i = 0; i<Cart.length;i++){
        if(Cart[i].producto.codigo == IdPedido){
            Cart[i].cantidad = parseInt(Cart[i].cantidad) + parseInt(document.getElementById("Cantidad"+IdPedido).value);
        }
    }
}else{
var pedido = new Pedido(
    SearchProduct(IdPedido),
    document.getElementById("Cantidad"+IdPedido).value
);
Cart.push(pedido);
}
SeriePedido();
CleanCant();
}
function Delete(i){
    if(confirm("¿desea eliminar este producto?")){
        Cart.splice(i,1);
        localStorage.setItem('PedidoLS', JSON.stringify(Cart));
        LlenarCart();
    }
}

