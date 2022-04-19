import React from 'react';
import { withAuthenticationRequired } from '@auth0/auth0-react';
import ProtectedComponent from './ProtectedComponent';

const ProtectedRoute = ({ children }: any) => (
  <ProtectedComponent>{children}</ProtectedComponent>
);

export default ProtectedRoute;
