import React, { FunctionComponent } from 'react';

import { reproduceElectionResults } from './func';

const ElectionResultsMap: FunctionComponent = () => {
  reproduceElectionResults();
  return <span>ElectionResultsMap</span>;
};

export default ElectionResultsMap;
