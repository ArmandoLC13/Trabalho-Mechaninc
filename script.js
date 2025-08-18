document.addEventListener('DOMContentLoaded', function() {
    // Seleciona todos os elementos necessários do formulário
    const nomeInput = document.getElementById('nome');
    const emailInput = document.getElementById('email');
    const telefoneInput = document.getElementById('telefone');
    const cpfInput = document.getElementById('cpf');
    const senhaInput = document.getElementById('senha');
    const form = document.getElementById('signup-form');
    const successMessage = document.getElementById('success-message');

    // Expressão regular para validar o nome (letras, acentos e espaços)
    const nomeRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/;

    // --- NOVO: 1. Validação do Nome em tempo real ---
    nomeInput.addEventListener('input', function() {
        // Verifica se o valor do campo é válido E se não está vazio
        if (!nomeRegex.test(nomeInput.value) && nomeInput.value.length > 0) {
            nomeInput.classList.add('invalid');
        } else {
            nomeInput.classList.remove('invalid');
        }
    });

    // --- 2. Validação do E-mail (borda vermelha se inválido) ---
    emailInput.addEventListener('input', function() {
        if (!emailInput.value.includes('@') && emailInput.value.length > 0) {
            emailInput.classList.add('invalid');
        } else {
            emailInput.classList.remove('invalid');
        }
    });

    // --- 3. Máscara de Telefone (XX) XXXXX-XXXX ---
    telefoneInput.addEventListener('input', function (e) {
        let value = e.target.value.replace(/\D/g, '').substring(0, 11);
        if (value.length > 7) {
            value = value.replace(/^(\d{2})(\d{5})(\d{0,4}).*/, '($1) $2-$3');
        } else if (value.length > 2) {
            value = value.replace(/^(\d{2})(\d{0,5}).*/, '($1) $2');
        } else if (value.length > 0) {
            value = value.replace(/^(\d*)/, '($1');
        }
        e.target.value = value;
    });

    // --- 4. Máscara de CPF XXX.XXX.XXX-XX ---
    cpfInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '').substring(0, 11);
        value = value.replace(/(\d{3})(\d)/, '$1.$2');
        value = value.replace(/(\d{3})(\d)/, '$1.$2');
        value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
        e.target.value = value;
    });

    // --- 5. Validação da Senha em tempo real ---
    senhaInput.addEventListener('input', function() {
        if (senhaInput.value.length < 8 && senhaInput.value.length > 0) {
            senhaInput.classList.add('invalid');
        } else {
            senhaInput.classList.remove('invalid');
        }
    });

    // --- 6. Validação no Envio do Formulário ---
    form.addEventListener('submit', function(event) {
        event.preventDefault();

        // Validações finais para todos os campos
        const isNomeValid = nomeRegex.test(nomeInput.value);
        const isEmailValid = emailInput.value.includes('@') && emailInput.value.length > 0;
        const isPasswordValid = senhaInput.value.length >= 8;

        // Verifica o nome
        if (!isNomeValid) {
            nomeInput.classList.add('invalid');
            nomeInput.focus();
            return;
        }

        // Verifica o e-mail
        if (!isEmailValid) {
            emailInput.classList.add('invalid');
            emailInput.focus();
            return;
        }

        // Verifica a senha
        if (!isPasswordValid) {
            senhaInput.classList.add('invalid');
            senhaInput.focus();
            return;
        }

        // Se tudo estiver correto, mostra a mensagem de sucesso
        console.log('Formulário enviado com sucesso!');
        successMessage.style.display = 'block';

        // Limpa o formulário e reseta os estilos após 5 segundos
        setTimeout(() => {
            successMessage.style.display = 'none';
            form.reset();
            // Garante que as classes de erro sejam removidas de todos os campos
            nomeInput.classList.remove('invalid');
            emailInput.classList.remove('invalid');
            senhaInput.classList.remove('invalid');
        }, 5000);
    });
});
