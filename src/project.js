const Project = (() => {
  const createEmptyProjectsList = () => {
    if (localStorage.getItem('projects')) return;
    localStorage.setItem('projects', JSON.stringify({}));
  };

  const getProjectsList = () => JSON.parse(localStorage.getItem('projects'));

  const isProjectNameUsed = (newProjectName) => {
    const projectsList = getProjectsList();
    return Object.values(projectsList).includes(newProjectName);
  };

  const addProjectNameToList = (newProjectName) => {
    const projectsList = getProjectsList();
    const projectId = Object.keys(projectsList).length;
    projectsList[projectId] = newProjectName;
    localStorage.setItem('projects', JSON.stringify(projectsList));
  };

  createEmptyProjectsList();

  return { getProjectsList, addProjectNameToList };
})();

export { Project };
