//IAuth : Interface for authentication
export interface IAuth {
  _id: string;
  username: string;
  email: string;
  token: any;
}

//IUser : Interface for a user
export interface IUser {
  username: string;
  email: string;
  password: string;
}
