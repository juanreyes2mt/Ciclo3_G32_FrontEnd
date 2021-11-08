function consultarMensajes(){
    $.ajax({
        //url:"http://localhost:8080/api/Message/all",
        //url:"http://168.138.126.1:8080/api/Message/all",
        url:"http://168.138.147.22:8080/api/Message/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            mostrarMensajes(respuesta);
        }
    });
}

function mostrarMensajes(items){

    let myTable="<table>";
    for(i=0;i<items.length;i++){
        myTable+="<tr class='tabla'>";
        myTable+="<td>"+items[i].idMessage+"</td>";
        myTable+="<td>"+items[i].messageText+"</td>";
        //myTable+="<td> <button class='boton' onclick='eliminarMensaje("+items[i].id+")'>Eliminar</button>";
        myTable+="</tr>";
    }
    myTable+="</table>";
    $("#resultado").append(myTable);
}

function guardarMensaje(){
    let myData = {
        messageText:$("#message_text").val(),
        //client:{idClient: +$("#select-client").val()}
        //category_id:$("#category_id").val(),
        //bike:{id: +$("#select-bicicleta").val()}
        };
      
        $.ajax({
        type:'POST',
        contentType: "application/json; charset=utf-8",
        dataType: 'JSON',
        data: JSON.stringify(myData),
        
        //url:"http://localhost:8080/api/Category/save",
        //url:"http://168.138.126.1:8080/api/Message/save",
        url:"http://168.138.147.22:8080/api/Message/save",
        
        success:function(response) {
            console.log(response);
            console.log("Mensaje grabado satisfactoriamente.");
            alert("Mensaje grabado satisfactoriamente.");
            //window.location.reload()
            consultarMensajes();
        },
        
        error: function(jqXHR, textStatus, errorThrown) {
            window.location.reload()
            alert("Error al intentar grabar mensaje.");
        }
        });
}

function editarMensaje(){
    let myData={
        id:$("#id").val(),
        messagetext:$("#messagetext").val(),
    };
    console.log(myData);
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        //url:"http://localhost:8080/api/Message/update",
        //url:"http://168.138.126.1:8080/api/Message/update",
        url:"http://168.138.147.22:8080/api/Message/update",
        type:"PUT",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultado").empty();
            $("#id").val("");
            $("#messagetext").val("");
            consultarMensajes();
            alert("Se ha actualizado el registro satisfactoriamente.")
        }
    });
}

function eliminarMensaje() {

    var id;
    id = $("#id_message").val();
    $.ajax ({
        //url:'http://localhost:8080/api/Message/'+ id,
        //url:"http://168.138.126.1:8080/api/Message/" + id,
        url:"http://168.138.147.22:8080/api/Message/" + id,
        type:"DELETE",
        success :function(response){
            console.log("hola"+ response);
            consultarMensajes();
            alert("Se ha eliminado el registro satisfactoriamente.")
        },
        error:function(xhr,status){
            console.log(xhr);
        }
    });
}

function autoInicioCliente(){
    console.log("se esta ejecutando")
    $.ajax({
        //url:"http://168.138.126.1:8080/api/Client/all",
        url:"http://168.138.147.22:8080/api/Client/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta2){
            console.log(respuesta2);
            let $select = $("#select-client");
            $.each(respuesta2, function (id2, name2) {
                $select.append('<option value='+name2.id+'>'+name2.name+'</option>');
                console.log("select "+name2.id);
            }); 
        },
        error: function (jqHXR, textStatus, errorThrown){}
    })
}
