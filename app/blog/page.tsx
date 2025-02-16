import { getMediumPosts } from '@/utils/medium';
import Image from 'next/image';
import Link from 'next/link';

export default async function BlogPage() {
  const posts = await getMediumPosts();

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
        {posts.map((post, index) => (
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
    </div>
  );
}
