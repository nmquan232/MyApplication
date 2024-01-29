import { useReducer } from "react";
import Context from "./Context";
import { rootReducer, initState} from './reducer/rootReducer'

const ContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(rootReducer, initState)
    return (
        <Context.Provider value={[state, dispatch]}>
            {children}
        </Context.Provider>
    )
}

export default ContextProvider