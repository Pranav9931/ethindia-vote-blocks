import styled from 'styled-components'
import { useStateContext } from '../context/stateContextAPI'
import { useEffect, useState } from 'react'
import { Backdrop, CircularProgress, Typography } from '@mui/material'
import { PartyImage1, PartyImage2, PartyImage3 } from '../assets'
const PartyDetailsWrapper = styled.div`
    width: 100%;
    display: flex;
    gap: 15px;
`

const PartyMembers = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    background: #f2ff5230;
    border: 2px solid #f2ff52;
    align-items: center;
    padding: 10px;
`

const Image = styled.img`
    max-width: 95%;
    // background: red;
    flex: 1;
`

const PartyDetails = () => {
    const {address, contract} = useStateContext();
    const [open, setOpen] = useState(false);
    const [candidateList, setCandidateList] = useState([])

    const getCandidateList = async () => {
        try{
            const candidates = await contract.call("getCandidateList");
            // console.log(candidates);
            setCandidateList(candidates);
        } catch (err) {
            setCandidateList([]);
        }
    }

    useEffect(() => {
        getCandidateList();
    }, [address, contract])

    

    const registerVote = async (partyName: string) => {
        try {
            setOpen(true);
            const votingStatus = await contract.call("submitVote", [partyName])
            setOpen(false);
            console.log(votingStatus)
        } catch (err) {
            console.log(err);
            setOpen(false);
        }
    }
  return (
    <>
    <Typography color='primary' sx={{
                margin: '10px 10px',
                fontWeight: '600'
            }}>

            Click on the Party Representative to Vote.
    </Typography>
    <PartyDetailsWrapper>
        
        {candidateList.length > 0 ?
        <>
        <PartyMembers
            onClick={() => registerVote("PartyA")}
        >
            <Image src={PartyImage1} />
            {candidateList[0]}
        </PartyMembers> 
        <PartyMembers
            onClick={() => registerVote("PartyB")}
        >
            <Image src={PartyImage2} />
            {candidateList[1]}
        </PartyMembers> 
        <PartyMembers
            onClick={() => registerVote("PartyC")}
        >
            <Image src={PartyImage3} />
            {candidateList[2]}
        </PartyMembers> 

        <Backdrop
            sx={{ color: '#fff', zIndex: 99999 }}
            open={open}
            onClick={() => setOpen(true)}
        >
        <CircularProgress color="inherit" />
        </Backdrop>
        </>
        :
        <CircularProgress />  
    }
    </PartyDetailsWrapper>
    </>
  )
}

export default PartyDetails