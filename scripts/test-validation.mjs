#!/usr/bin/env node
/**
 * Testes das regras anti-placeholder (`scripts/lib/content-rules.mjs`).
 *
 * Cobre exemplos ruins que DEVEM ser rejeitados pelo validador:
 *  - unidade placeholder (trecho "Conteúdo derivado de ...", URL genérica, sem
 *    `verified_at`/`verification_method`);
 *  - licença NC (não comercial);
 *  - trecho em português (fonte é em inglês);
 *  - edição proibida (Levin 4ª edição, NC);
 *  - exercício com enunciado/explicação de placeholder ou sem citar a fonte.
 *
 * Executa: node scripts/test-validation.mjs  (integrado em `npm test`)
 */

import {
  theoryUnitContentErrors,
  exerciseContentErrors,
  isGenericSourceUrl,
  explanationCitesSource,
  detectExcerptLanguage,
  generateAttributionsBlock,
  extractAttributionsBlock,
  ALLOWED_LICENSES,
  MIN_EXCERPT_WORDS
} from './lib/content-rules.mjs';
import { encodingIssues } from './lib/text-encoding.mjs';

let passed = 0;
let failed = 0;

function check(label, condition) {
  if (condition) {
    passed++;
    console.log(`  ✅ ${label}`);
  } else {
    failed++;
    console.log(`  ❌ ${label}`);
  }
}

const has = (errors, fragment) => errors.join(' | ').toLowerCase().includes(fragment.toLowerCase());

// ---------------------------------------------------------------------------
console.log('\n📚 Regras de unidades teóricas');

const goodUnit = {
  id: 'th-sem1-discrete-math-m01-logic',
  license: 'CC-BY-SA-4.0',
  verification_status: 'verified_with_source',
  verified_at: '2026-10-17',
  verification_method: 'manual_url_check',
  original_excerpt:
    'Two (molecular) statements P and Q are logically equivalent provided P is true precisely when Q is true.',
  source: {
    title: 'Discrete Mathematics: An Open Introduction',
    url: 'https://discrete.openmathbooks.org/dmoi3/sec_propositional.html',
    edition: '3rd Edition (2019)',
    section: '3.1 Propositional Logic'
  }
};

// Controle: uma unidade boa não pode gerar erro.
check('unidade válida não gera erros', theoryUnitContentErrors(goodUnit).length === 0);

// 1. Unidade placeholder (o problema do CONTENT_AUDIT.md).
const placeholderUnit = {
  id: 'th-sem1-algorithms-m09-placeholder',
  license: 'CC-BY-SA-4.0',
  verification_status: 'verified_with_source',
  original_excerpt: 'Conteúdo derivado de Programming Fundamentals (2nd Edition (2018)), licença CC-BY-SA-4.0.',
  source: {
    title: 'Programming Fundamentals',
    url: 'https://press.rebus.community/programmingfundamentals/',
    edition: '2nd Edition (2018)',
    section: 'Placeholder'
  }
};
const placeholderErrors = theoryUnitContentErrors(placeholderUnit);
check('rejeita URL genérica (homepage)', has(placeholderErrors, 'url genérica'));
check('rejeita trecho gerado ("Conteúdo derivado de")', has(placeholderErrors, 'gerado/placeholder'));
check('rejeita trecho com menos de 15 palavras', has(placeholderErrors, `menos de ${MIN_EXCERPT_WORDS}`));
check('rejeita sem verified_at', has(placeholderErrors, 'verified_at'));
check('rejeita sem verification_method', has(placeholderErrors, 'verification_method'));

// 2. Licença NC.
const ncUnit = { ...goodUnit, license: 'CC-BY-NC-SA-4.0' };
check('rejeita licença NC (CC-BY-NC-SA-4.0)', has(theoryUnitContentErrors(ncUnit), 'proibida'));

// 3. Trecho em português.
const ptUnit = {
  ...goodUnit,
  original_excerpt:
    'Duas proposições são logicamente equivalentes quando têm o mesmo valor de verdade em todas as linhas da tabela.'
};
check('rejeita trecho em português', has(theoryUnitContentErrors(ptUnit), 'idioma da fonte'));

// 4. Edição proibida (Levin 4ª, NC).
const levin4 = { ...goodUnit, source: { ...goodUnit.source, edition: '4th Edition (2023)' } };
check('rejeita edição proibida (Levin 4ª)', has(theoryUnitContentErrors(levin4), 'edição proibida'));

// 5. Trecho curto.
const shortUnit = {
  ...goodUnit,
  original_excerpt: 'A sentence that contains variables is called a predicate.'
};
check('rejeita trecho curto (< 15 palavras)', has(theoryUnitContentErrors(shortUnit), `menos de ${MIN_EXCERPT_WORDS}`));

// 6. Metadados de verificação ausentes.
const missingMeta = { ...goodUnit };
delete missingMeta.verified_at;
delete missingMeta.verification_method;
const metaErrors = theoryUnitContentErrors(missingMeta);
check('rejeita verified_with_source sem verified_at', has(metaErrors, 'verified_at'));
check('rejeita verified_with_source sem verification_method', has(metaErrors, 'verification_method'));

// 7. Unidade pendente não exige trecho conferido.
const pendingUnit = {
  ...goodUnit,
  verification_status: 'pending',
  original_excerpt: undefined,
  verified_at: undefined,
  verification_method: undefined
};
check('unidade pending não exige trecho/verificação', theoryUnitContentErrors(pendingUnit).length === 0);

// ---------------------------------------------------------------------------
console.log('\n🏋️  Regras de exercícios');

const goodExercise = {
  id: 'ex-sem1-discrete-math-m01-l11-proposicao',
  type: 'multiple-choice',
  prompt: 'Qual das frases é uma proposição?',
  explanation: "Uma proposição tem valor de verdade definido (Seção 0.2)."
};
check('exercício válido não gera erros', exerciseContentErrors(goodExercise, { sourceSection: '0.2 Mathematical Statements' }).length === 0);

const placeholderExercise = {
  id: 'ex-sem1-algorithms-m09-l99-x',
  type: 'multiple-choice',
  prompt: 'Questão 1 sobre variáveis.',
  options: ['Alternativa A', 'Alternativa B'],
  explanation: 'Explicação da questão 1.'
};
const exErrors = exerciseContentErrors(placeholderExercise, { sourceSection: 'Data Types' });
check('rejeita enunciado "Questão N sobre"', has(exErrors, 'placeholder'));
check('rejeita "Alternativa A"', has(exErrors, 'placeholder'));
check('rejeita explicação "Explicação da questão"', has(exErrors, 'placeholder'));
check('rejeita explicação sem citar a fonte', has(exErrors, 'não cita'));

const noCiteExercise = {
  id: 'ex-x',
  type: 'multiple-choice',
  prompt: 'Pergunta qualquer.',
  explanation: 'Apenas uma explicação solta, sem indicar de onde veio.'
};
check('rejeita explicação sem citação', has(exerciseContentErrors(noCiteExercise, { sourceSection: '' }), 'não cita'));

// ---------------------------------------------------------------------------
console.log('\n🔗 Helpers');

check('URL de homepage Rebus é genérica', isGenericSourceUrl('https://press.rebus.community/programmingfundamentals/') === true);
check('URL de homepage DMOI é genérica', isGenericSourceUrl('https://discrete.openmathbooks.org/') === true);
check('URL de raiz de domínio é genérica', isGenericSourceUrl('https://example.com/') === true);
check('URL de capítulo Rebus é específica', isGenericSourceUrl('https://press.rebus.community/programmingfundamentals/chapter/program-design/') === false);
check('URL de seção DMOI é específica', isGenericSourceUrl('https://discrete.openmathbooks.org/dmoi3/sec_propositional.html') === false);

check('citação "Seção 0.2" reconhecida', explanationCitesSource('veja (Seção 0.2).', '') === true);
check('citação "Seções 0.2 e 3.2" reconhecida', explanationCitesSource('veja (Seções 0.2 e 3.2).', '') === true);
check('citação "capítulo Program Design" reconhecida', explanationCitesSource('conforme o capítulo Program Design.', '') === true);
check('citação "capítulos While Loop" reconhecida', explanationCitesSource('os capítulos While Loop explicam isso.', '') === true);
check('nome da seção da unidade reconhecido', explanationCitesSource('ver Program Design.', 'Program Design') === true);
check('texto sem citação rejeitado', explanationCitesSource('texto qualquer sem fonte.', 'Program Design') === false);

check('detecta português', detectExcerptLanguage('Duas proposições são equivalentes quando têm o mesmo valor.') === 'pt');
check('detecta inglês', detectExcerptLanguage('Two statements are logically equivalent provided they have the same truth value.') === 'en');

check('licenças permitidas incluem CC0', ALLOWED_LICENSES.includes('CC0-1.0'));
check('licenças permitidas incluem domínio público', ALLOWED_LICENSES.includes('PUBLIC-DOMAIN'));

// ---------------------------------------------------------------------------
console.log('\n📝 Bloco gerado de ATTRIBUTIONS.md');

const block = generateAttributionsBlock([
  { id: 'th-sem1-b', source: { title: 'Fonte B' } },
  { id: 'th-sem1-a', source: { title: 'Fonte A', chapter: 'Cap', section: 'Sec' } }
]);
check('bloco ordena as unidades por id', block.indexOf('`th-sem1-a`') < block.indexOf('`th-sem1-b`'));
check('bloco inclui o local (capítulo › seção)', block.includes('Cap › Sec'));
check('bloco é determinístico', block === generateAttributionsBlock([
  { id: 'th-sem1-b', source: { title: 'Fonte B' } },
  { id: 'th-sem1-a', source: { title: 'Fonte A', chapter: 'Cap', section: 'Sec' } }
]));

const doc = `# Título\n\n${block}\n\nfim`;
check('extract recupera exatamente o bloco', extractAttributionsBlock(doc) === block);
check('extract retorna null sem marcadores', extractAttributionsBlock('sem bloco gerado') === null);
check('extract detecta bloco divergente', extractAttributionsBlock(doc) !== generateAttributionsBlock([
  { id: 'th-sem1-z', source: { title: 'Outra' } }
]));

// ---------------------------------------------------------------------------
console.log('\n🔤 Codificação dos arquivos de texto');

const issueTypes = (buffer) => encodingIssues(buffer).map((issue) => issue.type);
const utf8 = (text) => Buffer.from(text, 'utf8');
const corrupted = (...codePoints) => String.fromCodePoint(...codePoints);

check(
  'aceita acentos, travessão e "›" em UTF-8 válido',
  encodingIssues(utf8('capítulo › são três: lógica, ramificação e iteração')).length === 0
);

check(
  'rejeita BOM UTF-8',
  issueTypes(Buffer.concat([Buffer.from([0xEF, 0xBB, 0xBF]), utf8('texto')])).includes('bom')
);

check(
  'rejeita caractere de substituição U+FFFD',
  issueTypes(utf8(`texto com ${corrupted(0xFFFD)} no meio`)).includes('mojibake')
);

check(
  'rejeita bytes inválidos para UTF-8',
  issueTypes(Buffer.from([0x63, 0x61, 0x70, 0xC3, 0x28])).includes('invalid-utf8')
);

check(
  'rejeita A-til seguido de caractere não ASCII (ex.: i acentuado corrompido)',
  issueTypes(utf8(`cap${corrupted(0x00C3, 0x00AD)}tulo`)).includes('mojibake')
);

check(
  'rejeita maiúscula acentuada corrompida (C cedilha: U+00C3 U+2021)',
  issueTypes(utf8(corrupted(0x00C3, 0x2021))).includes('mojibake')
);

check(
  'rejeita maiúscula acentuada corrompida (E agudo: U+00C3 U+2030)',
  issueTypes(utf8(corrupted(0x00C3, 0x2030))).includes('mojibake')
);

check(
  'rejeita sequência corrompida de três caracteres no lugar de "›"',
  issueTypes(utf8(corrupted(0x00E2, 0x20AC, 0x00BA))).includes('mojibake')
);

check(
  'rejeita "Â" seguido de espaço não separável',
  issueTypes(utf8(corrupted(0x00C2, 0x00A0))).includes('mojibake')
);

// ---------------------------------------------------------------------------
console.log('\n📊 Resultado dos testes de validação:');
console.log(`  ✅ ${passed} passaram`);
if (failed > 0) {
  console.log(`  ❌ ${failed} falharam`);
  process.exit(1);
}
console.log('  🎉 Todos passaram');
process.exit(0);
