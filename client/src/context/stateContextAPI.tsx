import React, { createContext, ReactNode, useContext, useState } from 'react';
import { useAccounts, useAddress, useContract, useLogin, useMetamask } from '@thirdweb-dev/react';


const StateContext = createContext({} as any);

export const StateContextProvider = ({ children }: { children: ReactNode }) => {

    const { contract } = useContract("0xE10488fcd9994E1002f38Ffb1E5cE1392473B77c")
    const [newVoter, setNewVoter] = useState({
        isActive: false,
        fName: "",
        lName: "",
        aadhaar: "",
        voterid: "",
        phone: ""
    });

    const connect = useMetamask();
    const address = useAddress();

    return (
        <StateContext.Provider value={
            {
                newVoter,
                setNewVoter,
                connect,
                contract,
                address
            }
        }>
            {children}
        </StateContext.Provider>
    );
};


export const useStateContext = () => useContext(StateContext);