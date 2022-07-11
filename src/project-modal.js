import { ProjectButton } from './project-button.js';
import { Storage } from './storage.js';
import { TaskModal } from './task-modal.js';

function Project(id, name, tasks) {
  this.id = id;
  this.name = name;
  this.tasks = tasks;
}

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
    const projectName = projectNameInput.value;

    const projectId = Storage.getNewProjectId();
    const tasks = [];
    const project = new Project(projectId, projectName, tasks);

    Storage.addProject(project);
    ProjectButton.addProjectButton(projectName);
    TaskModal.addProjectSelectorOption(projectName);

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
})(Project);

export { NewProjectModal };
