import { Project } from './project.js';
import { format } from 'date-fns';

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
    const projects = isProjectInbox ? getDefaultProjects() : getProjects();
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

  const updateTaskProjectIds = () => {
    const projectList = getProjects();
    for (let i = 0; i < projectList.length; i++) {
      const project = projectList[i];
      const projectId = project.id;
      const projectTasks = project.tasks;
      for (const task of projectTasks) task.projectId = projectId;
    }
    updateProjectList(projectList);
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

  const updateTaskIds = (projectId, isProjectInbox) => {
    const projectList = isProjectInbox ? getDefaultProjects() : getProjects();
    const project = projectList[projectId];
    const tasks = project.tasks;
    for (let i = 0; i < tasks.length; i++) tasks[i].id = i;
    isProjectInbox
      ? updateDefaultProjectList(projectList)
      : updateProjectList(projectList);
  };

  const addTaskToProject = (task) => {
    const dueDateValue = task.dueDate;
    const taskDueDate = dueDateValue === null ? null : dueDateValue;

    // Add task to 'Today' or 'Upcoming'.
    if (dueDateValue !== null && taskDueDate !== null) {
      console.log('Adding to today/upcoming');
      const defaultProjectList = getDefaultProjects();
      const taskDefaultProjectId = task.defaultProjectId;

      const taskProject = defaultProjectList[taskDefaultProjectId];
      taskProject.tasks = [...taskProject.tasks, task];
      updateDefaultProjectList(defaultProjectList);
    }

    const isProjectInbox = task.isProjectInbox;
    const projects = isProjectInbox ? getDefaultProjects() : getProjects();

    const taskProject = projects[task.projectId];
    if (isProjectInbox) {
      taskProject.tasks = [...taskProject.tasks, task];
      updateDefaultProjectList(projects);
      return;
    }
    updateProjectList(projects);
  };

  const removeTaskFromProject = (projectId, taskId, isProjectInbox) => {
    const projectList = isProjectInbox ? getDefaultProjects() : getProjects();
    const project = projectList[projectId];
    const tasks = project.tasks;
    tasks.splice(taskId, 1);
    updateTaskIds(projectId, taskId, isProjectInbox);
    isProjectInbox
      ? updateDefaultProjectList(projectList)
      : updateProjectList(projectList);
  };

  createEmptyProjectLists();
  addEmptyDefaultProjectsLists();

  return {
    addProject,
    addTaskToProject,
    getDefaultProjects,
    getNewProjectId,
    getNewTaskId,
    getProjects,
    removeProject,
    updateProjectIds,
    removeTaskFromProject,
    updateTaskProjectIds,
  };
})();

export { Storage };
