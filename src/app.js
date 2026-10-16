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
import { initA11y } from './ui/a11y.js';
import { loadCurriculum } from './curriculum/loader.js';
import { calculateXP, levelFromXP, xpForLevel } from './gamification/xp.js';
import { updateStreak, getStreakInfo } from './gamification/streak.js';
import { checkAchievements, ACHIEVEMENTS } from './gamification/achievements.js';
import { scheduleReview, getDueReviews } from './gamification/srs.js';

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

    // 6. Carrega currículo
    AppState.curriculum = await loadCurriculum();

    // 7. Atualiza streak na inicialização
    updateStreakOnBoot(AppState.progress);

    // 8. Verifica conquistas pendentes
    checkPendingAchievements();

    // 9. Configura rotas
    setupRoutes();

    // 10. Inicia router (hash-based)
    startRouter();

    // 11. Mostra boas-vindas se primeira visita
    if (!AppState.progress.stats?.last_activity_date) {
      showWelcomeModal();
    } else {
      // Atualiza meta diária na UI
      AppState.dailyGoal = AppState.progress.preferences?.daily_xp_goal || 20;
      updateDailyGoalUI();
    }

    console.log('[App] Inicializado com sucesso');
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
  const newAchievements = checkAchievements(AppState.progress, AppState.curriculum);
  for (const achievement of newAchievements) {
    showAchievementToast(achievement);
  }
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
  const isFirstVisit = !AppState.progress.stats?.last_activity_date;

  if (isFirstVisit) {
    showWelcomeModal();
    main.innerHTML = getDashboardHTML();
    return;
  }

  main.innerHTML = getDashboardHTML();
  bindDashboardEvents();
  updateDashboardStats();
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
        ${mod.lessons.map(lessonId => {
          const completed = isLessonCompleted(AppState.progress, lessonId);
          const unlocked = isModuleUnlocked(AppState.curriculum, AppState.progress, semId, discId, modId);
          return `
            <li class="lesson-item ${completed ? 'completed' : ''} ${!unlocked ? 'locked' : ''}">
              <span class="lesson-status" aria-label="${completed ? t('common.completed') : t('common.pending')}">
                ${completed ? '✅' : '○'}
              </span>
              <span class="lesson-title">${t(`lesson.${lessonId}.title`, { defaultValue: `Lição ${lessonId}` })}</span>
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
 * Renderiza visão da lição (placeholder - implementação completa em US3)
 */
async function renderLessonView(params, query, main) {
  const { lessonId } = params;
  main.innerHTML = `
    <section class="lesson-view" aria-label="${t('lesson.title')}">
      <header class="view-header">
        <button class="btn btn-back" data-nav="/">${t('common.back')}</button>
        <h1>${t(`lesson.${lessonId}.title`, { defaultValue: `Lição ${lessonId}` })}</h1>
      </header>
      <div class="lesson-content">
        <p class="placeholder">${t('lesson.coming_soon')}</p>
        <p class="placeholder">${t('lesson.implemented_in_us3')}</p>
      </div>
    </section>
  `;
  bindNavigationEvents(main);
}

/**
 * Renderiza visão da teoria (placeholder - implementação completa em US4)
 */
async function renderTheoryView(params, query, main) {
  const { theoryUnitId } = params;
  main.innerHTML = `
    <section class="theory-view" aria-label="${t('theory.title')}">
      <header class="view-header">
        <button class="btn btn-back" data-nav="/library">${t('common.back')}</button>
        <h1>${t('theory.title')}</h1>
      </header>
      <div class="theory-content">
        <p class="placeholder">${t('theory.coming_soon')}</p>
        <p class="placeholder">${t('theory.implemented_in_us4')}</p>
      </div>
    </section>
  `;
  bindNavigationEvents(main);
}

/**
 * Renderiza índice da biblioteca (placeholder)
 */
async function renderLibraryView(params, query, main) {
  main.innerHTML = `
    <section class="library-view" aria-label="${t('library.title')}">
      <header class="view-header">
        <h1>${t('library.title')}</h1>
      </header>
      <div class="library-content">
        <p class="placeholder">${t('library.coming_soon')}</p>
        <p class="placeholder">${t('library.implemented_in_us4')}</p>
      </div>
    </section>
  `;
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

  // Tema
  main.querySelectorAll('.theme-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const theme = e.currentTarget.dataset.theme;
      toggleTheme(theme);
      main.querySelectorAll('.theme-btn').forEach(b => b.classList.remove('active'));
      e.currentTarget.classList.add('active');
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

  modal.querySelectorAll('.goal-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      selectedGoal = parseInt(e.currentTarget.dataset.goal, 10);
      modal.querySelectorAll('.goal-btn').forEach(b => b.classList.remove('active'));
      e.currentTarget.classList.add('active');
    });
  });

  modal.querySelector('#welcome-start').addEventListener('click', () => {
    AppState.progress.preferences = AppState.progress.preferences || {};
    AppState.progress.preferences.daily_xp_goal = selectedGoal;
    progressStore.update({ preferences: { daily_xp_goal: selectedGoal } });
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