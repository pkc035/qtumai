import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
const GlobalStyle = createGlobalStyle`
  ${reset};
* {
  box-sizing: border-box;
  font-family: 'Noto Sans KR', sans-serif;
}
button {
  border: none;
  background-color: transparent;
  cursor: pointer;
}
img {
  object-fit: cover;
}
input[type='checkbox'] {
  cursor: pointer;
}
a {
  text-decoration: none;
  cursor: pointer;
}
html {
  overflow-x: hidden;
}
`;
export default GlobalStyle;
