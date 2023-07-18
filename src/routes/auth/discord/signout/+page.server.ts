/**
 * @type {import('@sveltejs/kit').RequestHandler}
 */
export async function load({cookies}) {
    console.log('redirect to / with cleared cookies');
    cookies.delete("disco_access_token")
    cookies.delete('disco_refresh_token')
    return {
      headers: {
        'set-cookie': [
          `disco_access_token=deleted; Path=/; Max-Age=-1`,
          `disco_refresh_token=deleted; Path=/; Max-Age=-1`,
        ],
        Location: '/'
      },
      status: 302
    }}