import { Editor } from './editor.js';
import { ProjectLogic } from './project-logic.js';
import { NewTaskModal } from './new-task-modal.js';

const ProjectButton = (() => {
  const getProjectIcon = () => {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');

    svg.classList.add('project-icon');

    svg.setAttribute('viewBox', '0 0 24 24');
    path.setAttribute('d', 'M12 7a5 5 0 110 10 5 5 0 010-10z');
    path.setAttribute('fill', 'currentColor');

    svg.appendChild(path);

    return svg;
  };

  const getDeleteButtonIcon = () => {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    const path1 = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'path'
    );
    const path2 = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'path'
    );
    const path3 = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'path'
    );
    const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');

    svg.classList.add('delete-project-icon');

    g.setAttribute('fill', 'none');
    g.setAttribute('fill-rule', 'evenodd');
    path1.setAttribute('d', 'M0 0h24v24H0z');
    rect.setAttribute('x', '5');
    rect.setAttribute('y', '6');
    rect.setAttribute('fill', 'currentColor');
    rect.setAttribute('rx', '.5');
    path2.setAttribute('fill', 'currentColor');
    path2.setAttribute('d', 'M10 9h1v8h-1V9zm3 0h1v8h-1V9z');
    path3.setAttribute('stroke', 'currentColor');
    path3.setAttribute(
      'd',
      'M17.5 6.5h-11V18A1.5 1.5 0 0 0 8 19.5h8a1.5 1.5 0 0 0 1.5-1.5V6.5zm-9 0h7V5A1.5 1.5 0 0 0 14 3.5h-4A1.5 1.5 0 0 0 8.5 5v1.5z'
    );

    g.append(path1, rect, path2, path3);
    svg.append(g);

    return svg;
  };

  const getNewProjectButton = (projectIcon, projectName) => {
    const newProjectButton = document.createElement('button');
    const newProjectNameSpan = document.createElement('span');
    const deleteButton = getDeleteButtonIcon();

    newProjectButton.classList.add(
      'project-button',
      'sidebar-button',
      'tab-link'
    );
    newProjectNameSpan.classList.add('project-name');

    newProjectButton.dataset.tabName = projectName;
    newProjectNameSpan.textContent = projectName;

    newProjectButton.append(projectIcon, newProjectNameSpan, deleteButton);
    return newProjectButton;
  };

  const getProjectButtonListItem = (projectButton) => {
    const listItem = document.createElement('li');
    listItem.appendChild(projectButton);
    return listItem;
  };

  const updateProjectButtonIds = () => {
    const projectButtons = document.querySelectorAll('.project-button');
    for (let i = 0; i < projectButtons.length; i++)
      projectButtons[i].dataset.projectId = i;
  };

  const removeProjectButtonListItem = (projectButton) =>
    projectButton.parentNode.remove();

  const addButtonEventListener = (projectButton) => {
    const tabName = projectButton.dataset.tabName;
    const deleteButton = projectButton.childNodes[2];
    deleteButton.addEventListener('click', () => {
      removeProjectButtonListItem(projectButton);
      const projectButtonId = projectButton.dataset.projectId;
      ProjectLogic.removeProjectFromList(projectButtonId);
      NewTaskModal.removeProjectSelectorOption(projectButtonId);
      updateProjectButtonIds();
      ProjectLogic.updateProjectIds();
      NewTaskModal.updateProjectSelectorIds();
    });
    projectButton.addEventListener('click', (e) => {
      if (e.target !== projectButton) return;
      Editor.changeContent(e.target, tabName);
    });
  };

  const addProjectButtonToSidebarList = (projectButton) => {
    const projectsList = document.querySelector('#projects-list');
    const listItem = getProjectButtonListItem(projectButton);
    projectsList.appendChild(listItem);
  };

  const getTotalProjectButtonsAmount = () =>
    document.querySelectorAll('.project-button').length;

  const addProjectButtonId = (projectButton) => {
    const projectButtonsAmount = getTotalProjectButtonsAmount();
    const projectId = projectButtonsAmount - 1;
    projectButton.dataset.projectId = projectId;
  };

  const addProjectButton = (projectName) => {
    const icon = getProjectIcon();
    const newButton = getNewProjectButton(icon, projectName);
    addProjectButtonToSidebarList(newButton);
    addButtonEventListener(newButton);
    addProjectButtonId(newButton);
  };

  const addExistingProjectButtons = () => {
    const projectsList = ProjectLogic.getProjectsList();
    for (const projectName in projectsList)
      addProjectButton(projectsList[projectName]);
  };

  addExistingProjectButtons();

  return { addProjectButton };
})();

export { ProjectButton };
