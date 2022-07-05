import { Editor } from './editor.js';

const Project = (() => {
  const getProjectIcon = () => {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.classList.add('project-icon');
    svg.setAttribute('viewBox', '0 0 24 24');
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', 'M12 7a5 5 0 110 10 5 5 0 010-10z');
    path.setAttribute('fill', 'currentColor');
    svg.appendChild(path);
    return svg;
  };

  const getNewProjectButton = (projectIcon, projectName) => {
    const newProjectButton = document.createElement('button');
    const newProjectNameSpan = document.createElement('span');

    newProjectButton.classList.add(
      'project-button',
      'sidebar-button',
      'tab-link'
    );
    newProjectNameSpan.classList.add('project-name');

    const projectNameLowerCase = projectName.toLowerCase();

    newProjectButton.dataset.tabName = projectNameLowerCase;
    newProjectNameSpan.textContent = projectName;

    newProjectButton.append(projectIcon, newProjectNameSpan);
    return newProjectButton;
  };

  const getProjectButtonListItem = (projectButton) => {
    const listItem = document.createElement('li');
    listItem.appendChild(projectButton);
    return listItem;
  };

  const addButtonEventListener = (projectButton) => {
    console.log(projectButton);
    const tabName = projectButton.dataset.tabName;
    console.log(tabName);
    projectButton.addEventListener('click', () =>
      Editor.changeContent(tabName)
    );
  };

  const addProjectButtonToSidebar = (projectButton) => {
    const projectsList = document.querySelector('#projects-list');
    const listItem = getProjectButtonListItem(projectButton);
    projectsList.appendChild(listItem);
  };

  const buttonNames = ['Work', 'School', 'Reading'];

  const addProjectButtonsToSidebar = (projectNamesList) => {
    for (const buttonName of projectNamesList) {
      const icon = getProjectIcon();
      const newButton = getNewProjectButton(icon, buttonName);
      addProjectButtonToSidebar(newButton);
      addButtonEventListener(newButton);
    }
  };

  addProjectButtonsToSidebar(buttonNames);
})();

export { Project };
