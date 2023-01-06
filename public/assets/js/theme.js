function getTheme() {
    return window.localStorage.getItem('theme') || 'auto-mode'; // Default to Light if key not present.
}

function getOppositeTheme() {
    const theme = getTheme();
if (theme === 'light-mode')
      return 'dark-mode';
else
      return 'light-mode';
}

window.onload = () => {
    const button = document.querySelector('.btn-toggle-mode');
const body = document.querySelector('body');

if (body)
body.setAttribute('class', getTheme());
  
button.addEventListener('click', () => {
      const newTheme = getOppositeTheme();
      body.setAttribute('class', newTheme);
  window.localStorage.setItem('theme', newTheme);
});
};