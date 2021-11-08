function consultarReservas(){
    $.ajax({
        //url:"http://localhost:8080/api/Reservation/all",
        //url:"http://168.138.126.1:8080/api/Reservation/all",
        url:"http://168.138.147.22:8080/api/Reservation/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            mostrarReservas(respuesta);
        }
    });
}

function mostrarReservas(items){

    let myTable="<table>";
    for(i=0;i<items.length;i++){
        myTable+="<tr class='tabla'>";
        myTable+="<td>"+items[i].idReservation+"</td>";
        myTable+="<td>"+items[i].startDate+"</td>";
        myTable+="<td>"+items[i].devolutionDate+"</td>";
        myTable+="<td>"+items[i].status+"</td>";
        //myTable+="<td>"+items[i].bike.name+"</td>";
        //myTable+="<td>"+items[i].client.name+"</td>";
        //myTable+="<td> <button class='boton' onclick='eliminarMensaje("+items[i].id+")'>Eliminar</button>";
        myTable+="</tr>";
    }
    myTable+="</table>";
    $("#resultado").append(myTable);
}

function guardarReserva(){
    let myData = {
        startDate:$("#startDate").val(),
        devolutionDate:$("#devolutionDate").val(),
        status:$( "#status option:selected" ).val()
        
        //bike:{id: +$("#select-bike").val()}
        //client:{idClient: +$("#select-client").val()}
        //category:{id: +$("#select-category").val()}
    };
      
    $.ajax({
        type:'POST',
        contentType: "application/json; charset=utf-8",
        dataType: 'JSON',
        data: JSON.stringify(myData),
        
        //url:"http://localhost:8080/api/Reservation/save",
        //url:"http://168.138.126.1:8080/api/Reservation/save",
        url:"http://168.138.147.22:8080/api/Reservation/save",
        
        success:function(response) {
            console.log(response);
            console.log("Mensaje grabado satisfactoriamente.");
            alert("Mensaje grabado satisfactoriamente.");
            //window.location.reload()
            consultarReservas();
        },
        
        error: function(jqXHR, textStatus, errorThrown) {
            window.location.reload()
            alert("Error al intentar grabar mensaje.");
        }
    });
}

function editarReserva(){
    let myData={
        id:$("#id").val(),
        startDate:$("#startDate").val(),
        devolutionDate:$("#devolutionDate").val(),
        status:$("#status").val(),
    };
    console.log(myData);
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        //url:"http://localhost:8080/api/Reservation/update",
        //url:"http://168.138.126.1:8080/api/Reservation/update",
        url:"http://168.138.147.22:8080/api/Reservation/update",
        type:"PUT",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultado").empty();
            $("#id").val("");
            $("#startDate").val("");
            $("#devolutionDate").val("");
            $("#status").val("");
            consultarReservas();
            alert("Se ha actualizado el registro satisfactoriamente.")
        }
    });
}

function eliminarReserva() {

    var id;
    id = $("#id").val();
    $.ajax ({
        //url:'http://localhost:8080/api/Reservation/'+ id,
        //url:"http://168.138.126.1:8080/api/Reservation/" + id,
        url:"http://168.138.147.22:8080/api/Reservation/" + id,
        type:"DELETE",
        success :function(response){
            console.log("hola"+ response);
            consultarReservas();
            alert("Se ha eliminado el registro satisfactoriamente.")
        },
        error:function(xhr,status){
            console.log(xhr);
        }
    });
}

////

function autoInicioBicicleta(){
    console.log("se esta ejecutando")
    $.ajax({
        //url:"http://168.138.126.1:8080/api/Bike/all",
        url:"http://168.138.147.22:8080/api/Bike/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            let $select = $("#select-bike");
            $.each(respuesta, function (id, name) {
                $select.append('<option value='+name.id+'>'+name.name+'</option>');
                console.log("select "+name.id);
            }); 
        },
        error: function (jqHXR, textStatus, errorThrown){}
    })

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

////////////////////////////       REPORTES    //////////////////////////////////////////////////

function traerReporteStatus(){
    $.ajax({
        url:"http://168.138.147.22:8080/api/Reservation/report-status",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            pintarRespuesta(respuesta);
        }
    });
}

function pintarRespuesta(respuesta){

    let myTable="<table>";
    myTable+="<tr>";
       myTable+="<th class='tabla'>Reservas Completadas: </th>";
        myTable+="<td>"+respuesta.completed+"</td>";
        myTable+="<th class='tabla'>Reservas Canceladas: </th>";
        myTable+="<td>"+respuesta.cancelled+"</td>";
        myTable+="</tr>";
    myTable+="</table>";
    $("#resultadoStatus").html(myTable);
}

function traerReporteClientes(){
    $.ajax({
        url:"http://168.138.147.22:8080/api/Reservation/report-clients",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            pintarRespuestaClientes(respuesta);
        }
    });
}

function pintarRespuestaClientes(respuesta){

    let myTable="<table>";
    myTable+="<tr class='tabla'>";
      
    for(i=0;i<respuesta.length;i++){
    myTable+="<th class='tabla'>Total reservas</th>";
        myTable+="<td>"+respuesta[i].total+"</td>";
        myTable+="<td>"+respuesta[i].client.name+"</td>";
        //myTable+="<td>"+respuesta[i].client.email+"</td>";
        //myTable+="<td>"+respuesta[i].client.age+"</td>";
        myTable+="<td><a href= 'javascript:pintarRespuestaClientesReservaciones("+respuesta[i].client.reservations+");'>Ver reservaciones</a></td>";
        myTable+="</tr>";
    }
    myTable+="</table>";
    $("#resultadoClientes").html(myTable);
}

function pintarRespuestaClientesReservaciones(respuesta){
console.log(respuesta);
    let myTable="<table>";
    myTable+="<tr>";
      
    for(i=0;i<respuesta.length;i++){
    myTable+="<th>Total Reservas</th>";
        myTable+="<td>"+respuesta[i].startDate+"</td>";
        myTable+="</tr>";
    }
    myTable+="</table>";
    $("#resultadoClientes").html(myTable);
}