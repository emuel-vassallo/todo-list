import { Icons } from './icons.js';

const TaskButton = (() => {
  const getTaskButton = (task, isDueDateEmpty) => {
    const button = document.createElement('button');
    const topDiv = document.createElement('div');
    const topLeftDiv = document.createElement('div');
    const topRightDiv = document.createElement('div');
    const taskNameText = document.createElement('p');
    const checkboxButtonDiv = document.createElement('div');
    const checkboxButton = document.createElement('button');
    const checkboxIcon = Icons.getCheckboxIcon();

    button.classList.add('task-button');
    topDiv.classList.add('task-button-top');
    topLeftDiv.classList.add('task-button-top-left');
    topRightDiv.classList.add('task-button-top-right');
    checkboxButtonDiv.classList.add('task-button-checkbox-button-div');
    checkboxButton.classList.add('task-button-checkbox-button');
    checkboxIcon.classList.add('task-button-checkbox-icon', 'project-icon');
    taskNameText.classList.add('task-button-task-name');

    taskNameText.innerText = task.name;

    checkboxButtonDiv.appendChild(checkboxButton);
    checkboxButton.appendChild(checkboxIcon);
    topLeftDiv.append(checkboxButtonDiv, taskNameText);
    topDiv.append(topLeftDiv, topRightDiv);
    button.append(topDiv);

    if (!isDueDateEmpty) return button;

    const bottomDiv = document.createElement('div');
    const bottomLefttDiv = document.createElement('div');
    const calendarIcon = Icons.getCalendarIcon();
    const dueDateTextElement = document.createElement('p');

    bottomDiv.classList.add('task-button-bottom');
    bottomLefttDiv.classList.add('task-button-bottom-left');
    calendarIcon.classList.add('calendar-icon');
    dueDateTextElement.classList.add('task-button-due-date-text');

    dueDateTextElement.innerText = task.dueDate;

    bottomLefttDiv.append(calendarIcon, dueDateTextElement);
    bottomDiv.append(bottomLefttDiv);
    button.append(bottomDiv);

    return button;
  };

  return { getTaskButton };
})();

export { TaskButton };
