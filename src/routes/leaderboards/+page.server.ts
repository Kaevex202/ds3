let data;

/**
 * @type {import('@sveltejs/kit').RequestHandler}
 */
export async function load({url, cookies}) {
    const request = await fetch(`https://api.soulsbornechallenges.com/api/leaderboards?sort=score:desc`)
    const leaderboard = await request.json();
    console.log(leaderboard.data);
    return leaderboard;
}