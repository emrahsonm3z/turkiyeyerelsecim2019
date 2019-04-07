import React, { FunctionComponent } from 'react';
import { hot } from 'react-hot-loader';

import ElectionResultsMap from './routes/ElectionResultsMap';

const App: FunctionComponent = () => <ElectionResultsMap />;

export default hot(module)(App);
