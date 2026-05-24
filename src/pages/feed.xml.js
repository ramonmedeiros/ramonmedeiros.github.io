// Redirect the old Jekyll feed URL (/feed.xml) to /rss.xml
export async function GET() {
	return new Response(null, {
		status: 301,
		headers: { Location: '/rss.xml' },
	});
}
