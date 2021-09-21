<script>
  import { onDestroy } from 'svelte';
  import { Router, Link } from 'svelte-routing';
  import { userId } from '../store';
  let uid;

  const unsbscribe = userId.subscribe( id => {
    uid = id;
  })
  onDestroy(() => unsbscribe);
</script>

<footer class='flex items-center justify-around bg-secondary-900 dark:bg-dark-900'>
  <Router>
    <Link class='block mb-3' to="/">Home</Link>
    <Link class='block mb-3' to="about">日記の効果とは？</Link>
  {#if uid}
    <Link class='block mb-3' to="create">日記を書く</Link>
  {/if}
  </Router>
</footer>

<style>
  footer{
    height: 60px;
  }
</style>