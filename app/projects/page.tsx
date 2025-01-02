import { getGithubRepos } from '@/utils/github';
import { Metadata } from "next";
import Link from 'next/link';

export const metadata: Metadata = {
  title: "Projects | Sezai Gürle",
  description: "My GitHub projects and repositories",
};

const ITEMS_PER_PAGE = 9;

interface PageProps {
  searchParams: Record<string, string | string[] | undefined>;
}

export default async function ProjectsPage(props: PageProps) {
  const [repos, resolvedParams] = await Promise.all([
    getGithubRepos(),
    Promise.resolve(props.searchParams)
  ]);

  const currentPage = Math.max(1, Number(
    typeof resolvedParams.page === 'string' ? resolvedParams.page : 1
  ));

  const totalPages = Math.ceil(repos.length / ITEMS_PER_PAGE);
  const currentRepos = repos.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

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
        {currentRepos.map((repo) => (
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

      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-8">
          {currentPage > 1 && (
            <Link
              href={`/projects?page=${currentPage - 1}`}
              className="px-4 py-2 border rounded hover:bg-accent transition-colors"
            >
              Previous
            </Link>
          )}
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
            <Link
              key={pageNum}
              href={`/projects?page=${pageNum}`}
              className={`px-4 py-2 border rounded transition-colors ${
                pageNum === currentPage
                  ? 'bg-primary text-primary-foreground'
                  : 'hover:bg-accent'
              }`}
            >
              {pageNum}
            </Link>
          ))}
          {currentPage < totalPages && (
            <Link
              href={`/projects?page=${currentPage + 1}`}
              className="px-4 py-2 border rounded hover:bg-accent transition-colors"
            >
              Next
            </Link>
          )}
        </div>
      )}
    </div>
  );
}