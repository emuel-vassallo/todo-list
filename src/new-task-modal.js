const NewTaskModal = (() => {
  const addTaskButton = document.querySelector('.add-task-button');
  const newTaskModal = document.querySelector('.add-task-modal');
  const addTaskForm = document.querySelector('.add-task-form');
  const taskNameInput = document.querySelector(
    '.form-inputs > input:first-child'
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

  const toggleModal = () => {
    toggleNewTaskModal();
    toggleOverlay();
    clearModal();
    changeDefaultDueDate();
    focusTaskNameInput();
  };

  addTaskButton.addEventListener('click', () => toggleModal());

  modalCancelButton.addEventListener('click', () => toggleModal());

  newTaskModalOverlay.addEventListener('click', (e) => {
    const clickedElementParent = e.target.offsetParent;
    if (!clickedElementParent || clickedElementParent === newTaskModal) return;
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
