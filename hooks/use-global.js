import { useContext } from "react";
import GlobalContext from "context/global-context";

export const useGlobal = () => useContext(GlobalContext);
