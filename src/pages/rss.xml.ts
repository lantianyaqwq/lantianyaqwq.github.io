import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIRoute } from 'astro';

export const GET: APIRoute = async (context) => {
  const resources = await getCollection('resources');
  const news = await getCollection('news');
  const items = [
    ...resources.map((entry) => ({
      title: entry.data.title,
      description: entry.data.description,
      pubDate: entry.data.published,
      link: `/resources/${entry.id}/`,
    })),
    ...news.map((entry) => ({
      title: entry.data.title,
      description: entry.data.description,
      pubDate: entry.data.published,
      link: `/news/#${entry.id}`,
    })),
  ].sort((a, b) => b.pubDate.getTime() - a.pubDate.getTime());

  return rss({
    title: 'BlueSky',
    description: 'BlueSky 的免费资源分享与每周热门资讯。',
    site: context.site!,
    items,
  });
};
