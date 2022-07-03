import { Editor } from './editor';
import { Tooltip } from './tooltip.js';

const Sidebar = (() => {
  const sidebar = document.querySelector('.sidebar');
  const overlay = document.querySelector('.sidebar-overlay');
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

  const addSelectedClassToButton = (tabName) => {
    for (const button of sidebarButtons)
      if (button.dataset.tabName === tabName) button.classList.add('selected');
  };

  const removeSelectedButtonClass = () => {
    for (const button of sidebarButtons) button.classList.remove('selected');
  };

  const getCapitalizedString = (str) =>
    str.charAt(0).toUpperCase() + str.slice(1);

  const changeTabTitle = (tabName) =>
    (document.title = `${getCapitalizedString(tabName)}: Todoist`);

  const addVisibleClass = () => {
    sidebar.classList.add('is-visible');
    Editor.addSidebarVisibleClass();
    Tooltip.changeMenuTooltipTextClose();
  };

  const removeVisibleClass = () => {
    sidebar.classList.remove('is-visible');
    Editor.removeSidebarVisibleClass();
    Tooltip.changeMenuTooltipTextOpen();
  };

  const toggleOverlayVisibility = () =>
    document.querySelector('.sidebar-overlay').classList.toggle('is-visible');

  const toggleSidebarVisibility = () => {
    const menuToggleButtons = document.querySelectorAll('.menu-button');
    for (const button of menuToggleButtons) {
      button.addEventListener('click', () => {
        sidebar.classList.toggle('is-visible');
        editor.classList.toggle('is-sidebar-visible');
        toggleOverlayVisibility();
        if (sidebar.classList.contains('is-visible')) {
          Tooltip.changeMenuTooltipTextClose();
          return;
        }
        Tooltip.changeMenuTooltipTextOpen();
      });
    }
  };

  const getCurrentDay = () => new Date().getDate();

  const getFormattedDay = () => ('0' + getCurrentDay()).slice(-2);

  const updateTodayIconDay = () =>
    (document.querySelector('.sidebar-today-icon tspan').textContent =
      getFormattedDay());

  const controlSidebarVisibility = () => {
    if (window.innerWidth > 750) addVisibleClass();

    window.addEventListener('resize', () => {
      const isSidebarVisible = sidebar.classList.contains('is-visible');
      const isOverlayVisible = overlay.classList.contains('is-visible');
      const windowWidth = window.innerWidth;

      if (isOverlayVisible) return;
      if (isSidebarVisible && windowWidth <= 750) removeVisibleClass();
      else if (!isSidebarVisible && windowWidth > 750) addVisibleClass();
    });
  };

  toggleSidebarVisibility();
  toggleProjectsVisibility();
  updateTodayIconDay();
  controlSidebarVisibility();

  return {
    changeTabTitle,
    removeSelectedButtonClass,
    addSelectedClassToButton,
  };
})();

export { Sidebar };
