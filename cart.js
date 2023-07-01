
import { products } from './product.js';

let cartItems = [];
let totalAmount = 0;
const cartItemsContainer = document.getElementById('cart-items');
const totalElement = document.querySelector('.total');

export const addToCart = (productId) => {
  const product = products.find(item => item.id === productId);
  if (product) {
    let existingItem = cartItems.find(item => item.product.id === productId);
    if (existingItem) {
      existingItem.quantity += 1;
      existingItem.total = existingItem.quantity * existingItem.product.price;
    } else {
      existingItem = {
        product,
        quantity: 1,
        total: product.price
      };
      cartItems.push(existingItem);
    }

    renderCartItems();
    calculateTotalAmount();
  }
};

export const removeItem = (productId) => {
  cartItems = cartItems.filter(item => item.product.id !== productId);
  renderCartItems();
  calculateTotalAmount();
};

export const decreaseQuantity = (productId) => {
  const item = cartItems.find(item => item.product.id === productId);
  if (item) {
    if (item.quantity > 1) {
      item.quantity--;
      item.total = item.quantity * item.product.price;
      renderCartItems();
      calculateTotalAmount();
    } else {
      removeItem(productId);
    }
  }
};

export const increaseQuantity = (productId) => {
  const item = cartItems.find(item => item.product.id === productId);
  if (item) {
    item.quantity++;
    item.total = item.quantity * item.product.price;
    renderCartItems();
    calculateTotalAmount();
  }
};

export const renderCartItems = () => {
  cartItemsContainer.innerHTML = '';
  cartItems.forEach(item => {
    const cartItem = document.createElement('div');
    cartItem.classList.add('cart-item');
    cartItem.innerHTML = `
      <p>${item.product.name}</p>
      <p>Quantity: ${item.quantity}</p>
      <p>Price: $${item.product.price}</p>
      <p>Total: $${item.total}</p>
      <button class="btn btn-sm btn-primary" onclick="decreaseQuantity(${item.product.id})">-</button>
      <button class="btn btn-sm btn-primary" onclick="increaseQuantity(${item.product.id})">+</button>
      <button class="btn btn-sm btn-danger" onclick="removeItem(${item.product.id})">Remove</button>
    `;
    cartItemsContainer.appendChild(cartItem);
  });
};

export const calculateTotalAmount = () => {
  totalAmount = cartItems.reduce((total, item) => total + item.total, 0);
  totalElement.innerText = `Total: $${totalAmount}`;
};

export const clearCart = () => {
  cartItems = [];
  renderCartItems();
  calculateTotalAmount();
};
