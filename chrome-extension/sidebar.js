// Helper: get current page key
function getPageKey() {
  return 'docs_overlay_' + location.hostname + location.pathname;
}

// Highlight selected text on the main page
function highlightSelection() {
  window.parent.postMessage({ type: 'DO_HIGHLIGHT' }, '*');
}

document.getElementById('highlight-btn').onclick = highlightSelection;

// Notes logic
const noteInput = document.getElementById('note-input');
const saveNoteBtn = document.getElementById('save-note-btn');
const notesList = document.getElementById('notes-list');

function loadNotes() {
  const key = getPageKey() + '_notes';
  const notes = JSON.parse(localStorage.getItem(key) || '[]');
  notesList.innerHTML = '';
  notes.forEach((note, idx) => {
    const li = document.createElement('li');
    li.textContent = note;
    const del = document.createElement('button');
    del.textContent = '🗑';
    del.style.marginLeft = '8px';
    del.onclick = () => {
      notes.splice(idx, 1);
      localStorage.setItem(key, JSON.stringify(notes));
      loadNotes();
    };
    li.appendChild(del);
    notesList.appendChild(li);
  });
}

saveNoteBtn.onclick = () => {
  const val = noteInput.value.trim();
  if (!val) return;
  const key = getPageKey() + '_notes';
  const notes = JSON.parse(localStorage.getItem(key) || '[]');
  notes.push(val);
  localStorage.setItem(key, JSON.stringify(notes));
  noteInput.value = '';
  loadNotes();
};

loadNotes();

// Progress logic
const pageRead = document.getElementById('page-read');
const progressKey = getPageKey() + '_read';
pageRead.checked = localStorage.getItem(progressKey) === 'true';
pageRead.onchange = () => {
  localStorage.setItem(progressKey, pageRead.checked ? 'true' : 'false');
};

// Listen for highlight requests from sidebar
window.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'DO_HIGHLIGHT') {
    // This runs in the sidebar, so do nothing here
  }
});

// Listen for highlight command from sidebar (injected into main page)
if (window.top === window) {
  window.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'DO_HIGHLIGHT') {
      const sel = window.getSelection();
      if (!sel || sel.isCollapsed) return;
      const range = sel.getRangeAt(0);
      const span = document.createElement('span');
      span.style.background = 'yellow';
      span.style.borderRadius = '2px';
      span.style.padding = '0 2px';
      span.className = 'docs-overlay-highlight';
      range.surroundContents(span);
      sel.removeAllRanges();
    }
  });
} 