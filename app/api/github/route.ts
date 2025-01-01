import { NextResponse } from 'next/server';

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GITHUB_USERNAME = 'sezaigurle';

interface Repository {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  language: string | null;
  created_at: string;
  updated_at: string;
}

async function fetchGithubRepos(): Promise<Repository[]> {
  const response = await fetch(
    `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=10`,
    {
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
        'Content-Type': 'application/json',
      },
      next: { revalidate: 3600 }, // Her saat başı yenileme
    }
  );

  if (!response.ok) {
    throw new Error('GitHub API isteği başarısız oldu');
  }

  return response.json();
}

export async function GET() {
  try {
    const repos = await fetchGithubRepos();
    return NextResponse.json(repos);
  } catch (error) {
    console.error('Medium feed fetch error:');
    return NextResponse.json([]);
  }
} 