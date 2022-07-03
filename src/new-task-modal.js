const NewTaskModal = (() => {
  const addTaskButton = document.querySelector('.add-task-button');
  const newTaskModal = document.querySelector('.add-task-modal');
  const addTaskForm = document.querySelector('.add-task-form');
  const taskNameInput = document.querySelector(
    ".form-inputs > input[name='task_name']"
  );
  const modalCancelButton = document.querySelector('.cancel-button');
  const dueDatePicker = document.querySelector('.due-date-picker');
  const priorityButton = document.querySelector('.priority-selector');
  const priorityDropdownMenu = document.querySelector(
    '.priority-dropdown-menu'
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
    priorityButton.classList.toggle('selected');
  };
  const hidePriorityDropDown = () => {
    priorityDropdownMenu.classList.remove('visible');
    priorityButton.classList.remove('selected');
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
  };

  // Event Listeners
  addTaskButton.addEventListener('click', () => toggleModal());

  modalCancelButton.addEventListener('click', () => toggleModal());

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isModalVisible()) toggleModal();
  });

  priorityButton.addEventListener('click', () => togglePriorityDropdown());

  newTaskModalOverlay.addEventListener('click', (e) => {
    const clickedElementParent = e.target.offsetParent;
    const isModalClicked =
      !clickedElementParent ||
      clickedElementParent === newTaskModal ||
      clickedElementParent === newTaskModalOverlay;
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
})();

export { NewTaskModal };
