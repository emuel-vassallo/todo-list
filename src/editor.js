import { Sidebar } from './sidebar.js';
import { format } from 'date-fns';

const Editor = (() => {
  const editor = document.querySelector('.editor');
  const tabLinkButtons = document.querySelectorAll('.tab-link');

  const removeEditorContent = () => {
    while (editor.firstChild) editor.removeChild(editor.lastChild);
  };

  const addSidebarVisibleClass = () =>
    editor.classList.add('is-sidebar-visible');

  const removeSidebarVisibleClass = () =>
    editor.classList.remove('is-sidebar-visible');

  //Tab Heading

  const getNewTabHeadingDiv = () => {
    const tabHeading = document.createElement('div');
    tabHeading.classList.add('tab-heading');
    return tabHeading;
  };

  const addEmptyTabHeading = () => {
    const tabHeadingDiv = getNewTabHeadingDiv();
    editor.append(tabHeadingDiv);
  };

  //Tab Title

  const getNewTabTitle = (tabTitleText) => {
    const tabTitle = document.createElement('h2');
    tabTitle.innerText = tabTitleText;
    tabTitle.classList.add('tab-title');
    return tabTitle;
  };

  const addTabTitle = (tabTitle) => {
    const tabHeadingDiv = document.querySelector('.tab-heading');
    const newTabTitle = getNewTabTitle(tabTitle);
    tabHeadingDiv.append(newTabTitle);
  };

  // Current Date Title
  const getCurrentDate = () => new Date();

  const getFormattedDate = (date) => format(date, 'E d MMM');

  const updateCurrentDateTitle = () => {
    const currentDateTitle = document.querySelector('.current-date-title');
    const currentDate = getCurrentDate();
    const formattedDate = getFormattedDate(currentDate);
    currentDateTitle.textContent = formattedDate;
  };

  const getNewCurrentDateTitle = () => {
    const currentDateTitle = document.createElement('p');
    const currentDate = getCurrentDate();
    currentDateTitle.innerText = getFormattedDate(currentDate);
    currentDateTitle.classList.add('current-date-title');
    return currentDateTitle;
  };

  const addCurrentDateTitle = () => {
    const tabHeading = document.querySelector('.tab-heading');
    const newCurrentDateTitle = getNewCurrentDateTitle();
    tabHeading.append(newCurrentDateTitle);
  };

  // Loading Content

  const loadInboxContent = () => {};

  const loadTodayContent = () => {
    addCurrentDateTitle();
    updateCurrentDateTitle();
  };

  const loadUpcomingContent = () => {};

  const addCurrentTabNameClass = (tabName) => {
    if (editor.classList.contains(`.${tabName}`)) return;
    editor.classList.add(tabName);
  };

  const removeTabNameClass = () => {
    const tabNames = ['inbox', 'today', 'upcoming'];
    for (const tabName of tabNames) editor.classList.remove(tabName);
  };

  const loadNewEditorContent = (tabName) => {
    ({
      inbox: loadInboxContent,
      today: loadTodayContent,
      upcoming: loadUpcomingContent,
    }[tabName]?.());
  };

  const changeContentOnTabChange = () => {
    for (const button of tabLinkButtons) {
      button.addEventListener('click', () => {
        const tabName = button.dataset.tabName;
        Sidebar.changeTabTitle(tabName);
        removeEditorContent();
        removeTabNameClass();
        Sidebar.removeSelectedButtonClass();
        Sidebar.addSelectedClassToButton(tabName);
        addCurrentTabNameClass(tabName);
        addEmptyTabHeading();
        addTabTitle(tabName);
        if (tabName === 'home') addCurrentDateTitle();
        loadNewEditorContent(tabName);
      });
    }
  };

  changeContentOnTabChange();
  updateCurrentDateTitle();

  return {
    addSidebarVisibleClass,
    removeSidebarVisibleClass,
    updateCurrentDateTitle,
  };
})();

export { Editor };
