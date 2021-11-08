function consultarBicicletas(){
    $.ajax({
        //url:"http://localhost:8080/api/Bike/all",
        //url:"http://168.138.126.1:8080/api/Bike/all",
        url:"http://168.138.147.22:8080/api/Bike/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            mostrarBicicletas(respuesta);
        }
    });
}

function mostrarBicicletas(items){

    let myTable="<table>";
    for(i=0;i<items.length;i++){
        myTable+="<tr class='tabla'>";
        myTable+="<td>"+items[i].id+"</td>";
        myTable+="<td>"+items[i].name+"</td>";
        myTable+="<td>"+items[i].brand+"</td>";
        myTable+="<td>"+items[i].year+"</td>";
        myTable+="<td>"+items[i].description+"</td>";
        myTable+="<td>"+items[i].category.description+"</td>";
        //myTable+="<td> <button class='boton' onclick='eliminarBicicleta("+items[i].id+")'>Eliminar</button>";
        myTable+="</tr>";
    }
    myTable+="</table>";
    $("#resultado").append(myTable);
}

function guardarBicicleta(){
    let myData={
        name:$("#name").val(),
        brand:$("#brand").val(),
        year:$("#year").val(),
        description:$("#description").val(),
        //category_id:$("#category_id").val(),
        category:{id: +$("#select-category").val()}
    };

    $.ajax({
        type:'POST',
        contentType: "application/json; charset=utf-8",
        dataType: 'JSON',
        data: JSON.stringify(myData),
        
        //url:"http://localhost:8080/api/Bike/save",
        //url:"http://168.138.126.1:8080/api/Bike/save",
        url:"http://168.138.147.22:8080/api/Bike/save",

        success:function(response) {
            console.log(response);
            console.log("Bicicleta grabada satisfactoriamente.");
            alert("Bicicleta grabada satisfactoriamente.");
            //window.location.reload()
            consultarBicicletas();
        },
        
        error: function(jqXHR, textStatus, errorThrown) {
            window.location.reload()
            alert("Error al intentar grabar bicicleta.");
        }
    });
}


function editarBicicleta(){
    let myData={
        id:$("#id").val(),
        name:$("#name").val(),
        brand:$("#brand").val(),
        year:$("#year").val(),
        description:$("#description").val(),
        category_id:$("#category_id").val(),
    };
    console.log(myData);
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        //url:"http://localhost:8080/api/Bike/update",
        //url:"http://168.138.126.1:8080/api/Bike/update",
        url:"http://168.138.147.22:8080/api/Bike/update",
        type:"PUT",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultado").empty();
            $("#id").val("");
            $("#name").val("");
            $("#brand").val("");
            $("#year").val("");
            $("#description").val("");
            $("#category_id").val("");
            consultarBicicletas();
            alert("Se ha actualizado el registro satisfactoriamente.")
        }
    });
}

function eliminarBicicleta() {

    var id;
    id = $("#id").val();
    $.ajax ({
        //url:'http://localhost:8080/api/Bike/'+ id,
        //url:"http://168.138.126.1:8080/api/Bike/" + id,
        url:"http://168.138.147.22:8080/api/Bike/" + id,
        type:"DELETE",
        success :function(response){
            console.log("hola"+ response);
            consultarBicicletas();
            alert("Se ha eliminado el registro satisfactoriamente.")
        },
        error:function(xhr,status){
            console.log(xhr);
        }
    });
}


///

function autoInicioCategoria(){
    console.log("se esta ejecutando")
    $.ajax({
        //url:"http://168.138.126.1:8080/api/Category/all",
        url:"http://168.138.147.22:8080/api/Category/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            let $select = $("#select-category");
            $.each(respuesta, function (id, name) {
                $select.append('<option value='+name.id+'>'+name.description+'</option>');
                console.log("select "+name.id);
            }); 
        },
        error: function (jqHXR, textStatus, errorThrown){}
    })

}
