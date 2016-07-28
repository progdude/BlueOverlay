import ClaimsContainer from 'containers/ClaimsContainer';
import Header from './Header';
import Detail from './Detail';

export default (store) => ({
  path: 'member/:memberId/claims/claims-listing',
  childRoutes: [
  	Header(store),
  	Detail(store),
  ], 
  component: ClaimsContainer,
});
