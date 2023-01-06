function getTheme() {
    return window.localStorage.getItem('theme') || ''; // Default to Light if key not present.
} 

function getOppositeTheme() {
    const theme = getTheme();
if (theme === 'light-theme')
      return 'dark-theme';
else
      return 'light-theme';
}

window.onload = () => {
    const button = document.querySelector('.btn-change-theme');
const body = document.querySelector('body');

if (body)
body.setAttribute('class', getTheme());
  
button.addEventListener('click', () => {
      const newTheme = getOppositeTheme();
      body.setAttribute('class', newTheme);
  window.localStorage.setItem('theme', newTheme);
});
};