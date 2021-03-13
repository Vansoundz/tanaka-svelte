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
</script>

{#if loading}
  <Loader />
{/if}
<div class="container">
  <main>
    <div class="cart">
      <div class="products">
        {#if $cartStore.products.length > 0}
          <h4 style="margin-bottom: 16px">Your Basket</h4>
          <div
            style="margin-bottom: 16px;padding: 8px; font-weight: bold"
            class="cart-item"
          >
            <div>#</div>
            <div>Name</div>
            <div>Price</div>
            <div>Action</div>
            <div>Total</div>
          </div>
          {#each $cartStore.products as product (product._id + Math.random())}
            <div class="cart-item" animate:flip={{ duration: 200 }}>
              <div class="cart-image"><img src={product.image} alt="" /></div>
              <!-- <div class="c-info"> -->
              <div class="cm-info">
                <div class="c-title">{product.name}</div>
              </div>
              <div class="c-price">Kshs {product.price}</div>
              <div class="quantity">
                <button on:click={() => cartStore.removeItem(product)}>
                  <i class="material-icons">remove</i>
                </button>
                <span>{product.local_quantity}</span>
                <button on:click={() => cartStore.addToCart(product)}
                  ><i class="material-icons">add</i></button
                >
              </div>
              <div class="c-price">
                Kshs {product.price * product.local_quantity}
                <!-- </div> -->
              </div>
            </div>
          {/each}
        {:else}
          <div class="feedback">
            <h4>You have not added any product</h4>
            <a href="explore" class="explore">Go shopping</a>
          </div>
        {/if}
      </div>
      {#if $cartStore.products.length > 0}
        <div class="summary">
          <h4>Cart summary</h4>
          <div class="c-summary">
            <div>
              <h5>Subtotal</h5>
              <h5>{total}</h5>
            </div>
            <div>
              <h5>Shipping</h5>
              <h5>{100}</h5>
            </div>

            <div>
              <h5>Total</h5>
              <h5>{total + 100}</h5>
            </div>
          </div>
          <div>
            <a href="/checkout">
              <button class="btn"> Proceed to checkout </button>
            </a>
          </div>
        </div>
      {/if}
    </div>
  </main>
</div>

<style>
  .container {
    padding: 1.5em 16px;
  }

  main
  /* .container > div:first-child  */ {
    margin: auto;
    display: block;
    max-width: 80%;
  }

  .cart {
    display: flex;
    justify-content: space-evenly;
    flex-wrap: wrap;
  }

  .summary {
    min-width: 250px;
    margin-top: 32px;
    padding: 0 16px;
  }

  .c-summary {
    background: #fff;
    padding: 4px;
    margin-top: 8px;
  }

  .c-summary > div {
    display: flex;
    justify-content: space-between;
    line-height: 1.6;
  }

  .c-summary > div:nth-child(2) {
    border-bottom: 1px solid #ddd;
    padding-bottom: 8px;
  }

  button {
    background: var(--yellow);
  }

  .summary button {
    margin: 16px auto;
    display: block;
    padding: 8px 24px;

    font-weight: bold;
  }

  .summary button:hover {
    background: transparent;
    border: 1px solid var(--yellow);
    color: var(--yellow);
  }

  .cart-item {
    background: #fff;
    box-shadow: 0 0 8px #ddd;
    display: grid;
    align-items: center;
    overflow: hidden;
    margin-bottom: 16px;
    max-width: 500px;
    min-width: 290px;
    grid-template-columns: 1fr 2fr 1fr 1fr 1fr;
    gap: 4px;
  }

  /* .c-info {
    display: flex;
    justify-content: space-between;
    padding-right: 4px;
    width: 100%;
  } */

  .c-title {
    font-weight: bold;
    text-overflow: ellipsis;
    font-size: 14px;
  }

  .c-price {
    font-size: 12px;
  }

  .cart-item img {
    width: 40px;
    height: 40px;
  }

  /* .cart-item .c-info {
    margin-left: 16px;
  } */

  .quantity {
    display: flex;
    align-items: center;
    border: 1px solid #ddd;
  }

  .cart-item button {
    /* border: 1px solid #ddd; */
    width: 30px;
    text-align: center;
    /* border-radius: 50%; */
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .cart-item button:first-child {
    border-right: 1px solid #ddd;
  }

  .cart-item button:last-child {
    border-left: 1px solid #ddd;
  }

  .quantity > *:not(:last-child) {
    margin-right: 8px;
  }

  .explore {
    cursor: pointer;
    width: 140px;
    border: 1px solid var(--black);
    color: var(--black);
    text-align: center;
    padding: 8px;
  }

  .explore:hover {
    background: var(--black);
    color: white;
  }

  .feedback {
    display: flex;
    flex-direction: column;
  }

  @media screen and (max-width: 600px) {
    main {
      max-width: 100%;
    }
  }
</style>
