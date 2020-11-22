function sorter(arr, str) {
  switch (str) {
    case "desc":
      arr.sort((a, b) => b.dateCreated - a.dateCreated);
      break;
    case "asc":
      arr.sort((a, b) => a.dateCreated - b.dateCreated);
      break;
    case "done-desc":
      arr.sort((a, b) => b.dueDate - a.dueDate);
      break;
    case "done-asc":
      arr.sort((a, b) => a.dueDate - b.dueDate);
      break;
    case "text-asc":
      arr.sort((a, b) => a.value.localeCompare(b.value)).reverse();
      break;
    case "text-desc":
      arr.sort((a, b) => a.value.localeCompare(b.value));
      break;
  }
  return arr;
}

export function handleSorting(element, arrayToSort) {
  let sortedArray;
  switch (element.value) {
    case "Date creation (Desc)":
      sortedArray = sorter(arrayToSort, "desc");
      break;
    case "Date creation (Asc)":
      sortedArray = sorter(arrayToSort, "asc");
      break;
    case "Date completed (Desc)":
      sortedArray = sorter(arrayToSort, "done-desc");
      break;
    case "Date completed (Asc)":
      sortedArray = sorter(arrayToSort, "done-asc");
      break;
    case "Text (Desc)":
      sortedArray = sorter(arrayToSort, "text-desc");
      break;
    case "Text (Asc)":
      sortedArray = sorter(arrayToSort, "text-asc");
      break;
  }
  return sortedArray;
}
