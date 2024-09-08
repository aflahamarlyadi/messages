const lightColors = {
  black: 'rgb(0, 0, 0)',
  white: 'rgb(255, 255, 255)',
  gray: 'rgb(142, 142, 147)',
  red: 'rgb(255, 59, 48)',
  orange: 'rgb(255, 149, 0)',
  yellow: 'rgb(255, 204, 0)',
  green: 'rgb(52, 199, 89)',
  mint: 'rgb(0, 199, 190)',
  teal: 'rgb(48, 176, 199)',
  cyan: 'rgb(50, 173, 230)',
  blue: 'rgb(0, 122, 255)',
  indigo: 'rgb(88, 86, 214)',
  purple: 'rgb(175, 82, 222)',
  pink: 'rgb(255, 45, 85)',
  brown: 'rgb(162, 132, 94)',
};

const darkColors = {
  black: 'rgb(0, 0, 0)',
  white: 'rgb(255, 255, 255)',
  gray: 'rgb(142, 142, 147)',
  red: 'rgb(255, 69, 58)',
  orange: 'rgb(255, 159, 10)',
  yellow: 'rgb(255, 214, 10)',
  green: 'rgb(48, 209, 88)',
  mint: 'rgb(99, 230, 226)',
  teal: 'rgb(64, 200, 224)',
  cyan: 'rgb(100, 210, 255)',
  blue: 'rgb(10, 132, 255)',
  indigo: 'rgb(94, 92, 230)',
  purple: 'rgb(191, 90, 242)',
  pink: 'rgb(255, 55, 95)',
  brown: 'rgb(172, 142, 104)',
};

export default {
  light: {
    ...lightColors,
    text: lightColors.black,
    background: lightColors.white,
    tint: lightColors.blue,
    tabIconDefault: lightColors.gray,
    tabIconSelected: lightColors.blue,
  },
  dark: {
    ...darkColors,
    text: darkColors.white,
    background: darkColors.black,
    tint: darkColors.blue,
    tabIconDefault: darkColors.gray,
    tabIconSelected: darkColors.blue,
  },
};
