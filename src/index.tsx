import React, { FunctionComponent } from 'react';
import ReactDOM from 'react-dom';
import { setConfig } from 'react-hot-loader';

import './index.css';
import App from './App';

setConfig({
  ignoreSFC: true,
  pureRender: true,
});

const Root: FunctionComponent = () => <App />;

ReactDOM.render(<Root />, document.getElementById('root'));
