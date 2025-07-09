import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export async function GET() {
  const postsDirectory = path.join(process.cwd(), '_noticias');
  
  try {
    const fileNames = fs.readdirSync(postsDirectory);

    const allPostsData = fileNames
      .filter(fileName => fileName.endsWith('.md') || fileName.endsWith('.mdx')) // Suporta .md e .mdx
      .map(fileName => {
        const id = fileName.replace(/\.(md|mdx)$/, '');
        const fullPath = path.join(postsDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const matterResult = matter(fileContents);

        // Assegura que a data é um objeto Date para ordenação
        const date = matterResult.data.Date ? new Date(matterResult.data.Date) : new Date();

        return {
          id,
          ...matterResult.data as { Title: string; Category?: string; Image: string; },
          Date: date.toISOString(), // Converte para string no formato ISO para serialização
        };
      });

    // Ordena os posts pela data mais recente
    const sortedPosts = allPostsData.sort((a, b) => {
      return new Date(b.Date).getTime() - new Date(a.Date).getTime();
    });

    return NextResponse.json(sortedPosts);
  } catch (error) {
    // Se a pasta não existir, retorna um array vazio em vez de um erro
    if (error instanceof Error && 'code' in error && error.code === 'ENOENT') {
      console.log('A pasta _noticias não foi encontrada, retornando array vazio.');
      return NextResponse.json([]);
    }
    console.error('Erro ao ler os ficheiros de notícias:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
