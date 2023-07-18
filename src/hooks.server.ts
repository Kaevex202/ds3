import type { Handle } from '@sveltejs/kit';
import cookie from 'cookie';
const DISCORD_API_URL = import.meta.env.VITE_DISCORD_API_URL;
const HOST = import.meta.env.VITE_HOST;

const unProtectedRoutes: string[] = [
  '/',
  '/login',
  '/createAdmin',
  '/features',
  '/docs',
  '/deployment'
];

export const handle: Handle = async ({ event, resolve }) => {
  const access_token = event.cookies.get('disco_access_token');
  const refresh_token = event.cookies.get('disco_refresh_token')l

  if (event.cookies.get('disco_refresh_token') && !event.cookies.get('disco_access_token')){
    const discord_request = await fetch(`${HOST}/api/refresh?code=${refresh_token}`);
    const discord_response = await discord_request.json();

    if (discord_response.disco_access_token) 
    {
      console.log('setting discord user via refresh token..')
      const request = await fetch(`${DISCORD_API_URL}/users/@me`, {
        headers: { 'Authorization': `Bearer ${discord_response.disco_access_token}` }
      });

      // returns a discord user if JWT was valid
      const response = await request.json();

      if (response.id) 
      {
        return {
          id: response.user.id,
          username: response.user.username,
          avatar: response.user.avatar
          }
      }
    }
  }
  
  if (event.cookies.get('disco_access_token')) 
  {
    console.log('setting discord user via access token..')
    const request = await fetch(`${DISCORD_API_URL}/users/@me`, {
      headers: { 'Authorization': `Bearer ${access_token}`}
    });

    // returns a discord user if JWT was valid
    const response = await request.json();

    if (response.id) {
      return {
        id: response.user.id,
        username: response.user.username,
        avatar: response.user.avatar
      }
    }
  }
  
  resolve(event);
};