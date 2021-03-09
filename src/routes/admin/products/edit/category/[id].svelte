<script lang="ts">
  import { productStore } from "../../../../../store/products";
  import { stores } from "@sapper/app";
  import type { Category } from "../../../../../models/product.model";
  import CreayeEditCategory from "../../../../../components/products/createEditCategory.svelte";
  const { page } = stores();
  const {
    params: { id },
  } = $page;

  let category: Category;

  $: {
    category = $productStore.categories.find((c) => c._id === id);
  }
</script>

<main>
  {#if category}
    <CreayeEditCategory edit={true} toEdit={category} />
  {/if}
</main>

<style>
</style>
