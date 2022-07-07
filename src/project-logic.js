const ProjectLogic = (() => {
  const createEmptyProjectsList = () => {
    if (localStorage.getItem('projects')) return;
    localStorage.setItem('projects', JSON.stringify({}));
  };

  const getProjectsList = () => JSON.parse(localStorage.getItem('projects'));

  const addProjectNameToList = (newProjectName) => {
    const projectsList = getProjectsList();
    const projectId = Object.keys(projectsList).length;
    projectsList[projectId] = newProjectName;
    localStorage.setItem('projects', JSON.stringify(projectsList));
  };

  const updateProjectIds = () => {
    const oldProjectsList = getProjectsList();
    const oldProjectsListArray = Object.values(oldProjectsList);
    const projectsListLength = Object.keys(oldProjectsListArray).length;
    const newProjectsList = {};

    for (let i = 0; i < projectsListLength; i++)
      newProjectsList[i] = oldProjectsListArray[i];

    localStorage.setItem('projects', JSON.stringify(newProjectsList));
  };

  const removeProjectFromList = (projectButtonId) => {
    const projectsList = getProjectsList();
    delete projectsList[projectButtonId];
    localStorage.setItem('projects', JSON.stringify(projectsList));
  };

  createEmptyProjectsList();

  return {
    getProjectsList,
    addProjectNameToList,
    updateProjectIds,
    removeProjectFromList,
  };
})();

export { ProjectLogic };
