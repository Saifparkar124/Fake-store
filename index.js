let login = document.getElementById("login");
let isLoggedIn = localStorage.getItem("userid");

if (isLoggedIn) {
  login.innerHTML = `<button onclick="logout()" class="px-4 h-[45px] text-l rounded text-white bg-red-600 font-medium">Log out</button>
`
} else {
  login.innerHTML = `<button class="px-4 h-[45px] text-l rounded text-black  font-medium"><a href="../auth/login.html">Log In</a></button>
  <button class="px-4 h-[45px] text-l rounded text-white font-medium bg-blue-400">Sign Up</button>
`;
}

function logout(){
  localStorage.removeItem('userid');
  window.location.reload();
}
document.addEventListener("DOMContentLoaded", function () {
  showCategory("All"); // Load products of the first category
});

function showCategory(category) {
  const productContainer = document.getElementById("productContainer");
  productContainer.innerHTML = "";
  let apiUrl;

  if (category == "All") {
    apiUrl = "https://fakestoreapi.com/products";
    document
      .getElementById("allcategory")
      .classList.add("bg-blue-600", "text-white");
    document
      .getElementById("jewelery")
      .classList.remove("bg-blue-600", "text-white");
    document
      .getElementById("mencloth")
      .classList.remove("bg-blue-600", "text-white");
    document
      .getElementById("womencloth")
      .classList.remove("bg-blue-600", "text-white");

    document
      .getElementById("electronics")
      .classList.remove("bg-blue-600", "text-white");
  } else if (category == "electronics") {
    apiUrl = "https://fakestoreapi.com/products/category/electronics";
    document
      .getElementById("electronics")
      .classList.add("bg-blue-600", "text-white");
    document
      .getElementById("allcategory")
      .classList.remove("bg-blue-600", "text-white");
    document
      .getElementById("jewelery")
      .classList.remove("bg-blue-600", "text-white");
    document
      .getElementById("mencloth")
      .classList.remove("bg-blue-600", "text-white");
    document
      .getElementById("womencloth")
      .classList.remove("bg-blue-600", "text-white");
  } else if (category == "jewelery") {
    apiUrl = "https://fakestoreapi.com/products/category/jewelery";
    document
      .getElementById("electronics")
      .classList.remove("bg-blue-600", "text-white");
    document
      .getElementById("allcategory")
      .classList.remove("bg-blue-600", "text-white");
    document
      .getElementById("jewelery")
      .classList.add("bg-blue-600", "text-white");
    document
      .getElementById("mencloth")
      .classList.remove("bg-blue-600", "text-white");
    document
      .getElementById("womencloth")
      .classList.remove("bg-blue-600", "text-white");
  } else if (category == "mencloth") {
    apiUrl = "https://fakestoreapi.com/products/category/men's%20clothing";
    document
      .getElementById("electronics")
      .classList.remove("bg-blue-600", "text-white");
    document
      .getElementById("allcategory")
      .classList.remove("bg-blue-600", "text-white");
    document
      .getElementById("jewelery")
      .classList.remove("bg-blue-600", "text-white");
    document
      .getElementById("mencloth")
      .classList.add("bg-blue-600", "text-white");
    document
      .getElementById("womencloth")
      .classList.remove("bg-blue-600", "text-white");
  } else if (category == "womencloth") {
    apiUrl = "https://fakestoreapi.com/products/category/women's%20clothing";
    document
      .getElementById("electronics")
      .classList.remove("bg-blue-600", "text-white");
    document
      .getElementById("allcategory")
      .classList.remove("bg-blue-600", "text-white");
    document
      .getElementById("jewelery")
      .classList.remove("bg-blue-600", "text-white");
    document
      .getElementById("mencloth")
      .classList.remove("bg-blue-600", "text-white");
    document
      .getElementById("womencloth")
      .classList.add("bg-blue-600", "text-white");
  }

  fetch(apiUrl)
    .then(async(res) => res.json())
    .then(async(data) => {
      data.forEach((product) => {
        const anchorTag = document.createElement("a");
        anchorTag.href = `single.html?pid=${product.id}`; // Set the URL for the product detail page
        anchorTag.classList.add("group","rounded-lg");

        const imageDiv = document.createElement("div");
        imageDiv.classList.add(
          "aspect-h-1",
          "aspect-w-1",
          "w-full",
          "overflow-hidden",
          "rounded-lg",
          "bg-gray-200",
          "xl:aspect-h-8",
          "xl:aspect-w-7"
        );

        const image = document.createElement("img");
        image.src = product.image;
        image.alt = product.title;
        image.classList.add(
          "h-60",
          "w-full",
          "bg-white",
          "object-contain",
          "object-center",
          "group-hover:opacity-75"
        );

        const productName = document.createElement("h3");
        productName.textContent = product.title;
        productName.classList.add("mt-4", "text-sm","mx-2", "text-gray-700");

        const productPrice = document.createElement("p");
        productPrice.textContent = "$" + product.price;
        productPrice.classList.add(
          "mt-1",
          "mx-2",
          "text-lg",
          "font-medium",
          "text-gray-900"
        );

        // Append elements to the anchor tag
        imageDiv.appendChild(image);
        anchorTag.appendChild(imageDiv);
        anchorTag.appendChild(productName);
        anchorTag.appendChild(productPrice);

        // Append anchor tag to the product container
        productContainer.appendChild(anchorTag);
      });
    })
    .catch((e) => console.log(e));
}
