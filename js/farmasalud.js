jQuery.support.cors = true;
class call_apis
{ 
  static login(url)
  {
    var type = "GET"
    var salida = $.ajax(
    {
      type: type,
      url: url,
      async: false,
      crossDomain: true,
      xhrFields: {
        withCredentials: true,
        crossDomain: true,
      },
      headers: {
        'Access-Control-Allow-Origin':'*',
        'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
        'Access-Control-Allow-Headers': '*'
      },
      success: function(data)
      {
        console.log("estas logeado correctamente :)");
        return data;
      },
      error: function (xhr, textStatus, errorThrown) 
      {
        console.log("No estas logueado :)");
        console.log(xhr);
        console.log(textStatus);
        console.log(errorThrown);
        console.log(xhr.responseJSON.url_login);
        var newURL = window.location.host + "" + window.location.pathname ;
        //window.location.assign(xhr.responseJSON.url_login + "/" + newURL);
        //window.location.href = xhr.responseJSON.url_login + "/" + newURL;
        //window.location.replace(xhr.responseJSON.url_login + "/" + newURL);
        //window.location = xhr.responseJSON.url_login + "/" + newURL;
        console.log("termino el login fail");
        var data = errorThrown ;
        return data;
      }
    }).responseJSON;
    console.log("salida es : " + salida);
    try {
      return salida 
    }
    catch
    {
      throw true;
    }
  }
  static get(url)
  {
    /*var salida = ""
    var type = "GET"
    $.ajax(
    {
      type: type,
      url: url,
      async: false,
      xhrFields: {
        withCredentials: true,
        crossDomain: true,
      },
      headers: {
        'Access-Control-Allow-Origin':'*',
        'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
        'Access-Control-Allow-Headers': '*'
      },
      success: function(data)
      {
        console.log("entro en success");
        salida = data;
        return data;
      },
      error: function (xhr, textStatus, errorThrown) 
      {
        console.log("Problema En Get ");
        console.log(textStatus)
        console.log(xhr);
        console.log(errorThrown);
        if (confirm ("Error En get : " + textStatus + "\n Probar relogearse ?"  ))
        {
          console.log("Intentando relogearse")
          call_apis.login( config.urlLogin);
          return false;
        }
        else
        {
          console.log("no intento relogearse")
          return false;
        }

        
      }
    }).responseJSON;
    console.log("salida es : " + salida)
    /*try
    {
      return salida; 
    }
    catch(e)
    {
      throw true;
    }*/

    fetch(url, {
      redirect: "manual"
  }).then((res) => {
      console.log(res)
      if (res.type === "opaqueredirect") {
          //window.location.href = res.url;
          console.log(res)
          console.log(res.url)
      } else {
          return res;
      }
  });
  }
  
  static post(url_post, postData)
  {
    var type = "POST"
    var dataType = "json"
    var salida = $.ajax(
    {
      type: type,
      ContentType: "application/json",
      url: url_post,
      dataType: "json",
      async: false,
      method: "POST",
      xhrFields: {
        withCredentials: true,
      },
      headers: {
        'Access-Control-Allow-Origin':'*',
        'Access-Control-Allow-Methods': 'POST',
        "content-type": "application/json",
        'Access-Control-Allow-Headers': '*'
      },
      data: JSON.stringify(postData),
      success: function (data)
      {
        console.log("Agregue ok los datos SUCCESS: ", data);
        return data;
      },
      error: function (e) 
      {
        console.log('Could not get posts, server response: \n' + e.responseText + ' \nStatus Code : \n' + e.status);
        console.log("ERROR: ", e);
        if (confirm ("Error En post : " + e.responseText + "\n http response : " + e.status + " \nProbar relogearse ?"  ))
        {
          console.log("Intentando relogearse")
          call_apis.login(config.urlLogin);
          return false;
        }
        else
        {
          console.log("no intento relogearse")
          return false;
        }
      }
    }).responseJSON;
    console.log("get post")
    console.log(salida)
    return salida
  }
}

class inventory
{
  static list(elements, id, select_sucu, checkbox_art)
  {
    //console.log(elements)
    var str = "";
    $.each(JSON.parse(elements), function(idx, obj) {
      //console.log(obj);
      if ( select_sucu == 0 || select_sucu == obj.sucursales_id )
      {
        //console.log("entro en el primer if checkbox_Art : " + checkbox_art )
        if ( checkbox_art  || obj.cantidad != "-" )
        {
          /* 
            Convierto la fecha de vencimiento en iso para poder completar correctamente el date el if es por que si existe el articulo
            Pero nunca se cargo ningun inventario la fecha viene vacia
          */ 
          if ( obj.fecha_venc != "-" )
          {
            var myTime = new moment.utc(obj.fecha_venc, "Do/MM/YYYY").utc();
            var fechavencimiento = myTime.toISOString().substr(0, 10);
          }
          var aleatorio = Math.floor(Math.random() * 100000000);
          var ids_form = obj.nombre + obj.barcode + obj.sucursales_id + aleatorio ;
          var ids_form = ids_form.replace(/ /gm,'');
          str = str + '<nav class="navbar mt-3 pl-3 pr-3 col-sm-12 shadow-sm p-3 bg-white rounded">'
          + '<div class="col-s-1 justify-content-between"><span><b>'
          /*
            si obj.cantidad viene con guion pongo el signo menos para identificar que no hay stock si no pongo tilde
          */
          if (  obj.cantidad == "-" )
          {
            str = str + '<svg viewBox="0 0 24 24" width="24" height="24" stroke="#000" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" class="css-i6dzq1"><line x1="5" y1="12" x2="19" y2="12"></line></svg>'
          }
          else
          {
            str = str + '<svg viewBox="0 0 24 24" width="24" height="24" stroke="#000" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" class="css-i6dzq1"><polyline points="20 6 9 17 4 12"></polyline></svg>'
          }
          str = str + '</b></span></div>'
            + '<div class="d-flex col-xl justify-content-between"><span><b>' + obj.nombre + ' </b></span></div>'
            + '<div class="d-flex col-xl justify-content-between"><span>' + obj.sucursal_nombre + '</span></div>'
            + '<div class="d-flex col-xl justify-content-between"><span>' + obj.precio + '</span></div>'
            + '<div class="d-flex col-xl justify-content-between"><span>' + obj.cantidad + '</span></div>'
            + '<div class="d-flex col-xl justify-content-between"><span>' + obj.barcode + '</span></div>'
            + '<div class="d-flex col-xl justify-content-between"><span>' + obj.fecha_venc + '</span></div>'
            +' <button class="btn btn-light" type="button" data-toggle="collapse" '
            + 'data-target="#' + ids_form + '" aria-controls="navbarToggleExternalContent"'
            + 'aria-expanded="false" aria-label="Toggle navigation">'
              +'Modificar'
          +'</button>'
          + '</nav>'
          + '<div class="pos-f-t">'
          + '<div class="collapse" id="' + ids_form + '">'
            + '<div class="bg-light p-4">'
                  + '<nav class="navbar shadow-sm p-3 bg-white rounded d-flex col-xl justify-content-between">'
                    + '<form class="d-flex col-xl justify-content-between" onsubmit="return agregar_inventario(event,\'addarticulo-succes' + ids_form + '\')" id="form' + ids_form + '" >'
                      + '<div class="d-flex col-xl justify-content-between" >'
                        + '<select id="sucursales' + ids_form + '" onfocus="carga_sucursales_select(this)"'
                        + 'class="custom-select sucursales' + ids_form + '" type="select" required>'
                        + '<option value="">Seleccione</option>'
                        + '</select>'
                        + '<div class="invalid-feedback">'
                        + 'Ingrese sucursal.'
                        + '</div>'
                      + '</div>'
                      + '<div class="d-flex col-xl justify-content-between">'
                        + '<div class="form-group">'
                          + '<input type="tel" class="form-control" id="barcode' + ids_form + '"'
                          + ' value="' + obj.barcode + '" aria-describedby="inputGroupPrepend" readonly>'
                            + '<div class="invalid-feedback">'
                              + 'Ingresa los 16 numeros del codigo de barras.'
                            + '</div>'
                        + '</div>'
                      + '</div>'
                      + '<div class="d-flex col-xl justify-content-between" >'
                        + '<select class="custom-select" type="select" id="select' + ids_form + '" required onchange="select_agregar_eliminar(this,\'date' + ids_form + '\',\'cantidad' + ids_form + '\',\'' + obj.cantidad  + '\')">'
                          + '<option value="">Seleccione</option>'
                          + '<option value="0">Agregar</option>'
                          + '<option value="1">Eliminar</option>'
                        + '</select>'
                        + '<div class="invalid-feedback">'
                          + 'Seleccione agregar o eliminar'
                        + '</div>'  
                      + '</div>'
                      + '<div class="d-flex col-xl justify-content-between">'
                        + '<input type="number" class="form-control" id="cantidad' + ids_form + '"'
                        + 'placeholder="cantidad" aria-describedby="inputGroupPrepend" min="1" required>'
                        + '<div class="invalid-feedback">'
                          + 'Ingresa Cantidad.'
                        + '</div>'
                      + '</div>'
                      + '<div class="col-xl justify-content-between" id="div-date' + ids_form + '">'
                        + '<input class="form-control mr-sm-2" type="date" aria-label="first" style="width: 100%;"'
                        + 'placeholder="Fecha vencimiento" id="date' + ids_form + '" value="' + fechavencimiento + '" disabled="">'
                        + '<div class="invalid-feedback">'
                          + 'Ingrese fecha de vencimiento'  
                        + '</div>'
                      + '</div>'
                      
                      + '<div class="col-sm-1 col-md-1">'
                        + '<button data-target="#addarticulo-succes' + ids_form + '" class="btn btn-primary" type="submit">Modificar</button>'
                      + '</div>'
                    + '</form>'
                  + '</nav>'
            + '</div>'
          + '</div>'
         + '<div id="addarticulo-succes' + ids_form + '">'

            + '</div>'
          + '</div>'
        + '</div>'
          //+ '</form>'
        }
      }
    });  
    $("#" + id).html(str); 
  }

}

class usuario 
{
  constructor(usuario,email,logout,id_menu_usuario,id_email,id_logout)
  {
    this.user = usuario;
    this.email = email;
    this.logout = logout;
    this.id_menu_usuario = id_menu_usuario;
    this.id_email = id_email;
    this.id_logout = id_logout;
  }
  datos ()
  {
    document.getElementById(this.id_menu_usuario).innerHTML = " " + this.user + "";
    document.getElementById(this.id_email).innerHTML = " " + this.email + "";
    document.getElementById(this.id_logout).href = this.logout;
    //this.user = call_apis.get(config.urlUsers)
  }
}



class maneja_inventory 
{
  constructor(sucursal,barcode,cantidad,fecha_vencimiento,id_success)
  {
    this.sucursal = sucursal;
    this.cantidad = cantidad;
    this.fecha_vencimiento = fecha_vencimiento;
    this.barcode = barcode;
    this.id_success = id_success;
  }
  agregar()
  {
    console.log(this.sucursal);
    console.log(this.cantidad);
    console.log(this.fecha_vencimiento);
    console.log(this.barcode)
    var postData = {};
    var postData = {};
    postData["sucursal_id"] = parseInt(this.sucursal) ;
    postData["cantidad"] = parseInt(this.cantidad);
    postData["fecha_vencimiento"] = this.fecha_vencimiento;
    postData["barcode"] = this.barcode;
    var salida = call_apis.post(config.urlInventario  + "agregarinventario",postData);
    var men = new mensajes(this.id_success);
    if ( salida.statusCode == 200 )
    {
      men.success("inventario Agregado Correctamente")
      return false;
    }
    else
    {
      men.error("Hubo un problema al agregar" + salida.statusCode + "\n\nstatus : " + salida.status + "\n\nmessage : " + salida.message)
      return false;
    }
  }
  eliminar()
  {
    var postData = {};
    var postData = {};
    postData["sucursal_id"] = parseInt(this.sucursal) ;
    postData["cantidad"] = parseInt(this.cantidad);
    postData["fecha_vencimiento"] = this.fecha_vencimiento;
    postData["barcode"] = this.barcode;
    var salida = call_apis.post(config.urlInventario  + "eliminarinventario",postData);
    var men = new mensajes(this.id_success);
    if ( salida.statusCode == 200 )
    {
      men.success("inventario Eliminado Correctamente")
      return false;
    }
    else
    {
      men.error("Hubo un problema al eliminar\nstatusCode : " + salida.statusCode + "\n\nstatus : " + salida.status + "\n\message : " + salida.message )
      return false;
    }
  }
}
class mensajes
{
  constructor(id)
  {
    this.id = id;
  }
  error(mensaje)
  {
    var str = '<div class="alert alert-danger alert-dismissible">'
      + '<button type="button" class="close" data-dismiss="alert">&times;</button>'
      + '<strong>CRITICAL!</strong>' 
      + '<p> Mensaje : ' + mensaje + '</p>'
      + '</div>'
    $("#" + this.id).html(str);
  }
  success(mensaje)
  {
    var str = '<div class="alert alert-success alert-dismissible">'
      + '<button type="button" class="close" data-dismiss="alert">&times;</button>'
      + '<strong>Success!</strong> ' + mensaje + '.'
      + '</div>'
    $("#" + this.id).html(str);
  }
}

function agregar_inventario(form,succes_collapse)
{
  var formID = form.target.id;   //get form ID
  var f = document.getElementById(formID);
  if (f.checkValidity() === false)       
  {  
    event.preventDefault();  
    event.stopPropagation();
    f.classList.add('was-validated');        
  } 
  else
  {
    var abm_inv = new maneja_inventory(form.target[0].value,form.target[1].value,form.target[3].value,form.target[4].value,succes_collapse)
    if ( form.target[2].value == 0 )
    {
      abm_inv.agregar();
      return false
    }
    else if ( form.target[2].value == 1 )
    {   
      abm_inv.eliminar();
      return false;
    }
    else
    {
      alert("Amigo que onda no reconozco si es agregar o eliminar");
      return false;
    }
  }
}

function select_agregar_eliminar(element,id_date,id_cantidad,cant_max)
{
  //console.log(element)
  if ( element.value == 0 )
  {
    /* Muestro el date bloqueado para que pueda agregar un articulo con otra fecha de vecimiento */
    document.getElementById(id_date).disabled = false;
    document.getElementById(id_cantidad).max = false;
  }
  else if ( element.value == 1 )
  {
    document.getElementById(id_date).disabled = true;
    document.getElementById(id_cantidad).max = cant_max;
  }
  else
  {
    alert("CRITICAL AMIGO ENTRO EN ELSE NO DEBERIA ENTRAR ACA \nRELOJEA EL CODIGO SEGURO ESTA TODO MAL ")
  }
}

function search_product(elemento,id)
{
  // Tomo los elementos del campo search que tiene como id "buscar_producto"
  for(I = 0; I < elemento.length; I++)
  {
    // si el type es select-one es la id de la sucursal
    if ( elemento[I].type == "select-one" )
    {
      var select_sucu = elemento[I].value ;
    }
    // si el type es search es lo que esta buscando 
    else if ( elemento[I].type == "search" )
    {
      if ( elemento[I].textLength == 0  )
      {
        // si el campo search esta vacio le agrego el wildcard para que busque todo y no falle
        var search_art = "%25"
      }
      else
      {
        // si no esta vacio relleno con lo que esta buscando
        var search_art = elemento[I].value ; 
      }
      
    }
    else if ( elemento[I].type == "checkbox" )
    {
      var checkbox_art = elemento[I].checked ;
    }
  }
  //Le pego a la api y me traigo todos los productos que coincidan con el nombre de inventario
  json_allproduct = call_apis.get(config.urlInventario + search_art)
  //Actualizo el div lista_de_producto con el inventory encontrado
  inventory.list(json_allproduct,id,select_sucu,checkbox_art)
}

function valido_form(e) {
  //console.log(e)
  // Valido form echo con bootstrap
  var formID = e.target.id;   //get form ID
  var form = document.getElementById(formID);
  console.log(form.checkValidity)
  if (form.checkValidity() === false)       
  {  
    event.preventDefault();  
    event.stopPropagation();
    //console.log("validateif"); 
    form.classList.add('was-validated');        
  }      
  else         
  {
    var postData = {};
    $.each(form.elements, function(idx, obj) {
      if ( obj.nodeName != "BUTTON" )
      {
        if ( obj.type == "tel" || obj.type == "number" )
        {
          console.log("parse int");
          console.log(obj.value);
          postData[obj.id] = parseInt(obj.value);
        }
        else
        {
          postData[obj.id] = obj.value;
        }
      }
    });
    try
    {
      salida = call_apis.post(config.urlApiSucursales  + "articulos/agregararticulo",postData);
    }
    catch(err)
    {
      console.log("problema call_apis.post : " + err);
      alert("Error al cargar el articulo \nurl : " +  config.urlApiSucursales  + "sucursales/\nverficar login o api");
      return false;
    }
    try 
    {
      var men = new mensajes("addarticulo-succes");
      if ( salida.statusCode == 200 )
      {
        men.success("Articulo agregado correctamente")
        document.getElementById(formID).reset(); 
      }
      else
      {
        men.error("Articulo No Agregado \n statusCode : " + salida.statusCode + "\n\nstatus : " + salida.status + "\n\message : " + salida.message )
      }
    }
    catch(e)
    {
      console.log("problema call_apis.post : " + e);
      alert("Error al generar mensaje de salida \nurl : " +  config.urlApiSucursales  + "sucursales/\nverficar login o api\nmensaje : " + salida);
      return false;
    }
  }
  return false
}
function carga_sucursales_select(v)
{
  try
  {
    console.log(v)
    var ID = v.id;   //get form ID
    if ( typeof sucu == 'undefined' )
    {
      window.sucu = call_apis.get(config.urlApiSucursales  + "sucursales/")
    }
    else
    {
      console.log("else sucu")
      console.log(sucu)
    }
    $.each(JSON.parse(sucu), function(idx, obj) {
      //console.log(obj.nombre);
      var i;
      var flag = "0";
      for (i = 0; i < $('#'+ ID).find('option').length; i++) 
      {
        if ( $('#'+ ID).find('option')[i].value == obj.id )
        {
          flag = "1";
        }
      }
      if ( flag == "0" )
      {
        var option = document.createElement("option"); //creo el elemento opción
        option.setAttribute("value", obj.id); // le agrego en value el id de la sucursal
        $(option).html(obj.nombre); //Escribes en él el nombre de la sucursal
        $(option).appendTo('.' + ID);
      }
    });
  }
  catch (e)
  {
    console.log(e)
    console.log("entro en el catch de cargar sucursales en el select")
    alert("Error al cargar las sucursales en el select \nurl : " +  urlApiSucursales + "sucursales/\nverficar login o api");
    console.log(e)
  }
}
$(document).ready(function()
{
  config = new configuration();
  if(navigator.userAgent.indexOf("Firefox") != -1 ) 
  {
       console.log("navegador firefox soportado :)");
  }
  else
  {
      alert('navegador no soportado.\nel unico navegador soportado el firefox 78.01 para arriba');
  }
  try
  {
    console.log("aca va el login")
    call_apis.login(config.urlLogin);
  }
  catch(e)
  {
    console.log("entro en el catch")
    alert("Error en login \nurl : " +  config.urlLogin  + "login/\nverficar login o api");
    console.log(e)
  }
  //try
  //{
    console.log("agrego menu usuario");
    var user = call_apis.get(config.urlUsers)
    u = new usuario(user.username,user.email,config.logut_url,config.id_menu_usuario,config.id_email,config.id_logout)
    u.datos()
  //}
  //catch (e)
  //{
  //  console.log("Problemas al armar el menu de usuario");
  //  console.log(e)
  //  alert("No pude obtener datos del usuario \nurl : " +  config.urlUsers + "user/\nverficar login o que la api este respondiendo correctamente\n" + e);
  //  document.getElementById("menu-usario").innerHTML = "  Problemas con el usuario ";
 // }
});


