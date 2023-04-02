import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Particles } from "../particles";
import axios from "axios";

const Login = ()=>{
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()    

    const SendLoginData = (e) =>{
      e.preventDefault()
      if(!email || !password){
        alert("You Must Enter Email & Password")
      }
      else{
        axios.post('http://localhost:8000/api/login', {email, password}).then(response =>{
          if(response.data.success){
            sessionStorage.setItem("UserData",JSON.stringify(response.data.msg))
            navigate("/dashboard")
          }
          else{
            alert(response.data.msg)
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
      <Form onSubmit={SendLoginData}>
        <Row>
          <Label htmlFor="email">User Email</Label>
          <Input type="email" id="email" placeholder="user@exmple.com"  onChange={e=>setEmail(e.target.value)} />
        </Row>
        <Row>
          <Label htmlFor="password">Password</Label>
          <Input type="password" id="password" placeholder="Enter password" onChange={e=>setPassword(e.target.value)} />
        </Row>
        <Row>
          <JoinButton type="submit" role="submit"> Login </JoinButton>
        </Row>
        <Row>
          
          <small>Not yet registered? &nbsp; 
            <Link to="/register" className="link">Click here to <b>Create an Account</b></Link>
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
  margin-top: 2%;`;

const Input = styled.input`
  width: 200px;
  height: 30px;
  margin-left: 15px;
  margin-top: 2%;
  padding-left: 10px;
  outline: none;
  border: none;
  border-radius: 5px;
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

export default Login