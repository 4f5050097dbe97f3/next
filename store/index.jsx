import React, { createContext, useReducer, useContext } from 'react';

const initial = {
    isLogged: false,
    roomId: null
}

const reducer = (state, action) => {
    switch (action.type) {
        case 'log':
            return { isLogged: true, roomId: action.payload }
        default:
            return state
    }
}

const GlobalContext = createContext()

export function GlobalState({ children }) {
    const [state, dispatch] = useReducer(reducer, initial)

    return (
        <GlobalContext.Provider value={[state, dispatch]}>
            {children}
        </GlobalContext.Provider>
    )
}

export default function useGlobalState() {
    return useContext(GlobalContext)
}

