import Link from 'next/link';

export default function SiteFooter() {
  return (
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
  );
}
