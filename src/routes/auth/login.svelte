<script lang="ts">
  import { login } from "../../services/auth.service";
  import { auth } from "../../store/auth";
  import { goto } from "@sapper/app";

  let user: { email: ""; password: "" } = { email: "", password: "" };
  let errors: { msg: string; param: string }[] = [];

  $: {
    if ($auth.isLoggedIn) {
      goto("admin");
    }
  }

  const submit = async (e: Event) => {
    e.preventDefault();
    try {
      let res = await login(user);
      if (res.token) {
        localStorage.setItem("__tanaka", res.token);
        auth.login(res.user);
      }
    } catch (error) {
      errors = error;
    }
  };
</script>

<main>
  <form on:submit={submit} novalidate>
    <div><h4>Log in</h4></div>
    <div>
      <div class="fields">
        <label for="email">Email: </label>
        <input type="email" bind:value={user.email} />
      </div>
      {#if errors.find((e) => e.param === "email")}
        <div class="errors">
          <span />
          <div class="error">{errors.find((e) => e.param === "email").msg}</div>
        </div>
      {/if}
    </div>
    <div>
      <div class="fields">
        <label for="password">Password: </label>
        <input type="password" bind:value={user.password} />
      </div>
      {#if errors.find((e) => e.param === "password")}
        <div class="errors">
          <span />
          <div class="error">
            {errors.find((e) => e.param === "password").msg}
          </div>
        </div>
      {/if}
    </div>
    <div>
      <button>Log in</button>
    </div>
  </form>
</main>

<style>
  main {
    display: flex;
    justify-content: center;
  }

  form {
    min-width: 250px;
    margin-top: 48px;
    padding: 16px;
    background: #fff;
  }

  input {
    padding: 8px;
    margin-left: 8px;
  }

  .fields,
  .errors {
    display: grid;
    grid-template-columns: 1fr 4fr;
  }

  .fields {
    align-items: center;
    margin-top: 16px;
  }

  input:focus {
    border: 1px solid rebeccapurple;
  }

  button {
    padding: 8px 16px;
    display: block;
    margin: 8px auto;
    cursor: pointer;
    background: rebeccapurple;
    color: white;
  }

  .error {
    margin-top: 4px;
    background: #e69f9f47;
    padding: 0 4px;
    margin-left: 8px;
    color: red;
    font-weight: 400;
  }
</style>
