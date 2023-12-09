import React, { createContext, ReactNode, useContext, useState } from 'react';
import { CeloAlfajoresTestnet } from "@thirdweb-dev/chains";
import { ThirdwebSDK } from "@thirdweb-dev/sdk";


const StateContext = createContext({} as any);

export const StateContextProvider = ({ children }: { children: ReactNode }) => {

    const [newVoter, setNewVoter] = useState({
        isActive: false,
        fName: "",
        lName: "",
        aadhaar: "",
        voterid: "",
        phone: ""
    });

    // If used on the FRONTEND pass your 'clientId'
    const sdk = new ThirdwebSDK(CeloAlfajoresTestnet, {
        clientId: `${process.env.REACT_THIRD_WEB_CLIENT_ID}`,
    });
    const getContract = async () => {
        const contract = await sdk.getContract("0xE10488fcd9994E1002f38Ffb1E5cE1392473B77c");
        return contract;
    }

    return (
        <StateContext.Provider value={
            {
                newVoter,
                setNewVoter,
                getContract,
                // metamask
            }
        }>
            {children}
        </StateContext.Provider>
    );
};


export const useStateContext = () => useContext(StateContext);