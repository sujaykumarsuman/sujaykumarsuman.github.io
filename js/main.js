// Theme toggle logic
window.addEventListener('DOMContentLoaded', () => {
  const root = document.documentElement;
  const toggleBtn = document.getElementById('theme-toggle');
  const saved = localStorage.getItem('theme');
  if (saved === 'light') {
    root.classList.add('theme-light');
  } else {
    root.classList.add('theme-dark');
  }
  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      if (root.classList.contains('theme-dark')) {
        root.classList.remove('theme-dark');
        root.classList.add('theme-light');
        localStorage.setItem('theme', 'light');
      } else {
        root.classList.remove('theme-light');
        root.classList.add('theme-dark');
        localStorage.setItem('theme', 'dark');
      }
    });
  }
});
