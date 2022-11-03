import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
 * {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-size: 100%;
	font: inherit;
	vertical-align: baseline;
 }

 html {
  font-size: 10px;
 }

  body {
	  line-height: 1;
  }

  ol, ul {
	list-style: none;
  }

  blockquote, q {
	  quotes: none;
  }

  blockquote:before, blockquote:after,
  q:before, q:after {
	  content: '';
	  content: none;
  }

  table {
	  border-collapse: collapse;
	  border-spacing: 0;
  }

  button {
    cursor: pointer;
  }

  input:focus {
    outline: none;
  }

  a {
    color: #000;
    text-decoration: none;
  }

  .markdown-body {
		box-sizing: border-box;
		min-width: 200px;
		max-width: 980px;
		margin: 0 auto;
		padding: 45px;
	}

	@media (max-width: 767px) {
		.markdown-body {
			padding: 15px;
		}
	}
`;

export default GlobalStyle;
