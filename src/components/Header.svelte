<script>
  import { onMount } from 'svelte';
  import Hamburger from 'svelte-hamburgers';
  import Menu from './Menu.svelte';
  let open;
  import BrightnessContrast32 from "carbon-icons-svelte/lib/BrightnessContrast32/BrightnessContrast32.svelte";
  const toggleDark = () => {
    // bodyタグにmode-darkクラスを追加
    if(localStorage.isDark === 'true'){
      //lightモード切り替え
      document.getElementById('body').classList.remove('mode-dark');
      localStorage.isDark = 'false';
    }else{
      document.getElementById('body').classList.add('mode-dark');
      localStorage.isDark = 'true';
    }
  }
  onMount(() =>{
    if(localStorage.isDark === 'true'){
      document.getElementById('body').classList.add('mode-dark');
      localStorage.isDark = 'true';
    }else{
      document.getElementById('body').classList.remove('mode-dark');
      localStorage.isDark = 'false';
    }
  })
</script>

<header class='bg-primary-900 dark:bg-dark-900 flex justify-between items-center'>
  <Hamburger bind:open --color="white" />
  <img src='/logo.png' alt='logo' on:click={() => location.href='/' } />
  <BrightnessContrast32 class='mr-6 text-white-900' on:click={toggleDark}/>
</header>
<Menu bind:open />

<style>
  header {
    height: 60px;
  }
  img {
    max-height: 100%;
  }
</style>

<svelte:head>
	<!-- Import base css -->
	<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/svelte-hamburgers@3/dist/css/base.css" />
	<!-- Import spin css (spin is default type) -->
	<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/svelte-hamburgers@3/dist/css/types/spin.css" />
</svelte:head>