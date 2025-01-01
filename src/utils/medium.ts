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
    const baseUrl = process.env.VERCEL_URL 
      ? `https://${process.env.VERCEL_URL}` 
      : process.env.NODE_ENV === 'development' 
        ? 'http://localhost:3000' 
        : '';

    const response = await fetch(`${baseUrl}/api/medium`, {
      next: { revalidate: 3600 }
    });
    
    if (!response.ok) {
      console.error('Failed to fetch posts');
      return [];
    }

    const data = await response.json();
    console.log('Received data:', data);

    return data.items || [];

  } catch (error) {
    console.error('Medium posts fetch error:', error);
    return [];
  }
} 