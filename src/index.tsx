import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { Auth0Provider } from '@auth0/auth0-react';
import { AuthContextProvider } from './context/AuthContext';
import ApolloWrapper from './components/ApolloWrapper';
import { Provider } from 'react-redux';
import { store } from './store';
import Auth0ProviderWithHistory from './components/Auth0ProviderWithHistory';

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Auth0ProviderWithHistory>
        <AuthContextProvider>
          <ApolloWrapper>
            <App />
          </ApolloWrapper>
        </AuthContextProvider>
      </Auth0ProviderWithHistory>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
