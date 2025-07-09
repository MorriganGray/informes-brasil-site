'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

export default function SiteHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
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
                  <Link href="/admin" className="hidden md:block bg-brand-blue text-white px-4 py-2 rounded-md text-sm font-bold uppercase transition-all duration-300 hover:bg-brand-blue-dark">Admin</Link>
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
               <Link href="/admin" className="bg-brand-blue text-white px-4 py-2 rounded-md text-sm font-bold uppercase text-center transition-all duration-300 hover:bg-brand-blue-dark">Admin</Link>
          </div>
      </div>
    </header>
  );
}
