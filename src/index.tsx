import React from 'react';
import { render } from 'react-dom';
import '@emotion/core';
import 'styles.css';

import App from 'components/App';

const rootElement = document.getElementById('root');
render(<App />, rootElement);
