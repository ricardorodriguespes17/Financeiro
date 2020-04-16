import themes from "./themes";

export default function setTheme(theme) {
  const html = document.querySelector("html");
  var userTheme = theme ? theme : localStorage.getItem("userTheme");
  var primaryColor, secundaryColor, tertiaryColor, boxColor;

  try {
    primaryColor = themes[userTheme].primaryColor;
    secundaryColor = themes[userTheme].secundaryColor;
    tertiaryColor = themes[userTheme].tertiaryColor;
    boxColor = themes[userTheme].boxColor;
  } catch (error) {
    primaryColor = themes.green.primaryColor;
    secundaryColor = themes.green.secundaryColor;
    tertiaryColor = themes.green.tertiaryColor;
    boxColor = themes.green.boxColor;
  }

  html.style.setProperty("--primary-color", primaryColor);
  html.style.setProperty("--secundary-color", secundaryColor);
  html.style.setProperty("--tertiary-color", tertiaryColor);
  html.style.setProperty("--box-color", boxColor);
  localStorage.setItem("userTheme", userTheme);
}
