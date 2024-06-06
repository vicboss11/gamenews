function addThemeToggle() {
  document.addEventListener('DOMContentLoaded', () => {
    const lightDarkBtn: HTMLButtonElement | null =
      document.querySelector('.light-dark-btn');

    const lightDarkCheckbox: HTMLInputElement | null = document.querySelector(
      '.light-dark-checkbox',
    );

    const prefersLightTheme = window.matchMedia(
      '(prefers-color-scheme: light)',
    );

    if (lightDarkCheckbox && lightDarkBtn) {
      lightDarkCheckbox.checked = !prefersLightTheme.matches;

      lightDarkBtn.addEventListener('click', () => {
        lightDarkCheckbox.checked = !lightDarkCheckbox.checked;

        if (lightDarkCheckbox.checked) {
          document.documentElement.className = 'dark-theme';
        } else {
          document.documentElement.className = 'light-theme';
        }
      });
    }
  });
}

export default addThemeToggle;
