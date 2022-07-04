import { useAuth0 } from '@auth0/auth0-react';
import { createContext, ReactNode, useEffect, useState } from 'react';
import JwtDecode from 'jwt-decode';
import { cacheUser } from '../utils/auth';

export const USER = 'user';
export const ADMIN = 'admin';

type UserTypes = 'user' | 'admin';

interface CurrentUser {
  id: number;
  type: UserTypes;
  token: string;
}

interface AuthContext {
  currentUser?: CurrentUser;
}

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const AuthContext = createContext<AuthContext>({
  currentUser: {
    id: 0,
    type: 'user',
    token: '',
  },
});

export interface JwtToken {
  exp: number;
  'https://hasura.io/jwt/claims': {
    'x-hasura-default-role': UserTypes;
    'x-hasura-allowed-roles': UserTypes[];
    'x-hasura-user-id': string;
    'x-auth0-user-id': string;
    'x-hasura-role': UserTypes;
  };
}

interface AuthContextProviderProps {
  children: ReactNode;
}

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const { getAccessTokenSilently, user } = useAuth0();
  const [currentUser, setCurrentUser] = useState<CurrentUser>();

  useEffect(() => {
    const initialize = async () => {
      if (!user) {
        return;
      }

      const jwtToken = await getAccessTokenSilently();
      const decodedToken = JwtDecode<JwtToken>(jwtToken);
      const claims = decodedToken['https://hasura.io/jwt/claims'];
      const role = claims['x-hasura-role'];
      const userId = parseInt(claims['x-hasura-user-id']);

      const newUser: CurrentUser = {
        id: userId,
        type: role,
        token: jwtToken,
      };

      cacheUser(newUser);

      setCurrentUser(newUser);
    };

    initialize();
  }, [user, getAccessTokenSilently]);

  return (
    <AuthContext.Provider value={{ currentUser: currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};
