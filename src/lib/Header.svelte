<script lang="ts">
	import { page } from '$app/stores';
	import {Hamburger} from 'svelte-hamburgers'
	import {goto} from '$app/navigation'
	import { username, loggedIn } from './localstores';
	import LoggedInIcon from './LoggedInIcon.svelte';

	import MobileMenu from './MobileMenu.svelte';
	let open;
</script>

<header>
	<div class="w-full flex items-center">
	<nav class="inline-flex lg:flex justify-between flex-wrap p-6 w-full lg:w-[85%] mx-auto h-min items-center">
		<div id="logo" class="flex items-center flex-shrink-0 text-white mr-6 flex-[100] w-fit h-1/2">
			<a href="/" ><h1 class="w-full hidden lg:flex lg:text-4xl font-black px-6 lg:px-0 text-black dark:text-[#F7EBE8]">SOULSBORNECHALLENGES</h1></a>
			<a href="/" ><h1 class="w-full flex lg:hidden text-lg text-black font-black items-start dark:text-[#F7EBE8]">SOULSBORNECHALLENGES</h1></a>
		</div>

		<div class="w-full block flex-grow hidden lg:flex lg:w-auto font-medium ml-8">
			<div class="text-sm lg:flex-grow inline-flex items-center " >
				<a href="/about" class="block mt-4 lg:inline-block lg:mt-0 text-[#000] hover:text-[#105D97] mr-12 text-lg dark:text-[#F7EBE8] dark:hover:text-[#E54B4B]" aria-current={$page.url.pathname === '/about' ? 'page' : undefined}>
				About
				</a>
				<a href="/leaderboards" class="mt-4 lg:mt-0 text-[#000] hover:text-[#105D97] mr-12 text-lg  dark:text-[#F7EBE8] dark:hover:text-[#E54B4B]" aria-current={$page.url.pathname === '/leaderboards' ? 'page' : undefined}>
					Leaderboards
				</a>
				<a href="/articles" class="block mt-4 lg:mt-0 text-[#000] hover:text-[#105D97] mr-12 text-lg dark:text-[#F7EBE8] dark:hover:text-[#E54B4B]" aria-current={$page.url.pathname.startsWith('/articles') ? 'page' : undefined} >
					Articles
				</a>
				<a href="/challenge" class="block mt-4 lg:mt-0 text-[#000] hover:text-[#105D97] mr-12 text-lg dark:text-[#F7EBE8] dark:hover:text-[#E54B4B]" aria-current={$page.url.pathname.startsWith('/challenge') ? 'page' : undefined} >
				Challenge of the Month
				</a>
				<a href="/contact" class=" hidden text-base font-semibold inline-block px-4 py-2 h-min leading-none border rounded text-[#000] border-[#000] hover:border-[#105D97] hover:text-[#105D97] hover:bg-[#fff] mt-4 lg:mt-0" aria-current={$page.url.pathname.startsWith('/contact') ? 'page' : undefined}>Contact</a>
			</div>
		</div>
		<div class="lg:hidden"><Hamburger bind:open /></div>
		<MobileMenu bind:open />
	</nav>
	{#if $loggedIn == "true"}
	<div id="discordLogin" class="hidden lg:block" >
		<LoggedInIcon/>
	</div>
	{:else}
	<div id="discordLogin" class="hidden lg:block " >
		<button
		on:click={() => goto('https://discord.com/api/oauth2/authorize?client_id=1130486833101406239&redirect_uri=https%3A%2F%2Fsoulsbornechallenges.com%2Fauth%2Fdiscord%2Fcallback&response_type=code&scope=identify%20email')}
		id="loggedIn"
		class="mr-8 flex flex-row items-center border py-4 2xl:w-[7vw] xl:w-[9vw] lg:w-[12vw] justify-center rounded-xl bg-blue-200 hover:bg-blue-300 text-black  dark:bg-[#1E1E24] dark:text-[#F7EBE8] dark:border-[#F7EBE8] dark:hover:bg-[#1E1E24] dark:hover:text-[#E54B4B]"
		type="button"
		>
			<h4 class="font-bold">Log In Using Discord</h4>
		</button>
	</div>
	{/if}
</div>
</header>

<style>
</style>
