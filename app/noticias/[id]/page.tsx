import { db } from '../../../lib/firebase';
import { collection, getDocs, doc, getDoc } from 'firebase/firestore';
import Image from 'next/image';
import SiteHeader from '../../components/SiteHeader';
import SiteFooter from '../../components/SiteFooter';
import { remark } from 'remark';
import html from 'remark-html';

type Noticia = {
  Title: string;
  Date: {
    seconds: number;
    nanoseconds: number;
  };
  Category?: string;
  Image: string;
  body: string;
};

async function getNoticia(id: string): Promise<Noticia | null> {
  try {
    const docRef = doc(db, 'noticias', id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data() as Noticia;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error fetching document: ", error);
    return null;
  }
}

export async function generateStaticParams() {
  const noticiasCol = collection(db, 'noticias');
  const noticiaSnapshot = await getDocs(noticiasCol);
  return noticiaSnapshot.docs.map(doc => ({
    id: doc.id,
  }));
}

export default async function NoticiaPage({ params }: { params: { id: string } }) {
  const noticia = await getNoticia(params.id);

  if (!noticia) {
    return (
      <>
        <SiteHeader />
        <main className="container mx-auto px-4 py-12 md:py-16 text-center">
          <h1 className="text-4xl font-bold">Notícia não encontrada</h1>
        </main>
        <SiteFooter />
      </>
    );
  }

  return (
    <>
      <SiteHeader />
      <main className="container mx-auto px-4 py-12 md:py-16">
        <article>
          <h1 className="text-5xl font-bold mb-4">{noticia.Title}</h1>
          <p className="text-lg text-gray-600 mb-8">
            {new Date(noticia.Date.seconds * 1000).toLocaleDateString('pt-BR', {
              day: 'numeric', month: 'long', year: 'numeric'
            })}
          </p>
          <div className="relative h-96 w-full mb-8">
            <Image
              src={noticia.Image}
              alt={noticia.Title}
              fill
              className="object-cover rounded-lg"
            />
          </div>
          <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: (await remark().use(html).process(noticia.body)).toString() }} />
        </article>
      </main>
      <SiteFooter />
    </>
  );
}