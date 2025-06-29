export interface IAuthResponse {
  access_token: string;
}

export interface IAuthRequestLoginGoogle {
  access_token: string;
}
export interface IAuthRequest {
  username: string;
  password: string;
}

export interface IAuthLogoutResponse {
  message: string;
}
