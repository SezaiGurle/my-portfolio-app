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
    const response = await fetch('http://localhost:3000/api/medium', {
      cache: 'no-store'
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch Medium posts');
    }

    const data = await response.json();
    return Array.isArray(data) ? data : [];

  } catch (error) {
    console.error('Error fetching Medium posts:', error);
    return [];
  }
} 