/**
 * @type {import('@sveltejs/kit').RequestHandler}
 */
export async function load({cookies}) {
    console.log('redirect to / with cleared cookies');
    cookies.delete("disco_access_token", { httpOnly: true,
        sameSite: 'strict',
        secure: false,
        path: '/',
     });
    cookies.delete('disco_refresh_token', { httpOnly: true,
        sameSite: 'strict',
        secure: false,
        path: '/',
     });
    return {
        ok:true,
    }}