function crearModal(){
    let cursos = JSON.parse(localStorage.getItem('CursosActivos'))
    let color = JSON.parse(localStorage.getItem('colorCursos'))
    let user_id = JSON.parse(localStorage.getItem('user_id'))
    let hexa;
    let html;

    for (var i in cursos){
        let id = cursos[i]['id']
        hexa = color[id]
        html = '<div><label>'+cursos[i]['name']+': </label><input id="'+id+'" type="color" value="'+hexa+'"></input></div>'
        $(".selecionColor").append(html)
    }  
    console.log(user_id)
    if (user_id!=null && color[user_id]!=null ){
        hexa = color[user_id]
        html = '<div><label> Usuario: </label><input id="'+user_id+'" type="color" value="'+hexa+'"></input></div>'
        $(".selecionColor").append(html)
    }
    
}

function guardarDatos(){
    $('#guardarConfig').click(function(){
        let color = JSON.parse(localStorage.getItem('colorCursos'))
        for (var id in color){
            let colorInput = document.getElementById(id);
            color[id] = colorInput.value
        }
        console.log(color)
        localStorage.setItem('colorCursos', JSON.stringify(color))

        let n_dias = document.getElementById('nDias').value;
        if (n_dias!=null){
            localStorage.setItem('n_dias',n_dias)
        }

        location.reload();
    });
}