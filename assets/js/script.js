const form = document.getElementById('contactForm');
const modal = new bootstrap.Modal(document.getElementById('successModal'));
const fecharModal = document.getElementById('fecharModal');

// Intercepta o envio do formulário

form.addEventListener('submit', function (event) {
    event.preventDefault();  // Impede o envio imediato do formulário

    // Exibe o modal de sucesso
    modal.show();

    // Simula o envio do formulário

    // Limpa o formulário
    form.reset();  // Limpa os campos do formulário após exibir o modal
});

// Quando o usuário fecha o modal, limpa o formulário
fecharModal.addEventListener('click', function () {
    modal.hide();  // Fecha o modal
    form.reset();  // Limpa o formulário novamente, caso o usuário feche o modal
});