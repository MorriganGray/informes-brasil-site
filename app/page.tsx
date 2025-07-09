// Importações de componentes e da função de busca de dados
import Image from 'next/image';
import Link from 'next/link';
import { getSortedNoticiasData } from '../lib/noticias'; // Ajuste o caminho se necessário
import SiteHeader from './components/SiteHeader'; // Importa o novo Header
import SiteFooter from './components/SiteFooter'; // Importa o novo Footer

// A interface pode ser movida para um ficheiro de tipos (e.g., types.ts) se preferir
interface Noticia {
  id: string;
  Title: string;
  Date: string;
  Category?: string;
  Image: string;
}

// A página principal é um Server Component assíncrono
export default async function Home() {
  // Busca os dados no servidor durante a renderização
  const allNoticiasData: Noticia[] = getSortedNoticiasData();

  // Lógica para separar as notícias em destaques
  const noticiaDestaque = allNoticiasData.length > 0 ? allNoticiasData[0] : null;
  const destaquesSecundarios = allNoticiasData.length > 1 ? allNoticiasData.slice(1, 3) : [];
  const ultimasNoticias = allNoticiasData.length > 3 ? allNoticiasData.slice(3, 7) : [];

  return (
    <>
      <SiteHeader />

      <main className="container mx-auto px-4 py-8">
        {/* Se não houver notícias, mostra uma mensagem amigável */}
        {allNoticiasData.length === 0 ? (
          <div className="text-center py-20">
            <h2 className="text-2xl font-bold mb-2">Nenhuma notícia publicada</h2>
            <p className="text-brand-gray">Por que não vai até ao <Link href="/admin" className="text-brand-blue hover:underline">painel de admin</Link> para criar a primeira?</p>
          </div>
        ) : (
          <>
            <section className="mb-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Destaque Principal Dinâmico */}
                    {noticiaDestaque && (
                      <div className="lg:col-span-2 h-96 lg:h-[500px] relative rounded-lg overflow-hidden group shadow-lg">
                          <Image 
                            src={noticiaDestaque.Image} 
                            alt={noticiaDestaque.Title}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                            priority
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
                          <div className="absolute bottom-0 left-0 p-6 md:p-8">
                              <span className="bg-brand-blue text-white font-bold text-xs uppercase px-2 py-1 rounded">{noticiaDestaque.Category || 'Notícia'}</span>
                              <h1 className="font-montserrat text-2xl md:text-4xl font-extrabold mt-2 text-white shadow-lg">{noticiaDestaque.Title}</h1>
                          </div>
                          <Link href={`/noticias/${noticiaDestaque.id}`} className="absolute inset-0"></Link>
                      </div>
                    )}

                    {/* Destaques Secundários Dinâmicos */}
                    <div className="flex flex-col space-y-6">
                      {destaquesSecundarios.map((noticia) => (
                        <div key={noticia.id} className="h-full relative rounded-lg overflow-hidden group shadow-lg">
                            <Image 
                              src={noticia.Image} 
                              alt={noticia.Title}
                              fill
                              className="object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                            <div className="absolute bottom-0 left-0 p-4">
                                <h2 className="font-montserrat text-lg font-bold mt-2 text-white">{noticia.Title}</h2>
                            </div>
                            <Link href={`/noticias/${noticia.id}`} className="absolute inset-0"></Link>
                        </div>
                      ))}
                    </div>
                </div>
            </section>

            <section>
                <h2 className="font-montserrat text-3xl font-extrabold border-l-4 border-brand-blue pl-4 mb-6">Últimas Notícias</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {/* Cards de Notícias Dinâmicos */}
                    {ultimasNoticias.map((noticia) => (
                      <div key={noticia.id} className="bg-brand-white rounded-lg overflow-hidden group transform transition-transform duration-300 hover:-translate-y-2 shadow-md hover:shadow-xl">
                          <div className="relative h-48 w-full">
                              <Image 
                                src={noticia.Image} 
                                alt={noticia.Title}
                                fill
                                className="object-cover"
                              />
                          </div>
                          <div className="p-4">
                              <h3 className="font-montserrat text-lg font-bold h-24">{noticia.Title}</h3>
                              <p className="text-sm text-brand-gray mt-2">
                                {new Date(noticia.Date).toLocaleDateString('pt-BR', {
                                  day: 'numeric', month: 'long', year: 'numeric'
                                })}
                              </p>
                          </div>
                          <Link href={`/noticias/${noticia.id}`} className="absolute inset-0"></Link>
                      </div>
                    ))}
                </div>
            </section>
          </>
        )}
      </main>

      <SiteFooter />
    </>
  );
}
