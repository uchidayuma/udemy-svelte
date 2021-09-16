<script>
  import { Router, Link } from 'svelte-routing';
  import Hamburger from 'svelte-hamburgers';
  let open;
</script>

<header class='bg-primary-900'>
  <Hamburger bind:open --color="white" />
  <Router>
    <Link to="/">Home</Link>
    <Link to="about">About</Link>
    <Link to="create">Create</Link>  
  </Router>
</header>

<style>
  header {
    height: 60px;
  }
</style>

<svelte:head>
	<!-- Import base css -->
	<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/svelte-hamburgers@3/dist/css/base.css" />
	<!-- Import spin css (spin is default type) -->
	<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/svelte-hamburgers@3/dist/css/types/spin.css" />
</svelte:head>