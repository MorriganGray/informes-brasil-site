import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const noticiasDirectory = path.join(process.cwd(), '_noticias');

export function getSortedNoticiasData() {
  // Get file names under /_noticias
  let fileNames = [];
  try {
    fileNames = fs.readdirSync(noticiasDirectory);
  } catch {
    // If the directory doesn't exist, return an empty array
    return [];
  }

  const allNoticiasData = fileNames.map((fileName) => {
    // Remove ".md" from file name to get id
    const id = fileName.replace(/\.md$/, '');

    // Read markdown file as string
    const fullPath = path.join(noticiasDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);

    // Combine the data with the id
    return {
      id,
      Title: 'Título em falta',
      Date: '1970-01-01',
      Image: '/placeholder.png', // A default placeholder image
      ...matterResult.data,
    };
  });
  // Sort posts by date
  return allNoticiasData.sort((a, b) => {
    // Ensure we have dates to compare
    if (a.Date < b.Date) {
      return 1;
    } else {
      return -1;
    }
  });
}