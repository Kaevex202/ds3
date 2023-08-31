<script lang="ts" context="module">
    import { MetaTags } from 'svelte-meta-tags';
    import { goto } from '$app/navigation';
    import SocialIcons from '$lib/SocialIcons.svelte';
    import DarkSocialIcons from '$lib/DarkSocialIcons.svelte';
    import Saos from 'saos';

    import sbcimage from '$lib/images/sbcimage.jpg'

    const siteUrl = "https://www.soulsbornechallenges.com/articles"
    const siteTitle = "SoulsBorneChallenges | Articles";
    const siteDescription = "The blog for SoulsBorneChallenges. A challenge run generator for your SoulsBorne games. Stay up to date with new challenges of the week and more!"
    const siteThumb = "https://soulsbornechallenges.com/img/sbcimage.jpg"
</script>

<MetaTags
    title={siteTitle}
    titleTemplate="%s | Svelte Meta Tags"
    description= {siteDescription}
    openGraph={{
        url: siteUrl,
        title: siteTitle,
        description: siteDescription,
        images: [
    {
        url: siteThumb,
        width: 800,
        height: 800,
        alt: 'photo of a character in Elden Ring'
    }
    ],
    site_name: siteTitle
    }}
    twitter={{
        handle: '@SB_Challenges',
        site: siteUrl,
        cardType: 'summary_large_image',
        title: "SoulsBorneChallenges | Articles",
        description: siteDescription,
        image: siteThumb,
        imageAlt: 'photo of a character in Elden Ring'
}}
/>
<script lang="ts">

    export let data:any;
    const posts = data.posts;
console.log(posts)

</script>

<svelte:head>
    <title>SoulsBorneChallenges - Articles</title> 
    <meta name="description" content={siteDescription}/>
</svelte:head>

<div class="flex flex-col align-center lg:w-4/5 2xl:w-2/5 mx-auto mt-20 lg:mt-36 gap-8 text-center px-8 lg:px-0 dark:text-[#F7EBE8]">
    <h1 class="text-6xl font-extrabold md:text-7xl mt-4 mb-8 2xl:mt-12 ">Articles</h1>
    <p>Want to know more about me and what I'm working on? Make sure to also check out my social media channels.</p>
    <div id="socialicons" class="mx-auto dark:hidden"><SocialIcons/></div>
    <div id="darksocialicons" class="mx-auto hidden dark:block"><DarkSocialIcons/></div>
</div>

<Saos animation={".text-focus-in .5s cubic-bezier(.55,.085,.68,.53) both;animation:text-focus-in .6s cubic-bezier(.55,.085,.68,.53) both"}>
    <div class="flex flex-col align-center lg:w-3/5 2xl:w-2/5 mx-auto mt-20 gap-8 text-center min-h-[30vw] px-4 lg:px-0 dark:text-[#F7EBE8] lg:mb-36 mb-24">
        {#each posts.data as post, i}
        <div class="flex w-full cursor-pointer border-t-2 pt-8">
            <div class=" " on:click={() => goto('/articles/' + post.attributes.slug)}>
                <h3 class="text-4xl font-bold mt-4 lg:text-left hover:text-[#105D97] dark:hover:text-[#E54B4B]">{post.attributes.title}</h3>
            </div>
        </div>
        <div id="author" class=" flex-row lg:text-left mt-[-2%]">
            <div class=" inline-flex flex-row-reverse text-base mr-4 items-start">
                <div>
                <div class="text-sm">Author: {post.attributes.authortext}</div>
                <div id="date" class="text-sm">Published: {post.attributes.published}</div>
            </div>
        </div>
        </div>
            <div class="featuredimg mx-auto flex justify-center w-full"><img src="https://api.soulsbornechallenges.com{post.attributes.featuredimg.data.attributes.url}" class="w-4/5 justify-center"/></div>
            <p class="mt-2 text-gray-800 text-lg text-left dark:text-[#F7EBE8]">{post.attributes.description}</p>
            <div class=" " on:click={() => goto('/articles/' + post.attributes.slug)}>
                <div class="lg:w-1/5 mx-auto flex text-base font-semibold items-center justify-center inline-block px-6 py-4 leading-none border rounded text-[#000] border-[#000] hover:border-[#105D97] hover:text-[#105D97] hover:bg-[#fff] mt-4 dark:text-[#F7EBE8] dark:border-[#F7EBE8] dark:hover:bg-[#1E1E24] dark:hover:text-[#F7EBE8] dark:hover:border-[#F7EBE8]">Read more</div>
            </div>
        {/each}
    </div>
</Saos>

<style>
    @keyframes -global-text-focus-in{0%{-webkit-filter:blur(12px);filter:blur(12px);opacity:0}100%{-webkit-filter:blur(0);filter:blur(0);opacity:1}}@keyframes text-focus-in{0%{-webkit-filter:blur(12px);filter:blur(12px);opacity:0}100%{-webkit-filter:blur(0);filter:blur(0);opacity:1}}

</style>