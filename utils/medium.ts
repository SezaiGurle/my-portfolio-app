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
    return data.items || [];

  } catch (error) {
    console.error('Error fetching Medium posts:', error);
    return [];
  }
} 