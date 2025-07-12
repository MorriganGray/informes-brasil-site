// app/page.tsx

import Image from 'next/image';
import Link from 'next/link';
import { getSortedPostsData, Noticia } from '../lib/noticias';

// --- COMPONENTE DO CARD DE NOTÍCIA (Sem alterações, o problema não estava aqui) ---
interface NoticiaCardProps {
  noticia: Noticia | null;
  className?: string;
  imageClassName?: string;
  titleClassName?: string;
  showCategory?: boolean;
  priority?: boolean; // Nova prop para priorizar o carregamento da imagem principal
}

function NoticiaCard({ noticia, className = '', imageClassName = '', titleClassName = '', showCategory = false, priority = false }: NoticiaCardProps) {
  if (!noticia) return null;

  return (
    <div className={`relative group overflow-hidden rounded-lg shadow-lg bg-white ${className}`}>
      {/* Link envolvendo tudo para melhor SEO e acessibilidade */}
      <Link href={`/noticias/${noticia.id}`} className="absolute inset-0 z-10" aria-label={noticia.Title}></Link>
      
      {/* Imagem de Fundo */}
      {noticia.Image ? (
        <Image
          src={noticia.Image}
          alt={noticia.Title}
          fill
          priority={priority} // Carrega a imagem principal mais rápido
          className={`object-cover transition-transform duration-500 ease-in-out group-hover:scale-105 ${imageClassName}`}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      ) : (
        <div className="w-full h-full bg-gray-200 flex items-center justify-center">
          <span className="text-gray-500">Sem Imagem</span>
        </div>
      )}

      {/* Gradiente para legibilidade do texto */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent"></div>

      {/* Conteúdo do Card */}
      <div className="absolute bottom-0 left-0 p-4 md:p-6 w-full z-20">
        {showCategory && noticia.Category && (
          <span className="bg-brand-blue text-white font-semibold text-xs uppercase px-2 py-1 rounded-md mb-2 inline-block">
            {noticia.Category}
          </span>
        )}
        <h2 className={`font-serif font-bold text-white leading-tight ${titleClassName}`} style={{ textShadow: '1px 1px 3px rgba(0,0,0,0.8)' }}>
          {noticia.Title}
        </h2>
      </div>
    </div>
  );
}


// --- NOVA ESTRUTURA DA PÁGINA INICIAL ---
export default function HomePage() {
  const allPostsData: Noticia[] = getSortedPostsData();

  const destaquePrincipal = allPostsData.length > 0 ? allPostsData[0] : null;
  const destaquesLaterais = allPostsData.slice(1, 3);
  // Unimos as outras notícias para um grid único e mais simples
  const outrasNoticias = allPostsData.slice(3);

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
          Últimas Notícias
        </h1>

        {/* --- SEÇÃO PRINCIPAL COM FLEXBOX (Mais robusto) --- */}
        <section className="flex flex-col lg:flex-row gap-6 mb-12">
          
          {/* Coluna da Esquerda: Destaque Principal */}
          <div className="lg:w-2/3">
            {destaquePrincipal && (
              <NoticiaCard 
                noticia={destaquePrincipal}
                className="h-80 md:h-[484px]" // Altura fixa e responsiva
                titleClassName="text-3xl md:text-4xl"
                showCategory={true}
                priority={true} // Otimiza o LCP
              />
            )}
          </div>

          {/* Coluna da Direita: Destaques Laterais */}
          <div className="lg:w-1/3 flex flex-col gap-6">
            {destaquesLaterais.map((noticia) => (
              noticia && (
                <NoticiaCard 
                  key={noticia.id}
                  noticia={noticia}
                  className="h-56 md:h-full" // Ocupa a altura do container flex
                  titleClassName="text-xl"
                />
              )
            ))}
          </div>
        </section>

        {/* --- SEÇÃO DE OUTRAS NOTÍCIAS COM GRID SIMPLES --- */}
        {outrasNoticias.length > 0 && (
          <section>
             <h2 className="text-3xl font-bold font-montserrat my-8 border-l-4 border-gray-300 pl-4">
                Mais Notícias
             </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {outrasNoticias.map((noticia) => (
                noticia && (
                  <NoticiaCard 
                    key={noticia.id}
                    noticia={noticia}
                    className="h-80" // Altura fixa para todos os cards
                    titleClassName="text-lg"
                  />
                )
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
