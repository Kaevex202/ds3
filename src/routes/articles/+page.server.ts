/** @type {import('./$types').PageLoad} */
export async function load({ fetch }) {
    const res = await fetch(`https://api.soulsbornechallenges.com/api/posts?populate=*&sort[0]=createdAt%3Adesc`);
    const posts = await res.json();
    return { posts };
}