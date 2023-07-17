<script lang="ts">
	import { page } from '$app/stores';
    import logo from '$lib/images/alogo-4.svg'
	let open;
</script>

<header>

	<nav class="flex items-center justify-between flex-wrap p-6 w-full lg:w-[85%] mx-auto">
		<div id="logo" class="flex items-center flex-shrink-0 text-white mr-6 flex-[100] w-fit h-1/2">
			<a href="/" aria-current={$page.url.pathname === '/' ? 'page' : undefined}><img src={logo} alt="Logo for soulsbornechallenges.com" class="fill-current w-64 mr-2" width="256" height="51"></a>
		</div>


	

		<div class="w-full block flex-grow hidden lg:flex lg:items-center lg:w-auto font-medium">
			<div class="text-sm lg:flex-grow inline-flex" >
				<a href="/about" class="block mt-4 lg:inline-block lg:mt-0 text-[#000] hover:text-[#105D97] mr-12 text-lg" aria-current={$page.url.pathname === '/about' ? 'page' : undefined}>
				About
				</a>
				<a href="/challenge" class="block mt-4 lg:mt-0 text-[#000] hover:text-[#105D97] mr-12 text-lg" aria-current={$page.url.pathname.startsWith('/challenge') ? 'page' : undefined} >
				Challenge of the Month
				</a>
				<a href="/contact" class="text-base font-semibold inline-block px-4 py-2 leading-none border rounded text-[#000] border-[#000] hover:border-[#105D97] hover:text-[#105D97] hover:bg-[#fff] mt-4 lg:mt-0" aria-current={$page.url.pathname.startsWith('/contact') ? 'page' : undefined}>Contact</a>
			</div>
		</div>

		
</header>

<style>
</style>
