//////////VARIABLES//////////

const carrito = document.querySelector("#carrito");
const contenedorCarrito = document.querySelector("#lista-carrito tbody");
const vaciarCarritoBtn = document.querySelector("#vaciar-carrito");
const listaCursos = document.querySelector("#lista-cursos");
let articulosCarrito = [];


document.getElementById("busqueda").addEventListener("submit", (event)=> {
    event.preventDefault();
    document.getElementById("buscador").value = "";
  });

cargarEventListener();

function cargarEventListener() {
    listaCursos.addEventListener("click", agregarCurso)  
    carrito.addEventListener("click", eliminarCurso)  
    vaciarCarritoBtn.addEventListener("click",()=>{
        articulosCarrito = [];

        limpiarHtml();
    })
}


///////FUNCIONES//////////
function eliminarCurso(e){
    console.log(e.target.classList);
    if (e.target.classList.contains("borrar-curso")) {
        const cursoId = e.target.getAttribute("data-id");

        articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoId)


        carritoHtml(); 
    }
}



function agregarCurso(e) {
     e.preventDefault();

     if (e.target.classList.contains("agregar-carrito")){
        const cursoSeleccionado = e.target.parentElement.parentElement;
        leetDatosCursos(cursoSeleccionado);
     }
}

//// LEE CONTENIDO DEL CONTENIDO AL QUE LE DAMOS CLICK Y EXTRAE INFO

function leetDatosCursos(curso) {
    const infoCurso = {
        imagen : curso.querySelector("img").src,
        titulo : curso.querySelector("h4").textContent,
        precio : curso.querySelector(".precio span").textContent,
        id : curso.querySelector("a").getAttribute("data-id"),
        cantidad : 1
    }
///REVISA SI YA EXISTE Y SUMARLO 

const existe = articulosCarrito.some(curso => curso.id === infoCurso.id);
if(existe){
    const cursos = articulosCarrito.map(curso => {
        if( curso.id === infoCurso.id){
            curso.cantidad++;
            return curso
        }else{
            return curso
        }
    })
}else{
    ///AGREGA ELEMENTOS AL CARRITO 
    articulosCarrito = [...articulosCarrito, infoCurso]
}

   carritoHtml();
}

///MUESTRA EL CARRITO DE COMPRAS CON ARTICULOS 

function carritoHtml() {

        limpiarHtml();

        articulosCarrito.forEach( curso =>{   
        
        const {imagen,titulo,precio,cantidad,id} = curso;    
        const row = document.createElement("tr")
        row.innerHTML = `

        <td> <img src="${imagen}" width="100"></td>
        <td> ${titulo} </td> 
        <td> ${precio} </td>
        <td> ${cantidad} </td> 
        <td>
            <a href="#" class="borrar-curso" data-id="${id}"> X </a>
        </td>  
        `;
        contenedorCarrito.appendChild(row)
    })
}

    function limpiarHtml() {
        // contenedorCarrito.innerHTML = "";
        while (contenedorCarrito.firstChild) {
            contenedorCarrito.removeChild(contenedorCarrito.firstChild)
        }
    }