/** @type {import('./$types').PageLoad} */
export async function load({ parent }) {
    const userData = await parent();
    console.log(userData);
}