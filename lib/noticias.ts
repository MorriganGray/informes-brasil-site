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
  const postsDirectory = path.join(process.cwd(), '_noticias');
  if (!fs.existsSync(postsDirectory)) {
    console.log("Diretório '_noticias' não encontrado.");
    return [];
  }

  const fileNames = fs.readdirSync(postsDirectory);

  console.log('--- DIAGNÓSTICO DE IMAGENS ---'); // Início do nosso diagnóstico

  const allNoticiasData = fileNames.map((fileName) => {
    const id = fileName.replace(/\.md$/, '');
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data } = matter(fileContents);

    // !! IMPORTANTE: Log para vermos o caminho da imagem !!
    console.log(`Ficheiro: ${fileName}, Caminho da Imagem: ${data.Image}`);

    return {
      id,
      Title: data.Title,
      Date: data.Date,
      Category: data.Category,
      // Garante que o campo é nulo se não for um texto válido
      Image: (typeof data.Image === 'string' && data.Image.trim() !== '') ? data.Image : null,
    } as Noticia;
  });

  console.log('--- FIM DO DIAGNÓSTICO ---');

  return allNoticiasData.sort((a, b) => (new Date(a.Date) < new Date(b.Date) ? 1 : -1));
}

// CORREÇÃO APLICADA AQUI
export function getPostsByCategory(category: string) {
  const allPosts = getSortedPostsData();
  // Compara as strings após normalizá-las (remover acentos e converter para minúsculas)
  return allPosts.filter(post => post.Category && normalizeString(post.Category) === normalizeString(category));
}