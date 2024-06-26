const lightDarkButton: HTMLButtonElement | null =
  document.querySelector('.light-dark-button');

const lightDarkCheckbox: HTMLInputElement | null = document.querySelector(
  '.light-dark-checkbox',
);

const prefersLightTheme = window.matchMedia('(prefers-color-scheme: light)');
const isThemeSet = localStorage.getItem('theme') !== null;

if (lightDarkCheckbox && lightDarkButton) {
  // Set the initial theme based on the user's preference or the saved theme
  lightDarkCheckbox.checked = isThemeSet
    ? localStorage.getItem('theme') === 'dark'
    : !prefersLightTheme.matches;

  lightDarkButton.addEventListener('click', () => {
    lightDarkCheckbox.checked = !lightDarkCheckbox.checked;

    if (lightDarkCheckbox.checked) {
      document.documentElement.className = 'dark-theme';

      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.className = 'light-theme';

      localStorage.setItem('theme', 'light');
    }
  });
}
