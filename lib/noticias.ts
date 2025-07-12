import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

// Função para remover acentos e normalizar a string
const normalizeString = (str: string) => {
  return str
    .toLowerCase()
    .normalize('NFD') // Separa os acentos dos caracteres
    .replace(/[\u0300-\u036f]/g, ''); // Remove os acentos
};

export interface Noticia {
  id: string;
  Title: string;
  Date: string;
  Category?: string;
  Image?: string | null;
}

export function getSortedPostsData(): Noticia[] {
  //       👇 ALTERE ESTA LINHA AQUI 👇
  const postsDirectory = path.join(process.cwd(), 'content/noticias');
  //       👆 ALTERE ESTA LINHA AQUI 👆

  if (!fs.existsSync(postsDirectory)) {
    console.log("Diretório 'content/noticias' não encontrado.");
    return [];
  }

  const fileNames = fs.readdirSync(postsDirectory);

  const allNoticiasData = fileNames.map((fileName) => {
    const id = fileName.replace(/\.md$/, '');
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data } = matter(fileContents);

    return {
      id,
      Title: data.Title,
      Date: data.Date,
      Category: data.Category,
      Image: (typeof data.Image === 'string' && data.Image.trim() !== '') ? data.Image : null,
    } as Noticia;
  });

  return allNoticiasData.sort((a, b) => (new Date(a.Date) < new Date(b.Date) ? 1 : -1));
}

// CORREÇÃO APLICADA AQUI
export function getPostsByCategory(category: string) {
  const allPosts = getSortedPostsData();
  // Compara as strings após normalizá-las (remover acentos e converter para minúsculas)
  return allPosts.filter(post => post.Category && normalizeString(post.Category) === normalizeString(category));
}