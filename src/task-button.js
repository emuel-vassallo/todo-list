import { Editor } from './editor.js';
import { Icons } from './icons.js';
import { Sidebar } from './sidebar.js';
import { Storage } from './storage.js';
import { TaskModal } from './task-modal.js';

const TaskButton = (() => {
  const updateTaskButtonIds = () => {
    const taskButtons = document.querySelectorAll('.task-button');
    for (let i = 0; i < taskButtons.length; i++) {
      taskButtons[i].dataset.id = i;
    }
  };

  const updateTaskButtonDefaultProjectTaskIds = () => {
    const taskButtons = document.querySelectorAll('.task-button');

    let todayTasks = [];
    let upcomingTasks = [];

    for (const button of taskButtons) {
      const taskDefaultProjectId = button.dataset.defaultProjectId;
      const isTaskNotInDefaultProject = taskDefaultProjectId === 'null';

      if (isTaskNotInDefaultProject) {
        continue;
      }

      if (taskDefaultProjectId === '1') {
        todayTasks = [...todayTasks, button];
        continue;
      }
      upcomingTasks = [...upcomingTasks, button];
    }

    for (let i = 0; i < todayTasks.length; i++) {
      todayTasks[i].dataset.defaultProjectTaskId = i;
    }

    for (let i = 0; i < upcomingTasks.length; i++) {
      upcomingTasks[i].dataset.defaultProjectTaskId = i;
    }
  };

  const removeTaskCompletely = (taskButton) => {
    const projectId = parseInt(taskButton.dataset.projectId);
    const taskId = parseInt(taskButton.dataset.id);
    const isProjectInbox = taskButton.dataset.isProjectInbox === 'true';
    // const defaultProjectId = taskButton.dataset.defaultProjectId;
    // const defaultProjectTaskId = taskButton.dataset.defaultProjectTaskId;
    // const isProjectDefault = defaultProjectId === 'null';

    Storage.removeTask(projectId, taskId, isProjectInbox);

    // if (isProjectInbox) {
    //   Storage.removeTaskFromDefaultProject(
    //     defaultProjectId,
    //     defaultProjectTaskId
    //   );
    // }

    taskButton.remove();
    updateTaskButtonIds();
    updateTaskButtonDefaultProjectTaskIds();
    // Storage.updateDefaultProjectTaskIds(defaultProjectId);
  };

  const addCheckboxButtonEventListener = (taskButton, checkboxButton) => {
    checkboxButton.addEventListener('click', () => {
      checkboxButton.classList.add('clicked');
    });
    checkboxButton.addEventListener('animationend', () => {
      removeTaskCompletely(taskButton);
      const selectedSidebarButton = Sidebar.getSelectedButton();
      Editor.loadEmptyStateIfProjectEmpty(selectedSidebarButton);
    });
  };

  const addEditButtonEventListener = (taskButton, editButton) => {
    editButton.addEventListener('click', () => {
      TaskModal.toggleModal();
      TaskModal.addTaskDataToModal(taskButton);
      TaskModal.enableSubmitButton();
    });
  };

  const getTaskButton = (task) => {
    const isDueDateEmpty = !task.dueDate;
    const isDescriptionEmpty = !task.description;

    const taskButton = document.createElement('button');
    const topDiv = document.createElement('div');
    const topLeftDiv = document.createElement('div');
    const topRightDiv = document.createElement('div');
    const editButton = document.createElement('button');
    const editIcon = Icons.getEditIcon();
    const taskNameText = document.createElement('p');
    const checkboxButtonDiv = document.createElement('div');
    const checkboxButton = document.createElement('button');
    const checkboxIcon = Icons.getCheckboxIcon();

    taskButton.classList.add('task-button');
    topDiv.classList.add('task-button-top');
    topLeftDiv.classList.add('task-button-top-left');
    topRightDiv.classList.add('task-button-top-right');
    editButton.classList.add(
      'task-button-edit-button',
      'task-button-action-button'
    );
    checkboxButtonDiv.classList.add('task-button-checkbox-button-div');
    checkboxButton.classList.add('task-button-checkbox-button');
    checkboxIcon.classList.add('task-button-checkbox-icon', 'project-icon');
    taskNameText.classList.add('task-button-task-name');

    taskNameText.innerText = task.name;

    taskButton.dataset.projectId = task.projectId;
    taskButton.dataset.id = task.id;
    taskButton.dataset.isProjectInbox = task.isProjectInbox;
    taskButton.dataset.priority = task.priority;
    taskButton.dataset.defaultProjectId = task.defaultProjectId;
    taskButton.dataset.defaultProjectTaskId = task.defaultProjectTaskId;

    checkboxButtonDiv.appendChild(checkboxButton);
    checkboxButton.appendChild(checkboxIcon);
    topLeftDiv.append(checkboxButtonDiv, taskNameText);
    editButton.appendChild(editIcon);
    editButton.appendChild(editIcon);
    topRightDiv.append(editButton);
    topDiv.append(topLeftDiv, topRightDiv);
    taskButton.append(topDiv);

    addCheckboxButtonEventListener(taskButton, checkboxButton);
    addEditButtonEventListener(taskButton, editButton);

    if (isDueDateEmpty && isDescriptionEmpty) {
      return taskButton;
    }

    const descriptionDiv = document.createElement('div');
    const descriptionText = document.createElement('p');

    descriptionDiv.classList.add('task-button-description');
    descriptionText.classList.add('task-button-description-text');

    descriptionText.innerText = task.description;

    descriptionDiv.append(descriptionText);
    taskButton.append(descriptionDiv);

    if (isDueDateEmpty) {
      return taskButton;
    }

    const dueDateDiv = document.createElement('div');
    const bottomLefttDiv = document.createElement('div');
    const calendarIcon = Icons.getCalendarIcon();
    const dueDateTextElement = document.createElement('p');

    dueDateDiv.classList.add('task-button-due-date');
    bottomLefttDiv.classList.add('task-button-due-date-left');
    calendarIcon.classList.add('calendar-icon');
    dueDateTextElement.classList.add('task-button-due-date-text');

    dueDateTextElement.innerText = task.formattedDueDate;

    bottomLefttDiv.append(calendarIcon, dueDateTextElement);
    dueDateDiv.append(bottomLefttDiv);
    taskButton.append(dueDateDiv);

    updateTaskButtonIds();

    return taskButton;
  };

  return {
    getTaskButton,
    updateTaskButtonIds,
    updateTaskButtonDefaultProjectTaskIds,
  };
})();

export { TaskButton };
