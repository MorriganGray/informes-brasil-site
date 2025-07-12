import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

// Define o caminho para a pasta de notícias
const postsDirectory = path.join(process.cwd(), 'content/noticias');

// Adicionamos uma interface para definir a estrutura de uma Notícia
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
  } catch (e) {
    // Se a pasta não existir, retorna um array vazio.
    console.error("A pasta 'content/noticias' não foi encontrada.");
    return [];
  }

  const allPostsData = fileNames.map((fileName) => {
    // Remove ".md" do nome do ficheiro para obter o id
    const id = fileName.replace(/\.md$/, '');

    // Lê o ficheiro markdown como uma string
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    // Usa o 'gray-matter' para analisar a secção de metadados do post
    try {
      const matterResult = matter(fileContents);

      // Validação básica para garantir que os campos essenciais existem
      if (!matterResult.data.Title || !matterResult.data.Date) {
          throw new Error(`Metadados em falta em ${fileName}`);
      }

      // Combina os dados com o id
      return {
        id,
        ...matterResult.data,
        contentHtml: matterResult.content, // Adiciona o conteúdo aqui se precisar dele
      } as Noticia;

    } catch (e) {
      // Se ocorrer um erro ao processar um ficheiro, avisa no console e retorna null.
      console.error(`\x1b[31m[ERRO DE LEITURA]\x1b[0m Falha ao processar o ficheiro: ${fileName}. Verifique a formatação YAML.`);
      // O erro detalhado pode ser útil para depuração:
      // console.error(e); 
      return null;
    }
  });

  // Filtra quaisquer ficheiros que resultaram em 'null' devido a erros
  // e ordena os posts por data (do mais recente para o mais antigo)
  return allPostsData
    .filter((post): post is Noticia => post !== null)
    .sort((a, b) => {
      if (a.Date < b.Date) {
        return 1;
      } else {
        return -1;
      }
    });
}