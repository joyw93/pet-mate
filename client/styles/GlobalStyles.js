import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyles = createGlobalStyle`
    ${reset};
    
* {
  margin: 0;
  padding: 0;
}
body {
  font-family: 'Noto Sans KR', sans-serif; 
  box-sizing: border-box;
  font-size: 0.8rem;
  line-height: 1;
}

ol,
ul {
  list-style: none;
}
blockquote,
q {
  quotes: none;
}
blockquote:before,
blockquote:after,
q:before,
q:after {
  content: '';
  content: none;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
}
input:focus {
  outline: none;
}
a {
  color: #000;
  text-decoration: none;
}
`;

export default GlobalStyles;
