// Implement a button based pagination functionality in vanilla JS

// Requirement
// - Fetch a list of products and render them on a page.
// - Dummy API: https://dummyjson.com/products?limit=100
// - The number of products per page should be 10.
// - Ensure that UI reflects the current page, and users can navigate to previous and next pages.
// - Ensure that clicking on the page number button updates the displayed products accordingly.
// - Handle edge cases gracefully, such as navigating beyond the available pages.

document.addEventListener("DOMContentLoaded", function () {
  let products = [];
  let page = 1;

  const fetProducts = async () => {
    try {
      const res = await fetch("https://dummyjson.com/products?limit=100");
      const data = await res.json();
      if (data && data.products) {
        products = data.products;
        render();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const render = () => {
    const app = document.querySelector(".app");
    const productsContainer = document.createElement("div");
    productsContainer.classList.add("products");

    const pagination = document.createElement("div");
    pagination.classList.add("pagination");

    if (products.length > 0) {
      products.slice(page * 10 - 10, page * 10).forEach((product) => {
        const productElement = document.createElement("div");
        productElement.classList.add("products__single");
        productElement.innerHTML = `
        <img src=${product.thumbnail} alt=${product.title} />
        <span>${product.title}</span>
        `;

        productsContainer.appendChild(productElement);
      });

      if (page > 1) {
        const prevButton = createPaginationButton("⏪", () => {
          selectPageHandler(page - 1);
        });
        pagination.appendChild(prevButton);
      }

      // display numbers
      for (let i = 0; i < products.length / 10; i++) {
        const pageButton = createPaginationButton(
          i + 1,
          () => {
            selectPageHandler(i + 1);
          },
          page === i + 1
        );
        pagination.appendChild(pageButton);
      }

      if (page < products.length / 10) {
        const nextButton = createPaginationButton("⏩", () => {
          selectPageHandler(page + 1);
        });
        pagination.appendChild(nextButton);
      }
    }

    app.innerHTML = "";
    app.appendChild(productsContainer);
    app.appendChild(pagination);
  };

  const createPaginationButton = (text, clickHandler, isSelected = false) => {
    const button = document.createElement("button");
    button.textContent = text;
    button.addEventListener("click", clickHandler);
    if (isSelected) {
      button.classList.add("pagination__selected");
    }
    return button;
  };

  const selectPageHandler = (selectedPage) => {
    if (selectedPage >= 1 && selectedPage <= products.length / 10 - 1) {
      page = selectedPage;
      render();
    }
  };
  fetProducts();
});
