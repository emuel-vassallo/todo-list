import { Project } from './project.js';

const Storage = (() => {
  const createEmptyProjectLists = () => {
    if (localStorage.getItem('defaultProjects')) return;
    localStorage.setItem('defaultProjects', JSON.stringify([]));
    if (localStorage.getItem('projects')) return;
    localStorage.setItem('projects', JSON.stringify([]));
  };

  const getProjects = () => {
    if (localStorage.getItem('projects') === null) return [];
    return JSON.parse(localStorage.getItem('projects'));
  };

  const getDefaultProjects = () =>
    JSON.parse(localStorage.getItem('defaultProjects'));

  const getNewProjectId = () => Object.keys(getProjects()).length;

  const getNewTaskId = (projectId, isProjectInbox) => {
    let projects;
    if (isProjectInbox) projects = getDefaultProjects();
    else projects = getProjects();
    const project = projects[projectId];
    const projectTasks = project.tasks;
    return projectTasks.length;
  };

  const updateProjectList = (newProjectList) =>
    localStorage.setItem('projects', JSON.stringify(newProjectList));

  const updateDefaultProjectList = (newProjectList) =>
    localStorage.setItem('defaultProjects', JSON.stringify(newProjectList));

  const addEmptyDefaultProjectsLists = () => {
    let defaultProjects = getDefaultProjects();
    if (defaultProjects.length > 0) return;

    const tabNames = ['Inbox', 'Today', 'Upcoming'];

    for (let i = 0; i < tabNames.length; i++) {
      const projectId = i;
      const projectName = tabNames[i];
      const tasks = [];
      const project = new Project(projectId, projectName, tasks);

      defaultProjects = [...defaultProjects, project];
    }

    updateDefaultProjectList(defaultProjects);
  };

  const addProject = (newProject) => {
    let projects = getProjects();
    const parsedNewProject = JSON.parse(JSON.stringify(newProject));
    projects = [...projects, parsedNewProject];
    updateProjectList(projects);
  };

  const removeProject = (id) => {
    let projectList = getProjects();
    projectList.splice(id, 1);
    updateProjectList(projectList);
  };

  const updateProjectIds = () => {
    const projects = getProjects();
    for (let i = 0; i < projects.length; i++) projects[i].id = i;
    updateProjectList(projects);
  };

  const addTaskToProject = (task) => {
    const isProjectInbox = task.isProjectInbox;
    let projectList;
    if (isProjectInbox) projectList = getDefaultProjects();
    else projectList = getProjects();

    const taskProject = projectList[task.projectId];
    taskProject.tasks = [...taskProject.tasks, task];
    if (isProjectInbox) {
      updateDefaultProjectList(projectList);
      return;
    }
    updateProjectList(projectList);
  };

  createEmptyProjectLists();
  addEmptyDefaultProjectsLists();

  return {
    addProject,
    getNewProjectId,
    getNewTaskId,
    getProjects,
    getDefaultProjects,
    removeProject,
    updateProjectIds,
    addTaskToProject,
  };
})();

export { Storage };
