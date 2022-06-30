const toggleProjectsVisibility = () => {
  const sidebarProjectsButton = document.querySelector(
    '.sidebar-projects-button'
  );
  const arrow = document.querySelector('.sidebar-projects-arrow-icon');

  sidebarProjectsButton.addEventListener('click', () => {
    arrow.classList.toggle('expanded');
  });
};

export default toggleProjectsVisibility;
