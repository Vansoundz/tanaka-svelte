<script lang="ts">
  import { stores } from "@sapper/app";
  const { page } = stores();
</script>

<style>
</style>

<main>{$page.params.category}</main>
