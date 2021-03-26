<script lang="ts">
  import { auth } from "../../store/auth";
  import { goto } from "@sapper/app";
  import { onMount } from "svelte";

  export let segment: string | undefined;
  let links = [
    { name: "dashboard", path: "/" },
    { name: "products", path: "/products" },
    { name: "orders", path: "/orders" },
    { name: "blog", path: "/blog" },
  ];

  onMount(() => {
    auth.initSide(window.innerWidth <= 600 ? false : true);

    window.addEventListener("resize", () => {
      auth.initSide(window.innerWidth <= 600 ? false : true);
    });
  });

  $: {
    if (!$auth.loading && !$auth.isLoggedIn) {
      goto("/");
    }
  }
</script>

<main>
  <aside
    on:click|self={auth.closeSide}
    style="height: {$auth.open ? '100vh' : ''}"
  >
    <div
      class="side"
      style="transform: {$auth.open
        ? 'translateX(0px)'
        : 'translateX(-1000px)'}"
    >
      <ul>
        {#each links as link (link.name)}
          <li
            class:active={link.path === "/" ? !segment : link.name === segment}
            on:click={() => {
              goto(`admin${link.path}`);
              setTimeout(auth.closeSide, 100);
            }}
          >
            <a href="/admin{link.path}">{link.name}</a>
          </li>
        {/each}
      </ul>
    </div>
  </aside>
  <div class="dashboard">
    <slot />
  </div>
</main>

<style>
  * {
    transition: all 0.2s;
  }

  main {
    display: grid;
    grid-template-columns: 1fr 5fr;
  }

  .side {
    position: fixed;
    height: calc(100vh - 60px);
    width: calc(100vw / 6);
    background: white;
    bottom: 0;
    left: 0;
    border-right: 1px solid bisque;
  }

  ul {
    margin-top: 140px;
  }

  li {
    text-transform: capitalize;
    margin: 4px 0;
    padding: 4px 8px;
    cursor: pointer;
  }

  li.active {
    background: var(--black);
  }

  li.active a {
    color: white;
  }

  @media screen and (max-width: 600px) {
    main {
      display: block;
    }

    .side {
      width: 200px;
    }

    aside {
      background: rgb(255 166 0 / 30%);
      width: 100vw;
    }
  }
</style>
