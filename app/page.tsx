// app/page.tsx

import Image from 'next/image';
import Link from 'next/link';
import { getSortedPostsData, Noticia } from '../lib/noticias';

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
          sizes="(max-width: 768px) 100vw, 50vw"
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


// --- PÁGINA INICIAL COM LAYOUT DE TAMANHO FIXO ---
export default function HomePage() {
  const allPostsData: Noticia[] = getSortedPostsData();

  const destaquePrincipal = allPostsData.length > 0 ? allPostsData[0] : null;
  const destaquesLaterais = allPostsData.slice(1, 3);
  const outrasNoticias = allPostsData.slice(3);

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

        {/* --- SEÇÃO PRINCIPAL COM FLEXBOX E TAMANHOS FIXOS --- */}
        <section className="flex flex-wrap justify-center lg:justify-start gap-6 mb-12">
          
          {/* Destaque Principal */}
          {destaquePrincipal && (
            // ✨ CORREÇÃO: Tamanho maior para o destaque, mas ainda fixo.
            <div className="w-full max-w-[540px] h-[406px] lg:max-w-none lg:w-2/3 lg:h-auto">
              <NoticiaCard 
                noticia={destaquePrincipal}
                className="h-full"
                titleClassName="text-3xl md:text-4xl"
                showCategory={true}
                priority={true}
              />
            </div>
          )}

          {/* Destaques Laterais */}
          <div className="flex flex-wrap sm:flex-nowrap lg:flex-col justify-center gap-6 lg:w-1/3">
            {destaquesLaterais.map((noticia) => (
              noticia && (
                // ✨ CORREÇÃO: Tamanho exato de 270x203px
                <div key={noticia.id} className="w-[270px] h-[203px]">
                  <NoticiaCard 
                    noticia={noticia}
                    className="h-full"
                    titleClassName="text-xl"
                  />
                </div>
              )
            ))}
          </div>
        </section>

        {/* --- SEÇÃO DE OUTRAS NOTÍCIAS COM GRID DE TAMANHO FIXO --- */}
        {outrasNoticias.length > 0 && (
          <section>
             <h2 className="text-3xl font-bold font-montserrat my-8 border-l-4 border-gray-300 pl-4">
                Mais Notícias
             </h2>
            {/* Usamos flex-wrap para criar um grid responsivo com itens de tamanho fixo */}
            <div className="flex flex-wrap justify-center gap-6">
              {outrasNoticias.map((noticia) => (
                noticia && (
                  // ✨ CORREÇÃO: Tamanho exato de 270x203px
                  <div key={noticia.id} className="w-[270px] h-[203px]">
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
      </div>
    </main>
  );
}
