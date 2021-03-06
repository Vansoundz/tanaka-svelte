<script lang="ts">
  import {
    deleteProduct,
    getProducts,
  } from "../../../services/product.service";
  import { productStore } from "../../../store/products";
  import { success, danger } from "svelte-toasty";

  const deleteProd = async (id: string) => {
    let del = confirm("Do you want to delete this product?");
    if (!del) return;

    try {
      let res = await deleteProduct(id);
      if (res) {
        success("Product deleted successfully", 2000);
        res = await getProducts();
        if (res.products) {
          productStore.initProducts(res.products);
        }
      }
    } catch (err) {
      danger("Error deleting product", 2000);
      // console.log(error);
    }
  };
</script>

<main>
  <div class="first">
    <button class="add-product">
      <i class="material-icons">add</i>
      <span>Add Category</span>
    </button>
    <a href="/admin/products/create"
      ><button class="add-product">
        <i class="material-icons">add</i>
        <span>Add Product</span>
      </button></a
    >
  </div>
  <h4>Products</h4>
  <div class="products">
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
          <div>{product?.category?.name}</div>
          <div>
            <a href="/admin/products/edit/{product._id}"
              ><i class="material-icons">edit</i></a
            >
          </div>
          <div>
            <i on:click={() => deleteProd(product._id)} class="material-icons"
              >delete</i
            >
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
    border: 1px solid purple;
    color: purple;
    padding: 8px;
    margin-left: 8px;
  }

  button:hover {
    background: purple;
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
</style>