import { Sidebar } from './sidebar.js';

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

  const loadInboxContent = () => {};

  const loadTodayContent = () => {};

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
        loadNewEditorContent(tabName);
        addTabTitle(tabName);
      });
    }
  };

  changeContentOnTabChange();

  return {
    addSidebarVisibleClass,
    removeSidebarVisibleClass,
  };
})();

export { Editor };
