import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

interface Props {
  className?: string;
}

const LogoutButton = ({ className }: Props) => {
  const { logout } = useAuth0();

  return (
    <button
      className={className}
      onClick={() => logout({ returnTo: window.location.origin })}
    >
      Log Out
    </button>
  );
};

export default LogoutButton;
