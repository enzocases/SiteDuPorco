document.addEventListener("DOMContentLoaded", function () {
    emailjs.init("SUA_PUBLIC_KEY"); // Substitua pela sua Public Key do EmailJS

    document.getElementById("contact-form").addEventListener("submit", function (event) {
        event.preventDefault(); // Impede o recarregamento da página

        const nome = document.getElementById("nome").value;
        const email = document.getElementById("email").value;
        const mensagem = document.getElementById("mensagem").value;

        // Enviar os dados para o EmailJS
        emailjs.send("SEU_SERVICE_ID", "SEU_TEMPLATE_ID", {
            nome: nome,
            email: email,
            mensagem: mensagem,
        }).then(
            function (response) {
                alert("Mensagem enviada com sucesso!");
                console.log("SUCCESS!", response.status, response.text);
            },
            function (error) {
                alert("Erro ao enviar mensagem. Tente novamente.");
                console.log("FAILED...", error);
            }
        );
    });
});
