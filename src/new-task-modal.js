const NewTaskModal = (() => {
  const addTaskButton = document.querySelector('.add-task-button');
  const newTaskModal = document.querySelector('.add-task-modal');
  const addTaskForm = document.querySelector('.add-task-form');
  const taskNameInput = document.querySelector(
    ".form-inputs > input[name='task_name']"
  );
  const modalCancelButton = document.querySelector('.cancel-button');
  const dueDatePicker = document.querySelector('.due-date-picker');
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
  const submitButton = document.querySelector('.add-task-submit-button');
  const newTaskModalOverlay = document.querySelector(
    '.add-task-modal-overlay '
  );

  // Modal
  const toggleNewTaskModal = () => newTaskModal.classList.toggle('visible');
  const toggleModalOverlay = () =>
    newTaskModalOverlay.classList.toggle('visible');
  const clearModal = () => addTaskForm.reset();
  const isModalVisible = () => newTaskModal.classList.contains('visible');

  // Task Name
  const focusTaskNameInput = () => taskNameInput.focus();

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
  const resetPrioritySelectorIcon = () => {
    changePrioritySelectorIcon(defaultPrioritySelectorIcon);
  };
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
    newTaskModal.addEventListener('transitionend', () => {
      if (isModalVisible()) return;
      resetPrioritySelectorIcon();
      resetPriorityOption();
    });
  };

  // Event Listeners
  addTaskButton.addEventListener('click', () => toggleModal());

  modalCancelButton.addEventListener('click', () => toggleModal());

  window.addEventListener('keydown', (e) => {
    console.log(newTaskModal);
    if (e.key === 'Escape' && isModalVisible()) toggleModal();
  });

  prioritySelector.addEventListener('click', () => togglePriorityDropdown());

  newTaskModalOverlay.addEventListener('click', (e) => {
    const clickedElementParent = e.target.offsetParent;
    const isModalClicked =
      !clickedElementParent ||
      clickedElementParent === newTaskModal ||
      clickedElementParent === newTaskModalOverlay ||
      clickedElementParent === priorityDropdownMenu;
    if (isModalClicked) return;
    toggleModal();
  });

  taskNameInput.addEventListener('input', () => {
    if (taskNameInput.value.length > 0) {
      enableSubmitButton();
      return;
    }
    disableSubmitButton();
  });

  for (const button of priorityDropdownOptions) {
    button.addEventListener('click', () => {
      removeActiveClass();
      button.classList.add('active-priority');
      const buttonIcon = button.firstElementChild.cloneNode(true);
      changePrioritySelectorIcon(buttonIcon);
      togglePriorityDropdown();
    });
  }
})();

export { NewTaskModal };
