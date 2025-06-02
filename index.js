const button = document.querySelectorAll('.boton');

// Recorre los productos 
button.forEach(card => {
    card.addEventListener('click', () => {
        const producto = card.parentElement.parentElement;
        const titulo = producto.querySelector('.producto-titulo p').textContent
        const alert = document.querySelector('.alert');
        const alertText = document.querySelector('.alert p');
        alertText.textContent = `Se agrego ${titulo}`
        alert.classList.add('show');
        setTimeout(() => {
            alert.classList.remove('show')
        }, 4000)
    })
})
