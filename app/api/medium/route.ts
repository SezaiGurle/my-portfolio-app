import { NextResponse } from 'next/server';
import Parser from 'rss-parser';

interface CustomItem extends Parser.Item {
  'content:encoded'?: string;
  categories?: string[];
}

interface CustomFeed extends Parser.Output<CustomItem> {
  items: CustomItem[];
}

const parser = new Parser<CustomFeed, CustomItem>({
  customFields: {
    item: ['content:encoded', 'categories']
  }
});

const MEDIUM_RSS_URL = 'https://medium.com/feed/@sezaigurle';

export async function GET() {
  try {
    const feed = await parser.parseURL(MEDIUM_RSS_URL);
    
    if (!feed?.items?.length) {
      return NextResponse.json([]);
    }

    const posts = feed.items.map(item => ({
      title: item.title || '',
      link: item.link || '',
      pubDate: item.pubDate || '',
      content: item.content || '',
      thumbnail: item['content:encoded']
        ? item['content:encoded'].match(/<img[^>]+src="([^">]+)"/)?.[1] || ''
        : '',
      categories: item.categories || []
    }));

    return NextResponse.json(posts);

  } catch (error) {
    console.error('Medium feed fetch error:', error);
    return NextResponse.json([]);
  }
} 