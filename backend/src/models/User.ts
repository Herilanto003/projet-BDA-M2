export interface User {
  name: string;
  email: string;
  password: string;
  isAdmin?: boolean;
}

export interface UserLogin {
  email: string;
  password: string;
}
