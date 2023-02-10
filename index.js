const d = document;
const form = d.getElementById("form")
const lista = d.querySelector(".lista")

function agregar(e){
    let texto = d.getElementById("input").value

    if(localStorage.getItem("Tareas") === null){
        let tareas = [];
        tareas.push(texto)
        localStorage.setItem("Tareas",JSON.stringify(tareas))
    } 
    else {
        let tareas = JSON.parse(localStorage.getItem("Tareas"))
        tareas.push(texto)
        localStorage.setItem("Tareas",JSON.stringify(tareas))
    }

    d.reset()
    e.preventDefault()
}
function editar(index){
    if(d.getElementById("rename") !== null) return;
    let pendiente = d.getElementById(index)
    pendiente.innerHTML = `
    <form id="rename" class="${index}">
        <input type="text" placeholder="su tarea pendiente" id="input2">
        <input type="submit" value="Editar" class="agregar">
    </form>
    `
}
function actualizar(e){
    let texto = d.getElementById("input2").value
    let tareas = JSON.parse(localStorage.getItem("Tareas"))
    let lugar = parseInt(d.getElementById("rename").className)

    let nuevo = tareas.map((el,index) => index === lugar ? el = texto : el)
    localStorage.setItem("Tareas",JSON.stringify(nuevo))

    d.reset()
    e.preventDefault()
}
function eliminar(i){
    let tareas = JSON.parse(localStorage.getItem("Tareas"))
    console.log(i)
    tareas.splice(i,1)
    localStorage.setItem("Tareas",JSON.stringify(tareas))
    location.reload()
}

// muestra los datos
(()=>{
    let tareas = JSON.parse(localStorage.getItem("Tareas"));
    lista.innerHTML= ``
    for(let i = 0; tareas.length >i;i++){
        lista.innerHTML += `
        <div class="pendiente"id="${i}">
        <p >${tareas[i]}</p>
        <div>
            <button onclick="editar(${i})">🖊️</button>
            <button onclick="eliminar(${i})">🗑️</button>
            <button>↕️</button>
        </div>
        </div>
    `};
})()



d.addEventListener("submit",(e)=> e.target === form ? agregar(e) : actualizar(e))



