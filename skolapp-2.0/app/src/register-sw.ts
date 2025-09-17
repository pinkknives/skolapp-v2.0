// Service Worker handling
// - In production: register SW unless explicitly disabled
// - In development (or VS Code Simple Browser/localhost preview): proactively unregister SW and clear app caches to avoid stale shell issues

// Dev cleanup: unregister any existing SWs and clear skolapp caches, then reload once
function shouldDisableSW(): boolean {
  try {
    // Allow manual override via localStorage
    if (localStorage.getItem('disable-sw') === '1') return true;
  } catch {}
  // Avoid SW in VS Code Simple Browser (userAgent typically contains 'Code')
  const ua = navigator.userAgent || '';
  const isVSCodeWebview = ua.includes('Code');
  // Treat localhost & Codespaces forwarded domains as non-prod for safety
  const host = location.hostname;
  const isLocalhost = host === 'localhost' || host === '127.0.0.1';
  const isCodespacesDomain = /\.app\.github\.dev$/.test(host) || /\.githubpreview\.dev$/.test(host);
  return import.meta.env.DEV || isVSCodeWebview || isLocalhost || isCodespacesDomain;
}

if (shouldDisableSW() && 'serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.getRegistrations().then(async regs => {
      if (regs.length > 0) {
        try {
          await Promise.all(regs.map(r => r.unregister()));
          if ('caches' in window) {
            const names = await caches.keys();
            await Promise.all(names.filter(n => n.startsWith('skolapp-')).map(n => caches.delete(n)));
          }
          // Note: We avoid deleting IndexedDB databases programmatically in dev to prevent
          // transient 'IDBDatabase: connection is closing' errors from other libraries.
          // Avoid forced reloads that can race with IDB/Cache shutdown in dev; rely on manual refresh
        } catch (err) {
          console.warn('SW dev cleanup failed', err);
        }
      }
    });
  });
}

// Production registration (if not disabled)
if (import.meta.env.PROD && !shouldDisableSW() && 'serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch(err => {
      console.warn('SW registration failed', err);
    });
  });
}
