import { getMediumPosts } from '@/utils/medium';
import Image from 'next/image';
import Link from 'next/link';

const ITEMS_PER_PAGE = 6;

type Props = {
  searchParams?: Record<string, string | string[] | undefined>;
};

export default async function BlogPage({ searchParams = {} }: Props) {
  const pageQuery = searchParams.page;
  const pageNumber = typeof pageQuery === 'string' 
    ? parseInt(pageQuery, 10) 
    : Array.isArray(pageQuery) 
      ? parseInt(pageQuery[0], 10) 
      : 1;

  const posts = await getMediumPosts();
  
  const currentPage = !isNaN(pageNumber) ? Math.max(1, pageNumber) : 1;
  const totalPages = Math.ceil(posts.length / ITEMS_PER_PAGE);
  const currentPosts = posts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  if (!posts.length) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">My Blogs</h1>
        <div className="text-center py-10">
          <p className="text-muted-foreground">
            Şu anda blog yazıları yüklenemiyor. Lütfen daha sonra tekrar deneyin.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">My Blogs</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentPosts.map((post, index) => (
          <Link 
            href={post.link} 
            key={index}
            target="_blank"
            rel="noopener noreferrer" 
            className="group"
          >
            <div className="border rounded-lg overflow-hidden transition-shadow hover:shadow-lg bg-card">
              <div className="relative h-48 w-full">
                <Image
                  src={post.thumbnail || '/images/blog-placeholder.jpg'}
                  alt={post.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                  {post.title}
                </h2>
                
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <time dateTime={post.pubDate}>
                    {new Date(post.pubDate).toLocaleDateString('tr-TR', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </time>
                  
                  <div className="flex gap-2">
                    {post.categories?.slice(0, 2).map((category, idx) => (
                      <span key={idx} className="bg-secondary px-2 py-1 rounded-full text-xs">
                        {category}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-8">
          {currentPage > 1 && (
            <Link
              href={`/blog?page=${currentPage - 1}`}
              className="px-4 py-2 border rounded hover:bg-accent transition-colors"
            >
              Previous
            </Link>
          )}
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
            <Link
              key={pageNum}
              href={`/blog?page=${pageNum}`}
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
              href={`/blog?page=${currentPage + 1}`}
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
