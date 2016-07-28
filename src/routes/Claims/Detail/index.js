import ClaimDetail from 'components/ClaimDetail';

export default (store) => ({
  path: ':claimId/detail/:index',
  component: ClaimDetail,
});
