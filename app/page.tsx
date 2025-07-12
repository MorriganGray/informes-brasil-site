// app/page.tsx

import Image from 'next/image';
import Link from 'next/link';
import { getSortedPostsData, Noticia } from '../lib/noticias';
import React from 'react'; // Importar React para usar Fragment

// --- COMPONENTE DO CARD DE NOTÍCIA (Sem alterações) ---
interface NoticiaCardProps {
  noticia: Noticia | null;
  className?: string;
  imageClassName?: string;
  titleClassName?: string;
  showCategory?: boolean;
  priority?: boolean;
}

function NoticiaCard({ noticia, className = '', imageClassName = '', titleClassName = '', showCategory = false, priority = false }: NoticiaCardProps) {
  if (!noticia) return null;

  return (
    <div className={`relative group overflow-hidden rounded-lg shadow-lg bg-white ${className}`}>
      <Link href={`/noticias/${noticia.id}`} className="absolute inset-0 z-10" aria-label={noticia.Title}></Link>
      
      {noticia.Image ? (
        <Image
          src={noticia.Image}
          alt={noticia.Title}
          fill
          priority={priority}
          className={`object-cover transition-transform duration-500 ease-in-out group-hover:scale-105 ${imageClassName}`}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 67vw, 50vw"
        />
      ) : (
        <div className="w-full h-full bg-gray-200 flex items-center justify-center">
          <span className="text-gray-500">Sem Imagem</span>
        </div>
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent"></div>

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


// --- PÁGINA INICIAL COM LAYOUT CORRIGIDO ---
export default function HomePage() {
  const allPostsData: Noticia[] = getSortedPostsData();

  const destaquePrincipal = allPostsData.length > 0 ? allPostsData[0] : null;
  const destaquesLaterais = allPostsData.slice(1, 3);
  const outrasNoticias = allPostsData.slice(3);

  if (allPostsData.length === 0) {
    return (
      <div className="text-center py-20">
        <h2 className="font-serif text-3xl font-bold mb-4">Nenhuma notícia publicada</h2>
        <p className="text-gray-600 text-lg">
          Assim que publicar uma notícia no seu CMS, ela aparecerá aqui.
        </p>
      </div>
    );
  }

  // ✨ CORREÇÃO: Removida a tag <main> e o div.container redundantes.
  // Usamos um Fragment (<>) para agrupar os elementos sem adicionar nós extras ao DOM.
  return (
    <React.Fragment>
        <h1 className="text-4xl font-extrabold font-montserrat my-8 border-l-4 border-brand-blue pl-4">
          Últimas Notícias
        </h1>

        {/* --- SEÇÃO PRINCIPAL COM FLEXBOX (ESTRUTURA MAIS ROBUSTA) --- */}
        <section className="flex flex-col lg:flex-row gap-6 mb-12">
          
          {/* Coluna da Esquerda: Destaque Principal */}
          {destaquePrincipal && (
            <div className="lg:w-2/3">
              <NoticiaCard 
                noticia={destaquePrincipal}
                className="h-[500px]" // Altura fixa define a altura da linha
                titleClassName="text-3xl md:text-4xl"
                showCategory={true}
                priority={true}
              />
            </div>
          )}

          {/* Coluna da Direita: Destaques Laterais */}
          <div className="lg:w-1/3 flex flex-col gap-6">
            {destaquesLaterais.map((noticia) => (
              noticia && (
                // O 'flex-1' faz com que cada card ocupe uma parte igual do espaço vertical da coluna
                <div key={noticia.id} className="flex-1">
                  <NoticiaCard 
                    noticia={noticia}
                    className="h-full" // Ocupa a altura total do seu contentor (div com flex-1)
                    titleClassName="text-xl"
                  />
                </div>
              )
            ))}
          </div>
        </section>

        {/* --- SEÇÃO DE OUTRAS NOTÍCIAS COM GRID RESPONSIVO SIMPLES --- */}
        {outrasNoticias.length > 0 && (
          <section>
             <h2 className="text-3xl font-bold font-montserrat my-8 border-l-4 border-gray-300 pl-4">
                Mais Notícias
             </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {outrasNoticias.map((noticia) => (
                noticia && (
                  <div key={noticia.id} className="h-80">
                    <NoticiaCard 
                      noticia={noticia}
                      className="h-full"
                      titleClassName="text-lg"
                    />
                  </div>
                )
              ))}
            </div>
          </section>
        )}
    </React.Fragment>
  );
}
