"use client"; // Adiciona esta linha no topo para permitir interatividade (useState)

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react'; // Importa o useState para o menu mobile

// Interface TypeScript para definir a "forma" de um objeto de notícia
interface Noticia {
  id: number;
  attributes: {
    Title: string;
    Category?: string;
    Date?: string;
    publishedAt: string;
    Image: {
      data: {
        attributes: {
          url: string;
        };
      };
    };
  };
}

// Função para buscar os dados da API do Strapi
// NOTA: Como a página agora é um Client Component, a busca de dados
// idealmente seria feita dentro de um `useEffect`. No entanto, para manter a simplicidade
// e aproveitar o carregamento inicial do Next.js, vamos manter a lógica assim por enquanto.
// Esta função será chamada dentro do componente Home.
async function getNoticias(): Promise<Noticia[]> {
  const apiUrl = `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/noticias?populate=*&sort=publishedAt:desc`;
  
  try {
    const res = await fetch(apiUrl, {
      headers: {
        Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
      },
      cache: 'no-store', 
    });

    if (!res.ok) {
      console.error('Failed to fetch data. Status:', res.status);
      const errorBody = await res.text();
      console.error('Error Body:', errorBody);
      throw new Error('Falha ao buscar os dados da API');
    }

    const data = await res.json();
    return data.data || [];
  } catch (error) {
    console.error('Erro ao conectar com o Strapi:', error);
    return [];
  }
}

// A página principal agora é 'async' para poder usar 'await' na busca de dados
export default async function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const noticias: Noticia[] = await getNoticias();

  const noticiaDestaque: Noticia | null = noticias.length > 0 ? noticias[0] : null;
  const destaquesSecundarios: Noticia[] = noticias.length > 1 ? noticias.slice(1, 3) : [];
  const ultimasNoticias: Noticia[] = noticias.length > 3 ? noticias.slice(3, 7) : [];

  return (
    <>
      <header className="bg-brand-white/90 backdrop-blur-sm sticky top-0 z-50 shadow-md">
        <div className="absolute inset-0 bg-cover bg-center" style={{backgroundImage: "url('https://i.imgur.com/YXjFJnG.png')"}}></div>
        <div className="absolute inset-0 bg-white/90 backdrop-blur-sm"></div>
        <div className="relative container mx-auto px-4">
            <div className="flex items-center justify-between h-20">
                <Link href="/" className="flex items-center space-x-3">
                    <Image src="https://i.imgur.com/rqLSX2s.png" alt="Logo Informes Brasil" width={200} height={50} priority className="object-contain -ml-4"/>
                </Link>
                <nav className="hidden lg:flex items-center space-x-8">
                    <Link href="#" className="font-montserrat font-bold text-sm uppercase tracking-wider transition-colors duration-300 text-brand-dark hover:text-brand-blue">Política</Link>
                    <Link href="#" className="font-montserrat font-bold text-sm uppercase tracking-wider transition-colors duration-300 text-brand-dark hover:text-brand-blue">Economia</Link>
                    <Link href="#" className="font-montserrat font-bold text-sm uppercase tracking-wider transition-colors duration-300 text-brand-dark hover:text-brand-blue">Cultura</Link>
                    <Link href="#" className="font-montserrat font-bold text-sm uppercase tracking-wider transition-colors duration-300 text-brand-dark hover:text-brand-blue">Tecnologia</Link>
                </nav>
                <div className="flex items-center space-x-4">
                     <button className="text-brand-dark hover:text-brand-blue transition-colors duration-300">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                    </button>
                    <Link href="#" className="hidden md:block bg-transparent border border-brand-blue text-brand-blue px-4 py-2 rounded-md text-sm font-bold uppercase transition-all duration-300 hover:bg-brand-blue hover:text-white">Login</Link>
                    <Link href="#" className="hidden md:block bg-brand-blue text-white px-4 py-2 rounded-md text-sm font-bold uppercase transition-all duration-300 hover:bg-brand-blue-dark">Cadastre-se</Link>
                    {/* Botão Hamburger (Mobile) */}
                    <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="lg:hidden focus:outline-none text-brand-dark">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
        {/* Menu Mobile */}
        <div className={`${isMenuOpen ? 'block' : 'hidden'} lg:hidden relative bg-brand-white/95 backdrop-blur-md`}>
            <Link href="#" className="block py-3 px-4 text-sm hover:bg-brand-light font-semibold">Política</Link>
            <Link href="#" className="block py-3 px-4 text-sm hover:bg-brand-light font-semibold">Economia</Link>
            <Link href="#" className="block py-3 px-4 text-sm hover:bg-brand-light font-semibold">Cultura</Link>
            <Link href="#" className="block py-3 px-4 text-sm hover:bg-brand-light font-semibold">Tecnologia</Link>
            <div className="px-4 py-4 border-t border-gray-200 flex flex-col space-y-3">
                 <Link href="#" className="bg-transparent border border-brand-blue text-brand-blue px-4 py-2 rounded-md text-sm font-bold uppercase text-center transition-all duration-300 hover:bg-brand-blue hover:text-white">Login</Link>
                 <Link href="#" className="bg-brand-blue text-white px-4 py-2 rounded-md text-sm font-bold uppercase text-center transition-all duration-300 hover:bg-brand-blue-dark">Cadastre-se</Link>
            </div>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-8">
        <section className="mb-12">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {noticiaDestaque && (
                  <div className="lg:col-span-2 h-96 lg:h-[500px] relative rounded-lg overflow-hidden group shadow-lg">
                      <Image 
                        src={noticiaDestaque.attributes.Image.data.attributes.url} 
                        alt={noticiaDestaque.attributes.Title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        priority
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
                      <div className="absolute bottom-0 left-0 p-6 md:p-8">
                          <span className="bg-brand-blue text-white font-bold text-xs uppercase px-2 py-1 rounded">{noticiaDestaque.attributes.Category || 'Notícia'}</span>
                          <h1 className="font-montserrat text-2xl md:text-4xl font-extrabold mt-2 text-white shadow-lg">{noticiaDestaque.attributes.Title}</h1>
                      </div>
                      <Link href={`/noticias/${noticiaDestaque.id}`} className="absolute inset-0"></Link>
                  </div>
                )}
                <div className="flex flex-col space-y-6">
                  {destaquesSecundarios.map((noticia: Noticia) => (
                    <div key={noticia.id} className="h-full relative rounded-lg overflow-hidden group shadow-lg">
                        <Image 
                          src={noticia.attributes.Image.data.attributes.url} 
                          alt={noticia.attributes.Title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                        <div className="absolute bottom-0 left-0 p-4">
                            <h2 className="font-montserrat text-lg font-bold mt-2 text-white">{noticia.attributes.Title}</h2>
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
                {ultimasNoticias.map((noticia: Noticia) => (
                  <div key={noticia.id} className="bg-brand-white rounded-lg overflow-hidden group transform transition-transform duration-300 hover:-translate-y-2 shadow-md hover:shadow-xl">
                      <div className="relative h-48 w-full">
                          <Image 
                            src={noticia.attributes.Image.data.attributes.url} 
                            alt={noticia.attributes.Title}
                            fill
                            className="object-cover"
                          />
                      </div>
                      <div className="p-4">
                          <h3 className="font-montserrat text-lg font-bold h-24">{noticia.attributes.Title}</h3>
                          <p className="text-sm text-brand-gray mt-2">
                            {new Date(noticia.attributes.Date || noticia.attributes.publishedAt).toLocaleDateString('pt-BR', {
                              day: 'numeric', month: 'long', year: 'numeric'
                            })}
                          </p>
                      </div>
                      <Link href={`/noticias/${noticia.id}`} className="absolute inset-0"></Link>
                  </div>
                ))}
            </div>
        </section>
      </main>

      <footer className="bg-brand-white mt-12 border-t-4 border-brand-blue">
        <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
                <div>
                    <h4 className="font-montserrat text-lg font-bold mb-4">Informes Brasil</h4>
                    <p className="text-sm text-brand-gray">O seu portal de notícias confiáveis. Comprometidos com a verdade, trazemos a informação que importa para o seu dia a dia.</p>
                </div>
                <div>
                    <h4 className="font-montserrat text-lg font-bold mb-4">Navegação</h4>
                    <ul className="space-y-2 text-sm">
                        <li><Link href="#" className="text-brand-gray hover:text-brand-blue transition-colors">Sobre Nós</Link></li>
                        <li><Link href="#" className="text-brand-gray hover:text-brand-blue transition-colors">Contato</Link></li>
                        <li><Link href="#" className="text-brand-gray hover:text-brand-blue transition-colors">Política de Privacidade</Link></li>
                        <li><Link href="#" className="text-brand-gray hover:text-brand-blue transition-colors">Nossa Equipe</Link></li>
                    </ul>
                </div>
                <div>
                    <h4 className="font-montserrat text-lg font-bold mb-4">Siga-nos</h4>
                    <div className="flex justify-center md:justify-start space-x-4">
                        <Link href="#" className="text-brand-gray hover:text-brand-blue transition-colors">
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                <path 
                                  fillRule="evenodd" 
                                  clipRule="evenodd"
                                  d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" 
                                />
                            </svg>
                        </Link>
                    </div>
                </div>
            </div>
            <div className="border-t border-gray-200 mt-8 pt-6 text-center text-sm text-brand-gray">
                <p>&copy; {new Date().getFullYear()} Informes Brasil. Todos os direitos reservados. Notícias sem Fake News.</p>
            </div>
        </div>
      </footer>
    </>
  );
}
