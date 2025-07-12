import Image from 'next/image';
import Link from 'next/link';
import SiteHeader from './components/SiteHeader';
import SiteFooter from './components/SiteFooter';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter'; // Esta biblioteca lê os metadados dos ficheiros

// Interface para a estrutura da notícia
interface Noticia {
  id: string;
  Title: string;
  Date: string; // A data será lida como string
  Category?: string;
  Image: string;
}

// Nova função para ler notícias dos ficheiros Markdown
async function getNoticiasFromMarkdown(): Promise<Noticia[]> {
  const postsDirectory = path.join(process.cwd(), 'content/noticias');

  // Verifica se o diretório existe. Se não, retorna um array vazio.
  if (!fs.existsSync(postsDirectory)) {
    console.log("Diretório 'content/noticias' não encontrado. Nenhuma notícia será carregada.");
    return [];
  }

  const fileNames = fs.readdirSync(postsDirectory);

  const allNoticiasData = fileNames.map((fileName) => {
    // Remove ".md" do nome do ficheiro para obter o id
    const id = fileName.replace(/\.md$/, '');

    // Lê o ficheiro markdown como uma string
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    // Usa gray-matter para analisar os metadados (frontmatter)
    const matterResult = matter(fileContents);

    // Combina os dados com o id
    return {
      id,
      ...matterResult.data,
    } as Noticia;
  });

  // Ordena as notícias por data, da mais recente para a mais antiga
  return allNoticiasData.sort((a, b) => {
    if (a.Date < b.Date) {
      return 1;
    } else {
      return -1;
    }
  });
}

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
                        <div className="lg:col-span-2 h-[30rem] lg:h-[36rem] relative rounded-xl overflow-hidden group shadow-2xl">
                            <Image 
                              src={noticiaDestaque.Image}
                              alt={noticiaDestaque.Title}
                              fill
                              className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
                              priority
                            />
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
                          <div key={noticia.id} className="h-full min-h-[16rem] relative rounded-xl overflow-hidden group shadow-xl">
                              <Image 
                                src={noticia.Image}
                                alt={noticia.Title}
                                fill
                                className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
                              />
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
              </section>
            </>
          )}
        </div>
      </main>

      <SiteFooter />
    </>
  );
}
