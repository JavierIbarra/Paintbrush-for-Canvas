function DownloadFile(){
    let url = window.location.href.split('/')

    if (url[url.length-2] == "courses"){
        let curso = url[url.length-1]

        let li = $('.attachment')
        for (let i in li){
            if (i < li.length){
                let attachment = li[i]['classList'][5].split('_')

                //let html = `<div><a href="/courses/${curso}/files/${attachment[1]}/download?download_frd=1"><i class="fas fa-download" aria-hidden="true"></i></a></div>`
                
                var div = document.createElement('div');
                var a =  document.createElement('a');
                a.setAttribute("href", `/courses/${curso}/files/${attachment[1]}/download?download_frd=1`);
                var i_element =  document.createElement('i');
                i_element.className = "fas fa-download";

                a.appendChild(i_element);
                div.appendChild(a);
                
                li[i]['children'][0].append(div);

            }
            else{
                break;
            }
        }
    }
    
}

DownloadFile();