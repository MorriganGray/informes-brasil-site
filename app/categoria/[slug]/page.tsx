import Image from 'next/image';
import Link from 'next/link';
import SiteHeader from '../../components/SiteHeader'; // Ajuste no caminho
import SiteFooter from '../../components/SiteFooter'; // Ajuste no caminho
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

// As mesmas interfaces e função de leitura que usamos na página inicial
// Poderíamos movê-las para um ficheiro partilhado, mas por agora vamos mantê-las aqui
interface Noticia {
  id: string;
  Title: string;
  Date: string;
  Category?: string;
  Image: string;
}

function getNoticiasFromMarkdown(): Noticia[] {
  const postsDirectory = path.join(process.cwd(), '_noticias');
  if (!fs.existsSync(postsDirectory)) return [];
  const fileNames = fs.readdirSync(postsDirectory);
  const allNoticiasData = fileNames.map((fileName) => {
    const id = fileName.replace(/\.md$/, '');
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const matterResult = matter(fileContents);
    return {
      id,
      ...matterResult.data,
    } as Noticia;
  });
  return allNoticiasData.sort((a, b) => (a.Date < b.Date ? 1 : -1));
}

// Esta função gera as páginas estáticas para cada categoria no momento do build
export async function generateStaticParams() {
    const noticias = getNoticiasFromMarkdown();
    const categorias = new Set(noticias.map(n => n.Category?.toLowerCase().replace(/\s+/g, '-')));
    
    return Array.from(categorias).map(slug => ({
        slug: slug,
    }));
}

// A página da categoria
export default function CategoriaPage({ params }: { params: { slug: string } }) {
  const todasAsNoticias = getNoticiasFromMarkdown();

  // Filtra as notícias para esta categoria específica
  const noticiasDaCategoria = todasAsNoticias.filter(noticia => 
    noticia.Category?.toLowerCase().replace(/\s+/g, '-') === params.slug
  );
  
  // Pega a categoria original (com maiúsculas) para o título da página
  const nomeDaCategoria = noticiasDaCategoria[0]?.Category || params.slug;

  return (
    <>
      <SiteHeader />
      <main className="bg-brand-light font-lato text-brand-dark">
        <div className="container mx-auto px-4 py-12 md:py-16">
          <h1 className="font-montserrat text-4xl font-extrabold border-l-4 border-brand-blue pl-4 mb-8">
            Categoria: {nomeDaCategoria}
          </h1>

          {noticiasDaCategoria.length === 0 ? (
            <p>Nenhuma notícia encontrada nesta categoria.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {noticiasDaCategoria.map((noticia) => (
                <div key={noticia.id} className="bg-brand-white rounded-xl overflow-hidden group transition-all duration-300 ease-in-out shadow-md hover:shadow-2xl hover:-translate-y-1 border-2 border-transparent hover:border-brand-blue">
                  <div className="relative h-52 w-full">
                    <Image 
                      src={noticia.Image}
                      alt={noticia.Title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-5 flex flex-col">
                    <h3 className="font-montserrat text-lg font-bold leading-snug h-20 line-clamp-3 text-brand-dark">{noticia.Title}</h3>
                    <p className="text-sm text-brand-gray mt-4">
                      {new Date(noticia.Date).toLocaleDateString('pt-BR', {
                        day: 'numeric', month: 'long', year: 'numeric'
                      })}
                    </p>
                  </div>
                  <Link href={`/noticias/${noticia.id}`} className="absolute inset-0" aria-label={noticia.Title}></Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
      <SiteFooter />
    </>
  );
}