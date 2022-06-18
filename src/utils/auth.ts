import { useApolloClient } from "@apollo/client";
import { useAuth0 } from "@auth0/auth0-react";
import { useCallback } from "react";

export interface ICachedUser {
  id?: number;
  token?: string;
  type?: string;
}

export function cacheUser(user: Partial<ICachedUser>): void {
  localStorage.setItem('token', user.token || '');
  localStorage.setItem('type', user.type || '');
  localStorage.setItem('id', user.id?.toString() || '');
}

export function getCachedUser(): ICachedUser {
  const token = localStorage.getItem('token');
  const type = localStorage.getItem('type');
  const id = parseInt(localStorage.getItem('id') || '', 10);

  return {
    token: token || undefined,
    type: type || undefined,
    id: id > 0 ? id : undefined,
  };
}

export function clearCachedUser() {
  localStorage.removeItem('token');
  localStorage.removeItem('type');
  localStorage.removeItem('id');
}

/**
 * @see https://www.apollographql.com/docs/react/networking/authentication/#reset-store-on-logout
 */
export function useLogout(): () => void {
  const client = useApolloClient();
  const { logout } = useAuth0();

  return useCallback(async () => {
      clearCachedUser();

      await client.clearStore();

      logout({ returnTo: window.location.origin });
  }, [client, logout]);
}
