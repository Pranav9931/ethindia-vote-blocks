import { useEffect, useState } from 'react';
import styled from 'styled-components';

import { useContractRead } from "@thirdweb-dev/react";

import "./index.css";
import { useStateContext } from '../context/stateContextAPI';

// Connection to the server..
import io from 'socket.io-client';
import { Typography } from '@mui/material';
import { PartyDetails } from '../components';
const socket = io('http://localhost:3001');

const Home = styled.div`
    flex: 1;
    // padding: 10px;
`;

const VoterInfo = styled.div`
    background: #f2f2f2;
    padding: 10px;
`;

const VotetStatus = styled.div`
    background: #fcff5230;
    height: 50px;
    display: flex;
    align-items: center;
    padding: 0 10px;
    color: #919743;
    margin: 10px 0;
`;

const ConstituencyDetails = styled.div`
    background: #f2f2f2;
    padding: 10px;
    min-height: 100px;
`

function HomePage() {
    const { newVoter, address, contract } = useStateContext();

    const [voterStatus, setVoterStatus] = useState({
        isActive: false,
        statusString: ""
    });
    const [isLoading, setIsLoading] = useState(true);

    const getVoterStatus = async () => {
        try {
            console.log(address);
            const data = await contract.call("getVoterStatus");
            if(data) setVoterStatus(({isActive: true, statusString: 'Voter is registered on DigiVoter: Blockchain Voting'}));  // Update voter status state with fetched data
            setIsLoading(false);
        } catch (err) {
            console.error(err);
            setVoterStatus(({isActive: false, statusString: 'Voter is registered on DigiVoter: Blockchain Voting'}))
            setIsLoading(false);
        }
    };

    useEffect(() => {
        getVoterStatus();
    }, [address]);

    return (
        newVoter.isActive ? 
        <Home>
            <VoterInfo>
            <Typography color='primary' sx={{
                fontWeight: '600'
            }}>Voter Name: {newVoter?.fName + " " + newVoter?.lName}
            </Typography>
                <table >
                    <tr>
                        <th>Aadhaar</th>
                        <td>287176403974</td>
                        <th>Voter ID</th>
                        <td>ABC123456</td>
                    </tr>
                </table>
            </VoterInfo>
            <Typography color='primary' sx={{
                margin: '10px 10px',
                fontWeight: '600'
            }}>

            Voter Status
            </Typography>
            <VotetStatus>
                {isLoading ? "Loading..." : voterStatus?.statusString}
            </VotetStatus>

            <ConstituencyDetails>
            <Typography color='primary' sx={{
                fontWeight: '600'
            }}>

            Constituency Details
            </Typography>

            <table>
                <tr>
                    <th>Constituency</th>
                    <td>Nawada</td>
                    <th>Ward</th>
                    <td>07</td>
                </tr>
                <tr>
                    <th colSpan={1}>Booth Address</th>
                    <td colSpan={3}>54, Mt. Gandhi School, Kachahari Road, Nawada</td>
                </tr>
                <tr>
                    <th>City</th>
                    <td>Nawada</td>
                    <th>State</th>
                    <td>Bihar</td>
                </tr>
            </table>

            </ConstituencyDetails>
            <PartyDetails />
        </Home>
    :
            <Home>"No Voter Detected Yet."</Home>
        
    );
}

export default HomePage;
