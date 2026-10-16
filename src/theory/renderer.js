/**
 * Renderer de unidade teórica (US4).
 * - Markdown → HTML (ver markdown.js), com KaTeX/highlight.js aplicados depois
 *   pela view (renderMathIn/highlightIn) para não bloquear a montagem.
 * - Cabeçalho de atribuição (fonte, autores, capítulo/seção, licença, status).
 * - "Ver original" (CC BY / CC BY-SA) lado a lado quando houver `original_excerpt`.
 * - Por seção: checkbox "lida", anotações e "praticar este trecho".
 */

import { t } from '../i18n.js';
import { renderMarkdown, escapeHtml } from './markdown.js';

/**
 * Divide o conteúdo markdown em seções (por headings `##`).
 * @param {string} content
 * @returns {Array<{id:string, title:string, body:string}>}
 */
export function splitSections(content) {
  const lines = String(content || '').split('\n');
  const sections = [];
  let current = null;

  for (const line of lines) {
    const match = line.match(/^##\s+(.*)$/);
    if (match) {
      if (current) sections.push(current);
      const title = match[1].trim();
      current = { id: slugify(title), title, body: [] };
      continue;
    }
    if (!current) {
      // Conteúdo antes do primeiro ## vira uma seção "intro" sem título
      current = { id: 'intro', title: '', body: [] };
    }
    current.body.push(line);
  }

  if (current) sections.push(current);
  return sections.map((s) => ({ ...s, body: s.body.join('\n').trim() })).filter((s) => s.title || s.body);
}

function slugify(text) {
  return String(text || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 60) || 'secao';
}

/**
 * @param {Object} unit - Unidade teórica (front-matter + content)
 * @param {Object} callbacks - { isRead, getAnnotation, onToggleRead, onSaveAnnotation, onPractice }
 * @returns {HTMLElement}
 */
export function renderTheoryUnit(unit, callbacks = {}) {
  const {
    isRead = () => false,
    getAnnotation = () => '',
    onToggleRead = () => {},
    onSaveAnnotation = () => {},
    onPractice = null
  } = callbacks;

  const container = document.createElement('article');
  container.className = 'theory-unit';
  container.dataset.theoryId = unit.id;

  // ---- Atribuição ----
  container.appendChild(renderAttribution(unit));

  // ---- "Ver original" ----
  const originalExcerpt = unit.original_excerpt || unit.source?.original_excerpt;
  if (originalExcerpt) {
    container.appendChild(renderOriginalPanel(originalExcerpt));
  }

  // ---- Seções ----
  const sections = splitSections(unit.content);
  const linkedLessons = unit.linked_lessons || [];

  sections.forEach((section, index) => {
    const sectionId = `${unit.id}::${section.id || `s${index}`}`;
    const sectionEl = document.createElement('section');
    sectionEl.className = 'theory-section';
    sectionEl.id = `${unit.id}-${section.id || `s${index}`}`;

    const read = isRead(sectionId);

    const head = document.createElement('div');
    head.className = 'theory-section-head';
    head.innerHTML = `
      <h3>${escapeHtml(section.title || unit.title)}</h3>
      <label class="theory-read-toggle">
        <input type="checkbox" class="theory-read-checkbox" ${read ? 'checked' : ''}>
        <span>${read ? t('theory.markedRead') : t('theory.markRead')}</span>
      </label>
    `;
    sectionEl.appendChild(head);

    const body = document.createElement('div');
    body.className = 'theory-section-body';
    body.innerHTML = renderMarkdown(section.body);
    sectionEl.appendChild(body);

    // Anotações
    const annotationWrap = document.createElement('div');
    annotationWrap.className = 'theory-annotation';
    const existing = getAnnotation(sectionId);
    annotationWrap.innerHTML = `
      <label for="ann-${sectionEl.id}">${t('theory.annotations')}</label>
      <textarea id="ann-${sectionEl.id}" rows="2" placeholder="${escapeHtml(t('theory.annotationPlaceholder'))}">${escapeHtml(existing)}</textarea>
      <div class="exercise-actions">
        <button type="button" class="btn btn-secondary save-annotation-btn">${t('theory.saveAnnotation')}</button>
        ${onPractice && linkedLessons.length > 0 ? `<button type="button" class="btn btn-secondary practice-section-btn">${t('theory.practiceThis')}</button>` : ''}
      </div>
      <p class="annotation-status" role="status" hidden></p>
    `;
    sectionEl.appendChild(annotationWrap);

    // Eventos
    const checkbox = head.querySelector('.theory-read-checkbox');
    const readLabel = head.querySelector('.theory-read-toggle span');
    checkbox.addEventListener('change', () => {
      readLabel.textContent = checkbox.checked ? t('theory.markedRead') : t('theory.markRead');
      onToggleRead(sectionId, checkbox.checked);
    });

    const textarea = annotationWrap.querySelector('textarea');
    const status = annotationWrap.querySelector('.annotation-status');
    annotationWrap.querySelector('.save-annotation-btn').addEventListener('click', () => {
      onSaveAnnotation(sectionId, textarea.value);
      status.textContent = t('theory.annotationSaved');
      status.hidden = false;
    });

    const practiceBtn = annotationWrap.querySelector('.practice-section-btn');
    if (practiceBtn && onPractice) {
      practiceBtn.addEventListener('click', () => onPractice(sectionId, linkedLessons));
    }

    container.appendChild(sectionEl);
  });

  if (sections.length === 0) {
    const empty = document.createElement('p');
    empty.className = 'placeholder';
    empty.textContent = t('theory.noContent');
    container.appendChild(empty);
  }

  return container;
}

function renderAttribution(unit) {
  const source = unit.source || {};
  const authors = Array.isArray(source.authors) ? source.authors.join(', ') : (source.authors || '');
  const statusKey = unit.verification_status === 'verified_with_source' ? 'verified' : 'unverified';
  const derivation = t(`theory.derivationType.${unit.derivation_type}`, { defaultValue: unit.derivation_type || '' });

  const section = document.createElement('section');
  section.className = 'theory-attribution';
  section.innerHTML = `
    <h2>${t('theory.attribution')}</h2>
    <dl>
      <dt>${t('theory.source')}</dt>
      <dd>${escapeHtml(source.title || '')}${source.edition ? ` — ${escapeHtml(source.edition)}` : ''}</dd>
      ${authors ? `<dt>${t('theory.authors')}</dt><dd>${escapeHtml(authors)}</dd>` : ''}
      ${source.chapter ? `<dt>${t('theory.chapter')}</dt><dd>${escapeHtml(source.chapter)}</dd>` : ''}
      ${source.section ? `<dt>${t('theory.section')}</dt><dd>${escapeHtml(source.section)}</dd>` : ''}
      <dt>${t('theory.license')}</dt>
      <dd>${escapeHtml(unit.license || '')}${source.license_url ? ` — <a href="${escapeHtml(source.license_url)}" target="_blank" rel="noopener noreferrer">${t('theory.url')}</a>` : ''}</dd>
      ${source.access_date ? `<dt>${t('theory.accessDate')}</dt><dd>${escapeHtml(source.access_date)}</dd>` : ''}
      <dt>${t('theory.derivationTypeLabel')}</dt><dd>${escapeHtml(derivation)}</dd>
    </dl>
    <p><span class="verification-badge verification-${statusKey}">${t(`theory.verificationStatus.${statusKey}`)}</span></p>
  `;
  return section;
}

function renderOriginalPanel(excerpt) {
  const details = document.createElement('details');
  details.className = 'theory-original';
  details.innerHTML = `
    <summary>${t('theory.viewOriginal')}</summary>
    <blockquote>${escapeHtml(excerpt)}</blockquote>
  `;
  return details;
}
