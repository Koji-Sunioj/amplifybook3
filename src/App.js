import Routes from "./Routes";
import { createContext, useReducer } from "react";
import { initialState, reducer } from "./reducers/listReducer";

export const ListContext = createContext(null);

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <ListContext.Provider value={{ state, dispatch }}>
      <Routes />
    </ListContext.Provider>
  );
}

export default App;
