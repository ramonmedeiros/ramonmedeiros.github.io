import { getCollection } from 'astro:content';
import rss from '@astrojs/rss';
import { SITE_DESCRIPTION, SITE_TITLE } from '../consts';

function postUrl(id) {
	const parts = id.split('-');
	const year = parts[0];
	const month = parts[1];
	const day = parts[2];
	const slug = parts.slice(3).join('-');
	return `/${year}/${month}/${day}/${slug}/`;
}

export async function GET(context) {
	const posts = (await getCollection('blog')).sort(
		(a, b) => b.data.date.valueOf() - a.data.date.valueOf(),
	);
	return rss({
		title: SITE_TITLE,
		description: SITE_DESCRIPTION,
		site: context.site,
		items: posts.map((post) => ({
			title: post.data.title,
			description: post.data.description,
			pubDate: post.data.date,
			link: postUrl(post.id),
		})),
	});
}
