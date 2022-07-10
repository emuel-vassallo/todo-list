const Storage = (() => {
  const createEmptyProjectsList = () => {
    if (localStorage.getItem('projects')) return;
    localStorage.setItem('projects', JSON.stringify({}));
  };

  const getProjects = () => JSON.parse(localStorage.getItem('projects'));

  const addProject = (newProjectName) => {
    const projectsList = getProjects();
    const projectId = Object.keys(projectsList).length;
    projectsList[projectId] = newProjectName;
    localStorage.setItem('projects', JSON.stringify(projectsList));
  };

  const updateProjectIds = () => {
    const oldProjectsList = getProjects();
    const oldProjectsListArray = Object.values(oldProjectsList);
    const projectsListLength = Object.keys(oldProjectsListArray).length;
    const newProjectsList = {};

    for (let i = 0; i < projectsListLength; i++)
      newProjectsList[i] = oldProjectsListArray[i];

    localStorage.setItem('projects', JSON.stringify(newProjectsList));
  };

  const removeProject = (projectButtonId) => {
    const projectsList = getProjects();
    delete projectsList[projectButtonId];
    localStorage.setItem('projects', JSON.stringify(projectsList));
  };

  createEmptyProjectsList();

  return {
    getProjects,
    addProject,
    updateProjectIds,
    removeProject,
  };
})();

export { Storage };
