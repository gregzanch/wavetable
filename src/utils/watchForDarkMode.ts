export function watchForDarkMode() {
  const colorSchemeQuery = window.matchMedia("(prefers-color-scheme: dark)");
  function handleColorSchemeChange(
    event: MediaQueryListEvent | MediaQueryList
  ) {
    if (event.matches) {
      document.body.setAttribute("theme", "dark");
    } else {
      document.body.setAttribute("theme", "light");
    }
  }

  // Initial check
  handleColorSchemeChange(colorSchemeQuery);

  // Listen for changes
  colorSchemeQuery.addEventListener("change", handleColorSchemeChange);
}
