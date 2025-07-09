import Image from "next/image";

export default function Home() {
  return (
    <>

      {/* CABEÇALHO */}
      <header className="sticky top-0 z-50 shadow-md">
          {/* Background Image & Overlay */}
          <div className="absolute inset-0 bg-cover bg-center" style={{backgroundImage: "url('https://i.imgur.com/YXjFJnG.png')"}}></div>
          <div className="absolute inset-0 bg-gray-800/95 backdrop-blur-sm"></div>

          {/* Header Content */}
          <div className="relative container mx-auto px-4">
              <div className="flex items-center justify-between h-20">
                  {/* Logo */}
                  <a href="#" className="flex items-center space-x-3">
                      <img src="https://i.imgur.com/rqLSX2s.png" alt="Logo Informes Brasil" className="h-16 w-auto object-contain -ml-4"/>
                  </a>

                  {/* Navegação Principal (Desktop) */}
                  <nav className="hidden lg:flex items-center space-x-8">
                      <a href="#" className="font-montserrat font-bold text-sm uppercase tracking-wider transition-colors duration-300 text-gray-200 hover:text-white">Política</a>
                      <a href="#" className="font-montserrat font-bold text-sm uppercase tracking-wider transition-colors duration-300 text-gray-200 hover:text-white">Economia</a>
                      <a href="#" className="font-montserrat font-bold text-sm uppercase tracking-wider transition-colors duration-300 text-gray-200 hover:text-white">Cultura</a>
                      <a href="#" className="font-montserrat font-bold text-sm uppercase tracking-wider transition-colors duration-300 text-gray-200 hover:text-white">Tecnologia</a>
                  </nav>

                  {/* Ações e Menu Mobile */}
                  <div className="flex items-center space-x-4">
                       <button className="text-gray-200 hover:text-white transition-colors duration-300">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                          </svg>
                      </button>
                      <a href="#" className="hidden md:block bg-transparent border border-brand-blue text-brand-blue px-4 py-2 rounded-md text-sm font-bold uppercase transition-all duration-300 hover:bg-brand-blue hover:text-white">Login</a>
                      <a href="#" className="hidden md:block bg-brand-blue text-white px-4 py-2 rounded-md text-sm font-bold uppercase transition-all duration-300 hover:bg-brand-blue-dark">Cadastre-se</a>
                      
                      {/* Botão Hamburger (Mobile) */}
                      <button id="menu-btn" className="lg:hidden focus:outline-none text-gray-200">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                          </svg>
                      </button>
                  </div>
              </div>
          </div>
          {/* Menu Mobile */}
          <div id="mobile-menu" className="hidden lg:hidden relative bg-brand-white/95 backdrop-blur-md">
              <a href="#" className="block py-3 px-4 text-sm hover:bg-brand-light font-semibold">Política</a>
              <a href="#" className="block py-3 px-4 text-sm hover:bg-brand-light font-semibold">Economia</a>
              <a href="#" className="block py-3 px-4 text-sm hover:bg-brand-light font-semibold">Cultura</a>
              <a href="#" className="block py-3 px-4 text-sm hover:bg-brand-light font-semibold">Tecnologia</a>
              <div className="px-4 py-4 border-t border-gray-200 flex flex-col space-y-3">
                   <a href="#" className="bg-transparent border border-brand-blue text-brand-blue px-4 py-2 rounded-md text-sm font-bold uppercase text-center transition-all duration-300 hover:bg-brand-blue hover:text-white">Login</a>
                   <a href="#" className="bg-brand-blue text-white px-4 py-2 rounded-md text-sm font-bold uppercase text-center transition-all duration-300 hover:bg-brand-blue-dark">Cadastre-se</a>
              </div>
          </div>
      </header>

      {/* CONTEÚDO PRINCIPAL */}
      <main className="container mx-auto px-4 py-8">

          {/* SEÇÃO DE DESTAQUE */}
          <section className="mb-12">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Destaque Principal */}
                  <div className="lg:col-span-2 h-96 lg:h-[500px] relative rounded-lg overflow-hidden group shadow-lg">
                      <img src="https://placehold.co/1200x800/00529B/FFFFFF?text=Notícia+Destaque" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" alt="Imagem de Destaque"/>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
                      <div className="absolute bottom-0 left-0 p-6 md:p-8">
                          <span className="bg-brand-blue text-white font-bold text-xs uppercase px-2 py-1 rounded">Economia</span>
                          <h1 className="font-montserrat text-2xl md:text-4xl font-extrabold mt-2 text-white shadow-lg">Banco Central anuncia nova medida para conter a inflação e mercado reage</h1>
                          <p className="hidden md:block text-gray-200 mt-2">Analistas avaliam o impacto da decisão para os investimentos e o poder de compra da população nos próximos meses.</p>
                      </div>
                      <a href="#" className="absolute inset-0"></a>
                  </div>
                  {/* Destaques Secundários */}
                  <div className="flex flex-col space-y-6">
                      <div className="h-full relative rounded-lg overflow-hidden group shadow-lg">
                           <img src="https://placehold.co/600x400/1F2937/FFFFFF?text=Cultura" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" alt="Destaque 2"/>
                           <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                           <div className="absolute bottom-0 left-0 p-4">
                              <span className="bg-red-600 text-white font-bold text-xs uppercase px-2 py-1 rounded">Cultura</span>
                              <h2 className="font-montserrat text-lg font-bold mt-2 text-white">Festival de cinema no Rio de Janeiro premia produções nacionais e destaca novos talentos</h2>
                           </div>
                           <a href="#" className="absolute inset-0"></a>
                      </div>
                      <div className="h-full relative rounded-lg overflow-hidden group shadow-lg">
                           <img src="https://placehold.co/600x400/6B7280/FFFFFF?text=Política" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" alt="Destaque 3"/>
                           <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                           <div className="absolute bottom-0 left-0 p-4">
                              <span className="bg-yellow-500 text-black font-bold text-xs uppercase px-2 py-1 rounded">Política</span>
                              <h2 className="font-montserrat text-lg font-bold mt-2 text-white">Congresso vota reforma tributária em sessão marcada por debates intensos</h2>
                           </div>
                           <a href="#" className="absolute inset-0"></a>
                      </div>
                  </div>
              </div>
          </section>

          {/* NOTÍCIAS RECENTES */}
          <section>
              <h2 className="font-montserrat text-3xl font-extrabold border-l-4 border-brand-blue pl-4 mb-6">Últimas Notícias</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {/* Card de Notícia */}
                  <div className="bg-brand-white rounded-lg overflow-hidden group transform transition-transform duration-300 hover:-translate-y-2 shadow-md hover:shadow-xl">
                      <div className="relative">
                          <img src="https://placehold.co/400x300/f0f2f5/1F2937?text=Tecnologia" className="w-full h-48 object-cover" alt="Notícia 1"/>
                          <span className="absolute top-2 right-2 bg-green-600 text-white font-bold text-xs uppercase px-2 py-1 rounded">Tecnologia</span>
                      </div>
                      <div className="p-4">
                          <h3 className="font-montserrat text-lg font-bold h-24">Novo satélite brasileiro entra em órbita para ampliar a internet no país.</h3>
                          <p className="text-sm text-brand-gray mt-2">Por Ana Silva - 8 de Julho, 2025</p>
                      </div>
                      <a href="#" className="absolute inset-0"></a>
                  </div>
                  {/* Card de Notícia */}
                  <div className="bg-brand-white rounded-lg overflow-hidden group transform transition-transform duration-300 hover:-translate-y-2 shadow-md hover:shadow-xl">
                      <div className="relative">
                          <img src="https://placehold.co/400x300/f0f2f5/1F2937?text=Esportes" className="w-full h-48 object-cover" alt="Notícia 2"/>
                          <span className="absolute top-2 right-2 bg-blue-800 text-white font-bold text-xs uppercase px-2 py-1 rounded">Esportes</span>
                      </div>
                      <div className="p-4">
                          <h3 className="font-montserrat text-lg font-bold h-24">Rodada do Brasileirão tem clássico emocionante e mudanças na tabela.</h3>
                          <p className="text-sm text-brand-gray mt-2">Por Carlos Pereira - 8 de Julho, 2025</p>
                      </div>
                      <a href="#" className="absolute inset-0"></a>
                  </div>
                  {/* Card de Notícia */}
                  <div className="bg-brand-white rounded-lg overflow-hidden group transform transition-transform duration-300 hover:-translate-y-2 shadow-md hover:shadow-xl">
                      <div className="relative">
                          <img src="https://placehold.co/400x300/f0f2f5/1F2937?text=Saúde" className="w-full h-48 object-cover" alt="Notícia 3"/>
                          <span className="absolute top-2 right-2 bg-red-500 text-white font-bold text-xs uppercase px-2 py-1 rounded">Saúde</span>
                      </div>
                      <div className="p-4">
                          <h3 className="font-montserrat text-lg font-bold h-24">Ministério da Saúde anuncia nova campanha de vacinação contra a gripe.</h3>
                          <p className="text-sm text-brand-gray mt-2">Por Juliana Costa - 7 de Julho, 2025</p>
                      </div>
                      <a href="#" className="absolute inset-0"></a>
                  </div>
                  {/* Card de Notícia */}
                  <div className="bg-brand-white rounded-lg overflow-hidden group transform transition-transform duration-300 hover:-translate-y-2 shadow-md hover:shadow-xl">
                      <div className="relative">
                          <img src="https://placehold.co/400x300/f0f2f5/1F2937?text=Educação" className="w-full h-48 object-cover" alt="Notícia 4"/>
                          <span className="absolute top-2 right-2 bg-purple-600 text-white font-bold text-xs uppercase px-2 py-1 rounded">Educação</span>
                      </div>
                      <div className="p-4">
                          <h3 className="font-montserrat text-lg font-bold h-24">Resultados do ENEM são divulgados e abrem prazo para inscrições no Sisu.</h3>
                          <p className="text-sm text-brand-gray mt-2">Por Marcos Lima - 7 de Julho, 2025</p>
                      </div>
                      <a href="#" className="absolute inset-0"></a>
                  </div>
              </div>
          </section>
      </main>

      {/* RODAPÉ */}
      <footer className="bg-brand-white mt-12 border-t-4 border-brand-blue">
          <div className="container mx-auto px-4 py-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
                  {/* Sobre */}
                  <div>
                      <h4 className="font-montserrat text-lg font-bold mb-4">Informes Brasil</h4>
                      <p className="text-sm text-brand-gray">O seu portal de notícias confiáveis. Comprometidos com a verdade, trazemos a informação que importa para o seu dia a dia.</p>
                  </div>
                  {/* Links Rápidos */}
                  <div>
                      <h4 className="font-montserrat text-lg font-bold mb-4">Navegação</h4>
                      <ul className="space-y-2 text-sm">
                          <li><a href="#" className="text-brand-gray hover:text-brand-blue transition-colors">Sobre Nós</a></li>
                          <li><a href="#" className="text-brand-gray hover:text-brand-blue transition-colors">Contato</a></li>
                          <li><a href="#" className="text-brand-gray hover:text-brand-blue transition-colors">Política de Privacidade</a></li>
                          <li><a href="#" className="text-brand-gray hover:text-brand-blue transition-colors">Nossa Equipe</a></li>
                      </ul>
                  </div>
                  {/* Redes Sociais */}
                  <div>
                      <h4 className="font-montserrat text-lg font-bold mb-4">Siga-nos</h4>
                      <div className="flex justify-center md:justify-start space-x-4">
                          <a href="#" className="text-brand-gray hover:text-brand-blue transition-colors">
                              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" /></svg>
                          </a>
                          <a href="#" className="text-brand-gray hover:text-brand-blue transition-colors">
                              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.71v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" /></svg>
                          </a>
                          <a href="#" className="text-brand-gray hover:text-brand-blue transition-colors">
                              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.024.06 1.378.06 3.808s-.012 2.784-.06 3.808c-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.024.048-1.378.06-3.808.06s-2.784-.013-3.808-.06c-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.048-1.024-.06-1.378-.06-3.808s.012-2.784.06-3.808c.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 016.08 2.525c.636-.247 1.363-.416 2.427.465C9.53 2.013 9.884 2 12.315 2zM12 7a5 5 0 100 10 5 5 0 000-10zm0-2a7 7 0 110 14 7 7 0 010-14zm6.406-1.18a1.25 1.25 0 100 2.5 1.25 1.25 0 000-2.5z" clipRule="evenodd" /></svg>
                          </a>
                      </div>
                  </div>
              </div>
              <div className="border-t border-gray-200 mt-8 pt-6 text-center text-sm text-brand-gray">
                  <p>© 2025 Informes Brasil. Todos os direitos reservados. Notícias sem Fake News.</p>
              </div>
          </div>
      </footer>

    </>
  );
}