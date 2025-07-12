import Image from 'next/image';
import Link from 'next/link';
import SiteHeader from './components/SiteHeader';
import SiteFooter from './components/SiteFooter';
import { getNoticiasFromMarkdown } from '../lib/noticias';

// A página principal continua a ser um Server Component assíncrono
export default async function Home() {
  // Busca os dados dos ficheiros Markdown
  const allNoticiasData = await getNoticiasFromMarkdown();

  // A lógica para separar destaques permanece a mesma
  const noticiaDestaque = allNoticiasData.length > 0 ? allNoticiasData[0] : null;
  const destaquesSecundarios = allNoticiasData.length > 1 ? allNoticiasData.slice(1, 3) : [];
  const ultimasNoticias = allNoticiasData.length > 3 ? allNoticiasData.slice(3, 7) : [];

  return (
    <>
      <SiteHeader />

      <main className="bg-brand-light font-lato text-brand-dark">
        <div className="container mx-auto px-4 py-12 md:py-16">
          {allNoticiasData.length === 0 ? (
            <div className="text-center py-20">
              <h2 className="font-montserrat text-3xl font-bold mb-4">Nenhuma notícia publicada</h2>
              <p className="text-brand-gray text-lg">
                Publicaste uma notícia no CMS? Faz &quot;git pull&quot; no teu terminal para a veres localmente, ou aguarda pelo deploy na Vercel.
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
                            ) : <div className="w-full h-full bg-gray-200"></div>}
                            <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/70 via-brand-dark/40 to-transparent"></div>
                            <div className="absolute bottom-0 left-0 p-6 md:p-10">
                                <span className="bg-brand-blue text-white font-semibold text-sm uppercase px-3 py-1.5 rounded-md">{noticiaDestaque.Category || 'Notícia'}</span>
                                <h1 className="font-montserrat text-3xl md:text-5xl font-bold mt-4 text-white leading-tight" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>{noticiaDestaque.Title}</h1>
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
                              ) : <div className="w-full h-full bg-gray-200"></div>}
                              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                              <div className="absolute bottom-0 left-0 p-5">
                                  <h2 className="font-montserrat text-xl font-bold text-white leading-tight" style={{ textShadow: '1px 1px 3px rgba(0,0,0,0.5)' }}>{noticia.Title}</h2>
                              </div>
                              <Link href={`/noticias/${noticia.id}`} className="absolute inset-0" aria-label={noticia.Title}></Link>
                          </div>
                        ))}
                      </div>
                  </div>
              </section>

              <section className="py-12 md:py-16">
                  <h2 className="font-montserrat text-4xl font-extrabold border-l-4 border-brand-blue pl-4 mb-8">Últimas Notícias</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                      {/* Cards de Notícias Dinâmicos */}
                      {ultimasNoticias.map((noticia) => (
                        <div key={noticia.id} className="bg-brand-white rounded-xl overflow-hidden group transition-all duration-300 ease-in-out shadow-md hover:shadow-2xl hover:-translate-y-1 border-2 border-transparent hover:border-brand-blue">
                            <div className="relative h-52 w-full bg-gray-200">
                                {noticia.Image && noticia.Image.startsWith('/') ? (
                                  <Image
                                    src={noticia.Image}
                                    alt={noticia.Title}
                                    fill
                                    className="object-cover"
                                  />
                                ) : null}
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
              </section>
            </>
          )}
        </div>
      </main>

      <SiteFooter />
    </>
  );
}
