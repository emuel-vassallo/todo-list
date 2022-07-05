const NewProjectModal = (() => {
  const addProjectButton = document.querySelector('.add-project-button');
  const newProjectModal = document.querySelector('.add-project-modal');
  const projectNameInput = document.querySelector('#project_name');
  const modalCancelButton = document.querySelector(
    '.add-project-modal .cancel-button'
  );
  const submitButton = document.querySelector('.add-project-submit-button');
  const newProjectModalOverlay = document.querySelector(
    '.add-project-modal-overlay '
  );

  // Modal
  const toggleNewProjectModal = () =>
    newProjectModal.classList.toggle('visible');
  const toggleModalOverlay = () =>
    newProjectModalOverlay.classList.toggle('visible');
  const clearModal = () => (projectNameInput.textContent = '');

  // Submit Button
  const enableSubmitButton = () => (submitButton.disabled = false);
  const disableSubmitButton = () => (submitButton.disabled = true);

  const toggleModal = () => {
    toggleNewProjectModal();
    toggleModalOverlay();
    clearModal();
    disableSubmitButton();
  };

  addProjectButton.addEventListener('click', () => toggleModal());
  modalCancelButton.addEventListener('click', () => toggleModal());
  projectNameInput.addEventListener('input', () => {
    if (projectNameInput.value) {
      enableSubmitButton();
      return;
    }
    disableSubmitButton();
  });
})();

export { NewProjectModal };
