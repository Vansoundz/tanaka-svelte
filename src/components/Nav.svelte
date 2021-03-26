<script lang="ts">
  import { onMount } from "svelte";
  import { goto } from "@sapper/app";
  import { cartStore } from "../store/cart";
  import { productStore } from "../store/products";
  import { auth } from "../store/auth";
  export let segment: string;
  $: categories = $productStore.categories;

  let sidenav = false;

  const showHideMenu = (e?: MouseEvent) => {
    e?.preventDefault();
    const menu = document.getElementById("menu-items") as HTMLDivElement;
    if (menu.style.height !== "initial") {
      //   menu.style.opacity = "1";
      menu.style.height = "initial";
      menu.style.display = "block";
    } else {
      //   menu.style.opacity = "0";
      menu.style.display = "none";
      menu.style.height = "0px";
    }
  };

  const showHideSidebar = () => {
    const s = document.getElementById("sidenav");
    if (!s.style.transform || s.style.transform !== "translateX(0px)") {
      s.style.transform = "translateX(0px)";
      sidenav = true;
    } else {
      s.style.transform = "translateX(200px)";
      sidenav = false;
    }
  };

  let small: boolean = false;

  onMount(() => {
    small = window.innerWidth < 768;
    const s = document.getElementById("sidenav");
    window.addEventListener("resize", () => {
      small = window.innerWidth < 768;
    });
  });
</script>

<nav>
  {#if $auth.isLoggedIn}
    <span
      id="logo"
      style="display: flex; align-items: center;"
      on:click={() => {
        if ($auth.open) {
          auth.closeSide();
        } else {
          auth.openSide();
        }
      }}
    >
      <i class="material-icons">sort</i>
      <img src="/favicon.png" alt="logo" width="60" height="60" />
    </span>
  {:else}
    <a href="/" id="logo">
      <img src="/favicon.png" alt="logo" width="70" height="70" />
    </a>
  {/if}
  <div class="menu-trigger sm" on:click={showHideSidebar}>
    <i class="material-icons">menu</i>
  </div>
  {#if !small}
    <div class="links lg">
      <ul id="">
        <li class:active={segment === "explore"}>
          <a href="explore">Explore</a>
        </li>
        <li id="categories">
          <a href="#!" on:click={showHideMenu}>Categories</a>
          <div class="categories" id="menu-items">
            <ul>
              <li
                on:click={() => {
                  goto("products");
                  if (small) {
                    showHideSidebar();
                  } else showHideMenu();
                }}
              >
                <a href="products">All</a>
              </li>
              {#each categories as category (category._id)}
                <li
                  on:click={() => {
                    goto(`products/${category.name}`);
                    if (small) {
                      showHideSidebar();
                    } else showHideMenu();
                  }}
                >
                  <a href="products/{category.name}">{category.name}</a>
                </li>
              {/each}
            </ul>
          </div>
        </li>
        <li class:active={segment === "men"}><a href="men">Men</a></li>
        <li class:active={segment === "women"}><a href="women">Women</a></li>
      </ul>
    </div>
  {/if}
  <div class="cart">
    {#if $auth.isLoggedIn}
      <a href="/admin" style="margin-left:{small ? '' : '16px'}">
        <i class="material-icons">account_circle</i>
      </a>
    {:else}
      <a href="/cart">
        <div id="basket">
          <div class="material-icons">shopping_bag</div>
          {#if $cartStore.products.length > 0}
            <div class="counter">{$cartStore.products.length}</div>
          {/if}
        </div>
      </a>
    {/if}
  </div>
</nav>

{#if small}
  <div class:active={sidenav} on:click|self={showHideSidebar} class="links sm">
    <ul id="sidenav">
      <li class:active={segment === "explore"} on:click={showHideSidebar}>
        <a href="explore">Explore</a>
      </li>
      <li id="categories">
        <a href="#!" on:click={showHideMenu}>Categories</a>
        <div class="categories" id="menu-items">
          <ul>
            <li
              on:click={() => {
                goto("products");
                if (small) {
                  showHideSidebar();
                }
              }}
            >
              <a href="products">All</a>
            </li>
            {#each categories as category (category._id)}
              <li
                on:click={() => {
                  goto(`products/${category.name}`);
                  if (small) {
                    showHideSidebar();
                  }
                }}
              >
                <a href="products/{category.name}">{category.name}</a>
              </li>
            {/each}
          </ul>
        </div>
      </li>
      <li class:active={segment === "men"} on:click={showHideSidebar}>
        <a href="men">Men</a>
      </li>
      <li class:active={segment === "women"} on:click={showHideSidebar}>
        <a href="women">Women</a>
      </li>
    </ul>
  </div>
{/if}

<style>
  nav {
    padding: 0 16px;
    height: 70px;
    border-bottom: 1px solid bisque;
    justify-content: space-between;
    position: sticky;
    top: 0;
    left: 0;
    z-index: 1000;
    background: #fff;
  }

  #logo {
    font-weight: bold;
    font-size: 22px;
  }

  nav,
  .links > ul {
    display: flex;
    align-items: center;
    transition: all 0.4s;
  }

  li {
    cursor: pointer;
    margin-right: 16px;
  }

  nav > ul li:not(:last-child) {
    margin-right: 16px;
  }

  li,
  .links,
  #basket {
    position: relative;
  }

  #menu-items li:hover a,
  .links > ul > li:hover > a {
    color: black;
  }

  nav > ul li.active a {
    color: black;
  }

  ul > li.active::after {
    content: "";
    position: absolute;
    width: 80%;
    height: 4px;
    background: var(--yellow);
    bottom: -24px;
    left: 0;
  }

  .categories {
    position: absolute;
    z-index: 10;
    min-width: 200px;
    margin-top: 12px;
    box-shadow: 0 0 6px #ddd;
    padding: 8px;
    margin-left: -16px;
    background: #fff;
    transition: all 0.5s;
    display: none;
  }

  .categories::before {
    width: 0;
    height: 0;
    content: "";
    position: absolute;
    border-left: 4px solid transparent;
    border-right: 4px solid transparent;
    border-bottom: 8px solid #607d8b;
    top: -8px;
    left: 23%;
  }

  #basket {
    font-size: 18px;
  }

  #basket .counter {
    position: absolute;
    top: -8px;
    font-weight: bold;
    color: #fff;
    background: var(--yellow);
    text-align: center;
    font-size: 12px;
    right: -8px;
    width: 18px;
    height: 18px;
    border-radius: 50%;
  }

  .cart {
    position: relative;
    display: flex;
  }

  .menu-trigger {
    display: none;
  }

  .sm {
    display: none;
  }

  .lg {
    display: block;
  }

  @media screen and (max-width: 767px) {
    .cart {
      position: fixed;
      bottom: 10px;
      right: 10px;
      background: #fff;
      width: 60px;
      height: 60px;
      border-radius: 50%;
      box-shadow: 0 0 12px #ddd;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .links > ul {
      position: fixed;
      height: 100vh;
      display: flex;
      flex-direction: column;
      width: 200px;
      background: #fff;
      top: 0;
      right: 0;
      align-items: flex-start;
      justify-content: center;
      transform: translateX(200px);
      box-shadow: 0 0 6px #ddd;
    }

    .links {
      z-index: 1000;
    }

    .links > ul > li {
      padding: 4px 16px;
    }

    ul li.active::after {
      width: 4px;
      height: 100%;
      top: 0;
      left: 0;
    }

    .categories {
      position: relative;
      z-index: unset;
      min-width: unset;
      margin: 8px 8px;
      box-shadow: unset;
      height: 0;
    }

    .links.active {
      position: fixed;
      width: 100%;
      height: 100%;
      background: #ff98004d;
      transition: all 0.4s;
      left: 0;
      top: 0;
      z-index: 1000;
    }

    .categories::before {
      display: none;
    }

    .menu-trigger {
      display: block;
    }

    .sm {
      display: block;
    }

    .lg {
      display: none;
    }
  }
</style>
