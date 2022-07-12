import { Sidebar } from './sidebar.js';
import { Storage } from './storage.js';
import { format } from 'date-fns';

const TaskModal = (() => {
  const addTaskButton = document.querySelector('.add-task-button');

  const newTaskModal = document.querySelector('.add-task-modal');
  const newTaskModalOverlay = document.querySelector(
    '.add-task-modal-overlay '
  );

  const addTaskForm = document.querySelector('.add-task-form');
  const taskNameInput = document.querySelector(
    ".form-inputs > input[name='task_name']"
  );

  const dueDatePicker = document.querySelector('.due-date-picker');

  const projectSelector = document.querySelector('.project-selector');

  const prioritySelector = document.querySelector('.priority-selector');
  const defaultPrioritySelectorIcon = document.querySelector(
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

  // Task Name
  const focusTaskNameInput = () => taskNameInput.focus();

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

    for (let i = 0; i < projectList.length; i++) {
      const project = projectList[i];
      const projectName = project.name;
      const projectId = i;
      const projectOptionElement = getProjectOptionElement(
        projectName,
        projectId
      );
      projectSelector.appendChild(projectOptionElement);
    }
  };

  const addProjectSelectorOption = (projectName) => {
    const projectList = Storage.getProjects();
    const projectId = Object.keys(projectList).length;
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
    const selectedProjectId = selectedSidebarButton.dataset.projectId;
    const projectSelectorOptions = document.querySelectorAll(
      '.project-selection-option'
    );
    const defaultSelectedOption = document.querySelector(
      ".project-selector option[value='inbox']"
    );
    const projectOptionToSelect =
      projectSelectorOptions[selectedProjectId] || defaultSelectedOption;
    projectOptionToSelect.selected = 'selected';
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
    changePrioritySelectorIcon(defaultPrioritySelectorIcon);

  const resetPriorityOption = () => {
    const defaultPriorityOption = priorityDropdownOptions[3];
    removeActiveClass();
    defaultPriorityOption.classList.add('active-priority');
  };

  // Due Date
  const changeDefaultDueDate = () => (dueDatePicker.valueAsDate = new Date());

  // Submit Button
  const enableSubmitButton = () => (submitButton.disabled = false);
  const disableSubmitButton = () => (submitButton.disabled = true);

  const toggleModal = () => {
    toggleNewTaskModal();
    toggleModalOverlay();
    clearModal();
    changeDefaultDueDate();
    focusTaskNameInput();
    disableSubmitButton();
    hidePriorityDropDown();
    changeSelectedProjectOption();
  };

  const toggleSubmitButtonState = () => {
    if (dueDatePicker.value && taskNameInput.value) {
      enableSubmitButton();
      return;
    }
    disableSubmitButton();
  };

  dueDatePicker.min = format(new Date(), 'yyyy-MM-dd');

  newTaskModal.addEventListener('transitionend', () => {
    if (isModalVisible()) return;
    resetPrioritySelectorIcon();
    resetPriorityOption();
  });

  // Event Listeners
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

  loadProjectSelectorOptions();

  return {
    toggleModal,
    addProjectSelectorOption,
    removeProjectSelectorOption,
    updateProjectSelectorIds,
  };
})();

export { TaskModal };
