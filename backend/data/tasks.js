let tasks = [
  { id: 1, title: "Task One", description: 'Task one desc', status: "pending", created_at: new Date() },
  { id: 2, title: "Task Two", description: 'Task two desc', status: "done", created_at: new Date() },
  { id: 3, title: "Task Three", description: 'Complete project documentation', status: "pending", created_at: new Date() },
  { id: 4, title: "Task Four", description: 'Review code changes', status: "in progress", created_at: new Date() },
  { id: 5, title: "Task Five", description: 'Design user interface', status: "pending", created_at: new Date() },
  { id: 6, title: "Task Six", description: 'Fix bug in login system', status: "done", created_at: new Date() },
  { id: 7, title: "Task Seven", description: 'Write unit tests', status: "in progress", created_at: new Date() },
  { id: 8, title: "Task Eight", description: 'Deploy to production', status: "pending", created_at: new Date() },
  { id: 9, title: "Task Nine", description: 'Update dependencies', status: "done", created_at: new Date() },
  { id: 10, title: "Task Ten", description: 'Create API documentation', status: "pending", created_at: new Date() },
  { id: 11, title: "Task Eleven", description: 'Optimize database queries', status: "in progress", created_at: new Date() },
  { id: 12, title: "Task Twelve", description: 'Setup CI/CD pipeline', status: "done", created_at: new Date() },
  { id: 13, title: "Task Thirteen", description: 'Implement authentication', status: "pending", created_at: new Date() },
  { id: 14, title: "Task Fourteen", description: 'Create user dashboard', status: "in progress", created_at: new Date() },
  { id: 15, title: "Task Fifteen", description: 'Test mobile responsiveness', status: "done", created_at: new Date() },
  { id: 16, title: "Task Sixteen", description: 'Write technical specs', status: "pending", created_at: new Date() },
  { id: 17, title: "Task Seventeen", description: 'Refactor legacy code', status: "in progress", created_at: new Date() },
  { id: 18, title: "Task Eighteen", description: 'Setup monitoring tools', status: "done", created_at: new Date() },
  { id: 19, title: "Task Nineteen", description: 'Create backup system', status: "pending", created_at: new Date() },
  { id: 20, title: "Task Twenty", description: 'Performance testing', status: "in progress", created_at: new Date() }
];

module.exports = {
  getAll: () => tasks,
  setAll: (newTasks) => { tasks = newTasks; },
};