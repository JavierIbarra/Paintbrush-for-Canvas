
function BtnNav(){
    const nav = document.getElementById('select_item');

    nav.addEventListener('click', (e)=>{
        
        if(e.target){
            let i;
            if (e.target.tagName != "I"){
                i = e.target.querySelector('i')
            }else{
                i = e.target
            }
            switch (i.classList[1]){
                case "fa-moon":
                    i.classList.remove("fa-moon")
                    i.classList.add("fa-sun")
                    body.classList.toggle('darkmode')
                    break
                case "fa-sun":
                    i.classList.remove("fa-sun")
                    i.classList.add("fa-moon")
                    body.classList.toggle('darkmode')
                    break
                case "fa-clipboard-list":
                    BotonNotas()
                    break
            }
            var menu = document.querySelector('.nav__list');
            var burger = document.querySelector('.burger');
            burger.classList.toggle('burger--active');
            menu.classList.toggle('nav__list--active');
            localStorage.setItem('darkmode', body.classList.contains('darkmode'));
        } 
    });
}

function NavPaintbrush(){
    var menu = document.querySelector('.nav__list');
    var burger = document.querySelector('.burger');
    burger.addEventListener('click', e=>{
        burger.classList.toggle('burger--active');
        menu.classList.toggle('nav__list--active');
    });
}
