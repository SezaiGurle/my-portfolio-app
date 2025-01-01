export interface Repository {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  language: string | null;
  created_at: string;
  updated_at: string;
}

export async function getGithubRepos(): Promise<Repository[]> {
  try {
    const response = await fetch('https://api.github.com/users/sezaigurle/repos', {
      headers: {
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        'Content-Type': 'application/json',
      },
      next: { revalidate: 3600 }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch repositories');
    }

    return response.json();
  } catch (error) {
    console.error('Error fetching GitHub repos:', error);
    return [];
  }
} 