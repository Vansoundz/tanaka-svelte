<!-- <script context="module" ✂prettier:content✂="CiAgICBleHBvcnQgYXN5bmMgZnVuY3Rpb24gcHJlbG9hZCgpIHsKICAgICAgdHJ5IHsKICAgICAgICBsZXQgb3JkZXJzID0gYXdhaXQgZ2V0T3JkZXJzKCk7CiAgICAgICAgcmV0dXJuIHsKICAgICAgICAgIG9yZGVycywKICAgICAgICB9OwogICAgICB9IGNhdGNoIChlcnJvcikgewogICAgICAgIHJldHVybiB7CiAgICAgICAgICBvcmRlcnM6IFtdLAogICAgICAgIH07CiAgICAgIH0KICAgIH0KICA=" ✂prettier:content✂="e30=" ✂prettier:content✂="e30=" ✂prettier:content✂="e30=" ✂prettier:content✂="e30=" ✂prettier:content✂="e30=">{}</script>
   -->
<script lang="ts">
  import CreateEdit from "../../../../components/products/create.edit.svelte";

  import { stores } from "@sapper/app";
  import type { Product } from "../../../../models/product.model";
  import { productStore } from "../../../../store/products";

  const { page } = stores();
  const {
    params: { id },
  } = $page;

  let product: Product;

  $: {
    product = $productStore.products.find((p) => p._id === id);
  }
</script>

<main>
  <div class="create">
    {#if product}
      <CreateEdit edit={true} toEdit={product} />
    {/if}
  </div>
</main>

<style>
</style>
