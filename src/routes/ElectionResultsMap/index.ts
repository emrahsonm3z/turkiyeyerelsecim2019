import Loadable from 'react-loadable';

import Loading from '../../components/Loading';

const ElectionResultsMap = Loadable({
  loader: () => import('./ElectionResultsMap'),
  loading: Loading as any,
});

export default ElectionResultsMap;
