import { ApolloProvider } from '@apollo/client';
import React, { useContext } from 'react';
import makeApolloClient from '../../apollo';
import { AuthContext } from '../../context/AuthContext';

interface Props {
  children: React.ReactNode;
}

const ApolloWrapper = (props: Props) => {
  const authCtx = useContext(AuthContext);
  const authToken = authCtx.currentUser?.token;
  const client = makeApolloClient(authToken);

  return <ApolloProvider client={client}>{props.children}</ApolloProvider>;
};

export default ApolloWrapper;
