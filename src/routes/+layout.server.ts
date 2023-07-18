	/** * @type {import('@sveltejs/kit').Load} */
	export async function load({ session }) {
        return { 
          props: { user: session.user || false } 
        }
      }