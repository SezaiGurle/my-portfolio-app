export type MediumPost = {
  title: string;
  link: string;
  pubDate: string;
  content: string;
  thumbnail: string;
  categories: string[];
};

export async function getMediumPosts(): Promise<MediumPost[]> {
  try {
    const response = await fetch('https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@sezaigurle', {
      next: { revalidate: 3600 }
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch Medium posts');
    }

    const data = await response.json();
    
    // RSS2JSON'dan gelen verileri dönüştür
    return data.items.map((item: any) => ({
      title: item.title,
      link: item.link,
      pubDate: item.pubDate,
      content: item.content,
      thumbnail: item.thumbnail || extractImageFromContent(item.content),
      categories: item.categories || []
    }));

  } catch (error) {
    console.error('Error fetching Medium posts:', error);
    return [];
  }
}

// İçerikten ilk resmi çıkaran yardımcı fonksiyon
function extractImageFromContent(content: string): string {
  const imgRegex = /<img[^>]+src="([^">]+)"/;
  const match = content.match(imgRegex);
  return match ? match[1] : '';
} 