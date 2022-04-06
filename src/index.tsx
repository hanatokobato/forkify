import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { Auth0Provider } from '@auth0/auth0-react';
import { AuthContextProvider } from './context/AuthContext';
import ApolloWrapper from './components/ApolloWrapper';

ReactDOM.render(
  <BrowserRouter>
    <Auth0Provider
      domain={process.env.REACT_APP_AUTH0_DOMAIN ?? ''}
      clientId={process.env.REACT_APP_AUTH0_CLIENT_ID ?? ''}
      redirectUri={window.location.origin}
      audience={process.env.REACT_APP_AUTH0_AUDIENCE ?? ''}
    >
      <AuthContextProvider>
        <ApolloWrapper>
          <App />
        </ApolloWrapper>
      </AuthContextProvider>
    </Auth0Provider>
  </BrowserRouter>,
  document.getElementById('root')
);
