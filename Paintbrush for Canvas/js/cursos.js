var colorCursos = JSON.parse(localStorage.getItem('colorCursos'))

function ListaCursos(){
    let cursos = JSON.parse(localStorage.getItem('CursosActivos'))
    for(let i in cursos){
        let id = cursos[i]['id']
        let name = cursos[i]['name']
        let namesub = cursos[i]['name'].substr(0,2)
        let foro = cursos[i]['foro']
        var parts = location.hostname.split('.');
        var subdomain = parts.shift();

        var noEstudiante

        if (cursos[i]['type'] != "student"){
            noEstudiante = "border: 2px solid #F1C40F; color: #F1C40F"
        }
        else{
            noEstudiante = ""
        }

        $('.cursos').append(`<div id="menu_${id}" style="background: ${colorCursos[id]}; ${noEstudiante}"></div>`)
        if (foro.length>0){
            $(`#menu_${id}`).append(`<a href="https://${subdomain}.instructure.com/courses/${id}" title="${name}">${namesub}</a>`)
            $(`#menu_${id}`).append(`<a href="${foro}" class="ic-DashboardCard__action discussions"><div class="ic-DashboardCard__action-layout"><svg name="IconDiscussion" viewBox="0 0 1920 1920" rotate="0" width="1em" height="1em" aria-hidden="true" role="presentation" focusable="false" class="esvoZ_bGBk esvoZ_drOs esvoZ_eXrk cGqzL_bGBk cGqzL_dIzR cGqzL_owrh" style="width: 1em; height: 1em;"><g role="presentation"><path d="M677.647059,16 L677.647059,354.936471 L790.588235,354.936471 L790.588235,129.054118 L1807.05882,129.054118 L1807.05882,919.529412 L1581.06353,919.529412 L1581.06353,1179.29412 L1321.41176,919.529412 L1242.24,919.529412 L1242.24,467.877647 L677.647059,467.877647 L0,467.877647 L0,1484.34824 L338.710588,1484.34824 L338.710588,1903.24706 L756.705882,1484.34824 L1242.24,1484.34824 L1242.24,1032.47059 L1274.99294,1032.47059 L1694.11765,1451.59529 L1694.11765,1032.47059 L1920,1032.47059 L1920,16 L677.647059,16 Z M338.789647,919.563294 L903.495529,919.563294 L903.495529,806.622118 L338.789647,806.622118 L338.789647,919.563294 Z M338.789647,1145.44565 L677.726118,1145.44565 L677.726118,1032.39153 L338.789647,1032.39153 L338.789647,1145.44565 Z M112.941176,580.705882 L1129.41176,580.705882 L1129.41176,1371.40706 L710.4,1371.40706 L451.651765,1631.05882 L451.651765,1371.40706 L112.941176,1371.40706 L112.941176,580.705882 Z" fill-rule="evenodd" stroke="none" stroke-width="1"></path></g></svg></div></a>`)
            //$('.cursos').append(`<a style="background: ${colorCursos[id]};" href="https://${subdomain}.instructure.com/courses/${id}" title="${name}">${namesub}</a><a style="background: ${colorCursos[id]};" href="${foro}" class="ic-DashboardCard__action discussions"><div class="ic-DashboardCard__action-layout"><svg name="IconDiscussion" viewBox="0 0 1920 1920" rotate="0" width="1em" height="1em" aria-hidden="true" role="presentation" focusable="false" class="esvoZ_bGBk esvoZ_drOs esvoZ_eXrk cGqzL_bGBk cGqzL_dIzR cGqzL_owrh" style="width: 1em; height: 1em;"><g role="presentation"><path d="M677.647059,16 L677.647059,354.936471 L790.588235,354.936471 L790.588235,129.054118 L1807.05882,129.054118 L1807.05882,919.529412 L1581.06353,919.529412 L1581.06353,1179.29412 L1321.41176,919.529412 L1242.24,919.529412 L1242.24,467.877647 L677.647059,467.877647 L0,467.877647 L0,1484.34824 L338.710588,1484.34824 L338.710588,1903.24706 L756.705882,1484.34824 L1242.24,1484.34824 L1242.24,1032.47059 L1274.99294,1032.47059 L1694.11765,1451.59529 L1694.11765,1032.47059 L1920,1032.47059 L1920,16 L677.647059,16 Z M338.789647,919.563294 L903.495529,919.563294 L903.495529,806.622118 L338.789647,806.622118 L338.789647,919.563294 Z M338.789647,1145.44565 L677.726118,1145.44565 L677.726118,1032.39153 L338.789647,1032.39153 L338.789647,1145.44565 Z M112.941176,580.705882 L1129.41176,580.705882 L1129.41176,1371.40706 L710.4,1371.40706 L451.651765,1631.05882 L451.651765,1371.40706 L112.941176,1371.40706 L112.941176,580.705882 Z" fill-rule="evenodd" stroke="none" stroke-width="1"></path></g></svg></div></a>`)
        }
        else{
            $(`#menu_${id}`).append(`<a href="https://${subdomain}.instructure.com/courses/${id}" title="${name}">${namesub}</a>`)
            //$('.cursos').append(`<a style="background: ${colorCursos[id]};" href="https://${subdomain}.instructure.com/courses/${id}" title="${name}">${namesub}</a>`)
 
        }
       
    }
}
    //$('.actividades').append("<h2>Actividades</h2>")
    