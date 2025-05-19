document.addEventListener('DOMContentLoaded', function() {
    // === Обработка формы поиска ===

    const searchForm = document.querySelector('.search-form form'); // Находим форму поиска
    if (searchForm) { // Проверяем, что форма найдена
        searchForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Предотвращаем перезагрузку страницы

            // Собираем данные из формы
            const destination = document.getElementById('destination').value;
            const interests = document.getElementById('interests').value;
            const budget = document.getElementById('budget').value;

            // Выводим данные в консоль (в будущем здесь будет логика поиска)
            console.log('Поиск туров:', {
                destination: destination,
                interests: interests,
                budget: budget
            });

            //  (Бонус) Здесь можно добавить код для отображения результатов поиска,
            //  например, скрыть форму и показать список туров.
            alert("Спасибо за ваш запрос!  Мы подберем для вас лучшие туры."); //  Заглушка
        });
    } else {
        console.warn('Форма поиска не найдена.'); //  Если форма не найдена, выводим предупреждение
    }

    // === Динамическое добавление фоновых изображений ===
    const containers = document.querySelectorAll('.container');

    containers.forEach(container => {
        const imageUrl = container.getAttribute('data-image');

        if (imageUrl && imageUrl.trim() !== '') {
            container.style.backgroundImage = `url('${imageUrl}')`;
            container.style.backgroundSize = 'cover';
            container.style.backgroundPosition = 'center';
            container.style.backgroundRepeat = 'no-repeat';
            container.style.color = 'white';
            container.style.textShadow = '2px 2px 4px #000000';
            container.classList.add('has-background');
        } else {
            container.classList.add('no-background');
            console.warn('Container без data-image:', container);
        }
    });

    // === Отображение случайного отзыва ===
    const testimonials = document.querySelectorAll('.testimonial');
    if (testimonials.length > 0) {
        const randomIndex = Math.floor(Math.random() * testimonials.length);
        testimonials.forEach((testimonial, index) => {
            if (index === randomIndex) {
                testimonial.style.display = 'block'; // Показываем выбранный отзыв
            } else {
                testimonial.style.display = 'none'; // Скрываем остальные отзывы
            }
        });
    } else {
        console.warn('Отзывы не найдены.');
    }
});