import { getGithubRepos } from '@/utils/github';
import { Metadata } from "next";
import Link from 'next/link';

export const metadata: Metadata = {
  title: "Projects | Sezai Gürle",
  description: "My GitHub projects and repositories",
};

export default async function ProjectsPage() {
  const repos = await getGithubRepos();

  if (!repos.length) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-8">My Projects</h1>
        <div className="text-center py-10">
          <p className="text-muted-foreground">
            Projeler yüklenemiyor. Lütfen daha sonra tekrar deneyin.
          </p>
        </div>
      </div>
    );
  }

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