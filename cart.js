
function generateCartItemHTML(image, title, price, quantity) {
  return `
        <tr>
            <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                    <div class="flex-shrink-0 h-10 w-10">
                        <img class="h-10 w-10 rounded-full" src="${image}" alt="">
                    </div>
                    <div class="ml-4">
                        <div class="text-sm font-medium text-gray-900">
                            ${title}
                        </div>
                    </div>
                </div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
                <input type="number" class="w-20 px-3 py-1 border border-gray-300 rounded-md" value="${quantity}">
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
               $${price}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button class="text-red-600 hover:text-red-900">Remove</button>
            </td>
        </tr>
    `;
}

// get uid
const uid = localStorage.getItem("userid");
const cartItemsContainer = document.getElementById("cart");

fetch(`https://fakestoreapi.com/carts/${uid}`)
  .then((res) => res.json())
  .then((data) => {
    const product = data.products;
    console.log(product);
    let cartItemsHTML = "";
    product.forEach((element) => {
      const id = element.productId;
      const quantity = element.quantity;
      fetch(`https://fakestoreapi.com/products/${id}`)
        .then((res) => res.json())
        .then((data) => {
          var image = data.image;
          var title = data.title;
          var price = data.price;
          cartItemsHTML += generateCartItemHTML(image, title, price, quantity);
          cartItemsContainer.innerHTML = cartItemsHTML;
        });
    });
  });
