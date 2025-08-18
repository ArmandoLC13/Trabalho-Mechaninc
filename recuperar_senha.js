document.getElementById('forgot-password-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const email = document.getElementById('email-recuperacao').value;
    alert(`Um link de recuperação de senha foi enviado para ${email}.`);
    // Aqui você adicionaria a lógica real para enviar o e-mail de recuperação
});

