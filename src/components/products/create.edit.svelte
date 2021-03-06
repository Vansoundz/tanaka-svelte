<script lang="ts">
  import type { Product } from "../../models/product.model";
  import {
    createProduct,
    editProduct,
    getProducts,
  } from "../../services/product.service";
  import { getId } from "../../services/util";
  import { productStore } from "../../store/products";
  import { toasts } from "../../store/toasts";
  import Loader from "../loader.svelte";

  export let toEdit: Product;
  export let edit: boolean;
  let category: string;

  let product: Product = {};
  let errors;
  let load = false;

  let files: FileList;

  $: {
    if (toEdit && edit) {
      product = toEdit;
      category = product.category._id;
    }
  }

  const submit = async (e: Event) => {
    e.preventDefault();

    if (!category) return;

    try {
      load = true;
      let formData: FormData = new FormData();

      // console.log(Object.keys(product));
      //

      for (let key of Object.keys(product)) {
        if (product[key] && key !== "category") {
          formData.append(key, product[key]);
        }
      }

      formData.append("category", category);

      if (files) {
        formData.append("image", files[0]);
      }

      let data;
      if (edit) data = await editProduct(product._id, formData);
      else data = await createProduct(formData);
      if (data) {
        if (edit)
          toasts.toast({
            id: getId(),
            text: "Product edited successfully",
            type: "s",
          });
        else
          toasts.toast({
            id: getId(),
            text: "Product created successfully",
            type: "s",
          });

        product = {};
        category = "";
        files = null;
        let res = await getProducts();
        if (res.products) {
          productStore.initProducts(res.products);
        }
      }
      load = false;
    } catch (error) {
      if (edit)
        toasts.toast({ id: getId(), text: "Error editing product", type: "w" });
      else
        toasts.toast({
          id: getId(),
          text: "Error creating product",
          type: "w",
        });
      load = false;
      errors = error;
    }
  };
</script>

{#if load}
  <Loader />
{/if}

<!-- <ToastContainer toasts={$toasts} placement="top-right" let:data>
  <FlatToast {data} />
</ToastContainer> -->

<main>
  <form on:submit={submit}>
    <h4>
      {#if edit}
        Edit product
      {:else}
        Create Product
      {/if}
    </h4>
    <div>
      <div>
        <label for="name">Name</label>
      </div>
      <div><input type="text" bind:value={product.name} /></div>
      {#if errors?.find((e) => e.param === "name")}
        <div class="errors">
          <span />
          <div class="error">{errors?.find((e) => e.param === "name").msg}</div>
        </div>
      {/if}
    </div>
    <div>
      <div>
        <label for="price">Price</label>
      </div>
      <div><input type="number" bind:value={product.price} /></div>
      {#if errors?.find((e) => e.param === "price")}
        <div class="errors">
          <span />
          <div class="error">
            {errors?.find((e) => e.param === "price").msg}
          </div>
        </div>
      {/if}
    </div>
    <div>
      <div>
        <label for="quantity">Quantity</label>
      </div>
      <div><input type="number" bind:value={product.quantity} /></div>
      {#if errors?.find((e) => e.param === "quantity")}
        <div class="errors">
          <span />
          <div class="error">
            {errors?.find((e) => e.param === "quantity").msg}
          </div>
        </div>
      {/if}
    </div>
    <div>
      <div>
        <label for="quantity">Sizes</label>
      </div>
      <div><input type="text" bind:value={product.sizes} /></div>
      {#if errors?.find((e) => e.param === "sizes")}
        <div class="errors">
          <span />
          <div class="error">
            {errors?.find((e) => e.param === "sizes").msg}
          </div>
        </div>
      {/if}
    </div>
    <div>
      <div>
        <label for="description">Description</label>
      </div>
      <div>
        <textarea bind:value={product.description} rows="2" />
      </div>
      {#if errors?.find((e) => e.param === "description")}
        <div class="errors">
          <span />
          <div class="error">
            {errors?.find((e) => e.param === "description").msg}
          </div>
        </div>
      {/if}
    </div>
    <div>
      <div>
        <label for="category">Category</label>
      </div>
      <div>
        <select bind:value={category}>
          <option disabled value={undefined}>Select category</option>
          {#each $productStore.categories as cat (cat._id)}
            <option value={cat._id}>{cat.name}</option>
          {/each}
        </select>
      </div>
      {#if errors?.find((e) => e.param === "category")}
        <div class="errors">
          <span />
          <div class="error">
            {errors?.find((e) => e.param === "category").msg}
          </div>
        </div>
      {/if}
    </div>
    <div>
      <div>
        <label for="files">
          {#if files}
            <div>Selected files</div>
          {:else}
            <div>Select files</div>
          {/if}
        </label>
      </div>
      <div>
        {#if files}
          <div>
            {#each files as file (file.name + file.size)}
              <span class="img-file">
                <img
                  width="50"
                  height="50"
                  src={URL.createObjectURL(file)}
                  alt={file.name}
                />
                <!-- <i
                  class="material-icons"
                  on:click={(e) => {

                    let f = files.filter((fl) => fl.name === file.name);
                  }}>close</i
                > -->
              </span>
            {/each}
          </div>
        {:else}
          <input
            type="file"
            multiple
            on:change={(e) => {
              // @ts-ignore
              if (e.target?.files) {
                // @ts-ignore
                files = e.target.files;
              }
            }}
            id="files"
          />
        {/if}
      </div>
      {#if errors?.find((e) => e.param === "image")}
        <div class="errors">
          <span />
          <div class="error">
            {errors?.find((e) => e.param === "image").msg}
          </div>
        </div>
      {/if}
    </div>
    <div>
      <button> Create </button>
    </div>
  </form>
</main>

<style>
  main {
    display: flex;
    justify-content: center;
  }

  form {
    min-width: 400px;
    margin-top: 24px;
    padding: 16px;
    background: #fff;
  }

  input,
  select,
  textarea {
    padding: 8px;
    border: 1px solid #ddd;
    width: 100%;
  }

  .error {
    margin-top: 4px;
    background: #e69f9f47;
    padding: 0 4px;
    color: red;
    font-weight: 400;
  }

  .img-file {
    position: relative;
  }

  /* .img-file i {
    position: absolute;
    right: 0;
  } */

  input:focus,
  select:focus,
  textarea:focus {
    border: 1px solid rebeccapurple;
  }

  button {
    padding: 8px 16px;
    display: block;
    margin: 8px auto;
    cursor: pointer;
    background: rebeccapurple;
    color: white;
  }

  /* .error {
    margin-top: 4px;
    background: #e69f9f47;
    padding: 0 4px;
    margin-left: 8px;
    color: red;
    font-weight: 400;
  } */
</style>
