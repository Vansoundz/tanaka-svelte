<script lang="ts">
  import { onMount } from "svelte";

  import Loader from "../../components/loader.svelte";
  import type { Category } from "../../models/product.model";
  import {
    createCategory,
    editCategory,
    getCategories,
  } from "../../services/product.service";
  import { productStore } from "../../store/products";

  import { toasts } from "../../store/toasts";

  export let edit;
  export let toEdit: Category;

  let category: string;
  let loading = false;

  const submit = async (e: Event) => {
    e.preventDefault();
    loading = true;

    try {
      if (edit) editCategory(toEdit._id, category);
      else await createCategory(category);
      let resp = await getCategories();
      if (resp.categories) productStore.initCategories(resp.categories);

      toasts.toast({
        text: `Category ${edit ? "edited" : "created"} successfully`,
        type: "s",
      });
      loading = false;
      category = "";
    } catch (error) {
      loading = false;
      toasts.toast({
        text: error,
        type: "d",
      });
    }
  };

  onMount(() => {
    if (edit && toEdit) {
      category = toEdit.name;
    }
  });
</script>

{#if loading}
  <Loader />
{/if}

<main>
  <form on:submit={submit}>
    <div><label for="category">Category name</label></div>
    <div>
      <input type="text" bind:value={category} />
    </div>
    <div>
      <button>
        {#if edit}
          Edit
        {:else}
          Create
        {/if}
      </button>
    </div>
  </form>
</main>

<style>
  main {
    display: flex;
    justify-content: center;
  }

  form {
    max-width: 400px;
    margin: 32px 0;
    padding: 16px;
    background: #fff;
    min-width: 300px;
  }

  input {
    padding: 8px;
    border: 1px solid #ddd;
    width: 100%;
  }

  button {
    padding: 8px 16px;
    display: block;
    margin: 8px auto;
    cursor: pointer;
    background: var(--black);
    color: white;
  }
</style>
