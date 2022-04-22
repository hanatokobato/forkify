import { ApolloProvider } from '@apollo/client';
import React, { useContext } from 'react';
import makeApolloClient from '../../apollo';
import { AuthContext } from '../../context/AuthContext';
import { getCachedUser } from '../../utils/auth';

interface Props {
  children: React.ReactNode;
}

const ApolloWrapper = (props: Props) => {
  const { token } = getCachedUser();
  const client = makeApolloClient(token);

  return <ApolloProvider client={client}>{props.children}</ApolloProvider>;
};

export default ApolloWrapper;
