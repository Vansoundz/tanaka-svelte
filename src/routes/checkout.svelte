<script lang="ts">
  import Loader from "../components/loader.svelte";
  import type { Customer } from "../models/customer.model";
  import { placeOrder } from "../services/order.service";
  import { cartStore } from "../store/cart";
  import { toasts } from "../store/toasts";

  let loading = false;
  let submitted = false;
  const customer: Customer = {};

  const completeOrder = async () => {
    if (!Object.keys(customer).length) {
      toasts.toast({ text: "Please fill shipping info", type: "w" });
      return;
    }

    try {
      loading = true;
      let resp = await placeOrder($cartStore.products, customer);
      loading = false;
      if (resp.order) {
        toasts.toast({ text: "Order placed successfully", type: "s" });
        submitted = true;
        cartStore.init([]);
      }
    } catch (error) {
      loading = false;
      submitted = false;
      toasts.toast({ text: "Error placing order", type: "d" });
    }
  };

  $: total = ((): number => {
    let total = 0;
    $cartStore.products.forEach(
      (product) => (total += product?.local_quantity * product?.price)
    );
    return total;
  })();
</script>

{#if loading}
  <Loader />
{/if}

<main>
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
              id="name"
            />
          </div>
        </div>
        <div>
          <div><label for="email"> Email: </label></div>
          <div>
            <input
              bind:value={customer.email}
              class="input"
              type="email"
              id="email"
            />
          </div>
        </div>
        <div>
          <div><label for="phone"> Phone: </label></div>
          <div>
            <input
              bind:value={customer.phone}
              class="input"
              type="tel"
              id="phone"
            />
          </div>
        </div>
        <div>
          <div><label for="location"> Address: </label></div>
          <div>
            <input
              bind:value={customer.address}
              class="input"
              type="text"
              id="location"
            />
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
  {:else}
    <div class="feedback">
      {#if submitted}
        <i class="material-icons tick">check_circle</i>
        <h4>Thank you for shopping with us</h4>
        <a href="explore" class="explore">Continue shopping</a>
      {:else}
        <h4>You have not added any product</h4>
        <a href="explore" class="explore">Go shopping</a>
      {/if}
    </div>
  {/if}
</main>

<style>
  main {
    display: flex;
    justify-content: space-evenly;
    flex-wrap: wrap;
    padding: 24px 0;
  }
  .customer {
    width: 300px;
    margin: 32px auto;
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
    border: 1px solid var(--black);
  }

  .tick {
    color: #0af358;
    font-size: 32px;
  }
  .feedback {
    display: flex;
    flex-direction: column;
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

  .submit {
    margin: 8px auto;
    display: block;
    border: 1px solid #f18c12;
    padding: 6px 16px;
    /* border-radius: 30px; */
    font-weight: bold;
    cursor: pointer;
  }

  .submit:hover {
    color: #fff;
    background-color: #f18c12;
  }
</style>
