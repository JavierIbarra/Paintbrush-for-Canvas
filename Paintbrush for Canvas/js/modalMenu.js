//"btnModal", "tvesModal"
function ModalMenu(str_btn, str_modal){
    var btn = document.getElementById(str_btn);
    if(btn){
        var modal = document.getElementById(str_modal);
        var body = $("body");

        btn.onclick = function() {
            modal.style.display = "block";
            body.attr('style', 'position: static; height: 100%; overflow: hidden ')
        }
    
        $(".close").click( function() {
            modal.style.display = "none";
            body.attr('style', 'position: inherit; height: auto; overflow: visible ')
        });
    }
}

function ActualizarMenu(){
    const mostar = document.getElementById('mostrar');
    let activos = localStorage.getItem('ListaMenuActivos')
    if (!activos){
        activos = ['profile', 'dashboard', 'courses', 'groups', 'calendar', 'conversations', 'history', 'commons', 'help']
    }
    else{
        activos = JSON.parse(activos);
    }
    
    Limpiar(activos);

    mostar.addEventListener('click', (e)=>{
        if(e.target && e.target.tagName=='BUTTON'){
            e.target.classList.toggle('oculto');
        } 
        if(e.target.classList.length > 1){
            removerMenu(e.target.classList[0]);
            removeItemFromArr(activos, e.target.classList[0])
            //eliminar.push(e.target.classList[0])

        }else{ 
            crearMenu(e.target.classList[0])
            activos.push(e.target.classList[0])
            //removeItemFromArr(eliminar, e.target.classList[0])
        }
        console.log(activos)
        localStorage.setItem('ListaMenuActivos',JSON.stringify(activos))
    }); 


}

function Limpiar(activos){
    let eliminar =  ['profile', 'dashboard', 'courses', 'groups', 'calendar', 'conversations', 'history', 'commons', 'help']

    $('.ic-app-header__menu-list-item').remove()
    for (var i in eliminar){
        removerMenu(eliminar[i])
    }
    for (var i in activos){
        let obj = document.getElementsByClassName(activos[i])
        for(var e=0; e<obj.length; e++ ){
            obj[e].classList.toggle('oculto')
        }
    }

    for (var i in activos){
        crearMenu(activos[i])
    }

    
}

function EditMenu(){
    const mostar = document.getElementById('mostrar');
    let eliminar = JSON.parse(localStorage.getItem('ListaMenuOculta'))

    let init_ocult = ['todoscursos', 'calificaciones','archivos']
    for( var u in init_ocult){
        if (!eliminar.includes(init_ocult[u])){
            crearMenu(init_ocult[u])
        }
    }

    for (var i in eliminar){
        let obj = document.getElementsByClassName(eliminar[i])
        for(var e=0; e<obj.length; e++ ){
            obj[e].classList.toggle('oculto')
        }
        removerMenu(eliminar[i])
    }
    

    mostar.addEventListener('click', (e)=>{
        if(e.target && e.target.tagName=='BUTTON'){
            e.target.classList.toggle('oculto');
        } 
        if(e.target.classList.length > 1){
            removerMenu(e.target.classList[0]);
            eliminar.push(e.target.classList[0])

        }else{ 
            crearMenu(e.target.classList[0])
            removeItemFromArr(eliminar, e.target.classList[0])
        }
        console.log(eliminar)
        localStorage.setItem('ListaMenuOculta',JSON.stringify(eliminar))
    });    
}

function removeItemFromArr ( arr, item ) {
    var i = arr.indexOf( item );
 
    if ( i !== -1 ) {
        arr.splice( i, 1 );
    }
}


function removerMenu(nombreClase){ 
    switch (nombreClase){
        case 'profile':
            $('#global_nav_profile_link').remove();
            break;
        case 'dashboard':
            $('#global_nav_dashboard_link').remove();
            break;
        case 'courses':
            $('#global_nav_courses_link').remove()
            break;
        case 'todoscursos':
            $('#global_nav_todoscursos_link').remove()
            break;
        case 'calificaciones':
            $('#global_nav_calificaciones_link').remove()
            break;
        case 'archivos':
            $('#global_nav_archivos_link').remove()
            break;
        case 'groups':
            $('#global_nav_groups_link').remove()
            break;
        case 'calendar':
            $('#global_nav_calendar_link').remove()
            break;
        case 'conversations':
            $('#global_nav_conversations_link').remove()
            break;
        case 'history':
            $('#global_nav_history_link').remove()
            break;
        case 'commons':
            $('#context_external_tool_25_menu_item').remove()
            break;
        case 'help':
            $('#global_nav_help_link').remove()
            break;
    }
};

function crearMenu(nombreClase){
    
    switch (nombreClase){
        case 'profile':
            $('#menu').append('<li class="menu-item ic-app-header__menu-list-item "><button id="global_nav_profile_link" class="ic-app-header__menu-list-link"><div class="menu-item-icon-container"><div aria-hidden="true" class="fs-exclude ic-avatar "><img src="https://uandes.instructure.com/images/messages/avatar-50.png" alt="JAVIER ANDRES IBARRA CIUFFARDI"></div><span class="menu-item__badge"></span></div><div class="menu-item__text">Cuenta</div></button></li>')
            break;
        case 'dashboard':
            $('#menu').append('<li class="ic-app-header__menu-list-item "><a id="global_nav_dashboard_link" href="https://uandes.instructure.com/" class="ic-app-header__menu-list-link"><div class="menu-item-icon-container" aria-hidden="true"><svg xmlns="http://www.w3.org/2000/svg" class="ic-icon-svg ic-icon-svg--dashboard" version="1.1" x="0" y="0" viewBox="0 0 280 200" enable-background="new 0 0 280 200" xml:space="preserve"><path d="M273.09,180.75H197.47V164.47h62.62A122.16,122.16,0,1,0,17.85,142a124,124,0,0,0,2,22.51H90.18v16.29H6.89l-1.5-6.22A138.51,138.51,0,0,1,1.57,142C1.57,65.64,63.67,3.53,140,3.53S278.43,65.64,278.43,142a137.67,137.67,0,0,1-3.84,32.57ZM66.49,87.63,50.24,71.38,61.75,59.86,78,76.12Zm147,0L202,76.12l16.25-16.25,11.51,11.51ZM131.85,53.82v-23h16.29v23Zm15.63,142.3a31.71,31.71,0,0,1-28-16.81c-6.4-12.08-15.73-72.29-17.54-84.25a8.15,8.15,0,0,1,13.58-7.2c8.88,8.21,53.48,49.72,59.88,61.81a31.61,31.61,0,0,1-27.9,46.45ZM121.81,116.2c4.17,24.56,9.23,50.21,12,55.49A15.35,15.35,0,1,0,161,157.3C158.18,152,139.79,133.44,121.81,116.2Z"></path></svg></div><div class="menu-item__text">Tablero</div></a></li>')
            break;
        case 'courses':
            $('#menu').append('<li class="menu-item ic-app-header__menu-list-item ic-app-header__menu-list-item--active"><button id="global_nav_courses_link" class="ic-app-header__menu-list-link"><div class="menu-item-icon-container" aria-hidden="true"><svg xmlns="http://www.w3.org/2000/svg" class="ic-icon-svg ic-icon-svg--courses" version="1.1" x="0" y="0" viewBox="0 0 280 259" enable-background="new 0 0 280 259" xml:space="preserve"><path d="M73.31,198c-11.93,0-22.22,8-24,18.73a26.67,26.67,0,0,0-.3,3.63v.3a22,22,0,0,0,5.44,14.65,22.47,22.47,0,0,0,17.22,8H200V228.19h-134V213.08H200V198Zm21-105.74h90.64V62H94.3ZM79.19,107.34V46.92H200v60.42Zm7.55,30.21V122.45H192.49v15.11ZM71.65,16.71A22.72,22.72,0,0,0,49,39.36V190.88a41.12,41.12,0,0,1,24.32-8h157V16.71ZM33.88,39.36A37.78,37.78,0,0,1,71.65,1.6H245.36V198H215.15v45.32h22.66V258.4H71.65a37.85,37.85,0,0,1-37.76-37.76Z"></path></svg></div><div class="menu-item__text">Cursos</div></button></li>')
            break;
        case 'todoscursos':
            $('#menu').append('<li class="menu-item ic-app-header__menu-list-item "><a href="/courses"><button id="global_nav_todoscursos_link" class="ic-app-header__menu-list-link"><div class="menu-item-icon-container" aria-hidden="true"><svg xmlns="http://www.w3.org/2000/svg" class="ic-icon-svg" viewBox="0 0 480 480" ><path d="m240 0h-104c-4.417969 0-8 3.582031-8 8v56h-120c-4.417969 0-8 3.582031-8 8v400c0 4.417969 3.582031 8 8 8h232c4.417969 0 8-3.582031 8-8v-464c0-4.417969-3.582031-8-8-8zm-8 416h-88v-16h88zm-216-296h112v240h-112zm216-32h-88v-24h88zm-216 288h112v24h-112zm128 8v-280h88v280zm88-368v32h-88v-32zm-104 64v24h-112v-24zm-112 336h112v48h-112zm128 48v-32h88v32zm0 0"/><path d="m479.742188 437.984375-96-368c-.535157-2.0625-1.871094-3.824219-3.714844-4.898437-1.839844-1.070313-4.03125-1.363282-6.089844-.8125l-120 32c-4.25 1.132812-6.789062 5.484374-5.679688 9.742187l96 368c.535157 2.0625 1.875 3.824219 3.71875 4.894531 1.839844 1.066406 4.03125 1.355469 6.085938.800782l120-32c4.242188-1.132813 6.777344-5.476563 5.679688-9.726563zm-201.246094-279.441406 104.542968-27.871094 3.761719 14.398437-104.535156 27.914063zm112.34375 2.050781 46.398437 177.980469-104.503906 27.882812-46.398437-177.992187zm50.472656 193.46875 8.191406 31.394531-104.542968 27.871094-8.160157-31.382813zm-71.023438-272.261719 8.710938 33.398438-104.542969 27.863281-8.703125-33.382812zm-12.578124 380.398438-8.710938-33.398438 104.542969-27.878906 8.703125 33.382813zm0 0"/><path d="m104 144h-64c-4.417969 0-8 3.582031-8 8v64c0 4.417969 3.582031 8 8 8h64c4.417969 0 8-3.582031 8-8v-64c0-4.417969-3.582031-8-8-8zm-8 64h-48v-48h48zm0 0"/></svg></div><div class="menu-item__text">Todos los cursos</div></button></a></li>')
            break;
        case 'calificaciones':
            $('#menu').append('<li class="menu-item ic-app-header__menu-list-item "><a href="/grades"><button id="global_nav_calificaciones_link" class="ic-app-header__menu-list-link"><div class="menu-item-icon-container" aria-hidden="true"><svg xmlns="http://www.w3.org/2000/svg" class="ic-icon-svg"  viewBox="0 0 512 512"><g id="_11-grade" data-name="11-grade"><path d="m464 28h-352a44.049 44.049 0 0 0 -44 44v348h-52a12 12 0 0 0 -12 12v32a44.049 44.049 0 0 0 44 44h352a44.049 44.049 0 0 0 44-44v-332h52a12 12 0 0 0 12-12v-48a44.049 44.049 0 0 0 -44-44zm-416 456a20.023 20.023 0 0 1 -20-20v-20h328v20a43.739 43.739 0 0 0 4.813 20zm372-20a20 20 0 0 1 -40 0v-32a12 12 0 0 0 -12-12h-276v-348a20.023 20.023 0 0 1 20-20h312.813a43.739 43.739 0 0 0 -4.813 20zm64-356h-40v-36a20 20 0 0 1 40 0z"/><path d="m256 164a116 116 0 1 0 116 116 116.132 116.132 0 0 0 -116-116zm0 208a92 92 0 1 1 92-92 92.1 92.1 0 0 1 -92 92z"/><path d="m255.174 220.424a44.05 44.05 0 0 0 -44 44v64a12 12 0 0 0 24 0v-20h40v20a12 12 0 0 0 24 0v-64a44.05 44.05 0 0 0 -44-44zm20 64h-40v-20a20 20 0 0 1 40 0z"/><path d="m385 108h-20v-20a12 12 0 0 0 -24 0v20h-20a12 12 0 0 0 0 24h20v20a12 12 0 0 0 24 0v-20h20a12 12 0 0 0 0-24z"/><path d="m128 100h160a12 12 0 0 0 0-24h-160a12 12 0 0 0 0 24z"/><path d="m212 136a12 12 0 0 0 -12-12h-72a12 12 0 0 0 0 24h72a12 12 0 0 0 12-12z"/></g></svg></div><div class="menu-item__text">Calificaciones</div></button></a></li>')
            break;
        case 'archivos':
            $('#menu').append('<li class="menu-item ic-app-header__menu-list-item "><a href="/files"><button id="global_nav_archivos_link" class="ic-app-header__menu-list-link"><div class="menu-item-icon-container" aria-hidden="true"><svg xmlns="http://www.w3.org/2000/svg" class="ic-icon-svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve"><path d="M312.461,332.734H199.539c-8.511,0-15.434,6.923-15.434,15.434v34.634c0,8.511,6.923,15.435,15.434,15.435h112.923    c8.511,0,15.435-6.923,15.435-15.435v-34.634C327.895,339.658,320.972,332.734,312.461,332.734z M308.051,378.393H203.948v-25.814    h104.103V378.393z"/><path d="M506.976,246.958l0.159-0.08L432.73,99.774c-6.015-11.89-18.025-19.275-31.346-19.275h-14.141V66.824    c0-5.48-4.442-9.922-9.922-9.922H134.68c-5.48,0-9.922,4.442-9.922,9.922v13.675h-14.141c-13.321,0-25.331,7.385-31.346,19.275    L4.865,246.878l0.159,0.08C1.837,252.207,0,258.363,0,264.939v155.409c0,19.162,15.59,34.751,34.752,34.751h442.497    c19.162,0,34.751-15.59,34.751-34.751V264.939C512,258.363,510.163,252.207,506.976,246.958z M387.242,102.548h14.141    c4.959,0,9.43,2.751,11.671,7.179l60.93,120.462h-41.431v-37.066c0-5.48-4.442-9.922-9.922-9.922h-12.275v-53.227    c0-5.48-4.442-9.922-9.922-9.922h-13.192V102.548z M412.71,203.044v27.144h-52.359c-8.984,0-17.174,5.293-20.865,13.482    l-14.296,31.71c-0.136,0.299-0.435,0.493-0.764,0.493H187.575c-0.329,0-0.628-0.194-0.764-0.494l-14.295-31.708    c-3.692-8.19-11.882-13.483-20.866-13.483H99.291v-27.144H412.71z M144.602,76.746h222.796v43.305H144.602V76.746z     M390.512,139.895v43.305H121.488v-43.305H390.512z M98.946,109.727c2.24-4.429,6.712-7.179,11.671-7.179h14.141v17.503h-13.192    c-5.48,0-9.922,4.442-9.922,9.922v53.227H89.369c-5.48,0-9.922,4.442-9.922,9.922v37.066H38.016L98.946,109.727z M477.249,433.049    H34.752c-7.004,0-12.703-5.699-12.703-12.701V264.939c0-7.003,5.698-12.701,12.703-12.701H151.65c0.328,0,0.629,0.194,0.765,0.495    l14.295,31.708c3.692,8.19,11.881,13.481,20.865,13.481h136.85c8.984,0,17.174-5.292,20.865-13.48l14.296-31.709v-0.001    c0.136-0.3,0.435-0.494,0.764-0.494h116.898c7.004,0,12.701,5.699,12.701,12.701v155.409h0.001    C489.951,427.352,484.253,433.049,477.249,433.049z"/></svg></div><div class="menu-item__text">Archivos</div></button></a></li>')
            break;
        case 'groups':
            $('#menu').append('<li class="menu-item ic-app-header__menu-list-item "><button id="global_nav_groups_link" class="ic-app-header__menu-list-link"><div class="menu-item-icon-container" aria-hidden="true"><svg xmlns="http://www.w3.org/2000/svg" class="ic-icon-svg ic-icon-svg--groups" viewBox="0 0 200 135"><path d="M134.5 129.4c0-1.1 0-19.8-6.2-31.1-4.5-8.5-16.4-12.4-35-19.2-1.7-.6-3.4-1.1-5.1-1.7v-8.5c5.6-5.1 8.5-12.4 8.5-20.3V29.4C96.6 13 83.6 0 67.2 0S37.9 13 37.9 29.4v19.2c0 7.3 3.4 14.7 8.5 20.3v8.5c-1.7.6-3.4 1.1-5.1 1.7-18.6 6.2-30.5 10.7-35 19.2C0 109.6 0 128.8 0 129.4c0 3.4 2.3 5.6 5.6 5.6h123.7c3.5 0 5.7-2.3 5.2-5.6zm-123.2-5.7c.6-5.6 1.7-14.7 3.4-19.8C17 98.8 30 94.3 43.5 89.8c2.8-1.1 5.6-2.3 9-3.4 2.3-.6 4-2.8 4-5.1V66.7c0-1.7-.6-3.4-1.7-4.5-4-3.4-6.2-8.5-6.2-13.6V29.4c0-10.2 7.9-18.1 18.1-18.1s18.1 7.9 18.1 18.1v19.2c0 5.1-2.3 10.2-6.2 13.6-1.1 1.1-1.7 2.8-1.7 4.5v14.7c0 2.3 1.7 4.5 4 5.1 2.8 1.1 6.2 2.3 9 3.4 13.6 5.1 26.6 9.6 28.8 14.1 2.8 5.1 4 13.6 4.5 19.8H11.3zM196 79.1c-2.8-6.2-11.3-9.6-22.6-13.6l-1.7-.6v-3.4c4.5-4 6.8-9.6 6.8-15.8V35c0-12.4-9.6-22-22-22s-22 10.2-22 22v10.7c0 6.2 2.3 11.9 6.8 15.8V65l-1.7.6c-7.3 2.8-13 4.5-16.9 7.3-1.7 1.1-2.3 2.8-2.3 5.1.6 1.7 1.7 3.4 3.4 4.5 7.9 4 12.4 7.3 14.1 10.7 2.3 4.5 4 10.2 5.1 18.1.6 2.3 2.8 4.5 5.6 4.5h45.8c3.4 0 5.6-2.8 5.6-5.1 0-3.9 0-24.3-4-31.6zm-42.9 25.4c-1.1-6.8-2.8-12.4-5.1-16.9-1.7-4-5.1-6.8-9.6-10.2 1.7-1.1 3.4-1.7 5.1-2.3l5.6-2.3c1.7-.6 3.4-2.8 3.4-5.1v-9.6c0-1.7-.6-3.4-2.3-4.5-2.8-1.7-4.5-5.1-4.5-8.5V34.5c0-6.2 4.5-10.7 10.7-10.7s10.7 5.1 10.7 10.7v10.7c0 3.4-1.7 6.2-4.5 8.5-1.1 1.1-2.3 2.8-2.3 4.5v10.2c0 2.3 1.1 4.5 3.4 5.1l5.6 2.3c6.8 2.3 15.3 5.6 16.4 7.9 1.7 2.8 2.8 12.4 2.8 20.9h-35.4z"></path></svg></div><div class="menu-item__text">Grupos</div></button></li>')
            break;
        case 'calendar':
            $('#menu').append('<li class="menu-item ic-app-header__menu-list-item "><a id="global_nav_calendar_link" href="/calendar" class="ic-app-header__menu-list-link"><div class="menu-item-icon-container" aria-hidden="true"><svg xmlns="http://www.w3.org/2000/svg" class="ic-icon-svg ic-icon-svg--calendar" version="1.1" x="0" y="0" viewBox="0 0 280 280" enable-background="new 0 0 280 280" xml:space="preserve"><path d="M197.07,213.38h16.31V197.07H197.07Zm-16.31,16.31V180.76h48.92v48.92Zm-48.92-16.31h16.31V197.07H131.85Zm-16.31,16.31V180.76h48.92v48.92ZM66.62,213.38H82.93V197.07H66.62ZM50.32,229.68V180.76H99.24v48.92Zm146.75-81.53h16.31V131.85H197.07Zm-16.31,16.31V115.54h48.92v48.92Zm-48.92-16.31h16.31V131.85H131.85Zm-16.31,16.31V115.54h48.92v48.92ZM66.62,148.15H82.93V131.85H66.62ZM50.32,164.46V115.54H99.24v48.92ZM34,262.29H246V82.93H34ZM246,66.62V42.16A8.17,8.17,0,0,0,237.84,34H213.38v8.15a8.15,8.15,0,1,1-16.31,0V34H82.93v8.15a8.15,8.15,0,0,1-16.31,0V34H42.16A8.17,8.17,0,0,0,34,42.16V66.62Zm-8.15-48.92a24.49,24.49,0,0,1,24.46,24.46V278.6H17.71V42.16A24.49,24.49,0,0,1,42.16,17.71H66.62V9.55a8.15,8.15,0,0,1,16.31,0v8.15H197.07V9.55a8.15,8.15,0,1,1,16.31,0v8.15Z"></path></svg></div><div class="menu-item__text">Calendario</div></a></li>')
            break;
        case 'conversations':
            $('#menu').append('<li class="menu-item ic-app-header__menu-list-item "><a id="global_nav_conversations_link" href="/conversations" class="ic-app-header__menu-list-link"><div class="menu-item-icon-container"><span aria-hidden="true"><svg xmlns="http://www.w3.org/2000/svg" class="ic-icon-svg ic-icon-svg--inbox" version="1.1" x="0" y="0" viewBox="0 0 280 280" enable-background="new 0 0 280 280" xml:space="preserve"><path d="M91.72,120.75h96.56V104.65H91.72Zm0,48.28h80.47V152.94H91.72Zm0-96.56h80.47V56.37H91.72Zm160.94,34.88H228.52V10.78h-177v96.56H27.34A24.17,24.17,0,0,0,3.2,131.48V244.14a24.17,24.17,0,0,0,24.14,24.14H252.66a24.17,24.17,0,0,0,24.14-24.14V131.48A24.17,24.17,0,0,0,252.66,107.34Zm0,16.09a8.06,8.06,0,0,1,8,8v51.77l-32.19,19.31V123.44ZM67.58,203.91v-177H212.42v177ZM27.34,123.44H51.48v79.13L19.29,183.26V131.48A8.06,8.06,0,0,1,27.34,123.44ZM252.66,252.19H27.34a8.06,8.06,0,0,1-8-8V202l30,18H230.75l30-18v42.12A8.06,8.06,0,0,1,252.66,252.19Z"></path></svg></span><span class="menu-item__badge"></span></div><div class="menu-item__text">Bandeja de entrada</div></a></li>')
            break;
        case 'history':
            $('#menu').append('<li class="menu-item ic-app-header__menu-list-item"><button id="global_nav_history_link" class="ic-app-header__menu-list-link"><div class="menu-item-icon-container" aria-hidden="true"><svg viewBox="0 0 1920 1920" class="ic-icon-svg menu-item__icon svg-icon-history" version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M960 112.941c-467.125 0-847.059 379.934-847.059 847.059 0 467.125 379.934 847.059 847.059 847.059 467.125 0 847.059-379.934 847.059-847.059 0-467.125-379.934-847.059-847.059-847.059M960 1920C430.645 1920 0 1489.355 0 960S430.645 0 960 0s960 430.645 960 960-430.645 960-960 960m417.905-575.955L903.552 988.28V395.34h112.941v536.47l429.177 321.77-67.765 90.465z" stroke="none" stroke-width="1" fill-rule="evenodd"></path></svg></div><div class="menu-item__text">Historial</div></button></li>')    
            break;
        case 'commons':
            $('#menu').append('<li id="context_external_tool_25_menu_item" class="globalNavExternalTool menu-item ic-app-header__menu-list-item"><a class="ic-app-header__menu-list-link" href="/accounts/1/external_tools/25?launch_type=global_navigation"><svg version="1.1" class="ic-icon-svg ic-icon-svg--lti menu-item__icon" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 64 64"><path d="M9.4 32c0-7.8 6.5-14.3 14.4-14.3h11.7v-9.4h-11.8c-13.1 0-23.7 10.6-23.7 23.7s10.7 23.7 23.7 23.7h11.7v-9.4h-11.7c-7.9 0-14.3-6.5-14.3-14.3z m54.6 0l-19.1-17v11.3h-20.2c-3.1 0-5.6 2.5-5.6 5.6s2.5 5.6 5.6 5.7h20.2v11.2l19.1-16.8z"></path></svg><div class="menu-item__text">Commons</div></a></li>')
            break;
        case 'help':
            $('#menu').append('<li class="ic-app-header__menu-list-item"><a id="global_nav_help_link" role="button" class="ic-app-header__menu-list-link" data-track-category="help system" data-track-label="help button" href="http://help.instructure.com/"><div class="menu-item-icon-container" role="presentation"><svg xmlns="http://www.w3.org/2000/svg" class="ic-icon-svg menu-item__icon svg-icon-help" version="1.1" x="0" y="0" viewBox="0 0 200 200" enable-background="new 0 0 200 200" xml:space="preserve" fill="currentColor"><path d="M100,127.88A11.15,11.15,0,1,0,111.16,139,11.16,11.16,0,0,0,100,127.88Zm8.82-88.08a33.19,33.19,0,0,1,23.5,23.5,33.54,33.54,0,0,1-24,41.23,3.4,3.4,0,0,0-2.74,3.15v9.06H94.42v-9.06a14.57,14.57,0,0,1,11.13-14,22.43,22.43,0,0,0,13.66-10.27,22.73,22.73,0,0,0,2.31-17.37A21.92,21.92,0,0,0,106,50.59a22.67,22.67,0,0,0-19.68,3.88,22.18,22.18,0,0,0-8.65,17.64H66.54a33.25,33.25,0,0,1,13-26.47A33.72,33.72,0,0,1,108.82,39.8ZM100,5.2A94.8,94.8,0,1,0,194.8,100,94.91,94.91,0,0,0,100,5.2m0,178.45A83.65,83.65,0,1,1,183.65,100,83.73,83.73,0,0,1,100,183.65" transform="translate(-5.2 -5.2)"></path></svg><span class="menu-item__badge"></span></div><div class="menu-item__text">Ayuda</div></a></li>')
            break;
    }
};

/*
function DragAndDrop(){
    const lista = document.getElementById('menu');

    Sortable.create(lista,{
        animation: 150,
        chosenClass: "seleccionado",

        group: "orden-menu",
        store:{
            set: (sortable) =>{
                const orden = sortable.toArray();
                localStorage.setItem(sortable.options.group.name, orden.join('|'));
            },

            get: (sortable) =>{
                const orden = localStorage.getItem(sortable.options.group.name);
                return orden;
            }
        }
    });


}
*/