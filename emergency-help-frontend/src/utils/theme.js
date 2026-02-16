export const setTheme = (mode) => {
  if (mode === "dark") {
    document.body.classList.add("dark");
    localStorage.setItem("theme", "dark");
  } else {
    document.body.classList.remove("dark");
    localStorage.setItem("theme", "light");
  }
};

export const getTheme = () => {
  return localStorage.getItem("theme") || "light";
};
