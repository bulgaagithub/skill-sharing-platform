import React, { useState } from "react";

const GlobalContext = React.createContext();

export const GlobalProvider = (props) => {
  
  const [temparticle, setArticle] = useState(null);
  const [activeMenu, setActiveMenu] = useState('article');
  const [loading, setLoading] = useState(false);

  return (
    <GlobalContext.Provider value={{ activeMenu, setActiveMenu, temparticle, loading, setArticle, setLoading }}>
      {props.children}
    </GlobalContext.Provider>
  );
};

export default GlobalContext;
