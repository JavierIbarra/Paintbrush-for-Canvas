function crearEvent(){
    var modal = document.getElementById("eventModal");
    $('#crear_event').click(function(){
        let date = document.getElementById('calendar_event_date').value.split('-');
        let start = document.getElementById('calendar_event_start_time').value.split(':');
        let end = document.getElementById('calendar_event_end_time').value.split(':');
        let d_start = new Date(date[0],date[1],date[2],start[0],start[1]);
        let d_end = new Date(date[0],date[1],date[2],end[0],end[1]);


        let title = document.getElementById('calendar_event_title').value
        let locationName = document.getElementById('calendar_event_location_name').value
        let id = localStorage.getItem('user_id')
        let user_id = "user_"+id

        if (user_id=="" || title==""  || start.length == 1  || end.length == 1 || date.length == 1){
            alert("faltan datos")
            
        }else{

          NewEvent(user_id, title, d_start.toISOString(),d_end.toISOString(), locationName)

          modal.style.display = "none";
          $('body').attr('style', 'position: inherit; height: auto; overflow: visible ')
          //location.reload()
        }
    });
}

//$(document).ready(function(){
//    $('#crear_event').click(function(){
//        let date = document.getElementById('calendar_event_date').value.split('-');
//        let start = document.getElementById('calendar_event_start_time').value.split(':');
//        let end = document.getElementById('calendar_event_end_time').value.split(':');
//        let d_start = new Date(date[0],date[1],date[2],start[0],start[1]);
//        let d_end = new Date(date[0],date[1],date[2],end[0],end[1]);
//
//        console.log(d_start.toISOString());
//        console.log(d_end.toISOString());
//
//        let title = document.getElementById('calendar_event_title').value
//        let id = localStorage.getItem('user_id')
//        let user_id = "user_"+id
//
//        post_api(user_id, title, d_start.toISOString(),d_end.toISOString())
//    });
//});

function readCookie(name) {
    var nameEQ = name + "="; 
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
      var c = ca[i];
      while (c.charAt(0)==' ') c = c.substring(1,c.length);
      if (c.indexOf(nameEQ) == 0) {
        return decodeURIComponent( c.substring(nameEQ.length,c.length) );
      }
    }
    return null;
}
  
  
function post_api(context, text, at, end, locationName){
    var token = readCookie( "_csrf_token" )
    var parts = location.hostname.split('.');
    var subdomain = parts.shift();
    
    $.ajax({
      url: "https://"+subdomain+".instructure.com/api/v1/calendar_events",
      type: "POST",
      headers: { Authorization: $`Bearer ${token}` },
      data: {calendar_event: {context_code: context, title: text,start_at: at, start_end: end, location_name: locationName}},
      error: function(err) {
        switch (err.status) {
          case "400":
            // bad request
            break;
          case "401":
            // unauthorized
            break;
          case "403":
            // forbidden
            break;
          default:
            //Something bad happened
            break;
        }
      },
      success: function(data) {
        console.log("Success!");
      }
    });
}
  
  