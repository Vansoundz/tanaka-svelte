<script lang="ts">
</script>

<main>
  <h4>Blog</h4>
  <div class="blog">
    <h4 class="title"><a href="/blog/1234">New stuff in town</a></h4>
    <div class="body">
      <div class="image">
        <img width="300" height="300" src="/favicon.png" alt="something" />
      </div>
      Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsum commodi aperiam
      labore aliquid reiciendis.
    </div>
  </div>
  <div class="blog">
    <h4 class="title"><a href="/blog/1234">New stuff in town</a></h4>
    <div class="body">
      <div class="image">
        <img width="300" height="300" src="/favicon.png" alt="something" />
      </div>
      Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsum commodi aperiam
      labore aliquid reiciendis.
    </div>
  </div>
  <div class="blog">
    <h4 class="title"><a href="/blog/1234">New stuff in town</a></h4>
    <div class="body">
      <div class="image">
        <img width="300" height="300" src="/favicon.png" alt="something" />
      </div>
      Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsum commodi aperiam
      labore aliquid reiciendis.
    </div>
  </div>
</main>

<style>
  main {
    max-width: 70%;
    margin: auto;
    display: block;
    padding: 24px 0;
  }

  .blog {
    margin: 24px 0;
  }

  img {
    width: 500px;
  }

  @media screen and (max-width: 767px) {
    main {
      max-width: 100%;
      padding: 16px;
    }

    img {
      width: 100%;
    }
  }
</style>
