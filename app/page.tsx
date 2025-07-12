// app/page.tsx

import Image from 'next/image';
import Link from 'next/link';
// Os componentes de cabeçalho e rodapé podem ser adicionados se existirem no seu projeto
// import SiteHeader from './components/SiteHeader';
// import SiteFooter from './components/SiteFooter';
import { getSortedPostsData, Noticia } from '../lib/noticias';

export default function HomePage() {
  // Busca os dados dos ficheiros Markdown usando a função correta
  const allPostsData: Noticia[] = getSortedPostsData();

  // Lógica para separar as notícias em diferentes secções
  const noticiaDestaque: Noticia | null = allPostsData.length > 0 ? allPostsData[0] : null;
  const destaquesSecundarios: Noticia[] = allPostsData.length > 1 ? allPostsData.slice(1, 3) : [];
  const ultimasNoticias: Noticia[] = allPostsData.length > 3 ? allPostsData.slice(3, 7) : [];

  return (
    <>
      {/* <SiteHeader /> */}

      <main className="bg-gray-100 font-sans text-gray-800">
        <div className="container mx-auto px-4 py-12 md:py-16">
          {allPostsData.length === 0 ? (
            <div className="text-center py-20">
              <h2 className="font-serif text-3xl font-bold mb-4">Nenhuma notícia publicada</h2>
              <p className="text-gray-600 text-lg">
                Assim que publicar uma notícia no seu CMS, ela aparecerá aqui.
              </p>
            </div>
          ) : (
            <>
              <section className="mb-12 md:mb-16">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Destaque Principal Dinâmico */}
                  {noticiaDestaque && (
                    <div className="lg:col-span-2 h-[30rem] lg:h-[36rem] relative rounded-xl overflow-hidden group shadow-2xl bg-gray-300">
                      {noticiaDestaque.Image && noticiaDestaque.Image.startsWith('/') ? (
                        <Image
                          src={noticiaDestaque.Image}
                          alt={noticiaDestaque.Title}
                          fill
                          className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
                          priority
                        />
                      ) : <div className="w-full h-full bg-gray-200 flex items-center justify-center"><span className="text-gray-500">Sem Imagem</span></div>}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"></div>
                      <div className="absolute bottom-0 left-0 p-6 md:p-10">
                        <span className="bg-blue-600 text-white font-semibold text-sm uppercase px-3 py-1.5 rounded-md">{noticiaDestaque.Category || 'Notícia'}</span>
                        <h1 className="font-serif text-3xl md:text-5xl font-bold mt-4 text-white leading-tight" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>{noticiaDestaque.Title}</h1>
                      </div>
                      <Link href={`/noticias/${noticiaDestaque.id}`} className="absolute inset-0" aria-label={noticiaDestaque.Title}></Link>
                    </div>
                  )}

                  {/* Destaques Secundários Dinâmicos */}
                  <div className="flex flex-col space-y-8">
                    {destaquesSecundarios.map((noticia) => (
                      <div key={noticia.id} className="h-full min-h-[16rem] relative rounded-xl overflow-hidden group shadow-xl bg-gray-300">
                        {noticia.Image && noticia.Image.startsWith('/') ? (
                          <Image
                            src={noticia.Image}
                            alt={noticia.Title}
                            fill
                            className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
                          />
                        ) : <div className="w-full h-full bg-gray-200 flex items-center justify-center"><span className="text-gray-500">Sem Imagem</span></div>}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                        <div className="absolute bottom-0 left-0 p-5">
                          <h2 className="font-serif text-xl font-bold text-white leading-tight" style={{ textShadow: '1px 1px 3px rgba(0,0,0,0.5)' }}>{noticia.Title}</h2>
                        </div>
                        <Link href={`/noticias/${noticia.id}`} className="absolute inset-0" aria-label={noticia.Title}></Link>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              <section className="py-12 md:py-16">
                <h2 className="font-serif text-4xl font-extrabold border-l-4 border-blue-600 pl-4 mb-8">Últimas Notícias</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {ultimasNoticias.map((noticia) => (
                    <div key={noticia.id} className="bg-white rounded-xl overflow-hidden group transition-all duration-300 ease-in-out shadow-md hover:shadow-2xl hover:-translate-y-1 border-2 border-transparent hover:border-blue-600">
                      <div className="relative h-52 w-full bg-gray-200">
                        {noticia.Image && noticia.Image.startsWith('/') ? (
                          <Image
                            src={noticia.Image}
                            alt={noticia.Title}
                            fill
                            className="object-cover"
                          />
                        ) : <div className="w-full h-full bg-gray-200 flex items-center justify-center"><span className="text-gray-500">Sem Imagem</span></div>}
                      </div>
                      <div className="p-5 flex flex-col">
                        <h3 className="font-serif text-lg font-bold leading-snug h-20 line-clamp-3 text-gray-900">{noticia.Title}</h3>
                        <p className="text-sm text-gray-500 mt-4">
                          {new Date(noticia.Date).toLocaleDateString('pt-BR', {
                            day: 'numeric', month: 'long', year: 'numeric'
                          })}
                        </p>
                      </div>
                      <Link href={`/noticias/${noticia.id}`} className="absolute inset-0" aria-label={noticia.Title}></Link>
                    </div>
                  ))}
                </div>
              </section>
            </>
          )}
        </div>
      </main>

      {/* <SiteFooter /> */}
    </>
  );
}
