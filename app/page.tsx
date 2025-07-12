// app/page.tsx

import Image from 'next/image';
import Link from 'next/link';
import { getSortedPostsData, Noticia } from '../lib/noticias';

// Definindo os tipos para as propriedades do nosso componente
interface NoticiaCardProps {
  noticia: Noticia | null; // A notícia pode ser do tipo Noticia ou nula
  className?: string;      // className é opcional e do tipo string
  imageClassName?: string; // imageClassName é opcional e do tipo string
  titleClassName?: string; // titleClassName é opcional e do tipo string
  showCategory?: boolean;  // showCategory é opcional e do tipo booleano
}

// Componente auxiliar para o cartão de notícia, agora com tipos explícitos
function NoticiaCard({ noticia, className = '', imageClassName = '', titleClassName = '', showCategory = false }: NoticiaCardProps) {
  if (!noticia) return null;

  return (
    <div className={`relative group overflow-hidden rounded-lg shadow-lg bg-white ${className}`}>
      {/* Imagem de Fundo */}
      {noticia.Image ? (
        <Image
          src={noticia.Image}
          alt={noticia.Title}
          fill
          className={`object-cover transition-transform duration-500 ease-in-out group-hover:scale-105 ${imageClassName}`}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      ) : (
        <div className="w-full h-full bg-gray-200 flex items-center justify-center">
          <span className="text-gray-500">Sem Imagem</span>
        </div>
      )}

      {/* Gradiente para legibilidade do texto */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"></div>

      {/* Conteúdo do Card */}
      <div className="absolute bottom-0 left-0 p-4 md:p-6 w-full">
        {showCategory && noticia.Category && (
          <span className="bg-brand-blue text-white font-semibold text-xs uppercase px-2 py-1 rounded-md mb-2 inline-block">
            {noticia.Category}
          </span>
        )}
        <h2 className={`font-serif font-bold text-white leading-tight ${titleClassName}`} style={{ textShadow: '1px 1px 3px rgba(0,0,0,0.7)' }}>
          {noticia.Title}
        </h2>
      </div>
      <Link href={`/noticias/${noticia.id}`} className="absolute inset-0" aria-label={noticia.Title}></Link>
    </div>
  );
}
export default function HomePage() {
  const allPostsData: Noticia[] = getSortedPostsData();

  // Lógica aprimorada para separar as notícias
  const destaquePrincipal = allPostsData.length > 0 ? allPostsData[0] : null;
  const destaquesLaterais = allPostsData.slice(1, 3);
  const outrasNoticias = allPostsData.slice(3, 7);

  // Mensagem para quando não houver notícias
  if (allPostsData.length === 0) {
    return (
      <main className="bg-gray-100 font-sans text-gray-800">
        <div className="container mx-auto px-4 py-12 md:py-16">
          <div className="text-center py-20">
            <h2 className="font-serif text-3xl font-bold mb-4">Nenhuma notícia publicada</h2>
            <p className="text-gray-600 text-lg">
              Assim que publicar uma notícia no seu CMS, ela aparecerá aqui.
            </p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-brand-light font-lato text-brand-dark">
      <div className="container mx-auto px-4 py-8">
        
        <h1 className="text-4xl font-extrabold font-montserrat my-8 border-l-4 border-brand-blue pl-4">
          Notícias
        </h1>

        {/* Grid Principal */}
        <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-2 gap-6 h-[40rem]">
          
          {/* Destaque Principal (ocupa 2x2 do grid) */}
          {destaquePrincipal && (
             <div className="md:col-span-2 md:row-span-2 h-[20rem] md:h-full">
               <NoticiaCard 
                  noticia={destaquePrincipal} 
                  // ✨ CORREÇÃO AQUI ✨
                  className="h-full"
                  titleClassName="text-3xl md:text-4xl"
                  showCategory={true}
               />
             </div>
          )}
          
          {/* Destaques Laterais (coluna ao lado do principal) */}
          {destaquesLaterais.map((noticia) => (
            <div key={noticia.id} className="md:col-span-1 h-[20rem] md:h-auto">
               <NoticiaCard 
                  noticia={noticia}
                  // ✨ CORREÇÃO AQUI ✨
                  className="h-full"
                  titleClassName="text-xl"
               />
            </div>
          ))}

        </div>

        {/* Seção de Outras Notícias (abaixo do grid principal) */}
        {outrasNoticias.length > 0 && (
          <section className="mt-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {outrasNoticias.map((noticia) => (
                <div key={noticia.id} className="h-[20rem]">
                    <NoticiaCard 
                        noticia={noticia}
                        // ✨ CORREÇÃO AQUI ✨
                        className="h-full"
                        titleClassName="text-lg"
                    />
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}