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
                <p>$${precio}</p>
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
            const search = urlImage.split('/img')[1] || null
            const image = `img${search}`
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
        <img src='${img}' alt='producto'/>
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
                <p>"$${precio}"</p>
            </div>
            <div class="producto-titulo">
                <p>"${nombre}"</p>
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

// Dark Mode Toggle mejorado
const themeToggle = document.getElementById('theme-toggle');
let isDarkTheme = localStorage.getItem('darkMode') === 'enabled';

// Aplicar el modo oscuro al cargar la página si estaba activado
if (isDarkTheme) {
  enableDarkMode();
}

themeToggle.addEventListener('click', () => {
  if (isDarkTheme) {
    disableDarkMode();
  } else {
    enableDarkMode();
  }
});

function enableDarkMode() {
  document.body.classList.add('dark-mode');
  // Cambiar todos los textos negros a blancos
  document.querySelectorAll('*').forEach(element => {
    const color = window.getComputedStyle(element).color;
    if (color === '#fff' || color === 'black') {
      element.style.color = '#ffffff';
    }
  });
  localStorage.setItem('darkMode', 'enabled');
  isDarkTheme = true;
  themeToggle.textContent = 'Modo Claro';
}

function disableDarkMode() {
  document.body.classList.remove('dark-mode');
  // Restaurar colores originales (excepto los que tenían color negro explícito)
  document.querySelectorAll('*').forEach(element => {
    if (element.style.color === 'rgb(255, 255, 255)' || element.style.color === 'white') {
      element.style.color = '';
    }
  });
  localStorage.setItem('darkMode', 'disabled');
  isDarkTheme = false;
  themeToggle.textContent = 'Modo Oscuro';
}

//Formulario
const $form = document.querySelector('#form')
$form.addEventListener('submit',handleSubmit)

async function handleSubmit(event){
    event.preventDefault()
    const form = new FormData(this)
    const response = await fetch(this.action, {
        method: this.method,
        body: form,
        headers: {
            'Accept': 'application/json'
        }
    })
    if (response.ok){
        this.reset()
        alert('Gracias por tu consulta! Te contactaremos pronto')
    }
}

// Menú Hamburguesa
const hamburgerBtn = document.getElementById('hamburger-btn');
const closeBtn = document.getElementById('close-btn');
const mobileMenu = document.getElementById('mobile-menu');
const dropdownToggles = document.querySelectorAll('.dropdown-toggle-mobile');

// Abrir menú móvil
hamburgerBtn.addEventListener('click', () => {
  mobileMenu.classList.add('active');
});

// Cerrar menú móvil
closeBtn.addEventListener('click', () => {
  mobileMenu.classList.remove('active');
});

// Cerrar al hacer clic fuera del contenido
mobileMenu.addEventListener('click', (e) => {
  if (e.target === mobileMenu) {
    mobileMenu.classList.remove('active');
  }
});

// Dropdowns móviles
dropdownToggles.forEach(toggle => {
  toggle.addEventListener('click', (e) => {
    e.preventDefault();
    const parent = toggle.parentElement;
    parent.classList.toggle('active');
    
    // Cerrar otros dropdowns abiertos
    dropdownToggles.forEach(otherToggle => {
      if (otherToggle !== toggle) {
        otherToggle.parentElement.classList.remove('active');
      }
    });
  });
});

// Cerrar menú al seleccionar una opción
document.querySelectorAll('.mobile-menu a').forEach(link => {
  if (!link.classList.contains('dropdown-toggle-mobile')) {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('active');
    });
  }
});

// MODO OSCURO --------CONTACTO 

// Aplicar el modo oscuro al cargar la página si estaba activado
