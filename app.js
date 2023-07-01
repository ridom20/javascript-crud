
import { products } from './product.js';
import { addToCart, removeItem, decreaseQuantity, increaseQuantity, renderCartItems, calculateTotalAmount, clearCart } from './cart.js';

window.removeItem = removeItem;
window.increaseQuantity = increaseQuantity;
window.decreaseQuantity = decreaseQuantity;
window.clearCart = clearCart;

export const initializeApp = () => {
  const addToCartButtons = document.querySelectorAll('.add-to-cart');
  const clearCartButton = document.getElementById('clear-cart');

  addToCartButtons.forEach(button => {
    const productId = parseInt(button.getAttribute('data-product-id'));
    button.addEventListener('click', (event) => {
      event.preventDefault();
      addToCart(productId);
    });
  });

  clearCartButton.addEventListener('click', clearCart);

  renderCartItems();
  calculateTotalAmount();
};

initializeApp();
