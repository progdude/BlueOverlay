import AccumulatorsContainer from 'containers/AccumulatorsContainer';
import Detail from './Detail';

export default (store) => ({
  path: 'member/:memberId/claims/accumulators-listing',
  childRoutes: [Detail(store)],
  component: AccumulatorsContainer,
});
