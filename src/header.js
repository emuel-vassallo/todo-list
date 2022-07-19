const Header = (() => {
  const addTaskButton = document.querySelector(
    '.header-button.add-task-button'
  );
  const resetDataButton = document.querySelector('.reset-data-button');

  const disableAddTaskButton = () => (addTaskButton.disabled = true);
  const enableAddTaskButton = () => (addTaskButton.disabled = false);

  resetDataButton.addEventListener('click', () => {
    localStorage.clear();
    location.reload();
  });

  return { disableAddTaskButton, enableAddTaskButton };
})();

export { Header };
