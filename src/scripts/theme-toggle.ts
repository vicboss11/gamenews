const lightDarkButton: HTMLButtonElement | null =
  document.querySelector('.light-dark-button');

const lightDarkCheckbox: HTMLInputElement | null = document.querySelector(
  '.light-dark-checkbox',
);

const prefersLightTheme = window.matchMedia('(prefers-color-scheme: light)');

if (lightDarkCheckbox && lightDarkButton) {
  lightDarkCheckbox.checked = !prefersLightTheme.matches;

  lightDarkButton.addEventListener('click', () => {
    lightDarkCheckbox.checked = !lightDarkCheckbox.checked;

    if (lightDarkCheckbox.checked) {
      document.documentElement.className = 'dark-theme';
    } else {
      document.documentElement.className = 'light-theme';
    }
  });
}
