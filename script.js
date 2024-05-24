let cart = [];

function addToCart(productName, productPrice) {
    const product = { name: productName, price: productPrice };
    cart.push(product);
    updateCart();
}

function updateCart() {
    const cartItems = document.getElementById('cartItems');
    cartItems.innerHTML = '';
    cart.forEach((item, index) => {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'cart-item';
        itemDiv.innerHTML = `
            <p>${item.name} - $${item.price.toFixed(2)}</p>
            <button onclick="removeFromCart(${index})">Remove</button>
        `;
        cartItems.appendChild(itemDiv);
    });
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCart();
}

function viewCart() {
    document.getElementById('cartModal').style.display = 'block';
}

function closeCart() {
    document.getElementById('cartModal').style.display = 'none';
}

function proceedToCheckout() {
    localStorage.setItem('cart', JSON.stringify(cart));
    window.location.href = 'checkout.html';
}

document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('checkoutForm')) {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const orderSummary = document.getElementById('order-summary');
        const totalAmount = cart.reduce((sum, item) => sum + item.price, 0);

        cart.forEach(item => {
            const itemDiv = document.createElement('div');
            itemDiv.className = 'order-item';
            itemDiv.innerHTML = `
                <div>
                    <p>${item.name}</p>
                    <p>$${item.price.toFixed(2)}</p>
                </div>
            `;
            orderSummary.appendChild(itemDiv);
        });

        const totalDiv = document.createElement('div');
        totalDiv.className = 'order-total';
        totalDiv.innerHTML = `
            <p>Subtotal: $${totalAmount.toFixed(2)}</p>
            <p>Shipping: $0.00</p>
            <p>Total: $${totalAmount.toFixed(2)}</p>
        `;
        orderSummary.appendChild(totalDiv);
    }
});
