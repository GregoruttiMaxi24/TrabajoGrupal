const catalogo = document.querySelector('.catalogo');
const searchProduct = document.querySelector('.buscador');
const searchButton = document.querySelector('.boton-buscar');


window.addEventListener('DOMContentLoaded', reloadProduct)
searchButton.addEventListener('click', filterProducts)

async function reloadProduct(){
    const urlProducts = await fetch('products.json')
    const data = await urlProducts.json();

    data.forEach(product => {
        const { nombre, precio, image } = product;
        const containerProducts = document.createElement('div');
        containerProducts.classList.add('container-producto');
        containerProducts.innerHTML = `
            <img
                src="${image}"
                alt=""
            />
            <div class="producto-precio">
                <p>${precio}</p>
            </div>
            <div class="producto-titulo">
                <p>${nombre}</p>
            </div>
            <div class="producto-boton">
                <button class="boton">comprar</button>
                <button class="view">ver</button>
            </div>
        `

        catalogo.appendChild(containerProducts)
    })
    const button = document.querySelectorAll('.boton');
    const views = document.querySelectorAll('.view');
    
    notificationButtons(button);
    viewProduct(views);
    
}

function notificationButtons(data){
    data.forEach(card => {
        card.addEventListener('click', () => {
            const producto = card.parentElement.parentElement;
            const titulo = producto.querySelector('.producto-titulo p').textContent
            notification(titulo)
        })
    })
    return
}

// Vista del producto
function viewProduct(products){
    products.forEach(view => {
        view.addEventListener('click', () => {
            const product = view.parentElement.parentElement;
            const urlImage = product.querySelector('img').src
            const image = urlImage.slice(22);
            zoomImage(image);
        })
    })
}


// Notifica al usuario 
function notification(messege){
    const alert = document.querySelector('.alert');
    const alertText = document.querySelector('.alert p');
    alertText.textContent = `${messege}`
    alert.classList.add('show');
    setTimeout(() => {
        alert.classList.remove('show')
    }, 4000)
}


function zoomImage(img){

    clearImages();
    const container = document.querySelector('.catalogo');
    const containerImage = document.createElement('div');
    containerImage.classList.add('zoom');
    containerImage.innerHTML = `
        <img src='${img}' alt='producto'>
    `
    container.appendChild(containerImage);

    containerImage.addEventListener('mouseout', ()=> {
        container.addEventListener('click', () => {
            containerImage.remove();
        })
    })
}

// Filtro de productos
async function filterProducts(){
    const res = await fetch('products.json');
    const data = await res.json();
    const searchTerm = searchProduct.value.charAt(0).toUpperCase() + searchProduct.value.slice(1);

    //Filtro por nombre, categoria o precio
    const productsFilter = data.filter(product => {
        return product.nombre === searchTerm || product.categoria === searchTerm || product.precio == searchTerm;
    })

    if(productsFilter.length == 0) {    
        return notification(`No se encontro resultados para ${searchTerm}`)
    }

    clearContent();

    productsFilter.forEach(product => {
        const { nombre, precio, image } = product;
        const containerProducts = document.createElement('div');
        containerProducts.classList.add('container-producto');
        containerProducts.innerHTML = `
            <img
                src="${image}"
                alt=""
            />
            <div class="producto-precio">
                <p>${precio}</p>
            </div>
            <div class="producto-titulo">
                <p>${nombre}</p>
            </div>
            <div class="producto-boton">
                <button class="boton">comprar</button>
                <button class="view">ver</button>
            </div>
        `

        catalogo.appendChild(containerProducts)
    })

    const button = document.querySelectorAll('.boton');
    const views = document.querySelectorAll('.view');
    
    notificationButtons(button);
    viewProduct(views);

    setTimeout(() => {
        searchProduct.value = '';
    }, 3000)
    return;
}

// Eliminar imagenes repetidas
function clearImages(){
    const img = document.querySelector('.zoom');
    if(img) return img.remove()
    
}

// Eliminar contenido despues del filtrado
function clearContent(){
    while(catalogo.firstChild){
        catalogo.removeChild(catalogo.firstChild)
    }
}



