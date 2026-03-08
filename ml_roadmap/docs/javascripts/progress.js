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

// Wire into MkDocs Material instant-loading
document$.subscribe(function() {
  initCheckboxes();
});
