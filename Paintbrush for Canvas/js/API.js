const parts = location.hostname.split('.');
const subdomain = parts.shift();

const CargarCursos = async()=>{
    try{
        const respuesta = await fetch(`https://${subdomain}.instructure.com/api/v1/courses?enrollment_state=active`);

        if (respuesta.status === 200){
            const datos = await respuesta.json();

            let cursos = new Array();   
            let id_cursos = new Array();
            let context_codes = new Array();
            for (var i in datos){
                let str = "course_"+datos[i]["id"];
                id_cursos.push(datos[i]["id"]);
                context_codes.push(str);
                let foroActivo = ForosCursos(datos[i]["id"]);
                // type =  teacher, student, ta, observer, designer
                let enrollmentType = datos[i]["enrollments"][0]["type"] 
                console.log(enrollmentType)
                cursos.push({name: datos[i]["name"], id: datos[i]["id"], type: enrollmentType, foro: foroActivo})
            }
            if (!localStorage.getItem('colorCursos')){
                var colorCursos = {};
                var colores = ["#C0392B", "#9B59B6", "#2980B9", "#16A085", "#F39C12", "#F1C40F", "#E74C3C", "#8E44AD", "#3498DB", "#1ABC9C", "#27AE60", "#E67E22"];
                for (var e in id_cursos){
                    colorCursos[id_cursos[e]] = colores[e];
                }
                
                localStorage.setItem('colorCursos', JSON.stringify(colorCursos));
            }
            localStorage.setItem('user_id', datos[0]['enrollments'][0]['user_id']);
            localStorage.setItem('ContextCodes', JSON.stringify(context_codes));
            localStorage.setItem('CursosActivos',JSON.stringify(cursos));
        }
        else if(respuesta.status === 401){
            console.log( "Request Failed: 401");
        }
        else if (respuesta.status === 404){
            console.log( "Request Failed: 404");
        }
        else{
            console.log( "Request Failed: ??");
        }
    }
    catch(error){
        console.log(error);
    }
}


const CargarEventos = async()=>{
    try{
        let fecha = Fechas();
        let id = localStorage.getItem("user_id")
        let user_id = ["user_"+id]
        const respuesta = await fetch(`https://${subdomain}.instructure.com/api/v1/calendar_events?start_date=${fecha[0]}&end_date=${fecha[1]}&context_codes[]=${user_id}`);

        if (respuesta.status === 200){
            const datos = await respuesta.json();

            let eventos = [];
            for (var i in datos){
                eventos.push({title: datos[i]["title"], start_at: datos[i]["start_at"], all_context_codes: datos[i]["context_codes"], context_name: datos[i]["context_name"], html_url: datos[i]["html_url"], type: datos[i]["type"], context_code: datos[i]["context_code"]})
            }

            localStorage.setItem('Eventos',JSON.stringify(eventos))
            MostrarMisEventos()
        }
        else if(respuesta.status === 401){
            console.log( "Request Failed: 401");
        }
        else if (respuesta.status === 404){
            console.log( "Request Failed: 404");
        }
        else{
            console.log( "Request Failed: ??");
        }
    }
    catch(error){
        console.log(error);
    }
}

const CargarActividades = async()=>{
    try{
        let fecha = Fechas();
        let context_codes = ContextCodes()

        const respuesta = await fetch(`https://${subdomain}.instructure.com/api/v1/calendar_events?type=assignment&start_date=${fecha[0]}&end_date=${fecha[1]}${context_codes}`);

        if (respuesta.status === 200){
            const datos = await respuesta.json();

            let calendario = []
            for (var i in datos){
                if (!datos[i]["lock_info"]){
                    calendario.push({title: datos[i]["title"], start_at: datos[i]["start_at"], all_context_codes: datos[i]["context_codes"], context_name: datos[i]["context_name"], html_url: datos[i]["html_url"], type: datos[i]["type"], context_code: datos[i]["context_code"]})
                }
            }
            localStorage.setItem('Actividades',JSON.stringify(calendario))

            MostrarActividades()
        }
        else if(respuesta.status === 401){
            console.log( "Request Failed: 401");
        }
        else if (respuesta.status === 404){
            console.log( "Request Failed: 404");
        }
        else{
            console.log( "Request Failed: ??");
        }
    }
    catch(error){
        console.log(error);
    }
}


const ForosCursos = async(curso)=>{
    try{
        const respuesta = await fetch(`https://${subdomain}.instructure.com/api/v1/courses/${curso}/discussion_topics?order_by=recent_activity`);

        if (respuesta.status === 200){
            const datos = await respuesta.json();

            let cursos = JSON.parse(localStorage.getItem('CursosActivos'))
            let cursoActual; 
            for(let i in cursos){
                if (cursos[i]['id']  == curso){
                    cursoActual = i;
                }
            }

            if (datos.length > 0){
                
                cursos[cursoActual]['foro'] = datos[0]['html_url'];
                
            }
            else{
                cursos[cursoActual]['foro'] = 0;

            }
            localStorage.setItem('CursosActivos',JSON.stringify(cursos));
            
        }
        else if(respuesta.status === 401){
            console.log( "Request Failed: 401");
        }
        else if (respuesta.status === 404){
            console.log( "Request Failed: 404");
        }
        else{
            console.log( "Request Failed: ??");
        }
    }
    catch(error){
        console.log(error);
    }
}

const NewEvent = async (context, text, at, end, locationName)=>{
    console.log(context, text, at, end, locationName)
    var token = readCookie( "_csrf_token" );

    const settings = {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({calendar_event: {context_code: context, title: text, start_at: at, end_at: end, location_name: locationName}}) 
    };

    try{
        const respuesta = await fetch(`https://${subdomain}.instructure.com/api/v1/calendar_events`, settings);

        if (respuesta.status === 200){
            const datos = await respuesta.json();
            console.log(datos);
        }
        else if(respuesta.status === 401){
            console.log( "Request Failed: 401");
        }
        else if (respuesta.status === 404){
            console.log( "Request Failed: 404");
        }
        else{
            console.log( "Request Failed: ??");
        }
    }
    catch(error){
        console.log(error);
    }
}



// --------------------------- Llamadas API -----------------------


function API(){
    let primera = localStorage.getItem('_1')
    CargarCursos();
    CargarEventos();
    CargarActividades();
    if (!primera){
        location.reload()
    }
}



// ------------------------------- Complementos ---------------------------

function Fechas(){
    let d = new Date()
    let mes = d.getMonth()+1;
    let dia = d.getDate();
    if (mes < 10){
        mes = "0"+mes
    }
    if (dia < 10){
        dia = "0"+dia
    }
    let hoy =  d.getFullYear()+"-"+mes+"-"+dia

    let n_dias = parseInt(localStorage.getItem('n_dias'))
    if (!n_dias){
        n_dias = 7
    }

    d.setDate(d.getDate()+n_dias)
    mes = d.getMonth()+1;
    dia = d.getDate();
    if (mes < 10){
        mes = "0"+mes
    }
    if (dia < 10){
        dia = "0"+dia
    }
    let final =  d.getFullYear()+"-"+mes+"-"+dia

    return [hoy,final]
}


function ContextCodes(){
    let context_codes = JSON.parse(localStorage.getItem("ContextCodes"));
    let text=''
    context_codes.forEach(function (element){
        text += `&context_codes[]=${element}`
    })
    return text
}

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
//CargarCursos();
//CargarActividades();
//CargarEventos();
