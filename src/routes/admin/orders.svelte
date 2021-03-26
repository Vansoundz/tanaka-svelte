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
  import { deleteOrder, getOrders } from "../../services/order.service";
  import { toasts } from "../../store/toasts";
  import { sendReq } from "../../services/util";

  interface IOrder extends Order {
    products: Product[];
  }

  let loading = false;
  export let orders: IOrder[] = [];

  const initOrders = async () => {
    try {
      let order = await getOrders();
      loading = false;
      orders = order;
    } catch (error) {
      loading = false;
    }
  };

  const getOrdersByStatus = async (status?: "failed" | "delivered") => {
    try {
      loading = true;
      if (!status) {
        initOrders();
        return;
      }

      let newOrders;

      if (status === "failed") {
        let data = await sendReq({
          endpoint: `/orders/failed`,
          method: "GET",
          auth: true,
        });
        if (data.orders) newOrders = data.orders;
      }
      if (status === "delivered") {
        let data = await sendReq({
          endpoint: `/orders/delivered`,
          method: "GET",
          auth: true,
        });
        if (data.orders) newOrders = data.orders;
      }
      loading = false;

      orders = newOrders;
    } catch (error) {
      loading = false;
      initOrders();
    }
  };

  onMount(async () => {
    if (!orders.length) {
      loading = true;
      getOrdersByStatus();
    }
  });

  const markFailed = async (id: string) => {
    try {
      loading = true;
      let order = await sendReq({
        endpoint: `/orders/${id}/failed`,
        method: "PATCH",
        auth: true,
      });
      await initOrders();
      loading = false;
      toasts.toast({ type: "i", text: "Status changed" });
    } catch (error) {
      loading = false;
      if (error[0]?.msg) {
        toasts.toast({ type: "d", text: error[0]?.msg });
      } else toasts.toast({ type: "d", text: "Status change failed" });
    }
  };

  const markDelivered = async (id: string) => {
    try {
      loading = true;
      await sendReq({
        endpoint: `/orders/${id}/delivered`,
        method: "PATCH",
        auth: true,
      });
      await initOrders();
      loading = false;
      toasts.toast({ type: "i", text: "Status changed" });
    } catch (error) {
      loading = false;
      if (error[0]?.msg) {
        toasts.toast({ type: "d", text: error[0]?.msg });
      } else toasts.toast({ type: "d", text: "Status change failed" });
    }
  };

  const deleteThisOrder = async (id: string) => {
    try {
      loading = true;
      await deleteOrder(id);
      let newOrders = await getOrders();
      if (newOrders) {
        orders = newOrders;
      }
      loading = false;
      toasts.toast({ text: "Order deleted", type: "s" });
    } catch (err) {
      loading = false;
      toasts.toast({ text: err[0].msg, type: "d" });
    }
  };
</script>

{#if loading}
  <Loader />
{/if}

<main>
  <div class="order-heading">
    <h4>Orders</h4>
    <div>
      <button on:click={(e) => getOrdersByStatus()}>Pending</button>
      <button on:click={(e) => getOrdersByStatus("delivered")}>Delivered</button
      >
      <button on:click={(e) => getOrdersByStatus("failed")}>Failed</button>
    </div>
  </div>
  <div class="products">
    <div class="desktop">
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
            <div>{order.customer.name}</div>
            <div>{order.customer.email}</div>
            <div>{order.customer.phone}</div>
            <div>{order.status}</div>
            <div>
              {#each order.products as product (product._id)}
                <div>
                  {order.quantities[product._id]} * {product.name}
                </div>
              {/each}
            </div>
            <div
              style="display: flex; justify-content: space-around;align-items: flex-start;"
            >
              <button on:click={(e) => markFailed(order._id)}>
                <i style="color:#dc2020" class="material-icons">close</i>
                <span style="color:#dc2020">Failed</span>
              </button>
              <button on:click={(e) => markDelivered(order._id)}>
                <i style="color: #09914d" class="material-icons">done</i>
                <span style="color: #09914d">Delivered</span>
              </button>
            </div>
            <div>
              <i
                on:click={async (e) => {
                  try {
                    loading = true;
                    await deleteOrder(order._id);
                    let newOrders = await getOrders();
                    if (newOrders) {
                      orders = newOrders;
                    }
                    loading = false;
                    toasts.toast({ text: "Order deleted", type: "s" });
                  } catch (err) {
                    loading = false;
                    toasts.toast({ text: err[0].msg, type: "d" });
                  }
                }}
                class="material-icons">delete</i
              >
            </div>
          </div>
        {/each}
      </div>
    </div>
    <div class="mobile">
      {#each orders as order (order._id)}
        <div class="order">
          <div class="customer">
            <h4>{order.customer.name}</h4>
            <div>{order.customer.email}</div>
            <div>{order.customer.phone}</div>
          </div>
          <div class="products">
            <h4>Products</h4>
            <div>
              {#each order.products as product (product._id)}
                <div>
                  {order.quantities[product._id]} * {product.name}
                </div>
              {/each}
            </div>
          </div>
          <div class="actions">
            <div>
              <button on:click={() => deleteThisOrder(order._id)}>
                <i style="color:#dc2020" class="material-icons">delete</i>
                <span style="color:#dc2020">Delete</span>
              </button>
              <button on:click={() => markFailed(order._id)}>
                <i style="color: #d27d00" class="material-icons">close</i>
                <span style="color: #d27d00">Failed</span>
              </button>
              <button on:click={() => markDelivered(order._id)}>
                <i style="color: #09914d" class="material-icons">done</i>
                <span style="color: #09914d">Delivered</span>
              </button>
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

  .header {
    margin-bottom: 16px;
  }

  .grid {
    display: grid;
    grid-template-columns: 1fr 2fr 1fr 1fr 1fr 2fr 1fr;
    /* align-items: center; */
  }

  button {
    display: flex;
    justify-content: space-around;
    align-items: center;
  }

  .order-heading {
    display: flex;
    justify-content: space-between;
    margin: 16px 0;
  }

  .order-heading > div {
    display: flex;
  }
  .order-heading button {
    margin-left: 16px;
    font-size: 14px;
  }

  .mobile .products > div {
    margin-left: 16px;
  }

  .order {
    padding: 8px;
    margin: 8px 0;
    background: #fff;
  }

  .mobile .actions > div {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-top: 16px;
  }

  @media screen and (max-width: 600px) {
    .desktop {
      display: none;
    }

    .mobile {
      display: block;
    }
  }
</style>
