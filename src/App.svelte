<script>
	import "smelte/src/tailwind.css";
	export let url = "";
	import { Router, Link, Route } from "svelte-routing";
	import Header from './components/Header.svelte';
	import Footer from './components/Footer.svelte';
	import Home from './components/Home.svelte';
	import Create from './components/Create.svelte';
	import Diary from './components/Diary.svelte';
	import About from './components/About.svelte';
</script>

<main class='bg-background-500'>
	<Header />
	<section class='content'>
		<Router url="{url}">
			<Route path="diary/:id" component="{Diary}" />
			<Route path="create" component="{Create}" />
			<Route path="about" component="{About}" />
			<Route path="/"><Home /></Route>
		</Router>
	</section>
	<Footer />
</main>

<style>
	main {
		text-align: center;
		max-width: 640px;
		margin: 0 auto;
	}
	.content{
		min-height: calc( 100vh - 60px - 60px );
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}
</style>