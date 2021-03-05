<script lang="ts">
  import { auth } from "../../store/auth";
  import { goto } from "@sapper/app";

  export let segment: string | undefined;
  let links = [
    { name: "dashboard", path: "/" },
    { name: "products", path: "/products" },
    { name: "orders", path: "/orders" },
    { name: "blog", path: "/blog" },
  ];

  $: {
    if (!$auth.loading && !$auth.isLoggedIn) {
      goto("/");
    }
  }
</script>

<main>
  <aside>
    <div class="side">
      <ul>
        {#each links as link (link.name)}
          <li
            class:active={link.path === "/" ? !segment : link.name === segment}
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
  }

  li.active {
    background: rebeccapurple;
  }

  li.active a {
    color: white;
  }
</style>
