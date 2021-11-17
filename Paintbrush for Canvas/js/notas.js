function nota(puntaje, maximo){
    let e = 0.5
    let resultado;
    if (puntaje < e*maximo){
        resultado = 3*(puntaje/(e*maximo))+1
    }
    else{
        resultado =  3*((puntaje-(e*maximo))/(maximo*(1-e)))+4
    }
    if (resultado > 7 || resultado < 0 || isNaN(resultado)){
        resultado = "-"
    }
    else{
        resultado = resultado.toFixed(2)
    }
    return resultado
}

function BotonNotas(){
    if ($('.notas').length > 0){
        $('.notas').remove()
    }
    else{
        if ($('.grades_summary')){

            $('thead tr').append('<th scope="col" class="notas">Notas</th>')
        
            var filas = document.querySelectorAll('.student_assignment');
            filas.forEach(function(fila){
                var p = fila.querySelector('.grade')
                if (p != null && fila.querySelector('.screenreader-only')){
                    p = fila.querySelector('.screenreader-only').nextSibling.nodeValue
                    p = parseFloat(p)
        
                    let pmax = fila.querySelector('.points_possible').innerText
                    pmax = parseFloat(pmax)
                    let td = document.createElement("td")
                    let td1 = document.createElement("td")
                    td.className = "notas"
                    td1.className = "notas"
                    let span = document.createElement("span")
                    let mostrarNota = document.createTextNode(nota(p,pmax))
                    span.appendChild(mostrarNota)
                    td.appendChild(span)
                    fila.append(td1)
                    fila.append(td)
                }
                else{
                    if (fila.querySelector('.points_possible')){
                        let text =fila.querySelector('.points_possible').innerText
                        let val = text.split('/')
                        let td = document.createElement("td")
                        let td1 = document.createElement("td")
                        td.className = "notas"
                        td1.className = "notas"
                        let span = document.createElement("span")
                        let mostrarNota = document.createTextNode(nota(parseFloat(val[0]),parseFloat(val[1])))
                        span.appendChild(mostrarNota)
                        td.appendChild(span)
                        fila.append(td1)
                        fila.append(td)
                    }
                }
            })
        }
    }
}
