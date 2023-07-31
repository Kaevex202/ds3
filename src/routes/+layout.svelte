<script>
	import "./styles.css";
	import Header from '../lib/Header.svelte'
	import Footer from "$lib/Footer.svelte";

try {
if(typeof window !== 'undefined' 
&& window) {
	window.dataLayer = window.dataLayer || [];
	function gtag(){dataLayer.push(arguments);}
	gtag('js', new Date());

  gtag('config', 'G-T9RDP6VHQL');
}
} catch(error) {
console.error("Failed to initialize Analytics")
}

  </script>

<svelte:head>
	<script async src="https://www.googletagmanager.com/gtag/js?id=G-T9RDP6VHQL"></script>
</svelte:head>

<div class="app bg-[#FAF9F6] dark:bg-[#444140]">

	<Header/>

	<main>
		<slot />
	</main>

	<Footer/>

</div>

<style>
main{
	min-height:90vh;
}
</style>
