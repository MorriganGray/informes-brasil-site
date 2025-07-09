import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const noticiasDirectory = path.join(process.cwd(), '_noticias');

export function getSortedNoticiasData() {
  // Get file names under /_noticias
  let fileNames = [];
  try {
    fileNames = fs.readdirSync(noticiasDirectory);
  } catch (err) {
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
      ...matterResult.data,
    };
  });
  // Sort posts by date
  return allNoticiasData.sort((a, b) => {
    if (a.Date < b.Date) {
      return 1;
    } else {
      return -1;
    }
  });
}
