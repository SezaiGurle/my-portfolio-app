import { NextResponse } from 'next/server';
import Parser from 'rss-parser';

const parser = new Parser({
  customFields: {
    item: ['content:encoded', 'categories']
  }
});

export async function GET() {
  try {
    const feed = await parser.parseURL('https://medium.com/feed/@sezaigurle');
    
    if (!feed || !feed.items) {
      console.error('Invalid feed data received');
      return NextResponse.json({ items: [] });
    }

    const posts = feed.items.map(item => {
      let thumbnail = '';
      try {
        if (item['content:encoded']) {
          const match = item['content:encoded'].match(/<img[^>]*src="([^"]*)"[^>]*>/);
          thumbnail = match ? match[1] : '';
        }
      } catch (e) {
        console.error('Error extracting thumbnail:', e);
      }

      return {
        title: item.title || '',
        link: item.link || '',
        pubDate: item.pubDate || '',
        content: item.content || item['content:encoded'] || '',
        thumbnail: thumbnail,
        categories: Array.isArray(item.categories) ? item.categories : []
      };
    });

    console.log('Successfully fetched posts:', posts.length);
    return NextResponse.json({ items: posts });
  } catch (error) {
    console.error('Medium posts fetch error:', error);
    return NextResponse.json({ items: [] });
  }
} 