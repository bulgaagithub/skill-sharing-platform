import React, { useState } from "react";

const GlobalContext = React.createContext();

export const GlobalProvider = (props) => {
  
  const [temparticle, setArticle] = useState(null);
  const [loading, setLoading] = useState(false);

  return (
    <GlobalContext.Provider value={{ temparticle, loading, setArticle, setLoading }}>
      {props.children}
    </GlobalContext.Provider>
  );
};

export default GlobalContext;
