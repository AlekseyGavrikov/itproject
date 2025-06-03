class ShoppingCart {
    constructor() {
        this.cart = JSON.parse(localStorage.getItem('cart')) || [];
        this.initElements();
        this.setupEventListeners();
        this.updateCartDisplay();
    }

    initElements() {
        this.cartItemsContainer = document.getElementById('cart-items');
        this.cartCountElement = document.getElementById('cart-count');
        this.cartTotalElement = document.getElementById('cart-total');
        this.cartButton = document.getElementById('cart-button');
        this.cartDropdown = document.getElementById('cart-dropdown');
    }

    setupEventListeners() {
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('remove-item')) {
                this.removeItem(e.target.dataset.index);
            }
        });

        const checkoutButton = document.querySelector('.checkout-button');
        if (checkoutButton) {
            checkoutButton.addEventListener('click', () => this.checkout());
        }

        this.cartButton.addEventListener('click', (e) => {
            e.stopPropagation();
            this.toggleCartDropdown();
        });

        document.addEventListener('click', () => {
            this.cartDropdown.style.display = 'none';
        });
    }

    addItem(name, price) {
        this.cart.push({ name, price });
        this.saveCart();
        this.updateCartDisplay();
        alert(`${name} добавлен в корзину!`);
    }

    removeItem(index) {
        this.cart.splice(index, 1);
        this.saveCart();
        this.updateCartDisplay();
    }

    saveCart() {
        localStorage.setItem('cart', JSON.stringify(this.cart));
    }

    updateCartDisplay() {
        this.cartItemsContainer.innerHTML = '';

        if (this.cart.length === 0) {
            this.cartItemsContainer.innerHTML = '<p>Корзина пуста</p>';
            this.cartCountElement.textContent = '0';
            this.cartTotalElement.textContent = '0';
            return;
        }

        let total = 0;
        this.cart.forEach((item, index) => {
            const itemElement = document.createElement('div');
            itemElement.className = 'cart-item';
            itemElement.innerHTML = `
                <span>${item.name}</span>
                <span>$${item.price} 
                    <span class="remove-item" data-index="${index}">×</span>
                </span>
            `;
            this.cartItemsContainer.appendChild(itemElement);
            total += parseInt(item.price);
        });

        this.cartCountElement.textContent = this.cart.length;
        this.cartTotalElement.textContent = total;
    }

    checkout() {
        if (this.cart.length === 0) {
            alert('Корзина пуста!');
        } else {
            alert(`Заказ оформлен! Сумма: $${this.cartTotalElement.textContent}\nСпасибо за покупку!`);
            this.cart = [];
            this.saveCart();
            this.updateCartDisplay();
        }
    }

    toggleCartDropdown() {
        this.cartDropdown.style.display = this.cartDropdown.style.display === 'block' ? 'none' : 'block';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const cart = new ShoppingCart();
    
    document.querySelectorAll('.book-button').forEach(button => {
        button.addEventListener('click', function() {
            cart.addItem(
                this.getAttribute('data-name'),
                this.getAttribute('data-price')
            );
        });
    });
});