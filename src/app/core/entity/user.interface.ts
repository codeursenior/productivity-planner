export interface User {
  id: string;
  name: string;
  email: string;
}

export type Visitor = Omit<User, 'id'> & { password: string };
