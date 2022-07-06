import { ProjectButton } from './project-button.js';
import { Project } from './project.js';

const NewProjectModal = (() => {
  const addProjectButton = document.querySelector('.add-project-button');
  const newProjectModal = document.querySelector('.add-project-modal');
  const newProjectForm = document.querySelector('#add-project-form');
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
  const resetForm = () => newProjectForm.reset();
  const focusInput = () => projectNameInput.focus();

  // Submit Button
  const enableSubmitButton = () => (submitButton.disabled = false);
  const disableSubmitButton = () => (submitButton.disabled = true);

  const toggleModal = () => {
    toggleModalOverlay();
    toggleNewProjectModal();
    resetForm();
    disableSubmitButton();
    focusInput();
  };

  const addProjectOnSubmit = () => {
    const newProjectName = projectNameInput.value;
    if (!newProjectName) return;
    ProjectButton.addProjectButton(newProjectName);
    Project.addProjectNameToList(newProjectName);
    toggleModal();
  };

  // Event Listeners

  addProjectButton.addEventListener('mouseup', () => toggleModal());
  modalCancelButton.addEventListener('click', () => toggleModal());
  projectNameInput.addEventListener('input', () => {
    if (projectNameInput.value) {
      enableSubmitButton();
      return;
    }
    disableSubmitButton();
  });

  submitButton.addEventListener('click', () => addProjectOnSubmit());
  newProjectForm.addEventListener('submit', (e) => {
    e.preventDefault();
    addProjectOnSubmit();
  });
})();

export { NewProjectModal };
