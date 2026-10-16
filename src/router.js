/**
 * Hash-based router for GitHub Pages SPA
 * Supports route parameters and optional query strings
 */

class Router {
  constructor() {
    this.routes = new Map();
    this.currentRoute = null;
    this.currentParams = {};
    this.beforeHooks = [];
    this.afterHooks = [];

    // Handle hash changes
    if (typeof window !== 'undefined') {
      window.addEventListener('hashchange', () => this.handleHashChange());
      // Handle initial load
      window.addEventListener('load', () => this.handleHashChange());
    }
  }

  /**
   * Add a route
   * @param {string} pattern - Route pattern (e.g., '#/lesson/:lessonId')
   * @param {Function} handler - Handler function (params) => void
   */
  add(pattern, handler) {
    // Convert pattern to regex
    const regexPattern = pattern
      .replace(/\//g, '\\/')
      .replace(/:(\w+)/g, '(?<$1>[^\\/]+)')
      .replace(/\*/g, '.*');

    const regex = new RegExp(`^${regexPattern}$`);
    this.routes.set(pattern, { pattern, regex, handler });
  }

  /**
   * Add before navigation hook
   * @param {Function} hook - (to, from) => boolean|Promise<boolean>
   */
  beforeEach(hook) {
    this.beforeHooks.push(hook);
  }

  /**
   * Add after navigation hook
   * @param {Function} hook - (to, from) => void
   */
  afterEach(hook) {
    this.afterHooks.push(hook);
  }

  /**
   * Navigate to a route
   * @param {string} path - Path to navigate to (e.g., '#/lesson/l01')
   * @param {boolean} replace - Replace history entry instead of push
   */
  navigate(path, replace = false) {
    const hash = path.startsWith('#') ? path : `#${path}`;
    if (replace) {
      history.replaceState(null, '', hash);
    } else {
      history.pushState(null, '', hash);
    }
    this.handleHashChange();
  }

  /**
   * Get current route info
   * @returns {Object|null}
   */
  getCurrentRoute() {
    return this.currentRoute;
  }

  /**
   * Get current route params
   * @returns {Object}
   */
  getParams() {
    return { ...this.currentParams };
  }

  /**
   * Handle hash change event
   */
  async handleHashChange() {
    if (typeof window === 'undefined') return;
    const hash = window.location.hash || '#/';
    const [path, queryString] = hash.split('?');

    // Parse query string
    const query = new URLSearchParams(queryString || '');

    // Find matching route
    let matchedRoute = null;
    let params = {};

    for (const [pattern, route] of this.routes) {
      const match = path.match(route.regex);
      if (match) {
        matchedRoute = route;
        params = match.groups || {};
        break;
      }
    }

    // Run before hooks
    const to = { path, query, params, hash };
    const from = this.currentRoute ? { ...this.currentRoute } : null;

    for (const hook of this.beforeHooks) {
      const result = await hook(to, from);
      if (result === false) {
        // Navigation cancelled
        if (from) {
          // Restore previous hash
          history.replaceState(null, '', from.hash);
        }
        return;
      }
    }

    // Update current route
    this.currentRoute = to;
    this.currentParams = params;

    // Call handler
    if (matchedRoute) {
      try {
        await matchedRoute.handler(params, query);
      } catch (error) {
        console.error('[Router] Handler error:', error);
        this.navigate('#/');
        return;
      }
    } else {
      // 404 - redirect to home
      this.navigate('#/');
      return;
    }

    // Run after hooks
    for (const hook of this.afterHooks) {
      try {
        await hook(to, from);
      } catch (error) {
        console.error('[Router] After hook error:', error);
      }
    }
  }
}

// Singleton instance
export const router = new Router();

/**
 * Navigate to a path
 * @param {string} path 
 * @param {boolean} replace 
 */
export function navigate(path, replace = false) {
  router.navigate(path, replace);
}

/**
 * Start router listener
 */
export function startRouter() {
  router.handleHashChange();
}

/**
 * Helper to create route handlers that render views
 * @param {Function} renderFn - Function that renders the view
 * @returns {Function} Route handler
 */
export function createViewHandler(renderFn) {
  return async (params, query) => {
    const main = document.getElementById('main');
    if (!main) return;

    // Show loading state
    main.innerHTML = '<div class="loading" aria-live="polite"><span class="sr-only">Carregando...</span></div>';

    try {
      await renderFn(params, query, main);
    } catch (error) {
      console.error('[Router] Render error:', error);
      main.innerHTML = `
        <div class="card" style="text-align: center;">
          <h2>Erro ao carregar</h2>
          <p>${error.message}</p>
          <button class="btn btn-primary" onclick="window.location.hash='#/'">Voltar ao início</button>
        </div>
      `;
    }
  };
}

/**
 * Generate URL for a route with params
 * @param {string} pattern - Route pattern
 * @param {Object} params - Route parameters
 * @param {Object} query - Query parameters
 * @returns {string}
 */
export function routeUrl(pattern, params = {}, query = {}) {
  let url = pattern;
  for (const [key, value] of Object.entries(params)) {
    url = url.replace(`:${key}`, encodeURIComponent(value));
  }
  const queryString = new URLSearchParams(query).toString();
  if (queryString) {
    url += `?${queryString}`;
  }
  return `#${url}`;
}