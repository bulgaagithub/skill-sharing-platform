import React, { useState } from "react";

const AuthContext = React.createContext();

export const AuthProvider = (props) => {
  
  const [auth, setAuth] = useState(null);

  const storeAuth = (token, user) => {
      localStorage.setIem('token', JSON.stringify(token));
      localStorage.setIem('_u_', JSON.stringify(user._id));
      setAuth({
          token,
          user
      });
  }

  const getAuth = () => {
    const tokenString = localStorage.getItem('token')
    const _u_ = localStorage.getItem('_u_')
    const userToken = JSON.parse(tokenString)
    const auth = {
        token: userToken?.token,
        user: _u_
    }
    return auth
  }

  return (
    <AuthContext.Provider value={{ auth, storeAuth, getAuth }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
