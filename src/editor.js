import { Sidebar } from './sidebar.js';

const Editor = (() => {
  const editor = document.querySelector('.editor');
  const sidebarButtons = document.querySelectorAll('.sidebar-button');

  const removeEditorContent = () => {
    while (editor.firstChild) editor.removeChild(editor.lastChild);
  };

  const addSidebarVisibleClass = () =>
    editor.classList.add('is-sidebar-visible');

  const removeSidebarVisibleClass = () =>
    editor.classList.remove('is-sidebar-visible');

  const getNewTabTitle = (tabTitleText) => {
    const tabTitle = document.createElement('h2');
    tabTitle.innerText = tabTitleText;
    tabTitle.classList.add('tab-title');
    return tabTitle;
  };

  const addTabTitle = (tabTitleText) => {
    const newTabTitle = getNewTabTitle(tabTitleText);
    editor.append(newTabTitle);
  };

  const loadInboxContent = () => {
    console.log('Inbox loaded');
  };

  const loadTodayContent = () => {
    console.log('Today loaded');
  };

  const loadUpcomingContent = () => {
    console.log('Upcoming loaded');
  };

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

  const changeEditorContent = () => {
    for (const button of sidebarButtons) {
      button.addEventListener('click', () => {
        const tabName = button.dataset.tabName;
        Sidebar.changeTabTitle(tabName);
        removeEditorContent();
        removeTabNameClass();
        addCurrentTabNameClass(tabName);
        loadNewEditorContent(tabName);
        addTabTitle(tabName);
      });
    }
  };

  return {
    changeEditorContent,
    addSidebarVisibleClass,
    removeSidebarVisibleClass,
  };
})();

export { Editor };
