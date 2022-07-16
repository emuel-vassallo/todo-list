import {Icons} from './icons.js'

const TaskButton = (() => {
  const getTaskButton = (task) => {
    const button = document.createElement('button');
    const topDiv = document.createElement('div');
    const topLeftDiv = document.createElement('div');
    const topRightDiv = document.createElement('div');
    const bottomLefttDiv = document.createElement('div');
    const bottomDiv = document.createElement('div');
    const taskNameText = document.createElement('p');
    const dueDateTextElement = document.createElement('p');
    const calendarIcon = Icons.getCalendarIcon();
    const checkboxButtonDiv = document.createElement('div');
    const checkboxButton = document.createElement('button');
    const checkboxIcon = Icons.getCheckboxIcon();

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
