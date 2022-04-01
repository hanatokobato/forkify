import { useAuth0 } from '@auth0/auth0-react';
import { createContext, ReactNode, useEffect, useState } from 'react';
import JwtDecode from 'jwt-decode';

type UserTypes = 'user';

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

interface JwtToken {
  'https://hasura.io/jwt/claims': {
    'x-hasura-default-role': UserTypes;
    'x-hasura-allowed-roles': UserTypes[];
    'x-hasura-user-id': string;
    'x-auth0-user-id': string;
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
      const role = claims['x-hasura-allowed-roles'][0];
      const userId = parseInt(claims['x-hasura-user-id']);

      const newUser: CurrentUser = {
        id: userId,
        type: role,
        token: jwtToken,
      };

      setCurrentUser(newUser);
    };

    initialize();
  }, [user]);

  return (
    <AuthContext.Provider value={{ currentUser: currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};
