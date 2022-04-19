import { withAuthenticationRequired } from '@auth0/auth0-react';

const ProtectedComponent = ({ children }: any) => {
  return children;
};

export default withAuthenticationRequired(ProtectedComponent);
