const theme = localStorage.getItem('theme');

if (theme === 'dark') {
  document.documentElement.className = 'dark-theme';
}

if (theme === 'light') {
  document.documentElement.className = 'light-theme';
}
