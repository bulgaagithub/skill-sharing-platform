import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const mdDirectory = path.join(process.cwd(), 'components/contract/md')

export function getData() {
  // Get file names under /posts
  const fileNames = fs.readdirSync(mdDirectory)
  const readData = fileNames.map(fileName => {
    // Remove ".md" from file name to get id
    const id = fileName.replace(/\.md$/, '')

    // Read markdown file as string
    const fullPath = path.join(mdDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents)

    // Combine the data with the id
    return {
      id,
      ...matterResult.data
    }
  });

  return readData;
}
