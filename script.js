const APIurl = 'https://api.yumserver.com/17059/products'

document.addEventListener('DOMContentLoaded', () => {
    const productForm = document.getElementById('productForm');
    const editForm = document.getElementById('editForm');
    const cancelEditBtn = document.getElementById('cancelEditBtn');
    const cargarProdBtn = document.getElementById('cargarProdBtn')

    productForm.addEventListener('submit', formularioProductos);
    editForm.addEventListener('submit', formularioModif);
    cancelEditBtn.addEventListener('click', () => editForm.style.display= 'none');
    cargarProdBtn.addEventListener('click', cargarProductos);
    cargarProductos();
})

function cargarProductos() {
    fetch(APIurl)
    .then(response => response.json())
    .then(products => {
          mostrarProductos(products);
    })
    .catch(error => console.error('Error al cargar productos', error));
}

function mostrarProductos(products) {
    productTbody.innerHTML = '';
    products.forEach(products => {
        const row = document.createElement('tr');
        row.innerHTML= `
        <td>${products.idcod}</td>
        <td>${products.titulo}</td>
        <td>${products.precioPeso}</td>
        <td>${products.precioDolar}</td>
        <td>${products.fecha}</td>
        <td>
          <button class="editBtn" data-id="${JSON.stringify(products)}">Editar</button>
          <button class="deleteBtn" data-id="${products.idcod}">Eliminar</button>
        </td>
        `;
        productTbody.appendChild(row);
    })
    document.querySelectorAll('.editBtn').forEach(button => {
        button.addEventListener('click', formularioModif);
    });
    document.querySelectorAll('.deleteBtn').forEach(button => {
        button.addEventListener('click', eliminarProducto);
    })
}

function formularioProductos(e) {
    e.preventDefault();
    const titulo = document.getElementById('titulo').value;
    const precioPeso = parseFloat(document.getElementById('precioPeso').value);
    const precioDolar = parseFloat(document.getElementById('precioDolar').value);
    const fecha = document.getElementById('fecha').value;

    const nuevoProducto = {
        idcod: idcod,
        titulo: titulo,
        precioPeso: precioPeso,
        precioDolar:precioDolar,
        fecha: fecha
    };

    crearNuevoProducto(nuevoProducto);
}

function crearNuevoProducto(nuevoProducto) {
    fetch(APIurl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(nuevoProducto)
    })
    .then(response => response.text())
    .then(result => {
        if(result === 'OK') {
            cargarProductos();
            document.getElementById('productForm').reset();
        } else {
            console.error('Error al agregar producto', result);
        }
    })
    .catch(error => console.error('Error al agregar producto', error));
}


function formularioModif(products) {
    document.getElementById('editIdcod').value = products.idcod;
    document.getElementById('editTitulo').value = products.titulo;
    parseFloat(document.getElementById('editPrecioPeso').value = products.precioPeso);
    parseFloat(document.getElementById('editPrecioDolar').value = products.precioDolar);
    document.getElementById('editFecha').value = products.fecha;
    document.getElementById('editForm').style.display = 'block';
}

function modificarProducto() {
    fetch(APIurl, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
        idcod: document.getElementById('editIdcod').value,
        titulo: document.getElementById('editTitulo').value,
        precioPeso: parseFloat(document.getElementById('editPrecioPeso').value),
        precioDolar: parseFloat(document.getElementById('editPrecioDolar').value),
        fecha: document.getElementById('editFecha').value

        })
    })
    .then(response => response.text())
    .then(result => {
        if (result === 'OK') {
            cargarProductos();
            document.getElementById('editForm').style.display = 'none';
        } else {
            console.error('Error al editar producto', result);
        }
    })
    .catch(error => console.error('Error:', error));
}

function eliminarProducto(idcod) { 
    const confirmElim = confirm('¿Esta seguro de que desea eliminar el producto?');
    if (confirmElim) {
        fetch(APIurl, {
            method: 'DELETE',
            headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({idcod:idcod})
        })
        .then(response => response.text())
        .then(texto => { console.log(texto)
            if (texto.trim() === "OK") {
                 cargarProductos();
            } else {
                alert(texto);
            }
        })
        .catch(error => console.error('Error:', error));
    }
}


//

menu2 = document.querySelector(".menu2")
menu2.onclick = function() {
    menu = document.querySelector(".menu")
    menu.classList.toggle("active")
}

window.addEventListener("scroll", function(){
    var header = document.querySelector("header")
    header.classList.toggle('down', window.scrollY > 0)
})

const imagenes = document.querySelectorAll('.img-trabajos')
const imagenesLight = document.querySelector('.agregar-imagen')
const contenedorLight = document.querySelector('.image-light')

imagenes.forEach(imagen=> {
    imagen.addEventListener('click', ()=>{
        aparecerImagen(imagen.getAttribute('src'))
    })

})

contenedorLight.addEventListener('click', (e)=>{
    if(e.target !== imagenesLight){
        contenedorLight.classList.toggle('show')
        imagenesLight.classList.toggle('showImage')
    }
})

const aparecerImagen = (imagen)=>{
    imagenesLight.src = imagen;
    contenedorLight.classList.toggle('show')
    imagenesLight.classList.toggle('showImage')

}