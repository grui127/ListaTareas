const d = document;
const form = d.getElementById("form")
const lista = d.querySelector(".lista")
let mod = d.querySelector(".mod")
let oscuridad = false;
let root = d.querySelector(":root")

function darkMod(e){
    if(oscuridad){
        root.style.setProperty("--font-color","#efefef")
        root.style.setProperty("--bg-color","#220258d3")
        root.style.setProperty("--bg-list","#08508bcb")
        root.style.setProperty("--mod-color","#ffed86")
        root.style.setProperty("--bg-cont","#606060be")
        mod.innerHTML = "☀️"
    }
    else{
        root.style.setProperty("--font-color","#232323")
        root.style.setProperty("--bg-color","#e6e60029")
        root.style.setProperty("--bg-list","#67bbffcb")
        root.style.setProperty("--mod-color","#1100ac")
        root.style.setProperty("--bg-cont","#d4c8ffbe")
        mod.innerHTML = "🌙"
    }
}
darkMod()

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
        <input type="text" placeholder="Editando Tarea" id="input2" required>
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
    if(localStorage.getItem("modo") === null){
        localStorage.setItem("modo",oscuridad)
    }
    if(localStorage.getItem("modo") !== null){
        oscuridad = localStorage.getItem("modo")
    }

    let tareas = JSON.parse(localStorage.getItem("Tareas"));
    lista.innerHTML= ``
    for(let i = 0; tareas.length >i;i++){
        lista.innerHTML += `
        <div class="pendiente"id="${i}">
        <p >${tareas[i]}</p>
        <div>
            <button onclick="editar(${i})" class="btn-editar" title="editar">🖊️</button>
            <button onclick="eliminar(${i})" class="btn-borrar" title="eliminar">🗑️</button>
        </div>
        </div>
    `;
};
})()

d.addEventListener("submit",(e)=> e.target === form ? agregar(e) : actualizar(e))
mod.addEventListener("click",(e)=>{
    darkMod()
    console.log(oscuridad)
    localStorage.setItem("modo",!oscuridad)
    return oscuridad = !oscuridad
})







