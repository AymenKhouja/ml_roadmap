/**
 * ML Mastery Roadmap - Progress Tracking
 * Persists checkbox state in localStorage and renders progress bars.
 * Compatible with MkDocs Material instant-loading via document$.subscribe.
 * Uses ES5 syntax for broad browser support.
 */

/**
 * Test if localStorage is available (fails in private browsing on some browsers).
 * @returns {boolean}
 */
function isStorageAvailable() {
  try {
    var testKey = '__progress_test__';
    localStorage.setItem(testKey, '1');
    var val = localStorage.getItem(testKey);
    localStorage.removeItem(testKey);
    return val === '1';
  } catch (e) {
    return false;
  }
}

/**
 * Read progress data from localStorage.
 * @returns {Object} Map of pageKey -> { total: number, checked: number[] }
 */
function getProgress() {
  try {
    var raw = localStorage.getItem('progress');
    if (!raw) return {};
    return JSON.parse(raw);
  } catch (e) {
    return {};
  }
}

/**
 * Save progress data to localStorage.
 * @param {Object} progress
 */
function saveProgress(progress) {
  try {
    localStorage.setItem('progress', JSON.stringify(progress));
  } catch (e) {
    // Silently fail -- storage full or unavailable
  }
}

/**
 * Derive a consistent page key from the current URL path.
 * Strips trailing slash and /index.html, extracts last two meaningful segments.
 * Works for both local mkdocs serve and GitHub Pages deployment.
 * @returns {string} e.g. "core-ml/supervised-learning"
 */
function getPageKey() {
  var path = window.location.pathname;
  // Remove trailing slash
  if (path.charAt(path.length - 1) === '/') {
    path = path.substring(0, path.length - 1);
  }
  // Remove /index.html suffix
  path = path.replace(/\/index\.html$/, '');
  // Remove .html suffix
  path = path.replace(/\.html$/, '');
  // Split into segments and filter empty
  var segments = path.split('/');
  var meaningful = [];
  for (var i = 0; i < segments.length; i++) {
    if (segments[i] !== '') {
      meaningful.push(segments[i]);
    }
  }
  // Take last two segments (section/page)
  if (meaningful.length >= 2) {
    return meaningful[meaningful.length - 2] + '/' + meaningful[meaningful.length - 1];
  }
  if (meaningful.length === 1) {
    return meaningful[0];
  }
  return '';
}

/**
 * Initialize checkbox persistence on the current page.
 * Restores state from localStorage and attaches change listeners.
 */
function initCheckboxes() {
  if (!isStorageAvailable()) return;

  var checkboxes = document.querySelectorAll('.task-list-item input[type="checkbox"]');
  if (checkboxes.length === 0) return;

  var pageKey = getPageKey();
  if (!pageKey) return;

  var progress = getProgress();
  var pageData = progress[pageKey] || { total: 0, checked: [] };

  // Prune checked indices that exceed the current total
  var validChecked = [];
  for (var i = 0; i < pageData.checked.length; i++) {
    if (pageData.checked[i] < checkboxes.length) {
      validChecked.push(pageData.checked[i]);
    }
  }
  pageData.checked = validChecked;
  pageData.total = checkboxes.length;

  // Restore checkbox states
  for (var j = 0; j < checkboxes.length; j++) {
    var isChecked = validChecked.indexOf(j) !== -1;
    checkboxes[j].checked = isChecked;
    var listItem = checkboxes[j].closest('.task-list-item');
    if (listItem) {
      if (isChecked) {
        listItem.classList.add('task-checked');
      } else {
        listItem.classList.remove('task-checked');
      }
    }
  }

  // Save cleaned-up state
  progress[pageKey] = pageData;
  saveProgress(progress);

  // Attach change listeners
  for (var k = 0; k < checkboxes.length; k++) {
    (function(index) {
      checkboxes[index].addEventListener('change', function() {
        var prog = getProgress();
        var pd = prog[pageKey] || { total: checkboxes.length, checked: [] };

        if (this.checked) {
          if (pd.checked.indexOf(index) === -1) {
            pd.checked.push(index);
          }
        } else {
          var pos = pd.checked.indexOf(index);
          if (pos !== -1) {
            pd.checked.splice(pos, 1);
          }
        }

        pd.total = checkboxes.length;
        prog[pageKey] = pd;
        saveProgress(prog);

        var li = this.closest('.task-list-item');
        if (li) {
          if (this.checked) {
            li.classList.add('task-checked');
          } else {
            li.classList.remove('task-checked');
          }
        }
      });
    })(k);
  }
}

/**
 * Resolve a relative href from an index page link to a page key.
 * Combines with the current page's section to form "section/page".
 * @param {string} href - The href from an anchor tag
 * @returns {string|null} Page key or null if unresolvable
 */
function resolvePageKey(href) {
  if (!href) return null;
  // Skip external links, anchors, and non-page links
  if (href.indexOf('://') !== -1 || href.charAt(0) === '#' || href.charAt(0) === 'mailto:') return null;

  // Get current section from page key
  var currentKey = getPageKey();
  var currentSegments = currentKey.split('/');
  var section = currentSegments[0];

  // Clean the href
  var clean = href;
  // Handle relative parent paths (../section/page/)
  if (clean.indexOf('../') === 0) {
    clean = clean.replace(/^\.\.\//g, '');
  }
  // Remove trailing slash
  if (clean.charAt(clean.length - 1) === '/') {
    clean = clean.substring(0, clean.length - 1);
  }
  // Remove .md extension
  clean = clean.replace(/\.md$/, '');
  // Remove .html extension
  clean = clean.replace(/\.html$/, '');
  // Remove index suffix
  clean = clean.replace(/\/index$/, '');

  // If the cleaned href has a slash, it already has section/page format
  if (clean.indexOf('/') !== -1) {
    return clean;
  }

  // Otherwise, prepend the current section
  if (section && clean) {
    return section + '/' + clean;
  }
  return null;
}

/**
 * Create a progress bar DOM element.
 * @param {number} percent - Completion percentage (0-100)
 * @param {number} checked - Number of checked items
 * @param {number} total - Total number of items
 * @returns {HTMLElement}
 */
function createProgressBar(percent, checked, total) {
  var container = document.createElement('span');
  container.className = 'progress-bar-container';

  var track = document.createElement('span');
  track.className = 'progress-bar-track';

  var fill = document.createElement('span');
  fill.className = 'progress-bar-fill';
  fill.style.width = percent + '%';

  var label = document.createElement('span');
  label.className = 'progress-bar-label';
  label.textContent = percent + '% (' + checked + '/' + total + ')';

  track.appendChild(fill);
  container.appendChild(track);
  container.appendChild(label);

  return container;
}

/**
 * Inject a section-level total progress element at the top of the content area.
 * @param {HTMLElement} contentArea - The .md-content element
 * @param {number} totalChecked - Total checked items across all topics
 * @param {number} totalItems - Total items across all topics
 */
function injectSectionTotal(contentArea, totalChecked, totalItems) {
  // Remove existing section progress to prevent duplication
  var existing = contentArea.querySelectorAll('.section-progress');
  for (var i = 0; i < existing.length; i++) {
    existing[i].parentNode.removeChild(existing[i]);
  }

  if (totalItems === 0) return;

  var percent = Math.round((totalChecked / totalItems) * 100);

  var wrapper = document.createElement('div');
  wrapper.className = 'section-progress';

  var textSpan = document.createElement('span');
  textSpan.textContent = 'Section progress:';
  wrapper.appendChild(textSpan);

  var track = document.createElement('span');
  track.className = 'progress-bar-track';
  track.style.width = '300px';

  var fill = document.createElement('span');
  fill.className = 'progress-bar-fill';
  fill.style.width = percent + '%';

  track.appendChild(fill);
  wrapper.appendChild(track);

  var label = document.createElement('span');
  label.className = 'progress-bar-label';
  label.textContent = percent + '% (' + totalChecked + '/' + totalItems + ' items)';
  wrapper.appendChild(label);

  // Insert after the info admonition or before the first heading
  var article = contentArea.querySelector('article') || contentArea;
  var infoAdmonition = article.querySelector('.admonition.info');
  if (infoAdmonition) {
    infoAdmonition.parentNode.insertBefore(wrapper, infoAdmonition.nextSibling);
  } else {
    var firstH2 = article.querySelector('h2');
    if (firstH2) {
      firstH2.parentNode.insertBefore(wrapper, firstH2);
    } else {
      article.appendChild(wrapper);
    }
  }
}

/**
 * Render progress bars on section index pages.
 * Reads progress data and injects bars next to topic links.
 */
function renderProgressBars() {
  if (!isStorageAvailable()) return;

  var contentArea = document.querySelector('.md-content');
  if (!contentArea) return;

  // Remove any previously injected progress bars to prevent duplication
  var existingBars = contentArea.querySelectorAll('.progress-bar-container');
  for (var i = 0; i < existingBars.length; i++) {
    existingBars[i].parentNode.removeChild(existingBars[i]);
  }
  var existingSections = contentArea.querySelectorAll('.section-progress');
  for (var j = 0; j < existingSections.length; j++) {
    existingSections[j].parentNode.removeChild(existingSections[j]);
  }

  var progress = getProgress();
  var links = contentArea.querySelectorAll('a[href]');
  var totalChecked = 0;
  var totalItems = 0;
  var foundAny = false;

  for (var k = 0; k < links.length; k++) {
    var href = links[k].getAttribute('href');
    var pageKey = resolvePageKey(href);
    if (!pageKey) continue;

    var pageData = progress[pageKey];
    if (!pageData || !pageData.total || pageData.total === 0) continue;

    var checked = pageData.checked ? pageData.checked.length : 0;
    var total = pageData.total;
    var percent = Math.round((checked / total) * 100);

    totalChecked += checked;
    totalItems += total;
    foundAny = true;

    var bar = createProgressBar(percent, checked, total);

    // Append to the link's parent element (typically an li or p)
    var parent = links[k].parentNode;
    if (parent) {
      parent.appendChild(bar);
    }
  }

  if (foundAny) {
    injectSectionTotal(contentArea, totalChecked, totalItems);
  }
}

// Wire into MkDocs Material instant-loading
document$.subscribe(function() {
  initCheckboxes();
  renderProgressBars();
});
