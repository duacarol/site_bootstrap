// contato.html
const form = document.getElementById('contactForm');
const modal = new bootstrap.Modal(document.getElementById('successModal'));
const fecharModal = document.getElementById('fecharModal');

form.addEventListener('submit', function (event) {
    event.preventDefault();

    modal.show();

    // Simula o envio do formulário
    form.reset();  // Limpa os campos do formulário após exibir o modal
});

// Quando o usuário fecha o modal, limpa o formulário
fecharModal.addEventListener('click', function () {
    modal.hide();  // Fecha o modal
    form.reset();  // Limpa o formulário novamente, caso o usuário feche o modal
});