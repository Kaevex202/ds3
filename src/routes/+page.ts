// since there's no dynamic data here, we can prerender
// it so that it gets served as a static asset in production
export const prerender = true;


/** @type {import('./$types').PageLoad} */
export async function load({ fetch }) {
    const strapiTwitchSearch = await fetch(`https://api.soulsbornechallenges.com/api/website-settings`, {
        method: 'GET'}
    )
    const twitchResponse = await strapiTwitchSearch.json();
    const twitchLive = twitchResponse.data[0].attributes.twitchLive;
    return {twitchLive}
  }