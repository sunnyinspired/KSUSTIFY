import React, { useState } from "react";
import { useRef } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Particles } from "../particles";
import axios from "axios";

const Register = ()=>{
    const [user, setUser] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        password2: ''
    })


    const getUserData = (e)=>{
        let x = e.target.value;
        setUser({...user, [e.target.name]:x})
        console.log(user)
    }
    

    const AddUser = (e) =>{
      e.preventDefault()
      if(user.password !== user.password2){
        alert("Passwords do not match!")
      }
      else{
        axios.post("http://localhost:8000/api/register", user).then(response =>{
            if(response.data.success){
                alert("Registration Successful\n Please Login")
            }
            else{
                alert("Failed to register")
            }
        })
      }
    }
    return(
        <>
    <Particles />
    <MainContainer>
      <Row>
          <img className='logo' src='/images/ksustify.png' alt='logo' />
      </Row>
      <hr className='hr' />
      <Form onSubmit={AddUser}>
        <Row>
          <Label>First Name</Label>
          <Input type="text" placeholder="Enter First Name" name="firstName" onChange={getUserData} required />          
        </Row>
        <Row>
          <Label>Last Name</Label>
          <Input type="text" placeholder="Enter Last Name" name="lastName" onChange={getUserData} required />          
        </Row>
        <Row>
          <Label>User Email</Label>
          <Input type="text" placeholder="user@example.com" name="email" onChange={getUserData} required />
         </Row>
         <Row>
          <Label>Password</Label>
          <Input type="password" placeholder="Enter password" name="password" onChange={getUserData} required />
        </Row>
         <Row>
          <Label>Password</Label>
          <Input type="password" placeholder="Verify password" name="password2" onChange={getUserData} required />
        </Row>
        <Row>
          <JoinButton type="submit" role="submit"> Register </JoinButton>
        </Row>
        <Row>
          
          <small>Already have an account? &nbsp; 
            <Link to="/" className="link">Click here to <b>Login</b></Link>
          </small>
          
        </Row>
        
      </Form>
      
    </MainContainer>
    </>
  );
};

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  background: linear-gradient(114.3deg, rgb(19, 126, 57) 0.2%, rgb(8, 65, 91) 68.5%);
  min-height: 100vh;
  font-size: 12pt;
  color:#fff;
`;

const Form = styled.form`
 
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 15px;
  line-height: 35px;
`;

const Label = styled.label`
  margin-top: 1%;`;

const Input = styled.input`
  width: 300px;
  height: 30px;
  margin-left: 15px;
  padding-left: 10px;
  outline: none;
  border: none;
  border-radius: 5px;
  margin-top: 1%;
`;

const Error = styled.div`
  margin-top: 10px;
  font-size: 20px;
  color: #e85a71;
`;

const JoinButton = styled.button`
  margin-top: 2%;
  height: 40px;
  outline: none;
  border: none;
  border-radius: 5px;
  color: #d8e9ef;
  background-color: #4ea1d3;
  font-size: 12pt;
  font-weight: 500;
  width:7%;
  background-color:rgb(8, 65, 91);
  box-shadow: 0px 1px 1px 1px lightgrey;
  margin-left:5%;

  :hover {
    background-color: rgb(19, 126, 57);
    cursor: pointer;
  }
`;

const ErrorText = styled.label`
  color:red;
`

export default Register