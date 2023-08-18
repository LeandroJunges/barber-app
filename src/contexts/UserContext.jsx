import { createContext, useReducer } from "react";
import { UserReducer, initialState } from "../reducers/UserReducer";


export const UserContext = createContext();

export default ({children})=>{
  const [state, dispatch] = useReducer(UserReducer, initialState);
  const [favBarber, setFavBarbar] = useState();
  return (
    <UserContext.Provider value={{state, dispatch}}>
      {children}
    </UserContext.Provider>
  );
}