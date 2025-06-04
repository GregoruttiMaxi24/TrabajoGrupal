const button = document.querySelectorAll('.boton');
const views = document.querySelectorAll('.view');

// Recorre los productos 
button.forEach(card => {
    card.addEventListener('click', () => {
        const producto = card.parentElement.parentElement;
        const titulo = producto.querySelector('.producto-titulo p').textContent
        notification(titulo)
    })
})

// Efecto zoom
views.forEach(view => {
    view.addEventListener('click', () => {
        const product = view.parentElement.parentElement;
        const urlImage = product.querySelector('img').src
        const image = urlImage.slice(22);
        zoomImage(image);
    })
})

// Notifica al usuario 
function notification(messege){
    const alert = document.querySelector('.alert');
    const alertText = document.querySelector('.alert p');
    alertText.textContent = `Se agrego ${messege}`
    alert.classList.add('show');
    setTimeout(() => {
        alert.classList.remove('show')
    }, 4000)
}


function zoomImage(img){

    clearImages();
    const container = document.querySelector('.catalogo');
    const containerImage = document.createElement('div');
    const body = document.querySelector('body');
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

// Eliminar imagenes repetidas
function clearImages(){
    const img = document.querySelector('.zoom');
    if(img) return img.remove()
    
}



