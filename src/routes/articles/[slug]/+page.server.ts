
/** @type {import('./$types').PageLoad} */

export async function load({ params }) {


    const res = await fetch(`https://api.soulsbornechallenges.com/api/posts?filters[slug][$eq]=`+ params.slug + "&populate=*");
    const blogPost = await res.json();
    return { blogPost };
}