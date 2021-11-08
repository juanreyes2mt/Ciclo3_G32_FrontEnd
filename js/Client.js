function consultarClientes(){
    $.ajax({
        //url:"http://localhost:8080/api/Client/all",
        //url:"http://168.138.126.1:8080/api/Client/all",
        url:"http://168.138.147.22:8080/api/Client/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            mostrarClientes(respuesta);
        }

    });
}

function mostrarClientes(items){

    let myTable="<table>";
    for(i=0;i<items.length;i++){
        myTable+="<tr class='tabla'>";
        myTable+="<td>"+items[i].idClient+"</td>";
        myTable+="<td>"+items[i].name+"</td>";
        myTable+="<td>"+items[i].email+"</td>";
        myTable+="<td>"+items[i].age+"</td>";
        myTable+="<td>"+items[i].password+"</td>";
        //myTable+="<td> <button class='boton' onclick='eliminarCliente("+items[i].id+")'>Eliminar</button>";
        myTable+="</tr>";
    }
    myTable+="</table>";
    $("#resultado").append(myTable);

}

function guardarCliente(){
    let myData={
        //id:$("#idClient").val(),
        name:$("#name").val(),
        email:$("#email").val(),
        age:$("#age").val(),
        password:$("#password").val(),
    };
   
    $.ajax({
        //url:"http://localhost:8080/api/Bike/save",
        //url:"http://168.138.126.1:8080/api/Client/save",
        url:"http://168.138.147.22:8080/api/Client/save",
        type:'POST',
        contentType: "application/json; charset=utf-8",
        dataType: 'JSON',
        data: JSON.stringify(myData),
   
        success:function(response){
            console.log(response);
            console.log("Cliente grabado satisfactoriamente.");
            alert("Cliente grabado satisfactoriamente.")
            consultarClientes();
        },
        error: function(jqXHR, textStatus, errorThrown) {
            window.location.reload()
            alert("Error al intentar grabar cliente.");
        }
    });
}

function editarCliente(){
    let myData={
        idClient:$("#idClient").val(),
        name:$("#name").val(),
        email:$("#email").val(),
        age:$("#age").val(),
        password:$("#password").val(),
    };
    console.log(myData);
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        //url:"http://168.138.126.1:8080/api/Client/update",
        //url:"http://168.138.126.1:8080/api/Client/update",
        url:"http://168.138.147.22:8080/api/Client/update",
        type:"PUT",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultado").empty();
            $("#idClient").val("");
            $("#name").val("");
            $("#email").val("");
            $("#age").val("");
            $("#password").val("");
            consultarClientes();
            alert("Se ha actualizado el registro satisfactoriamente.")
        }
    });
}

function eliminarCliente() {

    var id;
    idClient = $("#idClient").val();
    $.ajax ({
        //url:'http://localhost:8080/api/planetas/'+ codigo,
        //url:"http://168.138.126.1:8080/api/Client/" + idClient,
        url:"http://168.138.147.22:8080/api/Client/" + idClient,
        type:"DELETE",
        success :function(response){
            console.log("hola"+ response);
            consultarClientes();
            alert("Se ha eliminado el registro satisfactoriamente.")
        },
        error:function(xhr,status){
            console.log(xhr);
        }
    });
}


