// Novel-It Docs search — Fuse.js client-side search against Hugo JSON index
(function () {
  const input   = document.getElementById('search-input');
  const results = document.getElementById('search-results');

  if (!input || !results) return;

  let fuse = null;

  // Load the search index once
  const baseURL = document.querySelector('meta[name="base-url"]')?.content || '/';
  fetch(baseURL + 'index.json')
    .then(r => r.json())
    .then(data => {
      fuse = new Fuse(data, {
        keys: [
          { name: 'title',   weight: 0.7 },
          { name: 'content', weight: 0.3 },
        ],
        threshold:     0.4,
        ignoreLocation: true,
        minMatchCharLength: 2,
      });
    })
    .catch(() => {
      // Search index not available — fail silently
    });

  input.addEventListener('input', function () {
    const query = this.value.trim();

    if (!fuse || query.length < 2) {
      results.classList.add('hidden');
      results.innerHTML = '';
      return;
    }

    const hits = fuse.search(query, { limit: 8 });

    if (hits.length === 0) {
      results.innerHTML = '<p class="p-4 text-sm text-slate-500">No results found.</p>';
      results.classList.remove('hidden');
      return;
    }

    results.innerHTML = hits.map(({ item }) => `
      <a href="${item.url}"
         class="block px-4 py-3 border-b border-slate-100 last:border-0 hover:bg-slate-50 transition-colors">
        <p class="text-sm font-bold text-slate-800">${item.title}</p>
        <p class="text-xs text-blue-600 mt-0.5 capitalize">${item.section}</p>
        <p class="text-xs text-slate-500 mt-1 leading-relaxed line-clamp-2">${item.content}</p>
      </a>
    `).join('');

    results.classList.remove('hidden');
  });

  // Close results when clicking outside
  document.addEventListener('click', function (e) {
    if (!input.contains(e.target) && !results.contains(e.target)) {
      results.classList.add('hidden');
    }
  });

  // Close on Escape
  input.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      results.classList.add('hidden');
      this.blur();
    }
  });
})();
