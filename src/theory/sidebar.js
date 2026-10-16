/**
 * Índice lateral da biblioteca teórica.
 * Agrupa por disciplina e destaca a unidade atual. Links usam `data-nav`
 * (tratados por bindNavigationEvents em app.js) para navegação hash.
 */

import { t } from '../i18n.js';

/**
 * @param {Array<Object>} index - Índice de `loadTheoryIndex()`
 * @param {string|null} currentId - ID da unidade atual (destacada)
 * @returns {HTMLElement}
 */
export function renderTheorySidebar(index, currentId = null) {
  const aside = document.createElement('aside');
  aside.className = 'theory-sidebar';
  aside.setAttribute('aria-label', t('theory.tableOfContents'));

  const units = Array.isArray(index) ? index : [];
  const byDiscipline = new Map();
  for (const unit of units) {
    const key = unit.discipline || 'outros';
    if (!byDiscipline.has(key)) byDiscipline.set(key, []);
    byDiscipline.get(key).push(unit);
  }

  const headings = document.createElement('h2');
  headings.textContent = t('theory.tableOfContents');
  aside.appendChild(headings);

  if (units.length === 0) {
    const empty = document.createElement('p');
    empty.className = 'placeholder';
    empty.textContent = t('theory.noUnits');
    aside.appendChild(empty);
    return aside;
  }

  for (const [discipline, items] of byDiscipline) {
    const group = document.createElement('section');
    group.className = 'theory-sidebar-group';

    const title = document.createElement('h3');
    title.textContent = items[0]?.disciplineTitle || t(`disciplines.${discipline}`, { defaultValue: discipline });
    group.appendChild(title);

    const list = document.createElement('ul');
    list.className = 'theory-sidebar-list';

    for (const unit of items) {
      const li = document.createElement('li');
      const link = document.createElement('a');
      link.href = `#/theory/${unit.id}`;
      link.dataset.nav = `/theory/${unit.id}`;
      link.textContent = unit.title;
      if (unit.id === currentId) {
        link.classList.add('active');
        link.setAttribute('aria-current', 'page');
      }
      li.appendChild(link);
      list.appendChild(li);
    }

    group.appendChild(list);
    aside.appendChild(group);
  }

  return aside;
}
