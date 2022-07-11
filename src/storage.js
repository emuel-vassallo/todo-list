const Storage = (() => {
  const createEmptyProjectList = () => {
    if (localStorage.getItem('projects')) return;
    localStorage.setItem('projects', JSON.stringify([]));
  };

  const getProjects = () => {
    if (localStorage.getItem('projects') === null) return [];
    return JSON.parse(localStorage.getItem('projects'));
  };

  const getNewProjectId = () => Object.keys(getProjects()).length;

  const updateProjectList = (newProjectList) =>
    localStorage.setItem('projects', JSON.stringify(newProjectList));

  const addProject = (newProject) => {
    let projects = getProjects();
    // console.log(projects);
    const parsedNewProject = JSON.parse(JSON.stringify(newProject));
    projects = [...projects, parsedNewProject];
    // console.log({ newProject, projects });
    updateProjectList(projects);
  };

  const removeProject = (id) => {
    let projectList = getProjects();
    projectList.splice(id, 1);
    updateProjectList(projectList);
  };

  const updateProjectIds = () => {
    const projects = getProjects();

    for (let i = 0; i < projects.length; i++) {
      const project = projects[i];
      project.id = i;
    }

    updateProjectList(projects);
  };

  createEmptyProjectList();

  return {
    addProject,
    getNewProjectId,
    getProjects,
    removeProject,
    updateProjectIds,
  };
})();

export { Storage };
