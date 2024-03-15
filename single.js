let login = document.getElementById("login");
let isLoggedIn = localStorage.getItem("userid");

if (isLoggedIn) {
  login.innerHTML = `<button onclick="logout()" class="px-4 h-[45px] text-l rounded text-white bg-red-600 font-medium">Log out</button>
`;
} else {
  login.innerHTML = `<button class="px-4 h-[45px] text-l rounded text-black  font-medium"><a href="../auth/login.html">Log In</a></button>
  <button class="px-4 h-[45px] text-l rounded text-white font-medium bg-blue-400">Sign Up</button>
`;
}

function logout() {
  localStorage.removeItem("userid");
  window.location.reload();
}

function getQueryParam(name) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(name);
}

// Retrieve the product ID from the query parameter
const productId = getQueryParam("pid");



fetch(`https://fakestoreapi.com/products/${productId}`)
  .then((res) => res.json())
  .then((json) => {
    // Display the retrieved data in the HTML
    const priodimg = document.getElementById("pimg");
    const title = document.getElementById("title");
    const price = document.getElementById("price");
    const desc = document.getElementById("desc");

    priodimg.src = json.image;
    title.textContent = json.title;
    price.textContent = `$ ${json.price}`;
    desc.textContent = json.description;

    // Add to Cart Button functionality
  })
  .catch((err) => console.error(err));

// Quantity
function decrement(e) {
  const btn = e.target.parentNode.parentElement.querySelector(
    'button[data-action="decrement"]'
  );
  const target = btn.nextElementSibling;
  let value = Number(target.value);
  value--;
  if (value >= 1) {
    target.value = value;
  }
}

function increment(e) {
  const btn = e.target.parentNode.parentElement.querySelector(
    'button[data-action="decrement"]'
  );
  const target = btn.nextElementSibling;
  let value = Number(target.value);
  value++;
  target.value = value;
}

const decrementButtons = document.querySelectorAll(
  `button[data-action="decrement"]`
);

const incrementButtons = document.querySelectorAll(
  `button[data-action="increment"]`
);

decrementButtons.forEach((btn) => {
  btn.addEventListener("click", decrement);
});

incrementButtons.forEach((btn) => {
  btn.addEventListener("click", increment);
});

// End of Quantity Increment/Decrement

function Addcart() {
  const date = Date.now();
  console.log(productId)
  const quantity = document.getElementById("quantity").value;
  fetch("https://fakestoreapi.com/carts", {
    method: "POST",
    body: JSON.stringify({
      userId: 1,
      date: "2020-02-03",
      products: [{ productId: productId, quantity: quantity },{ productId: productId, quantity: quantity }],
    }),
  })
    .then((res) => res.json())
    .then((json) => console.log(json))
    .catch((error) => {
      console.log(`Error: ${error}`);
    });
}
