fetch("https://fakestoreapi.com/products/category/men's%20clothing")
            .then((res) => res.json())
            .then((data) => {
                const productContainer = document.getElementById("productContainer");
                data.forEach((product) => {
                    const anchorTag = document.createElement("a");
                    anchorTag.href = `/single.html?pid=${product.id}`; // Set the URL for the product detail page
                    anchorTag.classList.add("group");

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
                    productName.classList.add("mt-4", "text-sm", "text-gray-700");

                    const productPrice = document.createElement("p");
                    productPrice.textContent = "$" + product.price;
                    productPrice.classList.add(
                        "mt-1",
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