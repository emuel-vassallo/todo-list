import { Sidebar } from './sidebar.js';
import { NewTaskModal } from './new-task-modal.js';
import { format } from 'date-fns';

const Editor = (() => {
  const editor = document.querySelector('.editor');
  const removeEditorContent = () => {
    while (editor.firstChild) editor.removeChild(editor.lastChild);
  };

  const addSidebarVisibleClass = () =>
    editor.classList.add('is-sidebar-visible');

  const removeSidebarVisibleClass = () =>
    editor.classList.remove('is-sidebar-visible');

  // Tab Heading

  const getNewTabHeadingDiv = () => {
    const tabHeading = document.createElement('div');
    tabHeading.classList.add('tab-heading');
    return tabHeading;
  };

  const addEmptyTabHeading = () => {
    const tabHeadingDiv = getNewTabHeadingDiv();
    editor.append(tabHeadingDiv);
  };

  // Tab Title

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

  // Add task Button

  const addNewAddTaskButton = () => {
    const addTaskButton = document.createElement('button');
    const plusIconSvg = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'svg'
    );
    const plusIconPath = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'path'
    );
    const addTaskText = document.createElement('p');

    plusIconPath.setAttribute(
      'd',
      'M6 6V.5a.5.5 0 0 1 1 0V6h5.5a.5.5 0 1 1 0 1H7v5.5a.5.5 0 1 1-1 0V7H.5a.5.5 0 0 1 0-1H6z'
    );
    plusIconPath.setAttribute('fill', 'currentColor');
    plusIconPath.setAttribute('fill-rule', 'evenodd');

    addTaskButton.classList.add('editor-add-task-button');
    plusIconSvg.classList.add('editor-add-task-plus-icon');
    addTaskText.classList.add('editor-add-task-text');

    addTaskText.textContent = 'Add task';

    plusIconSvg.appendChild(plusIconPath);
    addTaskButton.append(plusIconSvg, addTaskText);
    editor.append(addTaskButton);
  };

  <span class='icon_add' aria-hidden='true'>
    <svg width='13' height='13'>
      <path
        d='M6 6V.5a.5.5 0 0 1 1 0V6h5.5a.5.5 0 1 1 0 1H7v5.5a.5.5 0 1 1-1 0V7H.5a.5.5 0 0 1 0-1H6z'
        fill='currentColor'
        fill-rule='evenodd'
      ></path>
    </svg>
  </span>;

  const toggleModalOnButtonClick = () => {
    const addTaskButton = document.querySelector('.editor-add-task-button');
    addTaskButton.addEventListener('click', () => NewTaskModal.toggleModal());
  };

  // Tabs

  const addEditorCurrentTabNameClass = (tabName) => {
    if (editor.classList.contains(`.${tabName}`)) return;
    editor.classList.add(tabName);
  };

  const removeTabNameClass = () => {
    const tabNames = ['inbox', 'today', 'upcoming'];
    for (const tabName of tabNames) editor.classList.remove(tabName);
  };

  const changeContent = (tabName) => {
    Sidebar.changeTabTitle(tabName);
    removeEditorContent();
    removeTabNameClass();
    Sidebar.removeSelectedButtonClass();
    Sidebar.addSelectedClassToButton(tabName);
    addEditorCurrentTabNameClass(tabName);
    addEmptyTabHeading();
    addTabTitle(tabName);
    if (tabName === 'Today') {
      addCurrentDateTitle();
      updateCurrentDateTitle();
    }
    addNewAddTaskButton();
    changeAddTaskButtonPlusIcon();
    toggleModalOnButtonClick();
  };

  const changeContentOnTabChange = () => {
    const tabLinkButtons = document.querySelectorAll('.tab-link');
    for (const button of tabLinkButtons) {
      button.addEventListener('click', () => {
        const tabName = button.dataset.tabName;
        changeContent(tabName);
      });
    }
  };

  changeContentOnTabChange();
  updateCurrentDateTitle();
  addNewAddTaskButton();
  toggleModalOnButtonClick();

  return {
    addSidebarVisibleClass,
    removeSidebarVisibleClass,
    updateCurrentDateTitle,
    changeContent,
  };
})();

export { Editor };
