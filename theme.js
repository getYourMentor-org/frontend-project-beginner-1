var toggleSwitch = document.querySelector(
  ".theme-switch toggle-theme-checkbox"
);

const currentTheme = localStorage.getItem("theme")
  ? localStorage.getItem("theme")
  : null;

if (currentTheme) {
  document.documentElement.setAttribute("data-theme", currentTheme);
}
