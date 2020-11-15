<script lang="ts">
  import { onMount } from "svelte";
  import { goto } from "@sapper/app";
  import { fly } from "svelte/transition";
  import { productStore } from "../store/products";

  import Glide from "@glidejs/glide";

  let show: HTMLImageElement;
  let index = 0;

  const images = [
    "https://tanaka-collection.s3.eu-west-2.amazonaws.com/slideshow/hoodie.jpg",
    "https://tanaka-collection.s3.eu-west-2.amazonaws.com/slideshow/jeans.jpg",
    "https://tanaka-collection.s3.eu-west-2.amazonaws.com/slideshow/pants_women.jpg",
    "https://tanaka-collection.s3.eu-west-2.amazonaws.com/slideshow/scarf.jpg",
  ];

  onMount(() => {
    new Glide("#showcase", {
      startAt: 0,
      autoplay: false,
      perView: 3,
    }).mount();

    new Glide("#imgs", {
      type: "carousel",
      focusAt: "center",
      startAt: 0,
      autoplay: 3000,
      perView: 1,
    }).mount();

    // show = document.getElementById("img-show") as HTMLImageElement;
    // setInterval(() => {
    //   if (index === images.length - 1) {
    //     index = 0;
    //   } else {
    //     index += 1;
    //   }
    //   if (show) show.src = images[index];
    // }, 4000);
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

  /* .showcase {
    display: flex;
    max-width: 80%;
    margin: auto;
  } */

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

  .center {
    display: flex;
    justify-content: center;
  }
</style>

<svelte:head>
  <title>Welcome: Tanaka collections</title>
</svelte:head>

<div class="display">
  <div>
    <div class="image glide" id="imgs">
      <!-- <img id="img-show" transition:fly={{ y: 100 }} alt="" /> -->
      <div class="glide__track" data-glide-el="track">
        <ul class=" glide__slides">
          {#if $productStore.products.length > 0}
            {#each $productStore.products.slice(0, 5) as product (product._id)}
              <li class="glide__slide center">
                <img src={product.image} alt="" />
              </li>
              <!-- <li
                style="background: url({product.image})"
                class="item glide__slide">
                <div
                  on:click={() => goto(`products/${product.category.name}`)}
                  class="explore">
                  Explore
                </div>
              </li> -->
            {/each}
          {:else}
            {#each images as image (image)}
              <div style="background: url({image})" class="item glide__slide">
                <div on:click={() => goto('products')} class="explore">
                  Explore
                </div>
              </div>
            {/each}
          {/if}
        </ul>
      </div>
    </div>
    <div>
      <h3>All your favorites in one place</h3>
    </div>
  </div>
</div>
<div class="slides-container">
  <div class="glide" id="showcase">
    <div class="glide__track" data-glide-el="track">
      <ul class=" glide__slides">
        {#if $productStore.products.length > 0}
          {#each $productStore.products.slice(0, 5) as product (product._id)}
            <li
              style="background: url({product.image})"
              class="item glide__slide">
              <div
                on:click={() => goto(`products/${product.category.name}`)}
                class="explore">
                Explore
              </div>
            </li>
          {/each}
        {:else}
          {#each images as image (image)}
            <div style="background: url({image})" class="item glide__slide">
              <div on:click={() => goto('products')} class="explore">
                Explore
              </div>
            </div>
          {/each}
        {/if}
      </ul>
    </div>
  </div>
</div>
<!-- 
<div class="glide">
  <div data-glide-el="track" class="glide__track">
    <ul class="glide__slides">
      <li class="glide__slide" />
      <li class="glide__slide" />
      <li class="glide__slide" />
    </ul>
  </div>
</div> -->
