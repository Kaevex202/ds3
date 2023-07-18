/**
 * @type {import('@sveltejs/kit').RequestHandler}
 */
export async function load({cookies}) {
    console.log('redirect to / with cleared cookies');
    cookies.delete("disco_access_token");
    cookies.delete('disco_refresh_token');
    return {
        ok:true,
    }}