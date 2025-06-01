document.addEventListener('DOMContentLoaded', function() {
    // 1. Загружаем корзину из localStorage или создаём пустую
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // 2. Элементы DOM
    const cartItemsContainer = document.getElementById('cart-items');
    const cartCountElement = document.getElementById('cart-count');
    const cartTotalElement = document.getElementById('cart-total');
    const cartButton = document.getElementById('cart-button');
    const cartDropdown = document.getElementById('cart-dropdown');

    // 3. Обновляем отображение корзины
    function updateCartDisplay() {
        // Очищаем контейнер
        cartItemsContainer.innerHTML = '';

        // Если корзина пуста
        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p>Корзина пуста</p>';
            cartCountElement.textContent = '0';
            cartTotalElement.textContent = '0';
            localStorage.setItem('cart', JSON.stringify(cart));
            return;
        }

        // Заполняем корзину товарами
        let total = 0;
        cart.forEach((item, index) => {
            const itemElement = document.createElement('div');
            itemElement.className = 'cart-item';
            itemElement.innerHTML = `
                <span>${item.name}</span>
                <span>$${item.price} 
                    <span class="remove-item" data-index="${index}">×</span>
                </span>
            `;
            cartItemsContainer.appendChild(itemElement);
            total += parseInt(item.price);
        });

        // Обновляем счётчик и сумму
        cartCountElement.textContent = cart.length;
        cartTotalElement.textContent = total;
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    // 4. Добавление тура в корзину
    document.querySelectorAll('.book-button').forEach(button => {
        button.addEventListener('click', function() {
            const tourName = this.getAttribute('data-name');
            const tourPrice = this.getAttribute('data-price');

            // Добавляем тур в корзину
            cart.push({
                name: tourName,
                price: tourPrice
            });

            // Обновляем отображение
            updateCartDisplay();

            // Показываем уведомление
            alert(`${tourName} добавлен в корзину!`);
        });
    });

    // 5. Удаление товара из корзины
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('remove-item')) {
            const index = e.target.getAttribute('data-index');
            cart.splice(index, 1);
            updateCartDisplay();
        }
    });

    // 6. Оформление заказа
    const checkoutButton = document.querySelector('.checkout-button');
    if (checkoutButton) {
        checkoutButton.addEventListener('click', function() {
            if (cart.length === 0) {
                alert('Корзина пуста!');
            } else {
                alert(`Заказ оформлен! Сумма: $${cartTotalElement.textContent}\nСпасибо за покупку!`);
                cart = [];
                updateCartDisplay();
            }
        });
    }

    // 7. Показываем/скрываем корзину при клике (для мобильных устройств)
    cartButton.addEventListener('click', function(e) {
        e.stopPropagation();
        cartDropdown.style.display = cartDropdown.style.display === 'block' ? 'none' : 'block';
    });

    // Закрываем корзину при клике вне её области
    document.addEventListener('click', function() {
        cartDropdown.style.display = 'none';
    });

    // Инициализация при загрузке страницы
    updateCartDisplay();
});