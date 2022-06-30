const toggleMenuVisibility = () => {
  const menuButton = document.querySelector('.menu-button');
  const sidebar = document.querySelector('.sidebar');
  const menuButtonTooltip = document.querySelector('.menu-button > span');
  menuButton.addEventListener('click', () => {
    sidebar.classList.toggle('is-visible');
    if (sidebar.classList.contains('is-visible')) {
      menuButtonTooltip.textContent = 'Close menu';
      return;
    }
    menuButtonTooltip.textContent = 'Open menu';
  });
};

export default toggleMenuVisibility;
