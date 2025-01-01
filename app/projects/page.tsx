import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects | Sezai Gürle",
  description: "My GitHub projects and repositories",
};

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

async function getGithubRepos(): Promise<Repository[]> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/github`, {
    next: { revalidate: 3600 }, // Her saat başı yenileme
  });

  if (!response.ok) {
    throw new Error('Failed to fetch repositories');
  }

  return response.json();
}

export default async function ProjectsPage() {
  const repos = await getGithubRepos();

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-8">My Projects</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {repos.map((repo) => (
          <a
            key={repo.id}
            href={repo.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="block p-6 rounded-lg border bg-card hover:bg-accent transition-colors"
          >
            <h2 className="text-lg font-semibold mb-2">{repo.name}</h2>
            {repo.description && (
              <p className="text-sm text-muted-foreground mb-4">{repo.description}</p>
            )}
            <div className="flex items-center space-x-4 text-sm">
              {repo.language && (
                <span className="text-muted-foreground">
                  {repo.language}
                </span>
              )}
              <span className="text-muted-foreground">
                ⭐ {repo.stargazers_count}
              </span>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}

export const dynamic = 'force-dynamic';
export const revalidate = 3600; 