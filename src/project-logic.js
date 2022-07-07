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

  // const deleteProjectFromList = (projectButtonId) => {
  //   const projectsList = getProjectsList();
  //   delete projectsList[projectButtonId];
  //   console.log( projectsList );
  //   localStorage.setItem('projects', JSON.stringify(projectsList));
  //   const newProjectsList = getProjectsList();
  //   console.log( newProjectsList );
  // };

  createEmptyProjectsList();

  return { getProjectsList, addProjectNameToList };
})();

export { ProjectLogic };
