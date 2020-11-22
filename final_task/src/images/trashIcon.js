export const trashIcon = (id, checked) => `<svg
  width="20"
  height="20"
  class="task__delete-icon"
  xmlns="http://www.w3.org/2000/svg"
  fill-rule="evenodd"
  clip-rule="evenodd"
>
  <path id="task-remove-${id}" class="task__remove-${checked}" d="M19 24h-14c-1.104 0-2-.896-2-2v-16h18v16c0 1.104-.896 2-2 2m3-19h-20v-2h6v-1.5c0-.827.673-1.5 1.5-1.5h5c.825 0 1.5.671 1.5 1.5v1.5h6v2zm-12-2h4v-1h-4v1z" />
</svg>`;
