import { Editor } from './editor.js';
import { Sidebar } from './sidebar.js';
import { Storage } from './storage.js';
import { Task } from './task.js';
import { format } from 'date-fns';

const TaskModal = (() => {
  const addTaskButton = document.querySelector('.add-task-button');

  const newTaskModal = document.querySelector('.add-task-modal');
  const newTaskModalOverlay = document.querySelector(
    '.add-task-modal-overlay '
  );

  const addTaskForm = document.querySelector('#add-task-form');
  const taskNameInput = document.getElementById('task-name-input');
  const taskDescriptionInput = document.getElementById(
    'task-description-input'
  );

  const dueDatePicker = document.querySelector('.due-date-picker');

  const projectSelector = document.querySelector('.project-selector');

  const prioritySelector = document.querySelector('.priority-selector');
  const prioritySelectorIcon = document.querySelector(
    '.selected-priority > svg'
  );

  const priorityDropdownMenu = document.querySelector(
    '.priority-dropdown-menu'
  );
  const priorityDropdownOptions = document.querySelectorAll(
    '.priority-dropdown-menu > li'
  );

  const modalCancelButton = document.querySelector(
    '.add-task-modal .cancel-button'
  );
  const submitButton = document.querySelector('.add-task-submit-button');

  // Modal
  const toggleNewTaskModal = () => newTaskModal.classList.toggle('visible');
  const toggleModalOverlay = () =>
    newTaskModalOverlay.classList.toggle('visible');
  const clearModal = () => addTaskForm.reset();
  const isModalVisible = () => newTaskModal.classList.contains('visible');

  // Project
  const getProjectOptionElement = (projectName, id) => {
    const option = document.createElement('option');
    option.value = projectName;
    option.text = projectName;
    option.dataset.id = id;
    option.classList.add('project-selection-option');
    return option;
  };

  const loadProjectSelectorOptions = () => {
    const projectList = Storage.getProjects();

    for (const project of projectList) {
      const projectOptionElement = getProjectOptionElement(
        project.name,
        project.id
      );
      projectSelector.appendChild(projectOptionElement);
    }
  };

  const addProjectSelectorOption = (projectName) => {
    const projectId = Storage.getNewProjectId();
    const projectOptionElement = getProjectOptionElement(
      projectName,
      projectId
    );
    projectSelector.appendChild(projectOptionElement);
  };

  const removeProjectSelectorOption = (projectSelectorId) => {
    const projectSelectorOption = document.querySelector(
      `.project-selection-option[data-id="${projectSelectorId}"]`
    );
    document.body.contains(projectSelectorOption) &&
      projectSelectorOption.remove();
  };

  const updateProjectSelectorIds = () => {
    const projectSelectorOptions = document.querySelectorAll(
      '.project-selection-option'
    );
    for (let i = 0; i < projectSelectorOptions.length; i++)
      projectSelectorOptions[i].dataset.id = i;
  };

  const changeSelectedProjectOption = () => {
    const selectedSidebarButton = Sidebar.getSelectedButton();
    const isSelectedButtonDefault =
      selectedSidebarButton.dataset.isDefaultProject === 'true';

    const selectedProjectId = selectedSidebarButton.dataset.projectId;
    const projectSelectorOptions = document.querySelectorAll(
      '.project-selection-option'
    );
    const defaultSelectedOption = document.querySelector(
      ".project-selector option[value='inbox']"
    );
    const projectOptionToSelect = isSelectedButtonDefault
      ? defaultSelectedOption
      : projectSelectorOptions[selectedProjectId];

    projectOptionToSelect.selected = 'selected';
    projectSelector.dataset.selectedProjectId = selectedProjectId;
    projectSelector.dataset.isProjectDefault = isSelectedButtonDefault;
  };

  // Priority
  const togglePriorityDropdown = () => {
    priorityDropdownMenu.classList.toggle('visible');
    prioritySelector.classList.toggle('selected');
  };

  const hidePriorityDropDown = () => {
    priorityDropdownMenu.classList.remove('visible');
    prioritySelector.classList.remove('selected');
  };

  const removeActiveClass = () => {
    for (const button of priorityDropdownOptions)
      button.classList.remove('active-priority');
  };

  const changePrioritySelectorIcon = (newIcon) => {
    const prioritySelectorIcon = document.querySelector(
      '.selected-priority > svg'
    );
    const selectorIconParent = prioritySelectorIcon.parentNode;
    selectorIconParent.replaceChild(newIcon, prioritySelectorIcon);
  };

  const resetPrioritySelectorIcon = () =>
    changePrioritySelectorIcon(prioritySelectorIcon);

  const resetPriorityOption = () => {
    const defaultPriorityOption = priorityDropdownOptions[3];
    removeActiveClass();
    defaultPriorityOption.classList.add('active-priority');
  };

  // Submit Button
  const enableSubmitButton = () => (submitButton.disabled = false);
  const disableSubmitButton = () => (submitButton.disabled = true);

  const toggleModal = () => {
    toggleNewTaskModal();
    toggleModalOverlay();
    clearModal();
    disableSubmitButton();
    hidePriorityDropDown();
    changeSelectedProjectOption();
  };

  const isRequiredDataEntered = () => {
    const isTaskNameInputFilled = taskNameInput.value.trim();
    if (isTaskNameInputFilled) return true;
    return false;
  };

  const toggleSubmitButtonState = () => {
    if (isRequiredDataEntered()) {
      enableSubmitButton();
      return;
    }
    disableSubmitButton();
  };

  const getFormattedDate = (date) => format(date, 'dd LLL');

  const getCurrentDate = () => getFormattedDate(new Date());

  const getTaskModalData = () => {
    const prioritySelectorIcon = document.querySelector(
      '.selected-priority > svg'
    );

    let projectId = projectSelector.dataset.selectedProjectId;

    const isProjectInbox = projectSelector.dataset.isProjectDefault === 'true';
    const selectedSidebarButton = Sidebar.getSelectedButton();
    const selectedSidebarButtonId = selectedSidebarButton.dataset.projectId;

    if (isProjectInbox) projectId = '0';

    const taskId = Storage.getNewTaskId(projectId, isProjectInbox);
    const taskName = taskNameInput.value.trim();
    const taskDescription = taskDescriptionInput.value.trim();

    const dueDateValue = dueDatePicker.valueAsDate;
    const taskDueDate =
      dueDateValue === null ? null : getFormattedDate(dueDateValue);

    const isDateToday = taskDueDate === getCurrentDate();

    const defaultProjectId =
      !isDateToday && taskDueDate === null
        ? null
        : isDateToday || selectedSidebarButtonId === '1'
        ? '1'
        : '2';

    const taskPriority = prioritySelectorIcon.dataset.priority;

    const task = new Task(
      taskId,
      taskName,
      taskDescription,
      taskDueDate,
      projectId,
      taskPriority,
      isProjectInbox
    );

    task.defaultProjectId = defaultProjectId;

    return task;
  };

  const addTaskOnSubmit = () => {
    const task = getTaskModalData();
    Storage.addTaskToProject(task);
    Editor.addNewTaskButtonToEditor(task);
    toggleModal();
  };

  // Event Listeners
  newTaskModal.addEventListener('transitionend', () => {
    if (isModalVisible()) {
      taskNameInput.focus();
      return;
    }
    resetPrioritySelectorIcon();
    resetPriorityOption();
  });
  addTaskButton.addEventListener('click', () => toggleModal());

  modalCancelButton.addEventListener('click', () => toggleModal());

  window.addEventListener('keydown', (e) => {
    e.key === 'Escape' && isModalVisible() && toggleModal();
  });

  prioritySelector.addEventListener('click', () => togglePriorityDropdown());

  newTaskModalOverlay.addEventListener('click', (e) => {
    const clickedElementParent = e.target.offsetParent;
    const isModalClicked =
      !clickedElementParent ||
      clickedElementParent === newTaskModal ||
      clickedElementParent === newTaskModalOverlay ||
      clickedElementParent === priorityDropdownMenu;
    !isModalClicked && toggleModal();
  });

  taskNameInput.addEventListener('input', () => toggleSubmitButtonState());
  dueDatePicker.addEventListener('input', () => toggleSubmitButtonState());

  for (const button of priorityDropdownOptions) {
    button.addEventListener('click', () => {
      removeActiveClass();
      button.classList.add('active-priority');
      const buttonIcon = button.firstElementChild.cloneNode(true);
      changePrioritySelectorIcon(buttonIcon);
      togglePriorityDropdown();
    });
  }

  submitButton.addEventListener('click', () => addTaskOnSubmit());

  window.addEventListener('keydown', (e) => {
    if (e.key !== 'Enter' || !isModalVisible() || !isRequiredDataEntered())
      return;
    addTaskOnSubmit();
  });

  const changeIsSelectedProjectDefaultValue = () => {
    const isSelectedProjectDefault =
      projectSelector.options[projectSelector.selectedIndex].dataset
        .isProjectDefault === 'true';
    projectSelector.dataset.isProjectDefault = isSelectedProjectDefault;
  };

  const changeSelectedProjectIdValue = () => {
    const projectSelectorSelectedIndex = projectSelector.selectedIndex;
    const selectedProjectId =
      projectSelectorSelectedIndex > 0 ? projectSelectorSelectedIndex - 1 : 0;
    projectSelector.dataset.selectedProjectId = selectedProjectId;
  };

  projectSelector.addEventListener('input', () => {
    changeIsSelectedProjectDefaultValue();
    changeSelectedProjectIdValue();
  });

  dueDatePicker.min = format(new Date(), 'yyyy-MM-dd');

  loadProjectSelectorOptions();

  return {
    addProjectSelectorOption,
    loadProjectSelectorOptions,
    removeProjectSelectorOption,
    toggleModal,
    updateProjectSelectorIds,
  };
})(Task);

export { TaskModal };
