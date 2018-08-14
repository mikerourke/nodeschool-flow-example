// @flow
import 'whatwg-fetch';
import React from 'react';
import { render } from 'react-dom';
import { Container } from 'bloomer';
import 'bulma/css/bulma.min.css';
import './index.css';
import initInterceptor from './utils/httpInterceptor';
import App from './components/App';

initInterceptor();

const rootElement = document.getElementById('root');
if (rootElement) {
  render(
    <Container>
      <App />
    </Container>,
    rootElement,
  );
}

// This throws an error because it may be null:
// render(
//   <Container>
//     <App />
//   </Container>,
//   rootElement,
// );
