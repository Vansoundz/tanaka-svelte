<script lang="ts">
  import { cartStore } from "../store/cart";
  import { flip } from "svelte/animate";
  import type { Customer } from "../models/customer.model";
  import { placeOrder } from "../services/order.service";
  import Loader from "../components/loader.svelte";

  $: total = ((): number => {
    let total = 0;
    $cartStore.products.forEach(
      (product) => (total += product?.local_quantity * product?.price)
    );
    return total;
  })();
  let loading = false;
  let submitted = false;

  const customer: Customer = {};

  const completeOrder = async () => {
    if (!Object.keys(customer).length) {
      return;
    }
    loading = true;
    let resp = await placeOrder($cartStore.products, customer);
    loading = false;
    if (resp.order) {
      submitted = true;
      cartStore.init([]);
    }
  };
</script>

<style>
  .container {
    padding: 1.5em 16px;
  }

  main,
  .container > div:first-child {
    margin: auto;
    display: block;
    max-width: 80%;
  }

  .cart {
    display: flex;
    justify-content: space-evenly;
    flex-wrap: wrap-reverse;
    align-items: flex-end;
  }

  .customer {
    min-width: 300px;
    background: #fff;
    padding: 16px;
    box-shadow: 0 0 8px #ddd;
    height: 100%;
  }

  input {
    margin: 8px 0;
    padding: 8px;
    border: 1px solid beige;
    background: beige;
    width: 100%;
  }

  input:focus {
    border: 1px solid purple;
  }

  .submit {
    margin: 8px auto;
    display: block;
    border: 1px solid #f18c12;
    padding: 6px 16px;
    border-radius: 30px;
    font-weight: bold;
    cursor: pointer;
  }

  .submit:hover {
    color: #fff;
    background-color: #f18c12;
  }

  .cart-item {
    background: #fff;
    box-shadow: 0 0 8px #ddd;
    display: flex;
    align-items: center;
    overflow: hidden;
    margin-bottom: 16px;
    max-width: 350px;
    min-width: 300px;
    height: 70px;
  }

  .c-info {
    display: flex;
    justify-content: space-between;
    padding-right: 4px;
    width: 100%;
  }

  .c-title {
    font-weight: bold;
    text-overflow: ellipsis;
  }

  .cart-item img {
    width: 70px;
    height: 70px;
  }

  .cart-item .c-info {
    margin-left: 16px;
  }

  .quantity {
    display: flex;
    align-items: center;
    margin-top: 8px;
  }

  .cart-item button {
    border: 1px solid #ddd;
    width: 30px;
    text-align: center;
    border-radius: 50%;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .quantity > *:not(:last-child) {
    margin-right: 8px;
  }

  .tick {
    color: #0af358;
    font-size: 32px;
  }

  .explore {
    cursor: pointer;
    width: 140px;
    border: 1px solid purple;
    color: purple;
    text-align: center;
    padding: 8px;
  }

  .explore:hover {
    background: purple;
    color: white;
  }

  .feedback {
    display: flex;
    flex-direction: column;
  }
</style>

{#if loading}
  <Loader />
{/if}
<div class="container">
  <div>
    <h3>Cart</h3>
  </div>
  <main>
    <div class="cart">
      {#if $cartStore.products.length > 0}
        <div class="customer">
          <h4>Shipping info</h4>
          <form on:submit|preventDefault={completeOrder}>
            <div>
              <div><label for="name"> Name: </label></div>
              <div>
                <input
                  bind:value={customer.name}
                  class="input"
                  type="text"
                  id="name" />
              </div>
            </div>
            <div>
              <div><label for="email"> Email: </label></div>
              <div>
                <input
                  bind:value={customer.email}
                  class="input"
                  type="email"
                  id="email" />
              </div>
            </div>
            <div>
              <div><label for="phone"> Phone: </label></div>
              <div>
                <input
                  bind:value={customer.phone}
                  class="input"
                  type="tel"
                  id="phone" />
              </div>
            </div>
            <div>
              <div><label for="location"> Address: </label></div>
              <div>
                <input
                  bind:value={customer.address}
                  class="input"
                  type="text"
                  id="location" />
              </div>
            </div>
            <div>
              <div>
                <h4>Total: {total}</h4>
              </div>
            </div>
            <div><button class="submit">Submit</button></div>
          </form>
        </div>
      {/if}
      <div class="products">
        {#if $cartStore.products.length > 0}
          {#each $cartStore.products as product (product._id)}
            <div class="cart-item" animate:flip={{ duration: 200 }}>
              <div class="cart-image"><img src={product.image} alt="" /></div>
              <div class="c-info">
                <div class="cm-info">
                  <div class="c-title">{product.name}</div>
                  <div class="c-price">Kshs {product.price}</div>
                </div>
                <div class="quantity">
                  <button on:click={() => cartStore.removeItem(product)}>
                    <i class="material-icons">remove</i>
                  </button>
                  <span>{product.local_quantity}</span>
                  <button on:click={() => cartStore.addToCart(product)}><i
                      class="material-icons">add</i></button>
                </div>
              </div>
            </div>
          {/each}
        {:else}
          <div class="feedback">
            {#if !submitted}
              <h4>You have not added any product</h4>
              <a href="explore" class="explore">Go shopping</a>
            {:else}
              <i class="material-icons tick">check_cirtcle</i>
              <h4>Thank you for shopping with us</h4>
              <a href="explore" class="explore">Continue shopping</a>
            {/if}
          </div>
        {/if}
      </div>
    </div>
  </main>
</div>
