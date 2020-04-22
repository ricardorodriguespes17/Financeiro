import themes from "./themes";

export default function setTheme(theme) {
  const html = document.querySelector("html");
  var userTheme = theme ? theme : localStorage.getItem("userTheme");
  var primaryColor,
    secundaryColor,
    tertiaryColor,
    boxColor,
    inputEditBg,
    inputEditColor;

  try {
    primaryColor = themes[userTheme].primaryColor;
    secundaryColor = themes[userTheme].secundaryColor;
    tertiaryColor = themes[userTheme].tertiaryColor;
    boxColor = themes[userTheme].boxColor;
    inputEditBg = themes[userTheme].inputEditBg;
    inputEditColor = themes[userTheme].inputEditColor;
  } catch (error) {
    primaryColor = themes.green.primaryColor;
    secundaryColor = themes.green.secundaryColor;
    tertiaryColor = themes.green.tertiaryColor;
    boxColor = themes.green.boxColor;
    inputEditBg = themes.green.inputEditBg;
    inputEditColor = themes.green.inputEditColor;
  }

  html.style.setProperty("--primary-color", primaryColor);
  html.style.setProperty("--secundary-color", secundaryColor);
  html.style.setProperty("--tertiary-color", tertiaryColor);
  html.style.setProperty("--box-color", boxColor);
  html.style.setProperty("--input-edit-bg", inputEditBg);
  html.style.setProperty("--input-edit-color", inputEditColor);
  localStorage.setItem("userTheme", userTheme);
}
