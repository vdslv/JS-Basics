export function createTask(value) {
  if (!value) {
    return;
  }

  return `<div>${value}</div>`;
}
