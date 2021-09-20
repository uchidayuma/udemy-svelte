<script>
  import { onDestroy } from 'svelte';
  import { Router, Link } from 'svelte-routing';
  import { fly, scale } from 'svelte/transition';
  import { quadOut } from 'svelte/easing';
  import { signInWithGoogle, googleSignOut } from '../helpers/firebase';
  import { userId } from '../store';
  let uid;

  const unsbscribe = userId.subscribe( id => {
    uid = id;
  })
  onDestroy(() => unsbscribe);

  export let open;
</script>

{#if open}
<nav class='bg-primary-900' on:click={() => open = false}>
  <Router>
    <Link class='block mb-3' to="/">Home</Link>
    <Link class='block mb-3' to="about">日記の効果とは？</Link>
  {#if !uid}
    <Link class='block mb-3' to="#" on:click={signInWithGoogle}>ログイン</Link> 
  {:else} 
    <Link class='block mb-3' to="create">日記を書く</Link>
    <Link class='block mb-3' to="#" on:click={googleSignOut}>ログアウト</Link> 
  {/if}
  </Router>
  <hr transition:scale={{ duration: 750, easing: quadOut, opacity: 1 }} />
</nav>
{/if}

<style>
  nav {
      text-align: center;
      font-size: 1.5em;
      letter-spacing: 0.15em;
      padding: 1em;
      padding-top: 0;
      color: #eef;
  }
  a {
      cursor: pointer;
      width: max-content;
      margin: 1rem auto;
      display: block;
  }
  a:hover {
      text-decoration: underline;
  }
</style>
