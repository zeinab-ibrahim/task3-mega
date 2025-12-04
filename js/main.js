let products = [
    { 
        id: 1, 
        title: "Laptop Pro", 
        price: 25000, 
        category: "Electronics", 
        inStock: true,
        image: "laptop.jpg" 
    },
    { 
        id: 2, 
        title: "Wireless Headphones", 
        price: 1200, 
        category: "Accessories", 
        inStock: true,
        image: "headphones.jpg" 
    },
    { 
        id: 3, 
        title: "Smart Watch", 
        price: 8500, 
        category: "Electronics", 
        inStock: false,
        image: "watch.jpg" 
    },
    { 
        id: 4, 
        title: "USB Cable", 
        price: 150, 
        category: "Accessories", 
        inStock: true,
        image: "cable.jpg" 
    },
    { 
        id: 5, 
        title: "Mechanical Keyboard", 
        price: 3200, 
        category: "Electronics", 
        inStock: true,
        image: "keyboard.jpg" 
    },
    { 
        id: 6, 
        title: "Mouse Pad", 
        price: 350, 
        category: "Accessories", 
        inStock: true,
        image: "mouse.jpg" 
    },
    { 
        id: 7, 
        title: "Tablet Pro", 
        price: 18000, 
        category: "Electronics", 
        inStock: true,
        image: "tablet.jpg" 
    },
    { 
        id: 8, 
        title: "Bluetooth Speaker", 
        price: 4500, 
        category: "Accessories", 
        inStock: true,
        image: "speaker.jpg" 
    }
];

let sortAscending = true;

function renderProducts(productsToRender = products) {
    const container = document.getElementById('products-container');
    
    if (productsToRender.length === 0) {
        container.innerHTML = `
            <div class="empty-store">
                <i class="fas fa-box-open"></i>
                <h2>No Products Found</h2>
                <p>Try adding some products or adjusting your search</p>
                <button class="btn btn-primary" onclick="addRandomProduct()" style="margin-top: 20px;">
                    <i class="fas fa-plus"></i> Add Sample Products
                </button>
            </div>
        `;
        updateStats();
        return;
    }
    
    let productsHTML = '';
    
    for (const product of productsToRender) {
        const imagePath = product.image ? `assets/images/${product.image}` : 'assets/images/default.jpg';
        
        productsHTML += `
            <div class="product-card ${!product.inStock ? 'out-of-stock' : ''}" data-id="${product.id}">
                <div class="product-image">
                    <img src="${imagePath}" 
                         alt="${product.title}"
                         onerror="this.onerror=null; this.src='data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"200\" height=\"200\" viewBox=\"0 0 200 200\"><rect width=\"200\" height=\"200\" fill=\"%23667eea\"/><text x=\"100\" y=\"100\" font-family=\"Arial\" font-size=\"30\" fill=\"white\" text-anchor=\"middle\" dy=\".3em\">${product.title.charAt(0)}</text></svg>'">
                    <div class="fallback-icon">
                        <i class="fas ${getProductIcon(product.category)}"></i>
                    </div>
                </div>
                <div class="product-content">
                    <div class="product-title">
                        <span>${product.title}</span>
                        <span class="product-id">#${product.id}</span>
                    </div>
                    
                    <div class="product-price">${product.price.toLocaleString()}</div>
                    
                    <div class="product-category">${product.category}</div>
                    
                    <div class="product-stock">
                        <i class="fas ${product.inStock ? 'fa-check-circle in-stock' : 'fa-times-circle out-of-stock-text'}"></i>
                        <span class="${product.inStock ? 'in-stock' : 'out-of-stock-text'}">
                            ${product.inStock ? 'In Stock' : 'Out of Stock'}
                        </span>
                    </div>
                    
                    <div class="product-actions">
                        <button class="action-btn delete-btn" onclick="deleteProduct(${product.id})">
                            <i class="fas fa-trash"></i> Delete
                        </button>
                    </div>
                </div>
            </div>
        `;
    }
    
    container.innerHTML = productsHTML;
    updateStats();
}

function getProductIcon(category) {
    const icons = {
        'Electronics': 'fa-laptop',
        'Accessories': 'fa-headphones',
        'Clothing': 'fa-tshirt',
        'Books': 'fa-book',
        'Home': 'fa-home',
        'Food': 'fa-utensils'
    };
    return icons[category] || 'fa-box';
}

function addRandomProduct() {
    const randomTitles = [
        "Gaming Mouse", "Bluetooth Speaker", "Fitness Tracker", "External SSD",
        "4K Monitor", "Gaming Chair", "Webcam HD", "Tablet Pro", "Smartphone X"
    ];
    
    const randomCategories = ["Electronics", "Accessories", "Home", "Clothing", "Books"];
    
    const images = ["laptop.jpg", "headphones.jpg", "watch.jpg", "keyboard.jpg", 
                   "mouse.jpg", "cable.jpg", "tablet.jpg", "speaker.jpg"];
    
    const randomTitle = randomTitles[Math.floor(Math.random() * randomTitles.length)];
    const randomCategory = randomCategories[Math.floor(Math.random() * randomCategories.length)];
    const randomImage = images[Math.floor(Math.random() * images.length)];
    const randomPrice = Math.floor(Math.random() * 50000) + 500;
    const randomInStock = Math.random() > 0.3;
    
    const newId = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;
    
    const newProduct = {
        id: newId,
        title: randomTitle,
        price: randomPrice,
        category: randomCategory,
        inStock: randomInStock,
        image: randomImage
    };
    
    products.push(newProduct);
    
    const container = document.getElementById('products-container');
    if (container.children.length > 0 && !container.classList.contains('empty-store')) {
        const lastCard = container.lastElementChild;
        lastCard.classList.add('adding');
        setTimeout(() => lastCard.classList.remove('adding'), 500);
    }
    
    renderProducts();
    
    showNotification(`Added: ${randomTitle} for ₹${randomPrice.toLocaleString()}`, 'success');
}

function addCustomProduct() {
    const titleInput = document.getElementById('product-title');
    const priceInput = document.getElementById('product-price');
    const categoryInput = document.getElementById('product-category');
    const imageSelect = document.getElementById('product-image');
    const inStockInput = document.getElementById('product-instock');
    
    if (!titleInput.value.trim() || !priceInput.value || !categoryInput.value.trim()) {
        showNotification('Please fill all fields!', 'error');
        return;
    }
    
    const newId = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;
    
    const newProduct = {
        id: newId,
        title: titleInput.value.trim(),
        price: parseInt(priceInput.value),
        category: categoryInput.value.trim(),
        image: imageSelect.value,
        inStock: inStockInput.checked
    };
    
    products.unshift(newProduct);
    
    titleInput.value = '';
    priceInput.value = '';
    categoryInput.value = '';
    inStockInput.checked = true;
    
    renderProducts();
    showNotification(`Added "${newProduct.title}" to store!`, 'success');
}

function deleteProduct(id) {
    const productIndex = products.findIndex(product => product.id === id);
    
    if (productIndex === -1) return;
    
    const productName = products[productIndex].title;
    
    const productCard = document.querySelector(`.product-card[data-id="${id}"]`);
    if (productCard) {
        productCard.classList.add('removing');
        setTimeout(() => {
            products.splice(productIndex, 1);
            
            reindexProductIds();
            
            renderProducts();
            showNotification(`Deleted: ${productName}`, 'error');
        }, 500);
    }
}

function reindexProductIds() {
    let i = 0;
    while (i < products.length) {
        products[i].id = i + 1;
        i++;
    }
}

function searchProducts() {
    const searchInput = document.getElementById('search');
    const searchTerm = searchInput.value.toLowerCase().trim();
    
    if (searchTerm === '') {
        renderProducts();
        return;
    }
    
    const filteredProducts = [];
    
    for (let i = 0; i < products.length; i++) {
        if (products[i].title.toLowerCase().includes(searchTerm)) {
            filteredProducts.push(products[i]);
        }
    }
    
    renderProducts(filteredProducts);
    
    const searchHint = document.querySelector('.hint');
    if (searchHint) {
        if (filteredProducts.length === 0) {
            searchHint.textContent = `No products found for "${searchTerm}"`;
            searchHint.style.color = '#e74c3c';
        } else {
            searchHint.textContent = `Found ${filteredProducts.length} product(s) for "${searchTerm}"`;
            searchHint.style.color = '#27ae60';
        }
    }
}

function sortByPrice() {
    const sortBtn = document.getElementById('sort-btn');
    
    if (sortAscending) {
        products.sort((a, b) => a.price - b.price);
        sortBtn.innerHTML = '<i class="fas fa-sort-amount-down"></i> Sort by Price (Desc)';
        showNotification('Products sorted by price: Low to High', 'info');
    } else {
        products.sort((a, b) => b.price - a.price);
        sortBtn.innerHTML = '<i class="fas fa-sort-amount-up"></i> Sort by Price (Asc)';
        showNotification('Products sorted by price: High to Low', 'info');
    }
    
    sortAscending = !sortAscending;
    renderProducts();
}

function showFirstNProducts(n) {
    const firstN = products.slice(0, n);
    renderProducts(firstN);
    showNotification(`Showing first ${n} products`, 'info');
}

function getAllCategories() {
    const categories = products.map(p => p.category);
    const uniqueCategories = [...new Set(categories)];
    return uniqueCategories.join(', ');
}

function updateStats() {
    document.getElementById('total-count').textContent = products.length;
    
    let inStockCount = 0;
    let imagesCount = 0;
    
    for (let i = 0; i < products.length; i++) {
        if (products[i].inStock) {
            inStockCount++;
        }
        if (products[i].image) {
            imagesCount++;
        }
    }
    
    document.getElementById('in-stock-count').textContent = inStockCount;
    document.getElementById('out-of-stock-count').textContent = products.length - inStockCount;
    document.getElementById('images-count').textContent = imagesCount;
}

function clearAllProducts() {
    if (products.length === 0) {
        showNotification('Store is already empty!', 'info');
        return;
    }
    
    if (confirm(`Are you sure you want to remove all ${products.length} products?`)) {
        while (products.length > 0) {
            products.pop();
        }
        
        renderProducts();
        showNotification('All products cleared from store!', 'error');
    }
}

function findExpensiveProduct(threshold) {
    let result = null;
    
    outerLoop: 
    for (let i = 0; i < products.length; i++) {
        for (let j = 0; j < 1; j++) {
            if (products[i].price > threshold) {
                result = products[i];
                break outerLoop;
            }
        }
    }
    
    return result;
}

document.addEventListener('keydown', function(event) {
    const searchInput = document.getElementById('search');
    
    if ((event.ctrlKey || event.metaKey) && event.key === 'f') {
        event.preventDefault();
        searchInput.focus();
        searchInput.select();
    }
    
    if (event.key === 'Escape' && document.activeElement === searchInput) {
        searchInput.value = '';
        renderProducts();
        
        const searchHint = document.querySelector('.hint');
        if (searchHint) {
            searchHint.textContent = 'Press Enter to search, Escape to clear';
            searchHint.style.color = '#7f8c8d';
        }
    }
    
    if (event.key === 'Enter' && document.activeElement === searchInput) {
        searchProducts();
    }
});

function showNotification(message, type = 'info') {
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-times-circle' : 'fa-info-circle'}"></i>
        <span>${message}</span>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => notification.classList.add('show'), 10);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

const style = document.createElement('style');
style.textContent = `
    .notification {
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 25px;
        border-radius: 10px;
        color: white;
        font-weight: 600;
        display: flex;
        align-items: center;
        gap: 15px;
        z-index: 1000;
        transform: translateX(150%);
        transition: transform 0.3s cubic-bezier(0.68, -0.55, 0.27, 1.55);
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        max-width: 400px;
    }
    
    .notification.show {
        transform: translateX(0);
    }
    
    .notification.success {
        background: linear-gradient(135deg, #2ecc71, #27ae60);
    }
    
    .notification.error {
        background: linear-gradient(135deg, #e74c3c, #c0392b);
    }
    
    .notification.info {
        background: linear-gradient(135deg, #3498db, #2980b9);
    }
    
    .notification i {
        font-size: 1.5rem;
    }
`;
document.head.appendChild(style);

function countProductsByCategory() {
    const categories = {};
    
    for (const product of products) {
        if (!categories[product.category]) {
            categories[product.category] = 0;
        }
        categories[product.category]++;
    }
    
    console.log('Products by category:', categories);
    return categories;
}

document.addEventListener('DOMContentLoaded', function() {
    renderProducts();
    
    const searchInput = document.getElementById('search');
    searchInput.addEventListener('focus', function() {
        const hint = document.querySelector('.hint');
        if (hint) {
            hint.textContent = 'Press Enter to search, Escape to clear | Ctrl+F to focus search';
        }
    });
    
    searchInput.addEventListener('blur', function() {
        const hint = document.querySelector('.hint');
        if (hint) {
            hint.textContent = 'Press Enter to search, Escape to clear';
        }
    });
    
    countProductsByCategory();
    
    setTimeout(() => {
        showNotification('Store loaded! Use controls to manage products.', 'info');
    }, 500);
});