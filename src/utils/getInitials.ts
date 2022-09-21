const getInitials = (name: string = "") => {
  return name
    .replace(/[^a-zA-Z- ]/g, "")
    .match(/\b\w/g)
    ?.join("")
    .toUpperCase();
};

export default getInitials;
