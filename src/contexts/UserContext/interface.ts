import { IUserResponse } from "../../interfaces/IUserResponse";

export interface IauthContext {
  token: string;
  userAdm: IUsercontext;
  handleLogin: (resToken: string, resUser: IUserResponse) => void;
  signed: boolean;
}

export interface IUsercontext {
  admin?: string;
  id?: string;
}

export interface IProvider {
  children: JSX.Element;
}
