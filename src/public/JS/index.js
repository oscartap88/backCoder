const socketClient = io();

const form = document.getElementById('form');
const inputName = document.getElementById('name');
const inputPrice = document.getElementById('price');
const inputStock = document.getElementById('stock');
const products = document.getElementById('products');

form.onsubmit = (e) =>{
    e.preventDefault();
    const name = inputName.value;
    const price = inputPrice.value;
    const stock = inputStock.value;
    socketClient.emit('newProduct', { name , price, stock});
}

socketClient.on('arrayProducts', (array) =>{
    console.log(array)
    let infoProducts = '';
    array.forEach(p => {
        infoProducts += `${p.name} - ${p.price} - ${p.stock}<br>`
    });
    products.innerHTML = infoProducts;
})