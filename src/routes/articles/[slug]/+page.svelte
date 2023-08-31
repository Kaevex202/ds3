<script lang="ts">
    import { MetaTags } from 'svelte-meta-tags';
    import SvelteMarkdown from 'svelte-markdown'
    import { page } from '$app/stores';
    import sbcimage from '$lib/images/sbcimage.jpg'

    export let data:any;
    const blogPosts = data;
    console.log(blogPosts.blogPost.data[0].attributes.publishedAt)

    const pageContentRaw = blogPosts.blogPost.data[0].attributes.content;
    //const pageContent = pageContentRaw.replaceAll('/uploads/','https://api.kymancheng.nl/uploads/');
    const source = pageContentRaw;

    const siteUrl = $page.path
    const siteTitle = "SoulsBorneChallenges - " + blogPosts.blogPost.data[0].attributes.title;
    const siteBlogThumb = "";

</script>


<MetaTags
    title={siteTitle}
    titleTemplate="%s | Svelte Meta Tags"
    description= {blogPosts.blogPost.data[0].attributes.description}
    openGraph={{
    title: siteTitle,
    description: blogPosts.blogPost.data[0].attributes.description,
    url: siteUrl,
    type: 'article',
    article: {
        publishedTime: blogPosts.blogPost.data[0].attributes.publishedAt,
        modifiedTime: blogPosts.blogPost.data[0].attributes.updatedAt
    },
    images: [
      {
        url: siteBlogThumb,
        width: 850,
        height: 650,
        alt: ''
      }
    ],
    site_name: siteTitle
    }}
    twitter={{
        handle: '@kymancheng',
        site: siteUrl,
        cardType: 'summary_large_image',
        title: siteTitle,
        description: blogPosts.blogPost.data[0].attributes.description,
        image: siteBlogThumb,
        imageAlt: ''
}}
/>

<svelte:head>
    <title>Kyman Cheng Photography - {blogPosts.blogPost.data[0].attributes.title}</title> 
	<meta name="description" content={blogPosts.blogPost.data[0].attributes.description} />
</svelte:head>

<div class="flex flex-col align-center lg:w-4/5 2xl:w-2/5 mx-auto mt-20 lg:mt-36 gap-8 text-center px-8 lg:px-0">
    <h2 class="text-2xl font-extrabold md:text-6xl mt-4 2xl:mt-12 mb-0 lg:text-left dark:text-[#F7EBE8] dark:hover:text-[#E54B4B]">{blogPosts.blogPost.data[0].attributes.title}</h2>
    <hr class="mb-0 pb-0"/>
    <div class="flex flex-col mt-[-2%]">
    <p class="flex mt-0 text-gray-600 text-lg dark:text-[#F7EBE8]">Written by: {blogPosts.blogPost.data[0].attributes.authortext}</p>
    <p class="flex mt-0 text-gray-600 text-xs dark:text-[#F7EBE8]">Published: {blogPosts.blogPost.data[0].attributes.published}</p>
    </div>
</div>
<div class="flex flex-col align-center lg:w-4/5 2xl:w-2/5 mx-auto mt-16 gap-8 text-left min-h-[30vw] px-4 lg:px-0 dark:text-[#F7EBE8]">
    <SvelteMarkdown {source} />
</div>



<style>

p{
font-size: 1.125rem; /* 18px */
line-height: 1.75rem; /* 28px */
}
    
img {
    text-align:center!important;
    display:flex!important;
    pointer-events:none!important;
}


    </style>