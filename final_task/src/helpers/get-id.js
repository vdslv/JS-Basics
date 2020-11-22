export const getId = (e) => Number(e.id.split("-")[2]);

export const getIndex = (arr, id) =>
  arr.findIndex((el) => el.id === Number(id));
