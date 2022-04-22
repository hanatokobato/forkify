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
