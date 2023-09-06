export async function GET({ fetch, setHeaders })  {
    setHeaders({
    'Content-Type': 'application/xml'
    });
    
    const site  =  'https://www.soulsbornechallenges.com';
    const response  =  await  fetch('https://api.soulsbornechallenges.com/api/posts');
    if (!response.ok) {
    throw  new  Error('Failed to fetch posts.');
    }
    const posts = await response.json();
    console.log();

// slut = posts.data[i].attributes.slug
// lastmod = posts.data[i].attributes.publishedAt

let xml = '<?xml version="1.0" encoding="UTF-8"?>';
xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">';

posts.data.forEach((post) => {
    xml += `<url>`;
    xml += `<loc>${site}/post/${post.attributes.slug}</loc>`;
    xml += `<lastmod>${post.attributes.updatedAt}</lastmod>`;
    xml += `<changefreq>daily</changefreq>`;
    xml += `<priority>0.6</priority>`;
    xml += `</url>`;
  });

  xml += `</urlset>`;

  const sendReponse = new Response(xml);

  sendReponse.headers.set("content-type", "application/xml");

  return sendReponse;
}