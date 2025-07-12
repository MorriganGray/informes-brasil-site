import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

// Define o caminho para a pasta de notícias
const postsDirectory = path.join(process.cwd(), 'content/noticias');

// Interface para definir a estrutura de uma Notícia
export interface Noticia {
  id: string;
  Title: string;
  Date: string;
  Category: string;
  Image: string;
  contentHtml: string;
}

export function getSortedPostsData(): Noticia[] {
  // Obtenha os nomes dos ficheiros na pasta /content/noticias
  let fileNames: string[];
  try {
    fileNames = fs.readdirSync(postsDirectory);
  } catch (err) {
    // Se a pasta não existir, avisa no console e retorna um array vazio.
    console.error("A pasta 'content/noticias' não foi encontrada. Verifique se a pasta existe no seu projeto.");
    return [];
  }

  const allPostsData = fileNames
    .filter(fileName => fileName.endsWith('.md')) // Garante que estamos a processar apenas ficheiros markdown
    .map((fileName) => {
      const id = fileName.replace(/\.md$/, '');
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');

      try {
        const matterResult = matter(fileContents);

        // Validação para garantir que os campos essenciais existem
        if (!matterResult.data.Title || !matterResult.data.Date || !matterResult.data.Category) {
          throw new Error(`Metadados essenciais (Title, Date, Category) em falta.`);
        }

        return {
          id,
          ...matterResult.data,
          contentHtml: matterResult.content,
        } as Noticia;

      } catch (e) {
        // Se ocorrer um erro ao processar um ficheiro, avisa no console e retorna null.
        console.error(`\x1b[31m[ERRO DE LEITURA]\x1b[0m Falha ao processar o ficheiro: ${fileName}. Verifique a formatação YAML.`);
        // Usamos a variável 'e' para dar mais detalhes do erro, corrigindo o erro de lint.
        console.error(`   ↳ Detalhe: ${(e as Error).message}`);
        return null;
      }
    });

  // Filtra quaisquer ficheiros que resultaram em 'null' e ordena por data
  return allPostsData
    .filter((post): post is Noticia => post !== null)
    .sort((a, b) => (a.Date < b.Date ? 1 : -1));
}

/**
 * NOVA FUNÇÃO
 * Filtra as notícias por uma categoria específica.
 * @param categorySlug A categoria para filtrar as notícias.
 * @returns Um array de notícias que pertencem à categoria especificada.
 */
export function getPostsByCategory(categorySlug: string): Noticia[] {
  const allPosts = getSortedPostsData();
  return allPosts.filter(post => post.Category.toLowerCase() === categorySlug.toLowerCase());
}