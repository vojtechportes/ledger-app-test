import * as styledComponents from "styled-components";

export const colors = {
  black: "#000000",
  gray1: "#313131",
  gray2: "#D8D8D8",  
  gray3: "#E0E0E0",
  gray4: "#F7F7F7",
  gray5: "#F9F9F9",
  white: "#FFFFFF",
  blue: "#3469e0",
  red: "#b81b44",
  green: "#258b1a"
};

export const theme = {
  colors,
  name: "theme"
};

export type Theme = typeof theme;
export type ThemeProps<P> = styledComponents.ThemedStyledProps<P, Theme>;

const {
  default: styled,
  css,
  keyframes,
  ThemeProvider
} = styledComponents as styledComponents.ThemedStyledComponentsModule<Theme>;

export default styled;
export { css, keyframes, ThemeProvider };