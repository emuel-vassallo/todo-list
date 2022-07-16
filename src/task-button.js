import { format } from 'date-fns';

const TaskButton = (() => {
  const getCheckboxIcon = () => {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');

    path.setAttribute('fill', 'currentColor');
    path.setAttribute(
      'd',
      'M11.23 13.7l-2.15-2a.55.55 0 0 0-.74-.01l.03-.03a.46.46 0 0 0 0 .68L11.24 15l5.4-5.01a.45.45 0 0 0 0-.68l.02.03a.55.55 0 0 0-.73 0l-4.7 4.35z'
    );

    svg.appendChild(path);
    return svg;
  };

  const getCalendarIcon = () => {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');

    svg.setAttribute('viewBox', '0 0 12 12');
    svg.setAttribute('fill', 'none');

    path.setAttribute('fill', 'currentColor');
    path.setAttribute('fill-rule', 'evenodd');
    path.setAttribute('clip-rule', 'evenodd');
    path.setAttribute(
      'd',
      'M9.5 1h-7A1.5 1.5 0 001 2.5v7A1.5 1.5 0 002.5 11h7A1.5 1.5 0 0011 9.5v-7A1.5 1.5 0 009.5 1zM2 2.5a.5.5 0 01.5-.5h7a.5.5 0 01.5.5v7a.5.5 0 01-.5.5h-7a.5.5 0 01-.5-.5v-7zM8.75 8a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM3.5 4a.5.5 0 000 1h5a.5.5 0 000-1h-5z'
    );

    svg.appendChild(path);
    return svg;
  };

  const getTaskButton = (task) => {
    const button = document.createElement('button');
    const topDiv = document.createElement('div');
    const topLeftDiv = document.createElement('div');
    const topRightDiv = document.createElement('div');
    const bottomLefttDiv = document.createElement('div');
    const bottomDiv = document.createElement('div');
    const taskNameText = document.createElement('p');
    const dueDateTextElement = document.createElement('p');
    const calendarIcon = getCalendarIcon();
    const checkboxButtonDiv = document.createElement('div');
    const checkboxButton = document.createElement('button');
    const checkboxIcon = getCheckboxIcon();

    button.classList.add('task-button');
    topDiv.classList.add('task-button-top');
    topLeftDiv.classList.add('task-button-top-left');
    topRightDiv.classList.add('task-button-top-right');
    bottomDiv.classList.add('task-button-bottom');
    bottomLefttDiv.classList.add('task-button-bottom-left');
    checkboxButtonDiv.classList.add('task-button-checkbox-button-div');
    checkboxButton.classList.add('task-button-checkbox-button');
    checkboxIcon.classList.add('task-button-checkbox-icon', 'project-icon');
    calendarIcon.classList.add('calendar-icon');
    dueDateTextElement.classList.add('task-button-due-date-text');
    taskNameText.classList.add('task-button-task-name');

    taskNameText.innerText = task.name;

    dueDateTextElement.innerText = task.dueDate;

    checkboxButtonDiv.appendChild(checkboxButton);
    checkboxButton.appendChild(checkboxIcon);
    topLeftDiv.append(checkboxButtonDiv, taskNameText);
    bottomLefttDiv.append(calendarIcon, dueDateTextElement);
    topDiv.append(topLeftDiv, topRightDiv);
    bottomDiv.append(bottomLefttDiv);
    button.append(topDiv, bottomDiv);

    return button;
  };

  return { getTaskButton };
})();

export { TaskButton };
