import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';
import Image from 'next/image';
import SiteHeader from '../../components/SiteHeader';
import SiteFooter from '../../components/SiteFooter';

// Interface para a estrutura dos metadados da notícia
interface NoticiaData {
  Title: string;
  Date: string;
  Category?: string;
  Image: string;
}

// Função para obter os caminhos de todas as notícias para geração estática
export async function generateStaticParams() {
  const postsDirectory = path.join(process.cwd(), 'content/noticias');
  
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(postsDirectory);

  return fileNames.map((fileName) => ({
    id: fileName.replace(/\.md$/, ''),
  }));
}

// Função para obter os dados de uma notícia específica
async function getNoticiaData(id: string): Promise<{ data: NoticiaData; content: string } | null> {
  const postsDirectory = path.join(process.cwd(), 'content/noticias');
  const filePath = path.join(postsDirectory, `${id}.md`);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const fileContents = fs.readFileSync(filePath, 'utf8');
  const matterResult = matter(fileContents);

  return {
    data: matterResult.data as NoticiaData,
    content: matterResult.content,
  };
}

// --- NOVO COMPONENTE DE PÁGINA DE NOTÍCIA ---
export default async function NoticiaPage({ params }: { params: { id: string } }) {
  const noticia = await getNoticiaData(params.id);

  if (!noticia) {
    return (
      <>
        <SiteHeader />
        <main className="bg-brand-light text-brand-dark">
          <div className="container mx-auto px-4 py-12 text-center">
            <h1 className="text-4xl font-bold">Notícia não encontrada</h1>
          </div>
        </main>
        <SiteFooter />
      </>
    );
  }

  // Converte o corpo da notícia de Markdown para HTML
  const htmlContent = marked(noticia.content);

  return (
    <>
      <SiteHeader />
      
      <main className="bg-brand-light pt-8 pb-16">
        <article className="container mx-auto max-w-4xl px-4">
          
          {/* Banner da Imagem */}
          <div className="relative w-full h-80 md:h-96 lg:h-[30rem] rounded-2xl overflow-hidden shadow-2xl mb-8">
            <Image
              src={noticia.data.Image}
              alt={noticia.data.Title}
              fill
              className="object-cover"
              priority
            />
          </div>
          
          {/* Container para o conteúdo do texto */}
          <div className="bg-white shadow-xl rounded-2xl p-6 md:p-10">

            {/* Título e Metadados */}
            <header className="mb-8 border-b pb-6">
              {noticia.data.Category && (
                 <p className="text-sm font-bold uppercase text-brand-blue mb-2">{noticia.data.Category}</p>
              )}
              <h1 className="font-montserrat text-3xl md:text-5xl font-extrabold text-brand-dark mb-4 leading-tight">
                {noticia.data.Title}
              </h1>
              <p className="text-brand-gray text-base">
                Publicado em {new Date(noticia.data.Date).toLocaleDateString('pt-BR', {
                  day: 'numeric', month: 'long', year: 'numeric'
                })}
              </p>
            </header>
            
            {/* Corpo da Notícia com estilos do Tailwind Typography */}
            <div
              className="prose prose-lg max-w-none prose-h2:font-montserrat prose-h2:text-2xl prose-h2:font-bold prose-p:text-brand-dark prose-a:text-brand-blue hover:prose-a:text-brand-blue-dark"
              dangerouslySetInnerHTML={{ __html: htmlContent }}
            />
          </div>

        </article>
      </main>

      <SiteFooter />
    </>
  );
}