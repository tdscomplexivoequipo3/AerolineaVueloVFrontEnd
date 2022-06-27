//Ejecutar función en el evento click
document.getElementById("btn_open").addEventListener("click", open_close_menu);

//Declaramos variables
var side_menu = document.getElementById("menu_side");
var btn_open = document.getElementById("btn_open");
var body = document.getElementById("body");
var imagen=document.getElementById("imagen")
var nav=document.getElementById("lis-pos")

//Evento para mostrar y ocultar menú
function open_close_menu(){
  body.classList.toggle("body_move");
  side_menu.classList.toggle("menu__side_move");
  imagen.classList.toggle("imagen__move");
  nav.classList.toggle("lis-pos__move");
}

//Si el ancho de la página es menor a 760px, ocultará el menú al recargar la página

if (window.innerWidth < 760){
  imagen.classList.add("imagen__move__move");
  body.classList.add("body_move");
  side_menu.classList.add("menu__side_move");
}

//Haciendo el menú responsive(adaptable)

window.addEventListener("resize", function(){

  if (window.innerWidth > 760){
    imagen.classList.remove("imagen__move__move");
    body.classList.remove("body_move");
    side_menu.classList.remove("menu__side_move");
  }

  if (window.innerWidth < 760){

    /*body.classList.add("body_move");
    side_menu.classList.add("menu__side_move");*/
    body.classList.remove("body_move");
    side_menu.classList.remove("menu__side_move");
  }

});

let listElements=document.querySelectorAll(".list__button--click");
listElements.forEach(listElement=>{
  listElement.addEventListener('click',()=>{
   listElement.classList.toggle('arrow')

    let height=0;
    let menu=listElement.nextElementSibling;
    if (menu.clientHeight=="0"){
      height=menu.scrollHeight;
    }
    menu.style.height = `${height}px`;
  })
})
