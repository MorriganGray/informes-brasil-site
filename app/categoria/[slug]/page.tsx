import { getPostsByCategory } from '../../../lib/noticias';
import Link from 'next/link';

export default function CategoryPage({ params }: { params: { slug: string } }) {
  const posts = getPostsByCategory(params.slug);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold my-8 capitalize">Categoria: {params.slug}</h1>
      {posts.length > 0 ? (
        <ul className="space-y-6">
          {posts.map(({ id, Date: date, Title: title }) => (
            <li key={id} className="border-b pb-4">
              <Link href={`/noticias/${id}`} className="text-2xl font-bold text-blue-700 hover:text-blue-900 hover:underline transition-colors duration-200">
                {title}
              </Link>
              <br />
              <small className="text-gray-500 mt-1 block">{new Date(date).toLocaleDateString('pt-BR', { year: 'numeric', month: 'long', day: 'numeric' })}</small>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-700">Nenhuma notícia encontrada nesta categoria.</p>
      )}
    </div>
  );
}