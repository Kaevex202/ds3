<script lang="ts">
    import { avatarUrl, username, loggedIn, userData} from '$lib/stores.js'
    export let data;

    export async function load({ parent }) {
	const { a, b } = await parent();
	return { c: a + b };
}

    userData.set(data.strapiResponse[0]);

</script>
