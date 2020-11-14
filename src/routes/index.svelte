<script lang="ts">
  import { onMount } from "svelte";
  import { fly } from "svelte/transition";
  import { productStore } from "../store/products";
  let show: HTMLImageElement;
  let index = 0;

  const images = [
    "https://tanaka-collection.s3.eu-west-2.amazonaws.com/slideshow/hoodie.jpg",
    "https://tanaka-collection.s3.eu-west-2.amazonaws.com/slideshow/jeans.jpg",
    "https://tanaka-collection.s3.eu-west-2.amazonaws.com/slideshow/pants_women.jpg",
    "https://tanaka-collection.s3.eu-west-2.amazonaws.com/slideshow/scarf.jpg",
  ];

  onMount(() => {
    show = document.getElementById("img-show") as HTMLImageElement;
    setInterval(() => {
      if (index === images.length - 1) {
        index = 0;
      } else {
        index += 1;
      }
      if (show) show.src = images[index];
    }, 4000);
  });
</script>

<style>
  .display > div {
    display: flex;
    max-height: 85vh;
    align-items: center;
    justify-content: space-around;
    margin: auto;
    position: relative;
  }

  .display img {
    /* width: 300px; */
    height: 65vh;
  }

  .image {
    position: absolute;
    height: 67vh;
  }

  .image + div {
    display: flex;
    align-items: center;
    height: 70vh;
    width: 100%;
    justify-content: center;
    background: rgba(0, 0, 0, 0.2);
    z-index: 1;
  }

  .display h3 {
    font-size: 48px;
    max-width: 300px;
    text-align: center;
    color: #fff;
  }

  /* Showcase */
  .slides-container {
    padding: 5em 0;
    max-width: 90%;
    display: block;
    margin: auto;
    /* overflow-y: hidden;*/
    overflow: hidden;
  }

  .showcase {
    display: flex;
    max-width: 80%;
    margin: auto;
  }

  .item {
    min-height: 300px;
    max-height: 330px;
    min-width: 220px;
    background: green;
    overflow: hidden;
    border-radius: 4px;
    display: flex;
    justify-content: flex-end;
    align-items: flex-start;
    margin: 12px 24px 12px 0;
    flex-direction: column;
  }

  .explore {
    width: 100%;
    background: orange;
    text-align: center;
    padding: 8px 16px;
    cursor: pointer;
  }
</style>

<svelte:head>
  <title>Welcome: Tanaka collections</title>
</svelte:head>

<div class="display">
  <div>
    <div class="image">
      <img id="img-show" transition:fly={{ y: 100 }} alt="" />
    </div>
    <div>
      <h3>All your favorites in one place</h3>
    </div>
  </div>
</div>
<div class="slides-container">
  <div class="glider-contain">
    <div class="glider">
      <div class="showcase" id="showcase">
        {#if $productStore.products.length > 0}
          {#each $productStore.products.slice(0, 5) as product (product._id)}
            <div style="background: url({product.image})" class="item">
              <div class="explore">Explore</div>
            </div>
          {/each}
        {:else}
          {#each images as image (image)}
            <div style="background: url({image})" class="item">
              <div class="explore">Explore</div>
            </div>
          {/each}
        {/if}
      </div>
    </div>
    <button aria-label="Previous" class="glider-prev">
      <div class="material-icons">arrow_back_ios</div>
    </button>
    <button aria-label="Next" class="glider-next">
      <div class="material-icons">arrow_forward_ios</div>
    </button>
  </div>
</div>
