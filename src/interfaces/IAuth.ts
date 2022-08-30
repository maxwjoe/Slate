//IAuth : Interface for authentication
export interface IAuth {
  _id: string;
  username: string;
  email: string;
  profileImage: string;
  password?: string;
  token: any;
  OAuthID?: string;
  themeAccent?: string;
  preferredTheme?: string;
}
