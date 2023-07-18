<script lang="ts">

import type { Handle } from '@sveltejs/kit'

export const handle: Handle = async ({ event, resolve }) => {
  const { cookies } = event
  const session = cookies.get('session')

console.log(session);

  return resolve(event)
}
</script>


<h1>Hi</h1>
