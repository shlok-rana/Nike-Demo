document.addEventListener('DOMContentLoaded', () => {
    const productSlider = document.getElementById('product-slider');
    const searchIcon = document.getElementById('search-icon');
    const cartIcon = document.getElementById('cart-icon');
    const menuIcon = document.getElementById('menu-icon');
    const searchOverlay = document.getElementById('search-overlay');
    const cartOverlay = document.getElementById('cart-overlay');
    const closeSearch = document.getElementById('close-search');
    const closeCart = document.getElementById('close-cart');
    const cartItems = document.getElementById('cart-items');

    // Sample product data
    const products = [
        { name: 'Nike Air Max 1', category: "Men's Shoes", color: 'White', price: '₹ 14,999', image: 'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/99486859-0ff3-46b4-949b-2d16af2ad421/custom-nike-air-max-1-by-you-shoes.png' },
        { name: 'Nike Air PEG 2K5', category: "Men's Shoes", color: 'White', price: '₹ 13,999', image: 'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/0a5ea9d9-89f8-40e4-8d89-c25f71a6d47b/air-max-2017-shoes-bwZx4N.png' },
        { name: 'Nike Lunar Roam', category: "Men's Shoes", color: 'Sleepy blue', price: '₹ 15,599', image: 'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/c1e9b0a1-5f5c-4c0f-9a0b-1f9f0e82e4c0/air-max-270-shoes-V4DfZQ.png' },
        { name: 'Nike Nocta Glide', category: "Men's Shoes", color: 'White', price: '₹ 12,595', image: 'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/a3e7dead-1ad2-4c40-996d-93ebc9df0fca/dunk-low-retro-shoes-69h36X.png' },
        { name: 'Nike Terminator High', category: "Men's Shoes", color: 'Sleepy blue', price: '₹ 15,999', image: 'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/5d7d7d5c-9f9f-4c8c-9f9f-9f9f9f9f9f9f/air-force-1-07-shoes-WrLlWX.png' }
    ];

    // Populate product slider
    products.forEach(product => {
        const productElement = document.createElement('div');
        productElement.classList.add('product');
        productElement.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h4>${product.name}</h4>
            <p class="category">${product.category}</p>
            <p class="color">Color: ${product.color}</p>
            <p class="price">${product.price}</p>
        `;
        productSlider.appendChild(productElement);
    });

    // Event listeners for icons
    searchIcon.addEventListener('click', () => {
        searchOverlay.style.display = 'flex';
    });

    cartIcon.addEventListener('click', () => {
        cartOverlay.style.display = 'flex';
    });

    menuIcon.addEventListener('click', () => {
        document.querySelector('.nav-links').classList.toggle('show');
    });

    closeSearch.addEventListener('click', () => {
        searchOverlay.style.display = 'none';
    });

    closeCart.addEventListener('click', () => {
        cartOverlay.style.display = 'none';
    });

    // Add to cart functionality
    productSlider.addEventListener('click', (e) => {
        const product = e.target.closest('.product');
        if (product) {
            const name = product.querySelector('h4').textContent;
            const price = product.querySelector('.price').textContent;
            addToCart(name, price);
        }
    });

    function addToCart(name, price) {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
            <p>${name} - ${price}</p>
            <button class="remove-item">Remove</button>
        `;
        cartItems.appendChild(cartItem);

        cartItem.querySelector('.remove-item').addEventListener('click', () => {
            cartItems.removeChild(cartItem);
        });
    }

    // Horizontal scroll for product slider
    let isDown = false;
    let startX;
    let scrollLeft;

    productSlider.addEventListener('mousedown', (e) => {
        isDown = true;
        startX = e.pageX - productSlider.offsetLeft;
        scrollLeft = productSlider.scrollLeft;
    });

    productSlider.addEventListener('mouseleave', () => {
        isDown = false;
    });

    productSlider.addEventListener('mouseup', () => {
        isDown = false;
    });

    productSlider.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - productSlider.offsetLeft;
        const walk = (x - startX) * 3;
        productSlider.scrollLeft = scrollLeft - walk;
    });
});