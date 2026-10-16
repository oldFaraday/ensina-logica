/**
 * Code Completion Exercise Type
 * Textarea (highlight.js for the reference solution), "Verificar"/"Run" button,
 * syntax check for JavaScript, behavioral validation and explanation.
 *
 * O app roda 100% no navegador (sem Node/backend), então não executamos
 * `node --check` nem um interpretador Python aqui. Para JavaScript, fazemos uma
 * checagem de sintaxe segura com `new Function(...)` (sem invocar o corpo) e,
 * quando o exercício disponibilizar casos de teste, executamos a solução do
 * aluno e a solução de referência com cada caso e comparamos as saídas
 * produzidas (validação comportamental). Quando não há casos de teste (ou a
 * linguagem não é executável no navegador, ex.: Python), caímos em uma
 * comparação de texto normalizada (remove espaços, quebras de linha e
 * comentários) como fallback.
 */

import { t } from '../../i18n.js';
import { showFeedback, FeedbackType } from '../feedback.js';

const LANGUAGE_LABELS = {
  javascript: 'JavaScript',
  python: 'Python',
  pseudocode: 'Pseudocódigo'
};

/**
 * Normaliza código para comparação de texto: remove espaços à direita de cada
 * linha, colapsa espaços/tabs internos e apara as extremidades.
 * Mantido para retrocompatibilidade (utilizado pelos testes de unidade).
 * @param {string} code
 * @returns {string}
 */
export function normalizeCode(code) {
  return String(code || '')
    .split('\n')
    .map((line) => line.replace(/\s+$/, ''))
    .join('\n')
    .trim()
    .replace(/\t/g, ' ')
    .replace(/[^\S\n]+/g, ' ');
}

/**
 * Normaliza código para comparação de equivalência:
 * remove comentários de bloco e de linha (#) e TODOS os espaços em branco,
 * incluindo quebras de linha. Assim `a // b`, `a//b`, ` a // b ` e
 * `a // b # comentário` normalizam para o mesmo valor (`a//b`).
 * O operador de divisão inteira `//` (Python) é preservado intencionalmente.
 * @param {string} code
 * @returns {string}
 */
export function normalizeForComparison(code) {
  const withoutBlockComments = String(code || '').replace(/\/\*[\s\S]*?\*\//g, ''); // comentários de bloco /* ... */
  const withoutLineComments = withoutBlockComments.replace(/#[^\n]*/g, '');          // comentários de linha # (Python)
  return withoutLineComments.replace(/\s/g, '');                                     // remove todo espaço em branco
}

/**
 * Checa se o código JavaScript tem sintaxe válida (sem executar).
 * @param {string} code
 * @returns {{ ok: boolean, message?: string }}
 */
export function checkJavaScriptSyntax(code) {
  try {
    // Apenas valida a sintaxe: `new Function` faz o parse sem invocar o corpo.
    // eslint-disable-next-line no-new-func
    new Function(String(code || ''));
    return { ok: true };
  } catch (error) {
    return { ok: false, message: error.message };
  }
}

/**
 * Serializa um valor para um literal JavaScript seguro (número, string,
 * booleano, null), usado para injetar variáveis de caso de teste no snippet.
 * @param {unknown} value
 * @returns {string}
 */
function serializeJsValue(value) {
  if (value === null) return 'null';
  if (typeof value === 'string') return JSON.stringify(value);
  if (typeof value === 'boolean') return value ? 'true' : 'false';
  if (typeof value === 'number') {
    if (!Number.isFinite(value)) {
      return value === Infinity ? 'Infinity' : '-Infinity';
    }
    return String(value);
  }
  return JSON.stringify(value);
}

/**
 * Executa um trecho JavaScript com um conjunto de variáveis em escopo,
 * capturando a saída de `console.log` e eventuais erros de execução.
 * Não invoca o corpo antes de validar: o wrapper é criado com `new Function`.
 * @param {string} snippet
 * @param {Object} vars - variáveis a injetar (ex.: { a: 7, b: 3 })
 * @returns {{ output: string, error: Error|null }}
 */
export function runJavaScriptSnippet(snippet, vars = {}) {
  const logs = [];
  const originalLog = console.log;
  console.log = (...args) => logs.push(args.map((arg) => String(arg)).join(' '));
  let error = null;
  try {
    const varDecls = Object.entries(vars)
      .map(([key, value]) => `const ${key} = ${serializeJsValue(value)};`)
      .join('\n');
    const body = `${varDecls}\n${String(snippet || '').trim()}\n`;
    // eslint-disable-next-line no-new-func
    new Function(body)();
  } catch (err) {
    error = err;
  } finally {
    console.log = originalLog;
  }
  return { output: logs.join('\n'), error };
}

const NON_FINITE_OUTPUT = /^(Infinity|-Infinity|NaN)$/;

/**
 * Validação comportamental: executa o snippet do aluno e o snippet de
 * referência com cada caso de teste e compara as saídas produzidas.
 * @param {string} studentSnippet
 * @param {string} referenceSnippet
 * @param {Array} testCases - array de { vars: { a, b, ... } }
 * @returns {{ ok: boolean, type?: 'runtime'|'logic'|'reference', error?: Object, case?: Object, studentOutput?: string, referenceOutput?: string }}
 */
export function validateBehaviorally(studentSnippet, referenceSnippet, testCases = []) {
  for (const tc of testCases) {
    const vars = tc.vars || {};
    const student = runJavaScriptSnippet(studentSnippet, vars);
    const reference = runJavaScriptSnippet(referenceSnippet, vars);

    if (student.error) {
      return { ok: false, type: 'runtime', error: student.error, case: tc };
    }
    if (reference.error) {
      return { ok: false, type: 'reference', error: reference.error, case: tc };
    }

    // Divisão por zero: em JavaScript não lança exceção, produz Infinity/NaN.
    // Trata como erro de execução informativo em vez de falha silenciosa.
    if (
      NON_FINITE_OUTPUT.test(student.output) ||
      NON_FINITE_OUTPUT.test(reference.output)
    ) {
      return {
        ok: false,
        type: 'runtime',
        error: { message: 'Divisão por zero detectada.' },
        case: tc
      };
    }

    if (student.output !== reference.output) {
      return {
        ok: false,
        type: 'logic',
        case: tc,
        studentOutput: student.output,
        referenceOutput: reference.output
      };
    }
  }
  return { ok: true };
}

export function renderCodeCompletion(exercise, options = {}) {
  const container = document.createElement('div');
  container.className = 'exercise exercise-code-completion';
  container.dataset.exerciseId = exercise.id;
  container.dataset.exerciseType = 'code-completion';

  const isRetry = options.isRetry || false;
  const onAnswer = options.onAnswer || (() => {});
  const language = exercise.language || 'javascript';
  const languageLabel = LANGUAGE_LABELS[language] || language;

  container.innerHTML = `
    <div class="exercise-header">
      <span class="exercise-type-badge">${t('lesson.exerciseTypes.codeCompletion')}</span>
      <span class="language-badge">${languageLabel}</span>
      ${exercise.difficulty ? `<span class="difficulty-badge difficulty-${exercise.difficulty}">${t(`common.difficulty.${exercise.difficulty}`, { defaultValue: exercise.difficulty })}</span>` : ''}
    </div>
    <p class="exercise-prompt">${exercise.prompt}</p>
    <label class="code-label" for="code-${exercise.id}">${t('lesson.codeCompletion.yourCode')}</label>
    <textarea id="code-${exercise.id}" class="code-input" rows="6" spellcheck="false"
      aria-describedby="code-hint-${exercise.id}" ${isRetry ? 'disabled' : ''}>${escapeHtml(exercise.starter_code || '')}</textarea>
    <p id="code-hint-${exercise.id}" class="code-hint">${t('lesson.codeCompletion.hint', { language: languageLabel })}</p>
    <div class="exercise-actions">
      ${!isRetry ? `<button class="btn btn-primary check-btn">${t('lesson.codeCompletion.check')}</button>` : ''}
    </div>
    <div class="exercise-feedback" aria-live="polite" hidden></div>
    <div class="exercise-explanation" hidden>
      <h4>${t('lesson.explanation')}</h4>
      <p>${exercise.explanation}</p>
      ${exercise.correct ? `<p class="reference-solution"><strong>${t('lesson.codeCompletion.reference')}:</strong> <code>${escapeHtml(exercise.correct)}</code></p>` : ''}
    </div>
    <div class="exercise-actions">
      ${isRetry ? `<button class="btn btn-secondary retry-btn">${t('lesson.tryAgain')}</button>` : ''}
    </div>
  `;

  const textarea = container.querySelector('.code-input');
  const checkBtn = container.querySelector('.check-btn');
  const retryBtn = container.querySelector('.retry-btn');
  const feedbackEl = container.querySelector('.exercise-feedback');
  const explanationEl = container.querySelector('.exercise-explanation');

  let answered = isRetry;

  if (checkBtn) {
    checkBtn.addEventListener('click', handleCheck);
  }
  if (retryBtn) {
    retryBtn.addEventListener('click', resetExercise);
  }

  function handleCheck() {
    if (answered) return;
    answered = true;

    const userCode = textarea.value;
    let syntaxOk = true;
    let syntaxMessage = null;

    if (language === 'javascript') {
      const syntax = checkJavaScriptSyntax(userCode);
      syntaxOk = syntax.ok;
      syntaxMessage = syntax.message || null;
    }

    let isCorrect = false;
    let feedbackType = FeedbackType.INCORRECT;
    let detailHtml = '';

    if (!syntaxOk) {
      // Erro de sintaxe (ex.: "Unexpected token" na linha X)
      feedbackType = FeedbackType.INCORRECT;
      detailHtml = `<p class="feedback-detail">${t('lesson.codeCompletion.syntaxError', { message: syntaxMessage || '' })}</p>`;
    } else if (language === 'javascript' && exercise.testCases && exercise.testCases.length > 0) {
      // Validação comportamental com múltiplos casos de teste
      const result = validateBehaviorally(userCode, exercise.correct, exercise.testCases);
      if (result.ok) {
        isCorrect = true;
        feedbackType = FeedbackType.CORRECT;
      } else if (result.type === 'runtime') {
        isCorrect = false;
        feedbackType = FeedbackType.INCORRECT;
        detailHtml = `<p class="feedback-detail">${t('lesson.codeCompletion.runtimeError', { message: result.error.message || '' })}</p>`;
      } else {
        // Erro de lógica: código roda, mas produz saída diferente da esperada
        isCorrect = false;
        feedbackType = FeedbackType.PARTIAL;
        const vars = (result.case && result.case.vars) || {};
        detailHtml = `<p class="feedback-detail">${t('lesson.codeCompletion.logicError', {
          case: JSON.stringify(vars),
          reference: result.referenceOutput || '',
          student: result.studentOutput || ''
        })}</p>`;
      }
    } else {
      // Fallback de comparação de texto normalizado (sem comentários/espços)
      const matchesReference =
        normalizeForComparison(userCode) === normalizeForComparison(exercise.correct);
      if (matchesReference) {
        isCorrect = true;
        feedbackType = FeedbackType.CORRECT;
      } else {
        isCorrect = false;
        feedbackType = FeedbackType.PARTIAL;
        detailHtml = `<p class="feedback-detail">${t('lesson.codeCompletion.notQuite')}</p>`;
      }
    }

    const xpEarned = options.calculateXP ? options.calculateXP(isCorrect, isRetry) : 0;

    textarea.disabled = true;
    if (checkBtn) checkBtn.hidden = true;

    showFeedback(feedbackEl, feedbackType, {
      xp: xpEarned,
      streak: options.streak,
      isFirstAttempt: !isRetry
    });
    if (detailHtml) {
      feedbackEl.insertAdjacentHTML('beforeend', detailHtml);
    }

    explanationEl.hidden = false;

    onAnswer({
      exerciseId: exercise.id,
      correct: isCorrect,
      xpEarned,
      isRetry,
      userAnswer: userCode
    });
  }

  function resetExercise() {
    answered = false;
    textarea.disabled = false;
    textarea.value = exercise.starter_code || '';
    if (checkBtn) {
      checkBtn.hidden = false;
      checkBtn.disabled = false;
    }
    if (retryBtn) retryBtn.hidden = true;
    feedbackEl.hidden = true;
    feedbackEl.innerHTML = '';
    explanationEl.hidden = true;
  }

  return container;
}

function escapeHtml(value) {
  return String(value || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}
