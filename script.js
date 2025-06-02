let total = 0;
let totalProductos = 0;

function actualizarTotales() {
    document.getElementById('total').textContent = `$${total.toFixed(2)}`;
    document.getElementById('cantidad-total').textContent = `Productos en carrito: ${totalProductos}`;
}

function agregarProducto(id, precio) {
    const cantidadDiv = document.getElementById(`cantidad-${id}`);
    let cantidadActual = parseInt(cantidadDiv.textContent.replace('Cantidad en carrito: ', '')) || 0;
    cantidadActual += 1;
    cantidadDiv.textContent = `Cantidad en carrito: ${cantidadActual}`;
    total += precio;
    totalProductos += 1;
    actualizarTotales();
}

function eliminarTodo() {
    total = 0;
    totalProductos = 0;
    for (let i=1; i<=5; i++) {
        document.getElementById(`cantidad-${i}`).textContent = 'Cantidad en carrito: 0';
    }
    actualizarTotales();
}

function eliminarProducto(id) {
    const cantidadDiv = document.getElementById(`cantidad-${id}`);
    const cantidad = parseInt(cantidadDiv.textContent.replace('Cantidad en carrito: ', '')) || 0;
    if (cantidad > 0) {
        const precio = parseFloat(document.querySelector(`.producto[data-id="${id}"]`).getAttribute('data-precio'));
        total -= precio * cantidad;
        totalProductos -= cantidad;
        cantidadDiv.textContent = 'Cantidad en carrito: 0';
        actualizarTotales();
    }
}

document.querySelectorAll('.agregar-carrito-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const producto = btn.closest('.producto');
        const id = producto.getAttribute('data-id');
        const precio = parseFloat(producto.getAttribute('data-precio'));
        agregarProducto(id, precio);
    });
});

document.getElementById('eliminar-todo').addEventListener('click', eliminarTodo);

document.querySelectorAll('.eliminar-producto-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        eliminarProducto(id);
    });
});

document.querySelectorAll('.leer-mas-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const ampliada = btn.nextElementSibling;
        if (ampliada.style.display === 'none') {
            ampliada.style.display = 'block';
            btn.textContent = 'Leer menos';
        } else {
            ampliada.style.display = 'none';
            btn.textContent = 'Leer más';
        }
    });
});

actualizarTotales();