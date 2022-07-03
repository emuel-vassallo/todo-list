const NewTaskModal = (() => {
  const addTaskButton = document.querySelector('.add-task-button');
  const newTaskModal = document.querySelector('.add-task-modal');
  const addTaskForm = document.querySelector('.add-task-form');
  const taskNameInput = document.querySelector(
    ".form-inputs > input[name='task_name']"
  );
  const modalCancelButton = document.querySelector('.cancel-button');
  const dueDatePicker = document.querySelector('.due-date-picker');
  const submitButton = document.querySelector('.add-task-submit-button');
  const newTaskModalOverlay = document.querySelector(
    '.add-task-modal-overlay '
  );

  const toggleNewTaskModal = () => newTaskModal.classList.toggle('visible');
  const toggleOverlay = () => newTaskModalOverlay.classList.toggle('visible');
  const clearModal = () => addTaskForm.reset();
  const changeDefaultDueDate = () => (dueDatePicker.valueAsDate = new Date());
  const enableSubmitButton = () => (submitButton.disabled = false);
  const disableSubmitButton = () => (submitButton.disabled = true);
  const focusTaskNameInput = () => taskNameInput.focus();
  const isModalVisible = () => newTaskModal.classList.contains('visible');
  const toggleModal = () => {
    toggleNewTaskModal();
    toggleOverlay();
    clearModal();
    changeDefaultDueDate();
    focusTaskNameInput();
    disableSubmitButton();
  };

  addTaskButton.addEventListener('click', () => toggleModal());
  modalCancelButton.addEventListener('click', () => toggleModal());
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isModalVisible()) toggleModal();
  });
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
