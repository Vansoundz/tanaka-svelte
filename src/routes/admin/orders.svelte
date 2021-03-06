<script context="module">
  export async function preload() {
    try {
      let orders = await getOrders();
      return {
        orders,
      };
    } catch (error) {
      return {
        orders: [],
      };
    }
  }
</script>

<script lang="ts">
  import { onMount } from "svelte";
  import type { Order, Product } from "../../models/product.model";
  import Loader from "../../components/loader.svelte";
  import { getOrders } from "../../services/order.service";

  interface IOrder extends Order {
    products: Product[];
  }

  let loading = false;
  export let orders: IOrder[] = [];

  onMount(async () => {
    if (!orders.length) {
      try {
        loading = true;
        let order = await getOrders();
        loading = false;
        orders = order;
      } catch (error) {
        console.log(error);
        loading = false;
      }
    }
  });
</script>

{#if loading}
  <Loader />
{/if}

<main>
  <h4>Orders</h4>
  <div class="products">
    <div class="header grid">
      <div>Name</div>
      <div>Email</div>
      <div>Phone</div>
      <div>Status</div>
      <div>Products</div>
      <div>Edit</div>
      <div>Delete</div>
    </div>
    <div class="body">
      {#each orders as order (order._id)}
        <div class="grid product">
          <div>{order?.customer?.name}</div>
          <div>{order?.customer?.email}</div>
          <div>{order?.customer?.phone}</div>
          <div>{order.status}</div>
          <div>
            {#each order?.products as product (product._id)}
              <div>
                {order?.quantities[product._id]} * {product.name}
              </div>
            {/each}
          </div>
          <div>
            <i class="material-icons">edit</i>
          </div>
          <div>
            <i class="material-icons">delete</i>
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

  .header {
    margin-bottom: 16px;
  }
  .grid {
    display: grid;
    grid-template-columns: 1fr 2fr 1fr 1fr 1fr 1fr 1fr;
    /* align-items: center; */
  }
</style>
