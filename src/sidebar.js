const toggleProjectsVisibility = () => {
  const sidebarProjectsButton = document.querySelector(
    '.sidebar-projects-button'
  );
  const arrow = document.querySelector('.sidebar-projects-arrow-icon');

  sidebarProjectsButton.addEventListener('click', () => {
    arrow.classList.toggle('expanded');
  });
};

const getSidebarButtons = () => document.querySelectorAll('.sidebar-button');

const removeSelectedClass = () => {
  const sidebarButtons = getSidebarButtons();
  for (const button of sidebarButtons) button.classList.remove('selected');
};

const addSelectedClassOnClick = () => {
  const sidebarButtons = getSidebarButtons();
  for (const button of sidebarButtons) {
    button.addEventListener('click', () => {
      removeSelectedClass();
      button.classList.add('selected');
    });
  }
};

export { toggleProjectsVisibility, addSelectedClassOnClick, getSidebarButtons };
