export interface User {
  email: string;
  fullName: string;
  id: string;
}

export function UserMock(): User {
  return {
    email: 'frodo@baggins.com',
    fullName: 'Frodo Baggins',
    id: '12345'
  };
}
