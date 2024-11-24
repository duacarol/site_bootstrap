// Adicionar item à sacola
function addToCart(product) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  // Verifica se o produto já está na sacola
  let existingProduct = cart.find((item) => item.id === product.id);
  if (existingProduct) {
    existingProduct.quantity += 1;
  } else {
    cart.push(product);
  }

  localStorage.setItem("cart", JSON.stringify(cart));

  // Exibir o modal do Bootstrap
  const modalMessage = document.getElementById("modal-message");
  modalMessage.innerText = `${product.name} foi adicionado à sua sacola!`;

  const modal = new bootstrap.Modal(document.getElementById("addToCartModal"));
  modal.show();
}

// Atribui a função de adicionar à sacola todos os botões com a classe 'add-to-cart'
document.querySelectorAll(".add-to-cart").forEach((button) => {
  button.addEventListener("click", function () {
    const product = {
      id: this.dataset.id,
      name: this.dataset.name,
      price: parseFloat(this.dataset.price),
      quantity: 1,
      img: this.dataset.img,
    };

    addToCart(product);
  });
});

// Função para carregar os itens da sacola
function loadCartItems() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let cartItemsContainer = document.getElementById("cart-items");
  let total = 0;

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = `
            <p class='text-center'>Sua sacola está vazia!</p>
            <div class="text-center">
    <a href="produtos.html" id='add-items-button' class='btn btn-danger'>Adicionar Itens</a>
</div>
        `;
    document.getElementById("cart-summary").style.display = "none"; // Esconder resumo do pedido
    return;
  }

  cartItemsContainer.innerHTML = `
        <table class="table cart-table">
            <thead>
                <tr>
                    <th></th>
                    <th>Produto</th>
                    <th>Preço</th>
                    <th>Quantidade</th>
                    <th>Subtotal</th>                    
                </tr>
            </thead>
            <tbody>
            ${cart
              .map((item) => {
                const subtotal = item.price * item.quantity;
                total += subtotal;
                return `
                    <tr>
                        <td style="vertical-align: middle"><button class="btn btn-close remove-item" data-id="${
                          item.id
                        }"></button></td>
                        <td><img src="${item.img}" alt="${
                  item.name
                }" class="img-fluid d-none d-lg-inline" style="width: 70px; height: 70px;"> ${
                  item.name
                }</td>
                        <td style="vertical-align: middle">R$ ${item.price
                          .toFixed(2)
                          .replace(".", ",")}</td>
                        <td style="vertical-align: middle">
                            <input type="number" class="form-control quantity-input" value="${
                              item.quantity
                            }" min="1" data-id="${item.id}">
                        </td>
                        <td style="vertical-align: middle">R$ ${subtotal
                          .toFixed(2)
                          .replace(".", ",")}</td>                        
                    </tr>
                `;
              })
              .join("")}
            </tbody>
        </table>
    `;

  document.getElementById("cart-total").innerText = `R$ ${total
    .toFixed(2)
    .replace(".", ",")}`;
  document.getElementById("cart-summary").style.display = "block"; // Mostrar resumo do pedido

  // Adiciona evento para atualizar a quantidade
  document.querySelectorAll(".quantity-input").forEach((input) => {
    input.addEventListener("change", function () {
      const updatedQuantity = parseInt(this.value);
      const productId = this.dataset.id;
      let cart = JSON.parse(localStorage.getItem("cart")) || [];
      const product = cart.find((item) => item.id === productId);
      if (product) {
        product.quantity = updatedQuantity;
        localStorage.setItem("cart", JSON.stringify(cart));
        loadCartItems(); // Atualiza a exibição da sacola
      }
    });
  });

  // Adiciona evento para remover o item
  document.querySelectorAll(".remove-item").forEach((button) => {
    button.addEventListener("click", function () {
      const productId = this.dataset.id;
      let cart = JSON.parse(localStorage.getItem("cart")) || [];
      cart = cart.filter((item) => item.id !== productId); // Remove o produto da sacola
      localStorage.setItem("cart", JSON.stringify(cart));
      loadCartItems(); // Atualiza a exibição da sacola
    });
  });
}

// Carrega os itens da sacola ao carregar a página
window.onload = loadCartItems;

// Manipulação do formulário de contato
const form = document.getElementById("contactForm");
const modal = new bootstrap.Modal(document.getElementById("successModal"));
const fecharModal = document.getElementById("fecharModal");

form.addEventListener("submit", function (event) {
  event.preventDefault();

  // Mostra o modal ao enviar o formulário
  modal.show();

  // Simula o envio do formulário
  form.reset(); // Limpa os campos do formulário após exibir o modal
});

// Quando o usuário fecha o modal, limpa o formulário
fecharModal.addEventListener("click", function () {
  modal.hide(); // Fecha o modal
  form.reset(); // Limpa o formulário novamente, caso o usuário feche o modal
});
