/**
 * Entry Point — Ensina Lógica
 * Boot: carrega locale, inicializa router, store, theme, gamification
 */

import { loadLocale, t, setLocale } from './i18n.js';
import { router, navigate, startRouter, createViewHandler } from './router.js';
import { progressStore } from './store/ProgressStore.js';
import { migrateProgress } from './store/schema-version.js';
import { initTheme, getTheme, toggleTheme } from './ui/theme.js';
import { initToasts, showToast } from './ui/toasts.js';
import { initModals } from './ui/modals.js';
import { initA11y, announce } from './ui/a11y.js';
import { celebrate } from './ui/confetti.js';
import { loadCurriculum, loadTheoryUnit, loadTheoryIndex, loadExercisesForLesson, loadExercisesForTheoryUnit } from './curriculum/loader.js';
import { calculateXP, levelFromXP, xpForLevel } from './gamification/xp.js';
import { updateStreak, getStreakInfo } from './gamification/streak.js';
import { checkAchievements, ACHIEVEMENTS } from './gamification/achievements.js';
import { scheduleReview, getDueReviews } from './gamification/srs.js';
import { markLessonComplete, markTheorySectionRead, unmarkTheorySectionRead } from './curriculum/progress.js';
import { renderLesson } from './lesson/renderer.js';
import { renderTheoryUnit } from './theory/renderer.js';
import { renderTheorySidebar } from './theory/sidebar.js';
import { searchTheory } from './theory/search.js';
import { getAnnotation, saveAnnotation } from './theory/annotations.js';
import { loadKatex, loadHighlight } from './theory/assets.js';
import { renderMathIn, highlightIn } from './theory/markdown.js';
import { getModuleUnlockStatus, getModuleProgress, isLessonCompleted, isModuleUnlocked } from './curriculum/unlock.js';

// Estado global da aplicação
const AppState = {
  curriculum: null,
  progress: null,
  currentView: null,
  dailyGoal: 20
};

/**
 * Inicializa a aplicação
 */
export async function initApp() {
  try {
    // 1. Carrega locale (pt-BR)
    await loadLocale('pt-BR');

    // 2. Inicializa store de progresso
    AppState.progress = await progressStore.init();

    // 3. Migra schema se necessário
    AppState.progress = migrateProgress(AppState.progress);

    // 4. Inicializa tema (antes do primeiro paint)
    initTheme(AppState.progress.preferences?.theme || 'auto');

    // 5. Inicializa UI utilities
    initToasts();
    initModals();
    initA11y();
    applyHeaderLabels();
    setupHeaderActions();

    // 6. Carrega currículo
    AppState.curriculum = await loadCurriculum();
    updateHeaderXpBar();

    // 7. Atualiza streak na inicialização
    updateStreakOnBoot(AppState.progress);

    // 8. Verifica conquistas pendentes
    checkPendingAchievements();

    // 9. Configura rotas
    setupRoutes();

    // 10. Inicia router (hash-based)
    startRouter();

    // 11. Mostra boas-vindas enquanto o onboarding não foi concluído
    //     (flag dedicada, independente de last_activity_date / streak)
    if (!AppState.progress.preferences?.onboarding_completed) {
      showWelcomeModal();
    } else {
      // Atualiza meta diária na UI
      AppState.dailyGoal = AppState.progress.preferences?.daily_xp_goal || 20;
      updateDailyGoalUI();
    }

  } catch (error) {
    console.error('[App] Erro na inicialização:', error);
    showToast(t('error.init_failed'), 'error');
  }
}

/**
 * Atualiza streak na inicialização do app
 */
function updateStreakOnBoot(progress) {
  const today = new Date();
  updateStreak(progress, today);

  // Recalcula freezes (reset semanal segunda-feira)
  const { freezesRemaining } = getStreakInfo(progress);
  progress.stats.freezes_remaining = freezesRemaining;

  // Salva progresso atualizado
  progressStore.save();
}

/**
 * Verifica conquistas que devem ser desbloqueadas no boot
 */
function checkPendingAchievements() {
  checkAndAnnounceAchievements({ curriculum: AppState.curriculum, exported: false, hour: new Date().getHours() });
}

/**
 * Verifica, anuncia e persiste conquistas recém-desbloqueadas.
 * @param {Object} [context] - Contexto extra (curriculum, perfectLesson, exported, hour)
 * @returns {Array<string>} IDs recém-desbloqueados
 */
function checkAndAnnounceAchievements(context = {}) {
  const newAchievements = checkAchievements(AppState.progress, context);
  if (newAchievements.length === 0) return [];

  AppState.progress.achievements = [...(AppState.progress.achievements || []), ...newAchievements];
  progressStore.save();

  for (const id of newAchievements) {
    showAchievementToast(id);
    const name = ACHIEVEMENTS[id]?.name || id;
    announce(t('feedback.achievementUnlocked', { name }), 'assertive');
  }
  return newAchievements;
}

/**
 * Atualiza a barra de XP do cabeçalho (índice.html: #xp-bar/#xp-fill/#xp-text)
 */
function updateHeaderXpBar() {
  const stats = AppState.progress?.stats || {};
  const totalXP = stats.total_xp || 0;
  const level = levelFromXP(totalXP);
  const currentXP = totalXP - xpForLevel(level);
  const nextLevelXP = xpForLevel(level + 1) - xpForLevel(level);

  const bar = document.getElementById('xp-bar');
  const fill = document.getElementById('xp-fill');
  const text = document.getElementById('xp-text');

  if (fill) fill.style.width = `${nextLevelXP > 0 ? Math.min(100, (currentXP / nextLevelXP) * 100) : 0}%`;
  if (text) text.textContent = `${t('dashboard.level')} ${level} — ${currentXP}/${nextLevelXP} XP`;
  if (bar) {
    bar.setAttribute('aria-valuenow', String(currentXP));
    bar.setAttribute('aria-valuemax', String(nextLevelXP));
  }
}

/**
 * Verifica se a meta diária foi atingida e notifica (toast + anúncio assertive)
 * e celebra com confete UMA vez por dia.
 */
function checkDailyGoalReached() {
  const goal = AppState.progress?.preferences?.daily_xp_goal || 20;
  const todayXP = getTodayXP(AppState.progress);
  if (todayXP < goal) return;

  const today = new Date().toISOString().split('T')[0];
  const progress = AppState.progress;
  progress.stats = progress.stats || {};
  if (progress.stats.last_daily_goal_date === today) return;

  progress.stats.last_daily_goal_date = today;
  progressStore.save();

  showToast(t('feedback.dailyGoalReached'), 'success');
  announce(t('feedback.dailyGoalReached'), 'assertive');
  celebrate();
}

/**
 * Configura todas as rotas da aplicação
 */
function setupRoutes() {
  // Dashboard / Boas-vindas
  router.add('/', createViewHandler(renderDashboard));

  // Semestre
  router.add('/semester/:semId', createViewHandler(renderSemesterView));

  // Disciplina
  router.add('/semester/:semId/discipline/:discId', createViewHandler(renderDisciplineView));

  // Módulo
  router.add('/semester/:semId/discipline/:discId/module/:modId', createViewHandler(renderModuleView));

  // Lição
  router.add('/lesson/:lessonId', createViewHandler(renderLessonView));

  // Teoria / Biblioteca
  router.add('/theory/:theoryUnitId', createViewHandler(renderTheoryView));
  router.add('/library', createViewHandler(renderLibraryView));

  // Configurações
  router.add('/settings', createViewHandler(renderSettingsView));

  // Conquistas
  router.add('/achievements', createViewHandler(renderAchievementsView));
}

/**
 * Renderiza Dashboard (#/)
 */
async function renderDashboard(params, query, main) {
  main.innerHTML = getDashboardHTML();
  bindDashboardEvents();
  updateDashboardStats();

  // Mostra boas-vindas enquanto o onboarding não foi concluído
  if (!AppState.progress.preferences?.onboarding_completed) {
    showWelcomeModal();
  }
}

/**
 * HTML do Dashboard
 */
function getDashboardHTML() {
  const progress = AppState.progress;
  const stats = progress.stats || {};
  const level = stats.level || 1;
  const totalXP = stats.total_xp || 0;
  const currentXP = totalXP - xpForLevel(level);
  const nextLevelXP = xpForLevel(level + 1) - xpForLevel(level);
  const streak = stats.current_streak || 0;
  const freezes = stats.freezes_remaining || 0;
  const dailyGoal = progress.preferences?.daily_xp_goal || 20;
  const todayXP = getTodayXP(progress);
  const dueReviews = getDueReviews(progress).length;

  return `
    <section class="dashboard" aria-label="${t('dashboard.title')}">
      <header class="dashboard-header">
        <h1>${t('dashboard.welcome')}</h1>
        <div class="daily-goal-bar" role="progressbar" aria-valuenow="${todayXP}" aria-valuemin="0" aria-valuemax="${dailyGoal}" aria-label="${t('dashboard.daily_goal')}">
          <div class="daily-goal-fill" style="width: ${Math.min(100, (todayXP / dailyGoal) * 100)}%"></div>
          <span class="daily-goal-text">${todayXP}/${dailyGoal} XP</span>
        </div>
      </header>

      <div class="dashboard-stats">
        <div class="stat-card xp" aria-label="${t('dashboard.total_xp')}: ${totalXP}">
          <span class="stat-icon" aria-hidden="true">⭐</span>
          <div class="stat-info">
            <span class="stat-value">${totalXP}</span>
            <span class="stat-label">${t('dashboard.total_xp')}</span>
          </div>
        </div>
        <div class="stat-card level" aria-label="${t('dashboard.level')}: ${level}">
          <span class="stat-icon" aria-hidden="true">🏆</span>
          <div class="stat-info">
            <span class="stat-value">${level}</span>
            <span class="stat-label">${t('dashboard.level')}</span>
          </div>
        </div>
        <div class="stat-card streak" aria-label="${t('dashboard.streak')}: ${streak} ${t('dashboard.days')}">
          <span class="stat-icon" aria-hidden="true">🔥</span>
          <div class="stat-info">
            <span class="stat-value">${streak}</span>
            <span class="stat-label">${t('dashboard.streak')}</span>
          </div>
          ${freezes > 0 ? `<span class="freeze-badge" aria-label="${t('dashboard.freezes_remaining')}: ${freezes}">❄️ ${freezes}</span>` : ''}
        </div>
        <div class="stat-card reviews" aria-label="${t('dashboard.reviews_due')}: ${dueReviews}">
          <span class="stat-icon" aria-hidden="true">📚</span>
          <div class="stat-info">
            <span class="stat-value">${dueReviews}</span>
            <span class="stat-label">${t('dashboard.reviews_due')}</span>
          </div>
        </div>
      </div>

      <section class="dashboard-progress" aria-labelledby="level-progress-title">
        <h2 id="level-progress-title" class="visually-hidden">${t('dashboard.level_progress')}</h2>
        <div class="level-progress">
          <div class="level-progress-header">
            <span>${t('dashboard.level')} ${level}</span>
            <span>${currentXP}/${nextLevelXP} XP</span>
          </div>
          <div class="progress-bar" role="progressbar" aria-valuenow="${currentXP}" aria-valuemin="0" aria-valuemax="${nextLevelXP}">
            <div class="progress-fill" style="width: ${nextLevelXP > 0 ? (currentXP / nextLevelXP) * 100 : 0}%"></div>
          </div>
        </div>
      </section>

      ${dueReviews > 0 ? `
        <section class="dashboard-reviews" aria-labelledby="reviews-title">
          <h2 id="reviews-title">${t('dashboard.todays_reviews')}</h2>
          <div class="review-cards" id="review-cards"></div>
          <button class="btn btn-primary" id="start-reviews-btn">${t('dashboard.start_reviews')}</button>
        </section>
      ` : ''}

      <section class="dashboard-semester" aria-labelledby="semester-title">
        <h2 id="semester-title">${t('dashboard.current_semester')}</h2>
        <div class="semester-card" data-semester="sem1">
          <h3>1º Semestre</h3>
          <p>${t('dashboard.sem1_description')}</p>
          <button class="btn btn-secondary" data-nav="/semester/sem1">${t('dashboard.continue')}</button>
        </div>
        ${renderComingSoonSemesters()}
      </section>
    </section>
  `;
}

/**
 * Renderiza semestres "Em breve"
 */
function renderComingSoonSemesters() {
  const semesters = AppState.curriculum?.semesters.filter(s => s.status === 'coming-soon') || [];
  return semesters.map(sem => `
    <div class="semester-card coming-soon" data-semester="${sem.id}">
      <h3>${sem.title}</h3>
      <span class="coming-soon-badge">${t('dashboard.coming_soon')}</span>
      <p>${sem.disciplines.map(d => d.title).join(', ')}</p>
      <button class="btn btn-secondary" disabled>${t('dashboard.coming_soon')}</button>
    </div>
  `).join('');
}

/**
 * Bind eventos do dashboard
 */
function bindDashboardEvents() {
  // Navegação para semestre
  document.querySelectorAll('[data-nav]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const path = e.currentTarget.dataset.nav;
      navigate(path);
    });
  });

  // Botão iniciar revisões
  const startReviewsBtn = document.getElementById('start-reviews-btn');
  if (startReviewsBtn) {
    startReviewsBtn.addEventListener('click', () => {
      const dueReviews = getDueReviews(AppState.progress);
      if (dueReviews.length > 0) {
        navigate(`/lesson/${dueReviews[0].lesson_id}`);
      }
    });
  }

  // Carrega cards de revisão
  renderReviewCards();
}

/**
 * Renderiza cards de revisão do dia
 */
function renderReviewCards() {
  const container = document.getElementById('review-cards');
  if (!container) return;

  const dueReviews = getDueReviews(AppState.progress);
  container.innerHTML = dueReviews.slice(0, 3).map(review => `
    <div class="review-card" data-lesson="${review.lesson_id}">
      <span class="review-interval">${t('dashboard.review_interval', { days: review.interval })}</span>
      <button class="btn btn-sm" data-nav="/lesson/${review.lesson_id}">${t('dashboard.review_now')}</button>
    </div>
  `).join('');

  container.querySelectorAll('[data-nav]').forEach(btn => {
    btn.addEventListener('click', (e) => navigate(e.currentTarget.dataset.nav));
  });
}

/**
 * Atualiza stats do dashboard
 */
function updateDashboardStats() {
  const progress = AppState.progress;
  const stats = progress.stats || {};

  // Atualiza XP total
  const xpEl = document.querySelector('.stat-card.xp .stat-value');
  if (xpEl) xpEl.textContent = stats.total_xp || 0;

  // Atualiza nível
  const levelEl = document.querySelector('.stat-card.level .stat-value');
  if (levelEl) levelEl.textContent = stats.level || 1;

  // Atualiza streak
  const streakEl = document.querySelector('.stat-card.streak .stat-value');
  if (streakEl) streakEl.textContent = stats.current_streak || 0;

  // Atualiza freezes
  const freezeBadge = document.querySelector('.freeze-badge');
  const freezes = stats.freezes_remaining || 0;
  if (freezeBadge) {
    freezeBadge.textContent = `❄️ ${freezes}`;
    freezeBadge.style.display = freezes > 0 ? 'inline' : 'none';
  }

  // Atualiza barra de nível
  const level = stats.level || 1;
  const totalXP = stats.total_xp || 0;
  const currentXP = totalXP - xpForLevel(level);
  const nextLevelXP = xpForLevel(level + 1) - xpForLevel(level);
  const progressFill = document.querySelector('.progress-fill');
  if (progressFill && nextLevelXP > 0) {
    progressFill.style.width = `${(currentXP / nextLevelXP) * 100}%`;
  }
}

/**
 * Retorna XP ganho hoje
 */
function getTodayXP(progress) {
  const today = new Date().toISOString().split('T')[0];
  let todayXP = 0;

  if (progress.exercises) {
    for (const [exId, data] of Object.entries(progress.exercises)) {
      if (data.last_attempt_date?.startsWith(today)) {
        todayXP += data.xp_earned || 0;
      }
    }
  }
  return todayXP;
}

/**
 * Retorna o título de uma lição a partir do currículo.
 * Faz fallback para um rótulo localizado — nunca devolve uma chave crua de i18n.
 * @param {Object} mod - Módulo do currículo (com lessonTitles opcional)
 * @param {string} lessonId - ID da lição (ex: l01)
 * @param {number} index - Índice da lição dentro do módulo
 * @returns {string}
 */
function getLessonTitle(mod, lessonId, index = 0) {
  const fromCurriculum = mod?.lessonTitles?.[lessonId];
  if (fromCurriculum) return fromCurriculum;
  return t('lesson.numbered', { number: index + 1 });
}

/**
 * Localiza uma lição no currículo (semestre, disciplina, módulo e índice)
 * @param {string} lessonId - ID da lição
 * @returns {Object|null}
 */
function findLessonContext(lessonId) {
  for (const sem of AppState.curriculum?.semesters || []) {
    for (const disc of sem.disciplines || []) {
      for (const mod of disc.modules || []) {
        const index = mod.lessons.indexOf(lessonId);
        if (index !== -1) return { sem, disc, mod, index };
      }
    }
  }
  return null;
}

/**
 * Aplica rótulos acessíveis (aria-label + tooltip) traduzidos nos ícones do cabeçalho
 */
function applyHeaderLabels() {
  const targets = [
    ['#theme-toggle', 'a11y.toggleTheme'],
    ['a[href="#/settings"]', 'settings.title'],
    ['a[href="#/achievements"]', 'achievements.title'],
  ];

  for (const [selector, key] of targets) {
    const el = document.querySelector(selector);
    if (!el) continue;
    const label = t(key);
    el.setAttribute('aria-label', label);
    el.setAttribute('title', label);
  }
}

/**
 * Liga as ações dos botões do cabeçalho (alternância de tema)
 */
function setupHeaderActions() {
  const themeToggle = document.getElementById('theme-toggle');
  if (!themeToggle || themeToggle.dataset.bound === 'true') return;
  themeToggle.dataset.bound = 'true';
  themeToggle.addEventListener('click', () => {
    // Alterna claro/escuro com base no tema EFETIVO — sempre produz uma mudança
    // visível. O modo "automático" continua disponível em Configurações.
    const effective = document.documentElement.getAttribute('data-theme');
    applyThemePreference(effective === 'dark' ? 'light' : 'dark');
  });
}

/**
 * Aplica um tema e PERSISTE a preferência no progresso, para que a escolha
 * sobreviva ao reload (o boot lê `progress.preferences.theme`).
 * @param {string} [theme] - 'light' | 'dark' | 'auto'. Sem argumento, cicla.
 * @returns {string} o tema escolhido ('light' | 'dark' | 'auto')
 */
function applyThemePreference(theme) {
  const chosen = toggleTheme(theme);

  if (AppState.progress) {
    AppState.progress.preferences = AppState.progress.preferences || {};
    AppState.progress.preferences.theme = chosen;
  }
  progressStore.update({ preferences: { theme: chosen } });

  // Mantém a marcação dos botões de tema coerente (tela de configurações)
  document.querySelectorAll('.theme-btn').forEach((btn) => {
    btn.classList.toggle('active', btn.dataset.theme === chosen);
  });

  return chosen;
}

/**
 * Renderiza visão do semestre
 */
async function renderSemesterView(params, query, main) {
  const semId = params.semId;
  const sem = AppState.curriculum.semesters.find(s => s.id === semId);
  if (!sem) return navigate('/');

  main.innerHTML = `
    <section class="semester-view" aria-label="${sem.title}">
      <header class="view-header">
        <button class="btn btn-back" data-nav="/">${t('common.back')}</button>
        <h1>${sem.title}</h1>
      </header>
      <div class="discipline-grid">
        ${sem.disciplines.map(disc => `
          <article class="discipline-card ${sem.status === 'coming-soon' ? 'disabled' : ''}" data-discipline="${disc.id}" ${sem.status === 'coming-soon' ? 'aria-disabled="true"' : ''}>
            <h2>${disc.title}</h2>
            <p>${disc.modules.length} ${t('common.modules')}</p>
            ${sem.status !== 'coming-soon' ? `<button class="btn btn-primary" data-nav="/semester/${semId}/discipline/${disc.id}">${t('common.enter')}</button>` : ''}
          </article>
        `).join('')}
      </div>
    </section>
  `;

  bindNavigationEvents(main);
}

/**
 * Renderiza visão da disciplina
 */
async function renderDisciplineView(params, query, main) {
  const { semId, discId } = params;
  const sem = AppState.curriculum.semesters.find(s => s.id === semId);
  const disc = sem?.disciplines.find(d => d.id === discId);
  if (!disc) return navigate(`/semester/${semId}`);

  main.innerHTML = `
    <section class="discipline-view" aria-label="${disc.title}">
      <header class="view-header">
        <button class="btn btn-back" data-nav="/semester/${semId}">${t('common.back')}</button>
        <h1>${disc.title}</h1>
      </header>
      <div class="module-list">
        ${disc.modules.map((mod, idx) => {
          const status = getModuleUnlockStatus(AppState.curriculum, AppState.progress, semId, discId, mod.id);
          const progress = getModuleProgress(AppState.curriculum, AppState.progress, semId, discId, mod.id);
          return `
            <article class="module-item ${status}" data-module="${mod.id}">
              <div class="module-info">
                <span class="module-number">${idx + 1}</span>
                <h3>${mod.title}</h3>
                <div class="module-progress">
                  <div class="progress-bar-sm" role="progressbar" aria-valuenow="${progress}" aria-valuemin="0" aria-valuemax="100">
                    <div class="progress-fill" style="width: ${progress}%"></div>
                  </div>
                  <span>${progress}%</span>
                </div>
              </div>
              ${status === 'locked' ? '<span class="lock-icon" aria-label="Bloqueado">🔒</span>' : ''}
              ${status !== 'locked' ? `<button class="btn btn-primary" data-nav="/semester/${semId}/discipline/${discId}/module/${mod.id}">${t('common.enter')}</button>` : ''}
            </article>
          `;
        }).join('')}
      </div>
    </section>
  `;

  bindNavigationEvents(main);
}

/**
 * Renderiza visão do módulo
 */
async function renderModuleView(params, query, main) {
  const { semId, discId, modId } = params;
  const sem = AppState.curriculum.semesters.find(s => s.id === semId);
  const disc = sem?.disciplines.find(d => d.id === discId);
  const mod = disc?.modules.find(m => m.id === modId);
  if (!mod) return navigate(`/semester/${semId}/discipline/${discId}`);

  main.innerHTML = `
    <section class="module-view" aria-label="${mod.title}">
      <header class="view-header">
        <button class="btn btn-back" data-nav="/semester/${semId}/discipline/${discId}">${t('common.back')}</button>
        <h1>${mod.title}</h1>
      </header>
      <ul class="lesson-list">
        ${mod.lessons.map((lessonId, idx) => {
          const completed = isLessonCompleted(AppState.progress, lessonId);
          const unlocked = isModuleUnlocked(AppState.curriculum, AppState.progress, semId, discId, modId);
          return `
            <li class="lesson-item ${completed ? 'completed' : ''} ${!unlocked ? 'locked' : ''}">
              <span class="lesson-status" aria-label="${completed ? t('common.completed') : t('common.pending')}">
                ${completed ? '✅' : '○'}
              </span>
              <span class="lesson-title">${getLessonTitle(mod, lessonId, idx)}</span>
              ${unlocked && !completed ? `<button class="btn btn-primary btn-sm" data-nav="/lesson/${lessonId}">${t('common.start')}</button>` : ''}
              ${!unlocked ? `<span class="locked-label">${t('common.locked')}</span>` : ''}
            </li>
          `;
        }).join('')}
      </ul>
    </section>
  `;

  bindNavigationEvents(main);
}

/**
 * Renderiza visão da lição (#/lesson/:lessonId)
 * Resumo teórico + lista de exercícios sequencial, com XP, streak, SRS e persistência.
 */
async function renderLessonView(params, query, main) {
  const { lessonId } = params;
  const lessonCtx = findLessonContext(lessonId);
  if (!lessonCtx) return navigate('/');

  const { sem, disc, mod, index } = lessonCtx;
  const lessonTitle = getLessonTitle(mod, lessonId, index);
  const theoryUnitId = mod.theory || null;

  const [theoryUnit, rawExercises] = await Promise.all([
    theoryUnitId ? loadTheoryUnit(theoryUnitId) : Promise.resolve(null),
    loadExercisesForLesson(lessonId, disc.id, sem.number)
  ]);

  // T112 / Constitution §2: unidade `pendente`/`unverified` não entra na trilha.
  const usableTheory = theoryUnit && theoryUnit.verification_status === 'verified_with_source'
    ? theoryUnit
    : null;

  main.innerHTML = `
    <section class="lesson-view" aria-label="${lessonTitle}">
      <header class="view-header">
        <button class="btn btn-back" data-nav="/semester/${sem.id}/discipline/${disc.id}/module/${mod.id}">${t('common.back')}</button>
        <h1>${lessonTitle}</h1>
      </header>
      <div class="lesson-host"></div>
    </section>
  `;
  bindNavigationEvents(main);

  mountLesson(main.querySelector('.lesson-host'), {
    lessonId,
    lessonTitle,
    theoryUnit: usableTheory,
    exercises: Array.isArray(rawExercises) ? rawExercises : [],
    sem,
    disc,
    mod,
    isPractice: false
  });
}

/**
 * Monta (ou remonta, para "Praticar mais") a lição dentro do host.
 * @param {HTMLElement} host
 * @param {Object} ctx
 */
function mountLesson(host, ctx) {
  const { lessonId, lessonTitle, theoryUnit, exercises, sem, disc, mod, isPractice } = ctx;

  const preparedExercises = exercises.map((ex) => ({
    ...ex,
    _previouslyAnswered: Boolean(AppState.progress.exercises?.[ex.id])
  }));

  const theoryMeta = theoryUnit ? {
    title: theoryUnit.source?.title,
    authors: theoryUnit.source?.authors,
    chapter: theoryUnit.source?.chapter,
    section: theoryUnit.source?.section,
    license: theoryUnit.license,
    verification_status: theoryUnit.verification_status
  } : null;

  const lessonEl = renderLesson({
    id: lessonId,
    title: lessonTitle,
    theoryUnitId: theoryUnit?.id || null,
    summary: theoryUnit ? getTheorySummaryHTML(theoryUnit) : '',
    theoryMeta,
    exercises: preparedExercises
  }, {
    calculateXP: (exercise, isCorrect) => {
      if (!isCorrect) return 0;
      // Qualquer tentativa após a primeira recebe XP reduzido (retry penalty).
      const previous = AppState.progress.exercises?.[exercise.id];
      const isFirstAttempt = !previous;
      const isRetry = Boolean(previous);
      const streak = AppState.progress.stats?.current_streak || 0;
      return calculateXP({ isFirstAttempt, isRetry, streak, baseXp: exercise.xp_base });
    },
    getStreak: () => AppState.progress.stats?.current_streak || 0,
    onAnswer: (result) => handleExerciseAnswer(result),
    onComplete: () => handleLessonComplete(lessonId, sem, disc, mod, preparedExercises),
    onPracticeMore: () => handlePracticeMore(host, ctx),
    onReadTheory: theoryUnit ? (id) => navigate(`/theory/${id}`) : null
  });

  host.innerHTML = '';
  host.appendChild(lessonEl);

  if (isPractice) {
    const notice = document.createElement('p');
    notice.className = 'lesson-practice-notice';
    notice.textContent = t('lesson.practiceMode');
    host.prepend(notice);
  }
}

/**
 * Persiste a resposta de um exercício e atualiza gamificação.
 * @param {Object} result - Resultado vindo do renderizador do exercício
 */
function handleExerciseAnswer(result) {
  const { exercise, correct, xpEarned = 0 } = result;
  const progress = AppState.progress;

  progress.exercises = progress.exercises || {};
  const prev = progress.exercises[exercise.id] || { attempts: 0, correct: false, xp_earned: 0 };
  progress.exercises[exercise.id] = {
    attempts: (prev.attempts || 0) + 1,
    correct: Boolean(prev.correct || correct),
    xp_earned: (prev.xp_earned || 0) + xpEarned,
    last_attempt_date: new Date().toISOString()
  };

  if (xpEarned > 0) {
    const streakBefore = progress.stats.current_streak || 0;
    progress.stats.total_xp = (progress.stats.total_xp || 0) + xpEarned;
    progress.stats.level = levelFromXP(progress.stats.total_xp);
    updateStreak(progress);
    progressStore.save();
    updateHeaderXpBar();
    showToast(t('feedback.xpGain', { xp: xpEarned }), 'xp');
    announce(t('feedback.xpGain', { xp: xpEarned }));

    const streakAfter = progress.stats.current_streak || 0;
    if (streakAfter > streakBefore) {
      announce(t('feedback.streakUpdate', { days: streakAfter }), 'assertive');
    }

    checkAndAnnounceAchievements({ curriculum: AppState.curriculum, hour: new Date().getHours() });
    checkDailyGoalReached();
  } else {
    progressStore.save();
  }
}

/**
 * Conclui a lição: marca como concluída, agenda SRS e notifica.
 */
function handleLessonComplete(lessonId, sem, disc, mod, exercises) {
  const progress = AppState.progress;
  const allCorrect = exercises.length > 0 && exercises.every((ex) => progress.exercises?.[ex.id]?.correct);

  markLessonComplete(progress, lessonId);
  scheduleReview(progress, lessonId);
  progressStore.save();

  checkAndAnnounceAchievements({
    curriculum: AppState.curriculum,
    perfectLesson: allCorrect,
    hour: new Date().getHours()
  });

  showToast(t('lesson.completedTitle'), 'success');
  announce(t('lesson.completedTitle'), 'assertive');

  navigate(`/semester/${sem.id}/discipline/${disc.id}/module/${mod.id}`);
}

/**
 * "Praticar mais": carrega exercícios das outras lições do mesmo módulo
 * (mesma unidade teórica) e os renderiza como prática (sem bônus de 1ª vez).
 */
async function handlePracticeMore(host, ctx) {
  const { lessonId, sem, disc, mod } = ctx;
  const siblingIds = (mod.lessons || []).filter((id) => id !== lessonId);
  const results = await Promise.all(siblingIds.map((id) => loadExercisesForLesson(id, disc.id, sem.number)));
  const extras = results.flat().filter(Boolean);

  if (extras.length === 0) {
    showToast(t('lesson.noPractice'));
    return;
  }

  mountLesson(host, { ...ctx, exercises: extras, isPractice: true });
}

/**
 * Extrai um resumo curto (2–3 parágrafos) do conteúdo Markdown da unidade teórica.
 * @param {Object} theoryUnit
 * @returns {string} HTML simples
 */
function getTheorySummaryHTML(theoryUnit) {
  const content = theoryUnit?.content || '';
  const blocks = content
    .split(/\n{2,}/)
    .map((b) => b.trim())
    .filter((b) => b && !b.startsWith('#') && !b.startsWith('---') && !b.startsWith('|'));

  const paragraphs = blocks.slice(0, 2).map((b) => `<p>${escapeHtml(b)}</p>`);
  return paragraphs.join('');
}

/**
 * Escapa HTML de texto derivado da fonte (defesa contra injeção/atributos).
 * @param {string} value
 * @returns {string}
 */
function escapeHtml(value) {
  return String(value || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

/**
 * Renderiza visão da teoria (#/theory/:theoryUnitId)
 * Carrega a unidade, monta o índice lateral, renderiza seções com anotações,
 * "marcar como lida" e "praticar este trecho"; aplica KaTeX + highlight.js.
 */
async function renderTheoryView(params, query, main) {
  const { theoryUnitId } = params;
  const [unit, index] = await Promise.all([loadTheoryUnit(theoryUnitId), loadTheoryIndex()]);

  if (!unit) {
    main.innerHTML = `
      <section class="theory-view" aria-label="${t('theory.title')}">
        <header class="view-header">
          <button class="btn btn-back" data-nav="/library">${t('common.back')}</button>
          <h1>${t('theory.title')}</h1>
        </header>
        <p class="placeholder">${t('theory.notFound')}</p>
      </section>
    `;
    bindNavigationEvents(main);
    return;
  }

  main.innerHTML = `
    <section class="theory-view" aria-label="${escapeHtml(unit.title)}">
      <header class="view-header">
        <button class="btn btn-back" data-nav="/library">${t('common.back')}</button>
        <h1>${escapeHtml(unit.title)}</h1>
      </header>
      <div class="theory-layout">
        <div class="theory-sidebar-host"></div>
        <div class="theory-main"></div>
      </div>
    </section>
  `;

  const sidebarHost = main.querySelector('.theory-sidebar-host');
  sidebarHost.appendChild(renderTheorySidebar(index, theoryUnitId));

  const unitEl = renderTheoryUnit(unit, {
    isRead: (sectionId) => (AppState.progress.completed?.theory_sections || []).includes(sectionId),
    getAnnotation: (sectionId) => getAnnotation(AppState.progress, theoryUnitId, sectionId),
    onToggleRead: (sectionId, read) => {
      if (read) {
        markTheorySectionRead(AppState.progress, sectionId);
      } else {
        unmarkTheorySectionRead(AppState.progress, sectionId);
      }
      progressStore.save();
      checkAndAnnounceAchievements({ curriculum: AppState.curriculum });
    },
    onSaveAnnotation: (sectionId, text) => {
      saveAnnotation(AppState.progress, theoryUnitId, sectionId, text);
      progressStore.save();
      showToast(t('theory.annotationSaved'));
    },
    onPractice: (_sectionId, lessonIds) => {
      const target = Array.isArray(lessonIds) ? lessonIds[0] : lessonIds;
      if (target) navigate(`/lesson/${target}`);
    }
  });

  main.querySelector('.theory-main').appendChild(unitEl);
  bindNavigationEvents(main);

  // Libs locais (KaTeX/highlight.js) — carregadas sob demanda, nunca via CDN.
  const [katex, hljs] = await Promise.all([loadKatex(), loadHighlight()]);
  renderMathIn(unitEl, katex);
  highlightIn(unitEl, hljs);
}

/**
 * Renderiza índice da biblioteca (#/library): busca full-text + filtro por
 * disciplina + agrupamento por semestre/disciplina.
 */
async function renderLibraryView(params, query, main) {
  const index = await loadTheoryIndex();

  // Títulos de disciplina/semestre para filtro e agrupamento
  const disciplines = new Map();
  const semesterTitles = new Map();
  for (const u of index) {
    if (u.discipline && !disciplines.has(u.discipline)) {
      disciplines.set(u.discipline, u.disciplineTitle || u.discipline);
    }
    if (u.semester && !semesterTitles.has(u.semester)) {
      semesterTitles.set(u.semester, u.semesterTitle || u.semester);
    }
  }

  main.innerHTML = `
    <section class="library-view" aria-label="${t('library.title')}">
      <header class="view-header">
        <button class="btn btn-back" data-nav="/">${t('common.back')}</button>
        <h1>${t('library.title')}</h1>
      </header>
      <form class="library-search" role="search">
        <div class="library-field">
          <label for="library-search-input">${t('theory.search')}</label>
          <input id="library-search-input" class="library-search-input" type="search"
            placeholder="${escapeHtml(t('theory.searchPlaceholder'))}" aria-describedby="library-search-status" autocomplete="off">
        </div>
        <div class="library-field">
          <label for="library-discipline-filter">${t('library.filterDiscipline')}</label>
          <select id="library-discipline-filter" class="library-discipline-filter">
            <option value="">${t('library.allDisciplines')}</option>
            ${[...disciplines.entries()]
              .map(([id, title]) => `<option value="${escapeHtml(id)}">${escapeHtml(title)}</option>`)
              .join('')}
          </select>
        </div>
        <p id="library-search-status" class="library-search-status" role="status"></p>
      </form>
      <div class="library-list"></div>
    </section>
  `;
  bindNavigationEvents(main);

  const form = main.querySelector('.library-search');
  if (form) form.addEventListener('submit', (e) => e.preventDefault());

  const list = main.querySelector('.library-list');
  const status = main.querySelector('#library-search-status');
  const input = main.querySelector('#library-search-input');
  const filter = main.querySelector('#library-discipline-filter');

  const allItems = index.map((u) => ({
    id: u.id,
    title: u.title,
    discipline: u.discipline,
    disciplineTitle: u.disciplineTitle,
    semester: u.semester,
    semesterTitle: u.semesterTitle,
    moduleTitle: u.moduleTitle,
    snippet: ''
  }));

  const createItem = (item) => {
    const li = document.createElement('li');
    li.className = 'library-item';
    li.innerHTML = `
      <h4><a href="#/theory/${encodeURIComponent(item.id)}">${escapeHtml(item.title)}</a></h4>
      <p class="library-meta">${escapeHtml(item.moduleTitle || '')}</p>
      ${item.snippet ? `<p class="library-snippet">${escapeHtml(item.snippet)}</p>` : ''}
    `;
    return li;
  };

  const renderList = (items, isSearch) => {
    const selectedDiscipline = filter.value;
    const visible = selectedDiscipline
      ? items.filter((item) => item.discipline === selectedDiscipline)
      : items;

    list.innerHTML = '';

    if (visible.length === 0) {
      status.textContent = isSearch || selectedDiscipline ? t('theory.noResults') : t('library.empty');
      return;
    }
    status.textContent = t('library.resultCount', { count: visible.length });

    // Agrupa por semestre → disciplina
    const bySemester = new Map();
    for (const item of visible) {
      const semKey = item.semester || 'sem1';
      if (!bySemester.has(semKey)) bySemester.set(semKey, new Map());
      const byDiscipline = bySemester.get(semKey);
      const discKey = item.discipline || 'outros';
      if (!byDiscipline.has(discKey)) byDiscipline.set(discKey, []);
      byDiscipline.get(discKey).push(item);
    }

    for (const [semKey, byDiscipline] of bySemester) {
      const details = document.createElement('details');
      details.className = 'library-semester';
      details.open = true;

      const summary = document.createElement('summary');
      summary.textContent = semesterTitles.get(semKey) || semKey;
      details.appendChild(summary);

      for (const [discKey, discItems] of byDiscipline) {
        const group = document.createElement('section');
        group.className = 'library-discipline';

        const title = document.createElement('h3');
        title.textContent = discItems[0]?.disciplineTitle || disciplines.get(discKey) || discKey;
        group.appendChild(title);

        const ul = document.createElement('ul');
        for (const item of discItems) ul.appendChild(createItem(item));
        group.appendChild(ul);

        details.appendChild(group);
      }

      list.appendChild(details);
    }
  };

  const refresh = () => {
    const q = input.value.trim();
    renderList(q ? searchTheory(index, q) : allItems, Boolean(q));
  };

  let debounceId = null;
  input.addEventListener('input', () => {
    clearTimeout(debounceId);
    debounceId = setTimeout(refresh, 150);
  });
  filter.addEventListener('change', refresh);

  refresh();
}

/**
 * Renderiza configurações
 */
async function renderSettingsView(params, query, main) {
  const prefs = AppState.progress.preferences || {};
  main.innerHTML = `
    <section class="settings-view" aria-label="${t('settings.title')}">
      <header class="view-header">
        <button class="btn btn-back" data-nav="/">${t('common.back')}</button>
        <h1>${t('settings.title')}</h1>
      </header>
      <div class="settings-content">
        <section class="setting-group">
          <h2>${t('settings.daily_goal')}</h2>
          <div class="goal-options">
            ${[10, 20, 30, 50].map(goal => `
              <button class="goal-btn ${prefs.daily_xp_goal === goal ? 'active' : ''}" data-goal="${goal}">
                ${goal} XP
              </button>
            `).join('')}
          </div>
        </section>
        <section class="setting-group">
          <h2>${t('settings.theme')}</h2>
          <div class="theme-options">
            <button class="theme-btn ${getTheme() === 'light' ? 'active' : ''}" data-theme="light">${t('settings.light')}</button>
            <button class="theme-btn ${getTheme() === 'dark' ? 'active' : ''}" data-theme="dark">${t('settings.dark')}</button>
            <button class="theme-btn ${getTheme() === 'auto' ? 'active' : ''}" data-theme="auto">${t('settings.auto')}</button>
          </div>
        </section>
        <section class="setting-group">
          <h2>${t('settings.data')}</h2>
          <div class="data-actions">
            <button class="btn btn-secondary" id="export-progress">${t('settings.export')}</button>
            <button class="btn btn-secondary" id="import-progress">${t('settings.import')}</button>
            <button class="btn btn-danger" id="reset-progress">${t('settings.reset')}</button>
          </div>
          <input type="file" id="import-file" accept=".json" style="display: none;">
        </section>
      </div>
    </section>
  `;

  bindSettingsEvents(main);
}

/**
 * Bind eventos de configurações
 */
function bindSettingsEvents(main) {
  // Meta diária
  main.querySelectorAll('.goal-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const goal = parseInt(e.currentTarget.dataset.goal, 10);
      setDailyGoal(goal);
      main.querySelectorAll('.goal-btn').forEach(b => b.classList.remove('active'));
      e.currentTarget.classList.add('active');
    });
  });

  // Tema — aplica e persiste a preferência (sobrevive ao reload)
  main.querySelectorAll('.theme-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      applyThemePreference(e.currentTarget.dataset.theme);
    });
  });

  // Export
  main.querySelector('#export-progress')?.addEventListener('click', exportProgress);

  // Import
  main.querySelector('#import-progress')?.addEventListener('click', () => {
    main.querySelector('#import-file')?.click();
  });
  main.querySelector('#import-file')?.addEventListener('change', importProgress);

  // Reset
  main.querySelector('#reset-progress')?.addEventListener('click', resetProgress);

  bindNavigationEvents(main);
}

/**
 * Define meta diária
 */
function setDailyGoal(goal) {
  AppState.progress.preferences = AppState.progress.preferences || {};
  AppState.progress.preferences.daily_xp_goal = goal;
  progressStore.update({ preferences: { daily_xp_goal: goal } });
  AppState.dailyGoal = goal;
  updateDailyGoalUI();
  showToast(t('settings.goal_updated', { goal }));
}

/**
 * Atualiza UI da meta diária
 */
function updateDailyGoalUI() {
  const goalText = document.querySelector('.daily-goal-text');
  const goalBar = document.querySelector('.daily-goal-fill');
  const todayXP = getTodayXP(AppState.progress);

  if (goalText) goalText.textContent = `${todayXP}/${AppState.dailyGoal} XP`;
  if (goalBar) goalBar.style.width = `${Math.min(100, (todayXP / AppState.dailyGoal) * 100)}%`;
}

/**
 * Exporta progresso
 */
function exportProgress() {
  const json = progressStore.export();
  const blob = new Blob([json], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `progresso-ensina-logica-${new Date().toISOString().split('T')[0]}.json`;
  a.click();
  URL.revokeObjectURL(url);
  showToast(t('settings.exported'));
  checkAndAnnounceAchievements({ curriculum: AppState.curriculum, exported: true });
}

/**
 * Importa progresso
 */
async function importProgress(e) {
  const file = e.target.files[0];
  if (!file) return;

  try {
    const text = await file.text();
    const success = progressStore.import(text);
    if (success) {
      AppState.progress = progressStore.get();
      showToast(t('settings.imported'));
      navigate('/');
    } else {
      showToast(t('settings.import_failed'), 'error');
    }
  } catch (error) {
    console.error('[App] Erro ao importar:', error);
    showToast(t('settings.import_failed'), 'error');
  }
  e.target.value = '';
}

/**
 * Reseta progresso
 */
function resetProgress() {
  if (!confirm(t('settings.reset_confirm'))) return;

  progressStore.reset();
  AppState.progress = progressStore.get();
  showToast(t('settings.reset_done'));
  navigate('/');
}

/**
 * Renderiza conquistas
 */
async function renderAchievementsView(params, query, main) {
  main.innerHTML = `
    <section class="achievements-view" aria-label="${t('achievements.title')}">
      <header class="view-header">
        <button class="btn btn-back" data-nav="/">${t('common.back')}</button>
        <h1>${t('achievements.title')}</h1>
      </header>
      <div class="achievements-grid">
        ${Object.entries(ACHIEVEMENTS).map(([id, ach]) => {
          const unlocked = AppState.progress.achievements?.includes(id);
          return `
            <article class="achievement-card ${unlocked ? 'unlocked' : 'locked'}" aria-label="${ach.name}: ${unlocked ? t('achievements.unlocked') : t('achievements.locked')}">
              <span class="achievement-icon" aria-hidden="true">${ach.icon}</span>
              <h3>${ach.name}</h3>
              <p>${ach.description}</p>
              ${unlocked ? `<span class="unlocked-badge">${t('achievements.unlocked')}</span>` : ''}
            </article>
          `;
        }).join('')}
      </div>
    </section>
  `;
  bindNavigationEvents(main);
}

/**
 * Mostra modal de boas-vindas
 */
function showWelcomeModal() {
  // Evita abrir o modal duas vezes (boot + render da rota inicial)
  if (document.getElementById('welcome-modal')) return;

  const modalHTML = `
    <div class="modal-overlay" id="welcome-modal" role="dialog" aria-modal="true" aria-labelledby="welcome-title">
      <div class="modal-content">
        <h2 id="welcome-title">${t('welcome.title')}</h2>
        <p class="scope-notice">${t('welcome.scope_notice')}</p>
        <p>${t('welcome.description')}</p>
        <fieldset>
          <legend>${t('welcome.choose_goal')}</legend>
          <div class="goal-options">
            ${[10, 20, 30, 50].map(goal => `
              <button class="goal-btn" data-goal="${goal}">${goal} XP</button>
            `).join('')}
          </div>
        </fieldset>
        <button class="btn btn-primary btn-lg" id="welcome-start">${t('welcome.start')}</button>
      </div>
    </div>
  `;

  document.body.insertAdjacentHTML('beforeend', modalHTML);

  const modal = document.getElementById('welcome-modal');
  let selectedGoal = 20;

  // A classe `visible` aciona a transição de opacidade e habilita pointer-events.
  // Sem ela o overlay ficava invisível (opacity 0) e, ainda assim, capturava
  // todos os cliques da página.
  modal.classList.add('visible');

  // Meta padrão pré-selecionada (20 XP)
  modal.querySelector('.goal-btn[data-goal="20"]')?.classList.add('active');

  modal.querySelectorAll('.goal-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      selectedGoal = parseInt(e.currentTarget.dataset.goal, 10);
      modal.querySelectorAll('.goal-btn').forEach(b => b.classList.remove('active'));
      e.currentTarget.classList.add('active');
    });
  });

  modal.querySelector('#welcome-start').addEventListener('click', () => {
    // Marca o onboarding como concluído e persiste a meta escolhida
    progressStore.update({
      preferences: { daily_xp_goal: selectedGoal, onboarding_completed: true }
    });
    AppState.progress = progressStore.get();
    AppState.dailyGoal = selectedGoal;
    modal.remove();
    updateDailyGoalUI();
    navigate('/semester/sem1');
  });
}

/**
 * Mostra toast de conquista
 */
function showAchievementToast(achievementId) {
  const ach = ACHIEVEMENTS[achievementId];
  if (!ach) return;

  showToast(`${t('achievements.unlocked_toast')}: ${ach.name}`, 'achievement');
}

/**
 * Bind eventos de navegação genéricos
 */
function bindNavigationEvents(container) {
  container.querySelectorAll('[data-nav]').forEach(el => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      navigate(e.currentTarget.dataset.nav);
    });
  });
}

// Inicializa automaticamente quando DOM pronto
if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
  } else {
    initApp();
  }
}

// Exporta para uso em console/debug
if (typeof window !== 'undefined') {
  window.EnsinaLogica = {
    navigate,
    getProgress: () => AppState.progress,
    getCurriculum: () => AppState.curriculum
  };
}