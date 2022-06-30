import { getSidebarButtons, changeTabTitle } from './sidebar.js';

const Editor = (() => {
  const getEditor = () => document.querySelector('.editor');

  const removeEditorContent = () => {
    const editor = getEditor();
    while (editor.firstChild) editor.removeChild(editor.lastChild);
  };

  const getNewTabTitle = (tabTitleText) => {
    const tabTitle = document.createElement('h2');
    tabTitle.innerText = tabTitleText;
    tabTitle.classList.add('tab-title');
    return tabTitle;
  };

  const addTabTitle = (tabTitleText) => {
    const editor = getEditor();
    const newTabTitle = getNewTabTitle(tabTitleText);
    editor.append(newTabTitle);
  };

  const loadInboxContent = () => {
    const editor = getEditor();
    console.log('Inbox loaded');
  };

  const loadTodayContent = () => {
    const editor = getEditor();
    console.log('Today loaded');
  };

  const loadUpcomingContent = () => {
    const editor = getEditor();
    console.log('Upcoming loaded');
  };

  const addCurrentTabNameClass = (tabName) => {
    const editor = getEditor();
    if (editor.classList.contains(`.${tabName}`)) return;
    editor.classList.add(tabName);
  };

  const removeTabNameClass = () => {
    const editor = getEditor();
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
    const sidebarButtons = getSidebarButtons();
    for (const button of sidebarButtons) {
      button.addEventListener('click', () => {
        const tabName = button.dataset.tabName;
        changeTabTitle(tabName);
        removeEditorContent();
        removeTabNameClass();
        addCurrentTabNameClass(tabName);
        loadNewEditorContent(tabName);
        addTabTitle(tabName);
      });
    }
  };
  return { changeEditorContent };
})();

export { Editor };
