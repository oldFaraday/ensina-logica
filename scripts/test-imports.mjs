import { readdirSync, statSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath, pathToFileURL } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const SRC_DIR = join(dirname(__dirname), 'src');

function getAllFiles(dir, files = []) {
  const list = readdirSync(dir);
  for (const file of list) {
    const path = join(dir, file);
    if (statSync(path).isDirectory()) {
      getAllFiles(path, files);
    } else if (file.endsWith('.js')) {
      files.push(path);
    }
  }
  return files;
}

const jsFiles = getAllFiles(SRC_DIR);
let failed = false;

for (const file of jsFiles) {
  const fileUrl = pathToFileURL(file).href;
  const content = await import(fileUrl).catch(e => {
    console.error(`❌ Falha ao importar ${file}:`, e.message);
    failed = true;
    return null;
  });
}

if (failed) process.exit(1);
console.log('✅ Todos os módulos importados com sucesso');
