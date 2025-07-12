'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { useAuth } from '../../lib/auth';
import { auth } from '../../lib/firebase';
import { signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation';

// Array com as categorias para facilitar a manutenção
const categorias = [
  { nome: 'Política', slug: 'politica' },
  { nome: 'Economia', slug: 'economia' },
  { nome: 'Cultura', slug: 'cultura' },
  { nome: 'Tecnologia', slug: 'tecnologia' },
];

export default function SiteHeader() {
  const { user } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    await signOut(auth);
    router.push('/');
  };

  return (
    <header className="bg-brand-white sticky top-0 z-50 shadow-md">
      <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
              <Link href="/" className="flex items-center space-x-3">
                  <Image src="/images/logo.svg" alt="Logo Informes Brasil" width={200} height={50} priority className="object-contain -ml-4"/>
              </Link>
              <nav className="hidden lg:flex items-center space-x-8">
                  {categorias.map((categoria) => (
                    <Link key={categoria.slug} href={`/categoria/${categoria.slug}`} className="font-montserrat font-semibold text-sm uppercase tracking-wider transition-colors duration-300 text-brand-dark hover:text-brand-blue">
                      {categoria.nome}
                    </Link>
                  ))}
              </nav>
              <div className="flex items-center space-x-4">
                   <button className="text-brand-dark hover:text-brand-blue transition-colors duration-300">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                  </button>
                  {user ? (
                    <button onClick={handleLogout} className="hidden md:block bg-red-600 text-white px-4 py-2 rounded-md text-sm font-bold uppercase transition-all duration-300 hover:bg-red-700">Logout</button>
                  ) : (
                    <>
                      <Link href="/login" className="hidden md:block bg-transparent border border-brand-blue text-brand-blue px-4 py-2 rounded-md text-sm font-bold uppercase transition-all duration-300 hover:bg-brand-blue hover:text-white">Login</Link>
                      <Link href="/signup" className="hidden md:block bg-brand-blue text-white px-4 py-2 rounded-md text-sm font-bold uppercase transition-all duration-300 hover:bg-brand-blue-dark">Sign Up</Link>
                    </>
                  )}
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
      <div className={`${isMenuOpen ? 'block' : 'hidden'} lg:hidden bg-brand-white shadow-lg`}>
          {categorias.map((categoria) => (
            <Link key={categoria.slug} href={`/categoria/${categoria.slug}`} className="block py-3 px-4 text-sm hover:bg-brand-light font-semibold">
              {categoria.nome}
            </Link>
          ))}
          <div className="px-4 py-4 border-t border-gray-200 flex flex-col space-y-3">
               {user ? (
                <button onClick={handleLogout} className="bg-red-600 text-white px-4 py-2 rounded-md text-sm font-bold uppercase text-center transition-all duration-300 hover:bg-red-700">Logout</button>
              ) : (
                <>
                  <Link href="/login" className="bg-transparent border border-brand-blue text-brand-blue px-4 py-2 rounded-md text-sm font-bold uppercase text-center transition-all duration-300 hover:bg-brand-blue hover:text-white">Login</Link>
                  <Link href="/signup" className="bg-brand-blue text-white px-4 py-2 rounded-md text-sm font-bold uppercase text-center transition-all duration-300 hover:bg-brand-blue-dark">Sign Up</Link>
                </>
              )}
          </div>
      </div>
    </header>
  );
}
