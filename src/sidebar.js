import { Editor } from './editor';

const Sidebar = (() => {
  const sidebar = document.querySelector('.sidebar');
  const sidebarButtons = document.querySelectorAll('.sidebar-button');
  const editor = document.querySelector('.editor');

  const toggleProjectsVisibility = () => {
    const sidebarProjectsButton = document.querySelector(
      '.sidebar-projects-button'
    );
    const arrow = document.querySelector('.sidebar-projects-arrow-icon');

    sidebarProjectsButton.addEventListener('click', () => {
      arrow.classList.toggle('expanded');
    });
  };

  const removeSelectedClass = () => {
    for (const button of sidebarButtons) button.classList.remove('selected');
  };

  const getCapitalizedString = (str) =>
    str.charAt(0).toUpperCase() + str.slice(1);

  const changeTabTitle = (tabName) =>
    (document.title = `${getCapitalizedString(tabName)}: Todoist`);

  const addSelectedClassOnClick = () => {
    for (const button of sidebarButtons) {
      button.addEventListener('click', () => {
        removeSelectedClass();
        button.classList.add('selected');
      });
    }
  };

  const addVisibleClass = () => {
    const menuButtonTooltip = document.querySelector('.menu-button > span');
    sidebar.classList.add('is-visible');
    Editor.addSidebarVisibleClass();
    menuButtonTooltip.textContent = 'Close menu';
  };

  const removeVisibleClass = () => {
    const menuButtonTooltip = document.querySelector('.menu-button > span');
    sidebar.classList.remove('is-visible');
    Editor.removeSidebarVisibleClass();
    menuButtonTooltip.textContent = 'Open menu';
  };

  const toggleSidebarVisibility = () => {
    const menuToggleButtons = document.querySelectorAll('.menu-button');
    const menuButtonTooltip = document.querySelector('.menu-button > span');
    for (const button of menuToggleButtons) {
      button.addEventListener('click', () => {
        sidebar.classList.toggle('is-visible');
        editor.classList.toggle('is-sidebar-visible');
        if (sidebar.classList.contains('is-visible')) {
          menuButtonTooltip.textContent = 'Close menu';
          return;
        }
        menuButtonTooltip.textContent = 'Open menu';
      });
    }
    window.addEventListener('resize', function () {
      if (window.innerWidth < 750) {
        removeVisibleClass();
        return;
      }
      addVisibleClass();
    });
  };

  return {
    toggleProjectsVisibility,
    addSelectedClassOnClick,
    changeTabTitle,
    toggleSidebarVisibility,
  };
})();

export { Sidebar };
