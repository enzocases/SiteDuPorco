// Inicialização do EmailJS
(function() {
    emailjs.init("abc123"); // Substitua com sua chave pública real
})();

// Animação suave para links de navegação
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        window.scrollTo({
            top: targetElement.offsetTop - 70,
            behavior: 'smooth'
        });
    });
});

// Animação de fade-in para elementos quando entram na viewport
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.container, .about, .products, .contact').forEach(section => {
    section.style.opacity = '0';
    section.style.transition = 'opacity 0.5s ease-in-out';
    observer.observe(section);
});

// Manipulação do formulário
const form = document.querySelector('form');
form.addEventListener('submit', async function(e) {
    e.preventDefault();

    const submitButton = form.querySelector('button[type="submit"]');
    const originalButtonText = submitButton.textContent;
    submitButton.textContent = 'Enviando...';
    submitButton.disabled = true;

    try {
        const formData = {
            nome: form.nome.value,
            email: form.email.value,
            telefone: form.telefone.value,
            mensagem: form.mensagem.value
        };

        await emailjs.send('service_gmail', 'template_contato', formData); // Substitua pelos seus IDs reais
        
        alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
        form.reset();
    } catch (error) {
        console.error('Erro ao enviar mensagem:', error);
        alert('Desculpe, ocorreu um erro ao enviar sua mensagem. Por favor, tente novamente mais tarde.');
    } finally {
        submitButton.textContent = originalButtonText;
        submitButton.disabled = false;
    }
});

// Validação de formulário em tempo real
const inputs = form.querySelectorAll('input, textarea');
inputs.forEach(input => {
    input.addEventListener('input', function() {
        if (this.checkValidity()) {
            this.classList.remove('invalid');
            this.classList.add('valid');
        } else {
            this.classList.remove('valid');
            this.classList.add('invalid');
        }
    });
});

// Adiciona classe para animação de hover nos produtos
document.querySelectorAll('.product-item').forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px)';
    });
    
    item.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});
