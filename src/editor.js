import { Sidebar } from './sidebar.js';
import { Storage } from './storage.js';
import { TaskModal } from './task-modal.js';
import { TaskButton } from './task-button.js';
import { Header } from './header.js';
import { format } from 'date-fns';

const Editor = (() => {
  const editor = document.querySelector('.editor');
  const homeButton = document.querySelector('.home-button');
  const todaySidebarButton = document.querySelector('.sidebar-button-today');

  const removeEditorContent = () => {
    while (editor.firstChild) editor.removeChild(editor.lastChild);
  };

  const addSidebarVisibleClass = () =>
    editor.classList.add('is-sidebar-visible');

  const removeSidebarVisibleClass = () =>
    editor.classList.remove('is-sidebar-visible');

  // Empty State
  const getEmptyStateContent = (sidebarButton) => {
    const isProjectDefault = sidebarButton.dataset.isDefaultProject === 'true';

    const tabName = isProjectDefault
      ? sidebarButton.dataset.tabName
      : 'Project';

    const emptyStateContainer = document.createElement('div');
    const emptyStateImage = document.createElement('img');
    const emptyStateTextContainer = document.createElement('div');
    const emptyStateHeading = document.createElement('h4');
    const emptyStateBody = document.createElement('p');

    emptyStateContainer.classList.add('empty-state-container');
    emptyStateImage.classList.add('empty-state-image');
    emptyStateTextContainer.classList.add('empty-state-text');
    emptyStateHeading.classList.add('empty-state-heading');
    emptyStateBody.classList.add('empty-state-body');

    emptyStateImage.src = {
      Inbox: 'components/images/inbox-empty-state.png',
      Today: 'components/images/today-empty-state.png',
      Upcoming: 'components/images/upcoming-empty-state.png',
      Project: 'components/images/project-empty-state.png',
    }[tabName];

    const headingText = {
      Inbox: 'All clear',
      Today: "You're all done for the week! #TodoistZero",
      Upcoming: 'Get a clear view of upcoming tasks',
      Project: 'Keep your tasks organized in projects',
    }[tabName];

    const bodyText = {
      Inbox: "Looks like everything's organized in the right place.",
      Today: 'Enjoy the rest of your day.',
      Upcoming: 'All upcoming tasks will show up here.',
      Project: 'Group your tasks by goal or area of your life.',
    }[tabName];

    emptyStateHeading.textContent = headingText;
    emptyStateBody.textContent = bodyText;

    emptyStateTextContainer.append(emptyStateHeading, emptyStateBody);
    emptyStateContainer.append(emptyStateImage, emptyStateTextContainer);

    return emptyStateContainer;
  };

  const addEmptyStateContent = (sidebarButton) => {
    const emptyStateContent = getEmptyStateContent(sidebarButton);
    editor.append(emptyStateContent);
  };

  const isEmptyStateContentVisible = () =>
    document.querySelector('.empty-state-container') !== null;

  const removeEmptyStateContent = () =>
    document.querySelector('.empty-state-container').remove();

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

  const addNewTaskButtonEventListener = () => {
    const addTaskButton = document.querySelector('.editor-add-task-button');
    addTaskButton.addEventListener('click', () => TaskModal.toggleModal());
  };

  // Tabs
  const removeTabNameClass = () => {
    const tabNames = ['inbox', 'today', 'upcoming'];
    for (const tabName of tabNames) editor.classList.remove(tabName);
  };

  const isSelectedProjectEmpty = () =>
    document.querySelectorAll('.task-button').length === 0;

  const loadEmptyStateIfProjectEmpty = (sidebarButton) => {
    const isProjectEmpty = isSelectedProjectEmpty(sidebarButton);
    if (!isProjectEmpty) return;
    addEmptyStateContent(sidebarButton);
  };

  const changeContent = (sidebarButton, tabName) => {
    Sidebar.changeTabTitle(tabName);
    removeEditorContent();

    // Sidebar Button Selected class
    removeTabNameClass();
    Sidebar.removeSelectedButtonClass();
    Sidebar.addSelectedClassToButton(sidebarButton);

    // Tab heading
    addEmptyTabHeading();
    addTabTitle(tabName);
    const isDefaultProjectButton = sidebarButton.projectId === undefined;
    if (tabName === 'Today' && isDefaultProjectButton) {
      addCurrentDateTitle();
      updateCurrentDateTitle();
    }

    // 'Add Task' button
    if (
      (sidebarButton.dataset.isDefaultProject === 'true' &&
        sidebarButton.dataset.tabName !== 'Today' &&
        sidebarButton.dataset.tabName !== 'Upcoming') ||
      sidebarButton.dataset.isDefaultProject === undefined
    ) {
      addNewAddTaskButton();
      addNewTaskButtonEventListener();
      Header.enableAddTaskButton();
    } else Header.disableAddTaskButton();

    // Task buttons
    addAllProjectTaskButtons(sidebarButton);

    // Empty state
    loadEmptyStateIfProjectEmpty(sidebarButton);
  };

  const changeContentOnTabChange = () => {
    const sidebarButtons = document.querySelectorAll('.sidebar-button');
    for (const button of sidebarButtons) {
      button.addEventListener('click', () =>
        changeContent(button, button.dataset.tabName)
      );
    }
  };

  // Task Buttons

  const addNewTaskButtonToEditor = (task) => {
    const taskButton = TaskButton.getTaskButton(task);
    const addTaskButton = document.querySelector('.editor-add-task-button');
    editor.insertBefore(taskButton, addTaskButton);
    if (isEmptyStateContentVisible()) removeEmptyStateContent();
  };

  const addAllProjectTaskButtons = (sidebarButton) => {
    const isProjectDefault = sidebarButton.dataset.isDefaultProject === 'true';
    const projects = isProjectDefault
      ? Storage.getDefaultProjects()
      : Storage.getProjects();
    const projectId = sidebarButton.dataset.projectId;
    const project = projects[projectId];
    const tasks = project.tasks;
    for (const task of tasks) addNewTaskButtonToEditor(task);
  };

  changeContentOnTabChange();
  addAllProjectTaskButtons(todaySidebarButton);

  homeButton.addEventListener('click', () =>
    changeContent(todaySidebarButton, todaySidebarButton.dataset.tabName)
  );

  return {
    addSidebarVisibleClass,
    addNewTaskButtonToEditor,
    changeContent,
    removeSidebarVisibleClass,
    updateCurrentDateTitle,
    loadEmptyStateIfProjectEmpty,
  };
})();

export { Editor };
