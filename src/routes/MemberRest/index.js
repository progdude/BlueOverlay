import MemberContainer from './containers/MemberContainer';
export default (store) => ({
  path: 'member/:memberId/*',
  component: MemberContainer,
});
