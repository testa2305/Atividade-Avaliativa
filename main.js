import "./style.css";

const products = [
  {
    id: 1,
    name: "Smartphone Galaxy X",
    category: "smartphones",
    categoryName: "Smartphones",
    price: 1899.9,
    icon: "📱",
    description: "Smartphone moderno com câmera de alta qualidade."
  },
  {
    id: 2,
    name: "iPhone Pro Max",
    category: "smartphones",
    categoryName: "Smartphones",
    price: 5299.9,
    icon: "📱",
    description: "Desempenho avançado e excelente experiência."
  },
  {
    id: 3,
    name: "Notebook Ultra",
    category: "notebooks",
    categoryName: "Notebooks",
    price: 3499.9,
    icon: "💻",
    description: "Notebook rápido para estudos e trabalho."
  },
  {
    id: 4,
    name: "Notebook Gamer",
    category: "notebooks",
    categoryName: "Notebooks",
    price: 5799.9,
    icon: "🖥️",
    description: "Alto desempenho para jogos e aplicações pesadas."
  },
  {
    id: 5,
    name: "Fone Bluetooth",
    category: "acessorios",
    categoryName: "Acessórios",
    price: 249.9,
    icon: "🎧",
    description: "Som de qualidade com conexão sem fio."
  },
  {
    id: 6,
    name: "Smartwatch Fit",
    category: "acessorios",
    categoryName: "Acessórios",
    price: 399.9,
    icon: "⌚",
    description: "Monitore suas atividades e receba notificações."
  }
];

let cart = [];

const productList = document.querySelector("#productList");
const searchInput = document.querySelector("#searchInput");
const categoryFilter = document.querySelector("#categoryFilter");

const cartButton = document.querySelector("#cartButton");
const cartCount = document.querySelector("#cartCount");

const cartModal = document.querySelector("#cartModal");
const closeModal = document.querySelector("#closeModal");

const cartItems = document.querySelector("#cartItems");
const cartTotal = document.querySelector("#cartTotal");

function formatPrice(price) {
  return price.toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
}

function renderProducts() {
  const search = searchInput.value.toLowerCase();
  const category = categoryFilter.value;

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(search);

    const matchesCategory =
      category === "todos" || product.category === category;

    return matchesSearch && matchesCategory;
  });

  if (filteredProducts.length === 0) {
    productList.innerHTML = `
      <p>
        Nenhum produto encontrado.
      </p>
    `;

    return;
  }

  productList.innerHTML = filteredProducts
    .map(
      (product) => `
        <article class="product">
          <div class="product-image">
            ${product.icon}
          </div>

          <div class="product-info">
            <span class="product-category">
              ${product.categoryName}
            </span>

            <h3>${product.name}</h3>

            <p class="product-description">
              ${product.description}
            </p>

            <div class="price">
              R$ ${formatPrice(product.price)}
            </div>

            <button
              class="add-button"
              data-id="${product.id}"
            >
              Adicionar ao carrinho
            </button>
          </div>
        </article>
      `
    )
    .join("");

  document.querySelectorAll(".add-button").forEach((button) => {
    button.addEventListener("click", () => {
      addToCart(Number(button.dataset.id));
    });
  });
}

function addToCart(productId) {
  const product = products.find((item) => item.id === productId);

  if (!product) {
    return;
  }

  cart.push(product);

  updateCart();

  alert(`${product.name} foi adicionado ao carrinho!`);
}

function removeFromCart(index) {
  cart.splice(index, 1);

  updateCart();
}

function updateCart() {
  cartCount.textContent = cart.length;

  if (cart.length === 0) {
    cartItems.innerHTML = `
      <p>Seu carrinho está vazio.</p>
    `;

    cartTotal.textContent = "0,00";
    return;
  }

  cartItems.innerHTML = cart
    .map(
      (product, index) => `
        <div class="cart-product">
          <div>
            <strong>${product.name}</strong>
            <p>R$ ${formatPrice(product.price)}</p>
          </div>

          <button
            class="remove-button"
            data-index="${index}"
          >
            Remover
          </button>
        </div>
      `
    )
    .join("");

  const total = cart.reduce(
    (sum, product) => sum + product.price,
    0
  );

  cartTotal.textContent = formatPrice(total);

  document.querySelectorAll(".remove-button").forEach((button) => {
    button.addEventListener("click", () => {
      removeFromCart(Number(button.dataset.index));
    });
  });
}

searchInput.addEventListener("input", renderProducts);

categoryFilter.addEventListener("change", renderProducts);

cartButton.addEventListener("click", () => {
  cartModal.classList.remove("hidden");
  updateCart();
});

closeModal.addEventListener("click", () => {
  cartModal.classList.add("hidden");
});

cartModal.addEventListener("click", (event) => {
  if (event.target === cartModal) {
    cartModal.classList.add("hidden");
  }
});

renderProducts();
updateCart();
