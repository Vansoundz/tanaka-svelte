<script lang="ts">
  import {
    deleteCategory,
    deleteProduct,
    getCategories,
    getProducts,
  } from "../../../services/product.service";
  import { getId } from "../../../services/util";
  import { productStore } from "../../../store/products";
  import { toasts } from "../../../store/toasts";

  const deleteProd = async (id: string) => {
    let del = confirm("Do you want to delete this product?");
    if (!del) return;

    try {
      let res = await deleteProduct(id);
      if (res) {
        toasts.toast({
          id: getId(),
          text: "Product deleted successfully",
          type: "s",
        });
        res = await getProducts();
        if (res.products) {
          productStore.initProducts(res.products);
        }
      }
    } catch (err) {
      toasts.toast({ id: getId(), text: "Error deleting product", type: "d" });
      // console.log(error);
    }
  };

  const deleteCat = async (id: string) => {
    let del = confirm("Do you want to delete this category?");
    if (!del) return;

    try {
      let res = await deleteCategory(id);
      if (res) {
        toasts.toast({
          id: getId(),
          text: "Category deleted successfully",
          type: "s",
        });
        res = await getCategories();
        if (res.categories) {
          productStore.initCategories(res.categories);
        }
      }
    } catch (err) {
      toasts.toast({ id: getId(), text: "Error deleting category", type: "d" });
      // console.log(error);
    }
  };
</script>

<main>
  <div class="first">
    <a href="/admin/products/create-category">
      <button class="add-product">
        <i class="material-icons">add</i>
        <span>Add Category</span>
      </button>
    </a>
  </div>
  <h4>Categories</h4>
  <div class="categories">
    <div class="header grid">
      <div>#</div>
      <div>Name</div>
      <div>Edit</div>
      <div>Delete</div>
    </div>
    <div class="body">
      {#each $productStore.categories as item (item._id)}
        <div class="grid category">
          <div>
            {item._id.slice(item._id.length - 6)}
          </div>
          <div>{item.name}</div>

          <div>
            <a href="/admin/products/edit/category/{item._id}">
              <i class="material-icons"> edit</i></a
            >
          </div>
          <div>
            <i on:click={() => deleteCat(item._id)} class="material-icons">
              delete
            </i>
          </div>
        </div>
      {/each}
    </div>
  </div>
  <div class="first">
    <a href="/admin/products/create">
      <button class="add-product">
        <i class="material-icons">add</i>
        <span>Add Product</span>
      </button>
    </a>
  </div>
  <h4>Products</h4>
  <div class="products">
    <div class="desktop">
      <div class="header grid">
        <div>#</div>
        <div>Name</div>
        <div>Price</div>
        <div>Quantity</div>
        <div>Category</div>
        <div>Sizes</div>
        <div>Edit</div>
        <div>Delete</div>
      </div>

      <div class="body">
        {#each $productStore.products as product (product._id)}
          <div class="grid product">
            <div>
              <img
                src={product.image}
                alt={product.name}
                width="40"
                height="40"
              />
            </div>
            <div>{product.name}</div>
            <div>{product.price}</div>
            <div>{product.quantity}</div>
            <div>
              {#each product.sizes as size (size)}
                <span>
                  {size},
                </span>
              {/each}
            </div>
            <div>{product.category.name}</div>
          </div>
        {/each}
      </div>
    </div>
    <div class="mobile">
      {#each $productStore.products as product (product._id)}
        <div class="product">
          <div class="info">
            <div>
              <span>
                <img
                  src={product.image}
                  alt={product.name}
                  width="40"
                  height="40"
                /></span
              >
              <span style="margin-left: 24px"><h4>{product.name}</h4></span>
            </div>

            <div>
              <h6>Price:</h6>
              &nbsp;
              <span>{product.price}</span>
            </div>
            <div>
              <h6>Quantity:</h6>
              &nbsp;
              <span>{product.quantity}</span>
            </div>
          </div>
          <div class="sizes">
            <h6>Sizes:</h6>
            &nbsp;
            <div>
              {#each product.sizes as size (size)}
                <span>
                  {size},
                </span>
              {/each}
            </div>
          </div>
          <div class="actions">
            <div>
              <a href="/admin/products/edit/{product._id}">
                <i style="color: #40aeec" class="material-icons">edit</i>
                <span style="color: #40aeec">Edit</span>
              </a>
            </div>
            <div>
              <i
                style="color: #dc2020; margin-left: 32px"
                on:click={() => deleteProd(product._id)}
                class="material-icons">delete</i
              >
              <span style="color: #dc2020">Delete</span>
            </div>
          </div>
        </div>
      {/each}
    </div>
  </div>
</main>

<style>
  main {
    padding: 36px 24px;
  }

  .desktop {
    display: block;
  }

  .mobile {
    display: none;
  }

  .first {
    margin: 16px 0;
    display: flex;
    justify-content: flex-end;
  }

  button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 140px;
    border: 1px solid var(--black);
    color: var(--black);
    padding: 8px;
    margin-left: 8px;
  }

  button:hover {
    background: var(--black);
  }

  button:hover > * {
    color: white;
  }

  .header {
    margin-bottom: 16px;
  }
  .grid {
    display: grid;
    grid-template-columns: 1fr 2fr 1fr 1fr 1fr 1fr 1fr 1fr;
    align-items: center;
  }

  .categories .grid {
    grid-template-columns: 2fr 2fr 1fr 1fr;
  }

  .product {
    padding: 8px;
    margin: 16px 0;
    background: #fff;
  }

  .actions,
  .actions *,
  .info > div,
  .sizes,
  .sizes * {
    display: flex;
    align-items: center;
  }

  .sizes {
    margin: 8px 0;
  }

  .material-icons {
    font-size: 20px;
  }

  @media screen and (max-width: 600px) {
    .desktop {
      display: none;
    }

    .mobile {
      display: block;
    }
    .categories .grid {
      grid-template-columns: 1fr 2fr 1fr 1fr;
    }
  }
</style>
