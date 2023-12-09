import { Button } from "@mui/material";
import React from "react";
import styled from "styled-components";
import { LogoImage } from "../assets";
import { useNavigate } from "react-router-dom"
import { useStateContext } from "../context/stateContextAPI";


const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background-color: #ffffff;
  border-bottom: 1px solid #f2f2f2;
`;

const Logo = styled.img`
  height: 50px;
  cursor: pointer;
`;


const Navbar = () => {

    const navigate = useNavigate();
    const {connect, address} = useStateContext();
    return (
        <Nav>
            <Logo src={LogoImage} alt="Logo" onClick={() => navigate("/")} />
            {address ? address.slice(0,5) + "..." + address.slice(30,) : 
              <Button variant="outlined" color="success" onClick={() => connect()}>
                Connect
              </Button>
            }
            
        </Nav>
    );
};

export default Navbar;
