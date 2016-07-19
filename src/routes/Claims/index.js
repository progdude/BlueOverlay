import ClaimsContainer from 'containers/ClaimsContainer';
import Detail from './Detail';

export default (store) => ({
  path: 'member/:memberId/claims/claims-listing',
  childRoutes: [Detail(store)],
  component: ClaimsContainer,
});
