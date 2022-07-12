function Task(id, name, description, dueDate, projectId, priority, isProjectDefault) {
  this.id = id;
  this.name = name;
  this.description = description;
  this.dueDate = dueDate;
  this.projectId = projectId;
  this.priority = priority;
  this.isProjectDefault = isProjectDefault;
}

export { Task };
