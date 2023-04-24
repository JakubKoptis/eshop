AOS.init();

function addToCart(itemName, itemPrice) {
  let cartItem = null;
  let cart = JSON.parse(localStorage.getItem('cart')) || [];

  // Check if item already exists in cart
  for (let i = 0; i < cart.length; i++) {
    if (cart[i].name === itemName) {
      cartItem = cart[i];
      cartItem.quantity++;
      break;
    }
  }

  // If item doesn't exist, create new cart item
  if (!cartItem) {
    cartItem = {
      name: itemName,
      price: itemPrice,
      quantity: 1
    };
    cart.push(cartItem);
  }

  // Update cart in local storage
  localStorage.setItem('cart', JSON.stringify(cart));

  // Update cart modal
  let cartTable = document.querySelector('#basketModal tbody');
  let totalPrice = 0;
  cartTable.innerHTML = '';

  for (let i = 0; i < cart.length; i++) {
    let item = cart[i];
    let row = document.createElement('tr');
    let nameCell = document.createElement('td');
    let priceCell = document.createElement('td');
    let removeCell = document.createElement('td');
    let removeBtn = document.createElement('button');

    nameCell.textContent = item.name;
    priceCell.textContent = item.price * item.quantity + ' Kč';
    totalPrice += item.price * item.quantity;

    removeBtn.textContent = 'Odebrat';
    removeBtn.classList.add('btn', 'btn-danger', 'btn-sm');
    removeBtn.addEventListener('click', function() {
      cart.splice(i, 1);
      localStorage.setItem('cart', JSON.stringify(cart));
      addToCart(itemName, itemPrice);
    });

    removeCell.appendChild(removeBtn);
    row.appendChild(nameCell);
    row.appendChild(priceCell);
    row.appendChild(removeCell);
    cartTable.appendChild(row);
  }

  let totalPriceCell = document.createElement('td');
  let totalPriceRow = document.createElement('tr');
  let emptyCartRow = document.createElement('tr');

  if (cart.length === 0) {
    totalPriceCell.textContent = 'Košík je prázdný.';
    emptyCartRow.appendChild(totalPriceCell);
    cartTable.appendChild(emptyCartRow);
  } else {
    totalPriceCell.textContent = 'Celkem: ' + totalPrice + ' Kč';
    totalPriceRow.appendChild(document.createElement('td'));
    totalPriceRow.appendChild(totalPriceCell);
    totalPriceRow.appendChild(document.createElement('td'));
    cartTable.appendChild(totalPriceRow);
  }
}

// Přidání třídy animate__fadeInLeft k prvkům v sekci home
document.addEventListener("DOMContentLoaded", function(event) { 
  var homeElements = document.getElementById("home").querySelectorAll(".animate__animated");
  homeElements.forEach(function(element) {
    element.classList.add("animate__fadeInLeft");
  });
});

