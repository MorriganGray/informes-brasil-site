import { db } from "../../../lib/firebase";
import {
  doc,
  getDoc,
  collection,
  getDocs,
  DocumentData,
} from "firebase/firestore";
import { marked } from "marked";
import Image from "next/image";
import { Montserrat, Lato } from "next/font/google";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "700"],
});
const lato = Lato({
  subsets: ["latin"],
  weight: ["400", "700"],
});

// NOVA FUNÇÃO: Gera os parâmetros estáticos para cada notícia
export async function generateStaticParams() {
  const noticiasCollection = collection(db, "noticias");
  const snapshot = await getDocs(noticiasCollection);
  const paths = snapshot.docs.map((doc) => ({
    id: doc.id,
  }));
  return paths;
}

// Função para buscar os dados de uma notícia específica
async function getNoticia(id: string) {
  const docRef = doc(db, "noticias", id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    return null;
  }
}

// O componente da página
export default async function NoticiaPage({
  params,
}: {
  params: { id: string };
}) {
  const noticia = (await getNoticia(params.id)) as DocumentData | null;

  if (!noticia) {
    return <div>Notícia não encontrada.</div>;
  }

  const htmlContent = marked(noticia.body);

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="relative w-full h-96">
          <Image
            src={noticia.Image}
            alt={noticia.Title}
            layout="fill"
            objectFit="cover"
            priority
          />
        </div>
        <div className="p-8">
          <h1
            className={`${montserrat.className} text-4xl font-bold text-gray-900 mb-4`}
          >
            {noticia.Title}
          </h1>
          <p className="text-gray-500 text-sm mb-6">{noticia.Date}</p>
          <div
            className={`${lato.className} prose lg:prose-xl max-w-none text-gray-800 leading-relaxed`}
            dangerouslySetInnerHTML={{ __html: htmlContent }}
          />
        </div>
      </div>
    </div>
  );
}