
const testimonials = [
    {
        text: "Отличный сервис, помогли подобрать идеальный тур!",
        author: "- Иван И."
    },
    {
        text: "Все было организовано на высшем уровне, рекомендую!",
        author: "- Мария С."
    },
    {
        text: "Незабываемое путешествие, спасибо за профессиональный подход!",
        author: "- Иван Г."
    },
    {
        text: "Лучший туроператор, с которым я когда-либо работал!",
        author: "- Николай П."
    },
    {
        text: "Мечта сбылась благодаря вашей команде, буду рекомендовать всем!",
        author: "- Ирина С."
    }
];

function showRandomTestimonial() {
    const randomIndex = Math.floor(Math.random() * testimonials.length);
    const testimonial = testimonials[randomIndex];

    const testimonialElement = document.getElementById('random-testimonial');
    testimonialElement.innerHTML = `
                <p>"${testimonial.text}"</p>
                <p>${testimonial.author}</p>
            `;
}

window.onload = showRandomTestimonial;