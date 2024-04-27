// usamos async y await pq se esta conectando a un sv, es asincrono
// no usamos try pq siempre ira por la buena siempre
// con el status codenos guiamos  

const getUsers = async () => {
    // el fetch es un modulo de node, es otro modulo dentro del motor de js que se ejecuta en el navegador, no necesitamos instalar dependencias
    const response = await fetch('./superheroes.json')
    // fetch me da como resultado una promesa, pero con el await le quito el tipo promesa y se vuelve tipo response

    const data = await response.json()
    console.log('data', data);
    return data;
    
} 


// este metodo es para que sea mas simple
const getFilterUser = async (email_gracioso) => {
    const response = await fetch(`./superheroes.json?email_gracioso=${email_gracioso}`)
    const data = await response.json()
    return data;
}

function cargarElementos(elementos) {
    const tabla = document.getElementById('datos')
    for (let elemento of elementos) {
        const row = `
        <td scope="row">${elemento.id}</td>
        <td>${elemento.nombre}</td>
        <td>${elemento.email_gracioso}</td>
        <td>${elemento.website}</td>
        <td>${elemento.habilidad_absurda}</td>
        `;
        const nuevaFila = tabla.insertRow(tabla.rows.length);
        nuevaFila.innerHTML = row
    }
}




const cargarFiltrados = (texto) => {
    const filtrados = usuarios
        .filter((s) => s.email_gracioso === texto);
    cargarElementos(filtrados)
}


const limpiarTabla = () => {
    // https://www.w3schools.com/jsreF/met_table_deleterow.asp#:~:text=The%20deleteRow()%20method%20removes,and%20insert%20a%20new%20row.
    const tabla = document.getElementById('datos');
    console.log('limpiarTabla', tabla)
    while (tabla.rows.length > 1) {
        tabla.deleteRow(tabla.rows.length -1)
    }
 }
const cargarFiltradosMasSimple = async (texto) => {
    limpiarTabla();
    const filtrados = await getFilterUser(texto);
    cargarElementos(filtrados)
}



document.addEventListener('DOMContentLoaded', async function (e) {
    const usuarios = await getUsers(); // aca estamos con la
    cargarElementos(usuarios);
    console.log('holaaaa');
    const btnFiltrar = document.getElementById('btnFiltrar');
    btnFiltrar.addEventListener('click', async function(event){
        // console.log('click event', event)
        const textoIngresado = document.getElementById('textoafiltrar').value.trim()
        await cargarFiltradosMasSimple(textoIngresado)
    })
});

