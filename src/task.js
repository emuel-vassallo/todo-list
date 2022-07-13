function Task(
  id,
  name,
  description,
  dueDate,
  projectId,
  priority,
  isProjectInbox
) {
  this.id = id;
  this.name = name;
  this.description = description;
  this.dueDate = dueDate;
  this.projectId = projectId;
  this.priority = priority;
  this.isProjectInbox = isProjectInbox;
}

export { Task };
