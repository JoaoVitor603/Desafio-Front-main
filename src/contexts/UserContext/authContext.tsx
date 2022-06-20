/* eslint-disable react/jsx-filename-extension */
import React, { createContext, useEffect, useState } from "react";
import { IUserResponse } from "../../interfaces/IUserResponse";
import { IauthContext, IUsercontext, IProvider } from "./interface";
import toastMsg, { ToastType } from "../../utils/toastMsg";

export const AuthContext = createContext<IauthContext>({} as IauthContext);

export const AuthProvider = ({ children }: IProvider): React.ReactElement => {
  const [token, setToken] = useState<string>("");
  const [userAdm, setUserAdm] = useState<IUsercontext>({} as IUsercontext);

  useEffect(() => {
    const userToken = localStorage.getItem("userToken");
    const userPermission = localStorage.getItem("userPermission");
    const userId = localStorage.getItem("userID");
    if (userToken) {
      setToken(userToken);
      setUserAdm({
        id: userId,
        admin: userPermission,
      });
    }
  }, []);

  const handleLogin = (resToken: string, resUser: IUserResponse): void => {
    try {
      setToken(resToken);
      setUserAdm({
        id: resUser.id,
        admin: resUser.permission ? "Administrador" : "Coloborador",
      });
      localStorage.setItem("userToken", resToken);
      localStorage.setItem(
        "userPermission",
        resUser.permission ? "Administrador" : "Coloborador"
      );

      localStorage.setItem("userID", resUser.id);
    } catch (error) {
      toastMsg(ToastType.Error, (error as Error).message);
    }
  };

  return (
    <AuthContext.Provider
      value={{ token, handleLogin, userAdm, signed: !!token }}
    >
      {children}
    </AuthContext.Provider>
  );
};
