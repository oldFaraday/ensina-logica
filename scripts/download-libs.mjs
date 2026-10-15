#!/usr/bin/env node
/**
 * Download Libraries Script
 * Baixa KaTeX 0.16.9 e highlight.js 11.9.0 para lib/
 * Executa: node scripts/download-libs.mjs
 */

import { mkdirSync, writeFileSync, existsSync } from 'fs';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT_DIR = dirname(__dirname);
const LIB_DIR = `${ROOT_DIR}/lib`;

const LIBS = [
  {
    name: 'KaTeX',
    version: '0.16.9',
    license: 'MIT',
    baseUrl: 'https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/',
    files: [
      'katex.min.js',
      'katex.min.css',
      'fonts/KaTeX_Main-Regular.woff2',
      'fonts/KaTeX_Math-Italic.woff2',
      'fonts/KaTeX_Size1-Regular.woff2',
      'fonts/KaTeX_Size2-Regular.woff2',
      'fonts/KaTeX_Size3-Regular.woff2',
      'fonts/KaTeX_Size4-Regular.woff2',
      'fonts/KaTeX_AMS-Regular.woff2',
      'fonts/KaTeX_Caligraphic-Regular.woff2',
      'fonts/KaTeX_Fraktur-Regular.woff2',
      'fonts/KaTeX_SansSerif-Regular.woff2',
      'fonts/KaTeX_SansSerif-Bold.woff2',
      'fonts/KaTeX_Typewriter-Regular.woff2'
    ],
    destDir: `${LIB_DIR}/katex`
  },
  {
    name: 'highlight.js',
    version: '11.9.0',
    license: 'BSD-3-Clause',
    baseUrl: 'https://cdn.jsdelivr.net/npm/highlight.js@11.9.0/',
    files: [
      'highlight.min.js',
      'styles/github.min.css',
      'styles/github-dark.min.css'
    ],
    destDir: `${LIB_DIR}/highlightjs`
  }
];

async function downloadFile(url, destPath) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Cria diretório se não existe
    const dir = dirname(destPath);
    if (!existsSync(dir)) {
      mkdirSync(dir, { recursive: true });
    }

    writeFileSync(destPath, buffer);
    console.log(`  ✓ ${destPath.replace(ROOT_DIR + '/', '')}`);
    return true;
  } catch (error) {
    console.error(`  ✗ Falha ao baixar ${url}:`, error.message);
    return false;
  }
}

async function downloadLib(lib) {
  console.log(`\n📥 Baixando ${lib.name} v${lib.version} (${lib.license})...`);

  let success = 0;
  let failed = 0;

  for (const file of lib.files) {
    const url = `${lib.baseUrl}${file}`;
    const destPath = `${lib.destDir}/${file}`;

    const ok = await downloadFile(url, destPath);
    if (ok) success++;
    else failed++;
  }

  console.log(`  ${success} OK, ${failed} falharam`);
  return failed === 0;
}

async function main() {
  console.log('📦 Ensina Lógica - Download de bibliotecas');
  console.log('============================================');

  const results = [];

  for (const lib of LIBS) {
    const ok = await downloadLib(lib);
    results.push({ name: lib.name, ok });
  }

  console.log('\n📋 Resumo:');
  for (const r of results) {
    console.log(`  ${r.ok ? '✅' : '❌'} ${r.name}`);
  }

  const allOk = results.every(r => r.ok);
  if (allOk) {
    console.log('\n✅ Todas as bibliotecas baixadas com sucesso!');
    console.log('📝 Lembre-se de atualizar ATTRIBUTIONS.md se as versões mudarem.');
  } else {
    console.log('\n❌ Algumas bibliotecas falharam. Verifique a conexão e tente novamente.');
    process.exit(1);
  }
}

main();