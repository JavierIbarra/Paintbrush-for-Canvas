const body = document.querySelector('body');


$.get(chrome.runtime.getURL('./html/menu.html'), function(data) {
    API();
    $(data).appendTo('body');
    load(); 
    NavPaintbrush();
    BtnNav();
    ListaCursos();
    //MostrarActividades();
});

$.get(chrome.runtime.getURL('./html/modalTimer.html'), function(data) {
    $(data).appendTo('body');
    ModalMenu("btnModalTimer","timerModal");
});

$.get(chrome.runtime.getURL('./html/timer.html'), function(data) {
    $(data).appendTo('#application');
});


$.get(chrome.runtime.getURL('./html/modalConfig.html'), function(data) {
    $(data).appendTo('body');
    ModalMenu("btnModalConfig","configModal");
    crearModal();
    guardarDatos();
});


$.get(chrome.runtime.getURL('./html/modal.html'), function(data) {
    $(data).appendTo('body');
    ModalMenu("btnModal", "tvesModal");
    //DragAndDrop();
    //EditMenu();
    ActualizarMenu();
    
});


$.get(chrome.runtime.getURL('./html/modalEvent.html'), function(data) {
    $(data).appendTo('body');
    ModalMenu("btnEventModal", "eventModal");
    crearEvent();
});

function load(){
    const darkmode = localStorage.getItem('darkmode');
    let lista = JSON.parse(localStorage.getItem('ListaMenuOculto'))
    let primera = localStorage.getItem('_1')
    
    if (!darkmode){
        localStorage.setItem('darkmode','false');
    }else if (darkmode == 'true'){
        body.classList.add('darkmode');
        let mode = document.querySelector(".fa-moon")
        if (mode != undefined){
            mode.classList.remove("fa-moon")
            mode.classList.add("fa-sun")
        }
    }
    
    if (!lista && !primera){
        let ocultos = ['todoscursos', 'calificaciones', 'archivos']
        localStorage.setItem('ListaMenuOculta',JSON.stringify(ocultos))
        localStorage.setItem('_1', true)
        
    }
}

function MostrarActividades(){
    var actividades = JSON.parse(localStorage.getItem('Actividades'))
    var colorCursos = JSON.parse(localStorage.getItem('colorCursos'))
    actividades.sort(function (a, b) {
        if (a.start_at > b.start_at) {
        return 1;
        }
        if (a.start_at < b.start_at) {
        return -1;
        }
        return 0;
    });

    for (var i in actividades){
        let id = actividades[i]["context_code"].substring(7)
        let logo;
        let type = actividades[i]["type"]
        if (type == "assignment"){
            logo = "icon-assignment"
        }
        if (type == "event"){
            logo = "icon-calendar-day"
        }

        

        let d = new Date(actividades[i]["start_at"]) 
        let html = `<a style="background: ${colorCursos[id]};" class="item" href="${actividades[i]["html_url"] }" title="${actividades[i]["context_name"] }"><i  class="${logo}" aria-label="Assignment"></i><div class="todo-details"><p class="todo-details__title" style="font-weight: bold;">${actividades[i]["title"]}</p><p>${d.toLocaleString()}</p></div><a>`
        let mostrar = 2;
        if (i<mostrar){
            $('.actividades').append(html)
        }else{
            if (i==mostrar){
                $('.actividades').append('<div class="dropdown-container"></div>')
            }
            $('.dropdown-container').append(html)
        }
    }
   
    $('.actividades').on('mouseover', function(){
        $('.dropdown-container').attr("style", "display: block");
        $('#mySidenav').attr("style", "width: 300px");
        $('#main').attr("style", "margin-right: 300px;");
        $('.nav').attr("style", "transition: 0.5s; width: 300px");
      }).on('mouseout', function(){
        $('.dropdown-container').attr("style", "display: none");
        $('#mySidenav').attr("style", "width: 100px");
        $('#main').attr("style", "margin-right: 100px;");
        $('.nav').attr("style", "transition: 0.5s; width: 100px");
      })
}

function MostrarMisEventos(){

    var eventos = JSON.parse(localStorage.getItem('Eventos'))
    var colorCursos = JSON.parse(localStorage.getItem('colorCursos'))
    let user_id = localStorage.getItem('user_id')
    if (!colorCursos[user_id]){
        colorCursos[user_id] = "#E67E22"
        localStorage.setItem('colorCursos',JSON.stringify(colorCursos))
    }
    eventos.sort(function (a, b) {
        if (a.start_at > b.start_at) {
        return 1;
        }
        if (a.start_at < b.start_at) {
        return -1;
        }
        return 0;
    });

    for (var i in eventos){
        let id = eventos[i]["context_code"].substring(5)
        let logo;
        let type = eventos[i]["type"]
        if (type == "assignment"){
            logo = "icon-assignment"
        }
        if (type == "event"){
            logo = "icon-calendar-day"
        }
        let d = new Date(eventos[i]["start_at"]) 
        let html = '<a style="background: '+colorCursos[id]+'" class="item" href="'+eventos[i]["html_url"] +'" title="'+eventos[i]["context_name"] +'"><i  class="'+logo+'" aria-label="Assignment"></i><div class="todo-details"><p class="todo-details__title" style="font-weight: bold;">'+ eventos[i]["title"]+'</p><p>'+d.toLocaleString()+'</p></div><a>'
        let mostrar = 1;
        if (i<mostrar){
            $('.eventos').append(html)
        }else{
            if (i==mostrar){
                $('.eventos').append('<div class="dropdown-container-event"></div>')
            }
            $('.dropdown-container-event').append(html)
        }
    }
   
    $('.eventos').on('mouseover', function(){
        $('.dropdown-container-event').attr("style", "display: block");
        $('#mySidenav').attr("style", "width: 300px");
        $('#main').attr("style", "margin-right: 300px;");
        $('.nav').attr("style", "transition: 0.5s; width: 300px");
      }).on('mouseout', function(){
        $('.dropdown-container-event').attr("style", "display: none");
        $('#mySidenav').attr("style", "width: 100px");
        $('#main').attr("style", "margin-right: 100px;");
        $('.nav').attr("style", "transition: 0.5s; width: 100px");
      })
}


