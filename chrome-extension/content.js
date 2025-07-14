// Inject floating button
const button = document.createElement('button');
button.id = 'docs-overlay-toggle';
button.innerText = '📚';
button.style.position = 'fixed';
button.style.top = '80px';
button.style.right = '20px';
button.style.zIndex = '999999';
button.style.width = '48px';
button.style.height = '48px';
button.style.borderRadius = '24px';
button.style.background = '#222';
button.style.color = '#fff';
button.style.fontSize = '2em';
button.style.border = 'none';
button.style.boxShadow = '0 2px 8px rgba(0,0,0,0.2)';
button.style.cursor = 'pointer';
button.style.transition = 'opacity 0.2s';
document.body.appendChild(button);

// Inject sidebar iframe (hidden by default)
const sidebar = document.createElement('iframe');
sidebar.id = 'docs-overlay-sidebar';
sidebar.src = chrome.runtime.getURL('sidebar.html');
sidebar.style.position = 'fixed';
sidebar.style.top = '0';
sidebar.style.right = '0';
sidebar.style.width = '350px';
sidebar.style.height = '100%';
sidebar.style.zIndex = '999998';
sidebar.style.border = 'none';
sidebar.style.display = 'none';
sidebar.style.background = '#fff';
sidebar.style.boxShadow = '-2px 0 8px rgba(0,0,0,0.15)';
document.body.appendChild(sidebar);

button.addEventListener('click', () => {
  if (sidebar.style.display === 'none') {
    sidebar.style.display = 'block';
    button.style.opacity = '0.7';
  } else {
    sidebar.style.display = 'none';
    button.style.opacity = '1';
  }
}); 