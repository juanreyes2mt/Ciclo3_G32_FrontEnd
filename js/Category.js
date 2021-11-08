function consultarCategorias(){
    $.ajax({
        //url:"http://localhost:8080/api/Category/all",
        //url:"http://168.138.126.1:8080/api/Category/all",
        url:"http://168.138.147.22:8080/api/Category/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            mostrarCategorias(respuesta);
        }
    });
}

function mostrarCategorias(items){

    let myTable="<table>";
    for(i=0;i<items.length;i++){
        myTable+="<tr class='tabla'>";
        myTable+="<td>"+items[i].id+"</td>";
        myTable+="<td>"+items[i].name+"</td>";
        myTable+="<td>"+items[i].description+"</td>";
        //myTable+="<td> <button class='boton' onclick='eliminarCategoria("+items[i].id+")'>Eliminar</button>";
        myTable+="</tr>";
    }
    myTable+="</table>";
    $("#resultado").append(myTable);
}

function guardarCategoria(){
    let myData = {
        name:$("#name").val(),
        description:$("#description").val()
        };
      
        $.ajax({
        type:'POST',
        contentType: "application/json; charset=utf-8",
        dataType: 'JSON',
        data: JSON.stringify(myData),
        
        //url:"http://localhost:8080/api/Category/save",
        //url:"http://168.138.126.1:8080/api/Category/save",
        url:"http://168.138.147.22:8080/api/Category/save",
        
        success:function(response) {
            console.log(response);
            console.log("Categoria grabada satisfactoriamente.");
            alert("Categoria grabada satisfactoriamente.");
            //window.location.reload()
            consultarCategorias();
    
        },
        
        error: function(jqXHR, textStatus, errorThrown) {
            window.location.reload()
            alert("Error al intentar grabar categoria.");
        }
        });
}

function editarCategoria(){
    let myData={
        id:$("#id").val(),
        name:$("#name").val(),
        description:$("#description").val(),
    };
    console.log(myData);
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        //url:"http://localhost:8080/api/Category/update",
        //url:"http://168.138.126.1:8080/api/Category/update",
        url:"http://168.138.147.22:8080/api/Category/update",
        type:"PUT",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultado").empty();
            //$("#id").val("");
            $("#name").val("");
            $("#description").val("");
            consultarCategorias();
            alert("Se ha actualizado el registro satisfactoriamente.")
        }
    });
}

function eliminarCategoria() {

    var id;
    id = $("#id").val();
    $.ajax ({
        //url:'http://localhost:8080/api/Category/'+ codigo,
        //url:"http://168.138.126.1:8080/api/Category/" + id,
        url:"http://168.138.147.22:8080/api/Category/" + id,
        type:"DELETE",
        success :function(response){
            console.log("hola"+ response);
            consultarCategorias();
            alert("Se ha eliminado el registro satisfactoriamente.")
        },
        error:function(xhr,status){
            console.log(xhr);
        }
    });
}

