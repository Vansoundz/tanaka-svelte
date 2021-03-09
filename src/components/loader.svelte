<script lang="ts">
</script>

<main>
  <div class="loader" />
</main>

<style>
  main {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 10000;
    background-color: rgba(255, 166, 0, 0.3);
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    width: 100%;
  }

  .loader {
    border-radius: 50%;
    animation: load 2s ease infinite forwards;
    background: var(--black);
  }

  @keyframes load {
    0% {
      width: 20px;
      height: 20px;
      opacity: 1;
    }

    25% {
      width: 100px;
      height: 100px;
      opacity: 0.6;
    }

    50% {
      width: 60px;
      height: 60px;
      opacity: 0.8;
    }

    75% {
      width: 130px;
      height: 130px;
      opacity: 0.4;
    }

    100% {
      width: 20px;
      height: 20px;
      opacity: 1;
    }
  }
</style>
