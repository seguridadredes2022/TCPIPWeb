var productos = [];

function Product(codigo,nombre,precio,imagen,cantidad){
    this.codigo = codigo,
    this.nombre = nombre,
    this.precio = precio,
    this.imagen = imagen,
    this.cantidad = cantidad
}

function ProductosArray(){

var product = new Product(
     codigo = document.getElementById("Codigo").value,
     nombre = document.getElementById("Nombre").value,
     precio = document.getElementById("Precio").value,
     imagen = document.getElementById("ima").src,
     cantidad = 0
);
   LlenarTabla();
    productos.push(product);
    

}
function SearchProduct(codigo){
for(let index=0; index<productos.length; index++){
if(productos[index].codigo==codigo){
    return productos[index];
}
}
}
function CleanCant(){
    for(let index = 0; index< productos.length; index++){
      document.getElementById("Cantidad"+productos[index].codigo).value = "";  
    }
    
}
function Validate(id){
    if(document.getElementById("Cantidad"+id).value==""){
        alert("Campo obligatorio");
        return false;
    }
    return true;
}
debugger;
function readImage (input) {
    if (input.files && input.files[0]) {
      var reader = new FileReader();
      reader.onload = function (e) {
          $('#ima').attr('src', e.target.result); // Renderizamos la imagen
      }
      reader.readAsDataURL(input.files[0]);
    }
  }

  $("#imgn").change(function () {
    // Código a ejecutar cuando se detecta un cambio de archivO
    readImage(this);
  });

function LlenarTabla(){

    debugger;

    var ContenidoTabla = "";

    for (let index = 0; index < productos.length; index++) {
        ContenidoTabla += "<tr>";
        ContenidoTabla += "<td>" + productos[index].codigo + "</td>" ;
        ContenidoTabla += "<td>" + productos[index].nombre + "</td>" ;
        ContenidoTabla += "<td>" + productos[index].precio + "</td>" ;
        ContenidoTabla += '<td><img src = "'+productos[index].imagen+'"/></td>';
        ContenidoTabla += "</tr>";
    }

    document.getElementById("Tabla").innerHTML = ContenidoTabla;

}


function ValidarCampos(){


    if (document.getElementById("Codigo").value == "") {
        alert("Campo Obligatorio");
        return false;
    }

    if (document.getElementById("Nombre").value == "") {
        alert("Campo obligatorio");
        return false;
    }

    if (document.getElementById("Precio").value == "") {
        alert("Campo obligatorio");
        return false;
    }
    if(document.getElementById("ima").src==""){
        alert("Campo obligatorio")
        return false;
    }

}

function clean(){

    document.getElementById("Codigo").value = "";
    document.getElementById("Nombre").value = "";
    document.getElementById("Precio").value = "";
    document.getElementById("ima").src = "";

}


function ObtenerProductos(){

    // Validar campos

    if (ValidarCampos() == false){
        return false;
    }
    CatchData();

    // Agregamos el producto a un arreglo

    ProductosArray();

    SerieProductos();
    // Poblamos la tabla

    LlenarTabla();


    // Limpiamos los campos
    clean();


}
function SerieProductos(){
    localStorage.setItem('ProdLS',JSON.stringify(productos));
}
function CatchData(){
    if(localStorage.getItem('ProdLS')){
        productos=JSON.parse(localStorage.getItem('ProdLS'));
    }
    return;
}
function LlenarTabla2(){
    var ContenidoTabla = "";
    for(let index=0; index<productos.length; index++){
        ContenidoTabla += '<tr>';
        ContenidoTabla += '<td>'+productos[index].codigo +'</td>';
        ContenidoTabla += '<td>'+productos[index].nombre +'</br></br>';
        ContenidoTabla +='<label for="CodCantidad" >' + "Cantidad:" +'</label>';
        ContenidoTabla += '<input type="number" class="input"  id="Cantidad'+ productos[index].codigo+'">';
        ContenidoTabla +=  '</input>';
        ContenidoTabla += '</td>';
        ContenidoTabla += '<td>'+ productos[index].precio+'</br>';
        ContenidoTabla += '<button type="button" class="btn btn-success" id="btnsave" onclick ="AddCart('+productos[index].codigo +')">Agregar al carrito</button>';
        ContenidoTabla += '</td>';
        ContenidoTabla += '<td><img src="'+ productos[index].imagen + '"/></td>';
        ContenidoTabla += '</tr>';
    }
    document.getElementById("Tabla2").innerHTML=ContenidoTabla;
}
