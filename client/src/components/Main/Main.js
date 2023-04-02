import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import socket from '../../socket';
import { Particles } from '../particles';

const Main = (props) => {
  const roomRef = useRef();
  const userRef = useRef();
  const [err, setErr] = useState(false);
  const [errMsg, setErrMsg] = useState('');
  const navigate = useNavigate()


  useEffect(() => {

    socket.on('FE-error-user-exist', ({ error }) => {
      if (!error) {
        const roomName = roomRef.current.value;
        const userName = userRef.current.value;

        sessionStorage.setItem('user', userName);
        navigate(`/room/${roomName}`);
      } else {
        setErr(error);
        setErrMsg('User name already exist');
      }
    });
  }, [props.history]);

  function clickJoin() {
    const roomName = roomRef.current.value;
    const userName = userRef.current.value;

    if (!roomName || !userName) {
      setErr(true);
      setErrMsg('Enter Room Name or User Name');
    } else {
      socket.emit('BE-check-user', { roomId: roomName, userName });
    }
  }

  return (
    <>
    <Particles />
    <MainContainer>
      <Row>
          <img className='logo' src='/images/ksustify.png' alt='logo' />
      </Row>
      <hr className='hr' />
      <Form>
        <Row>
          <Label htmlFor="roomName">Room Name</Label>
          <Input type="text" id="roomName" ref={roomRef} />
        </Row>
        <Row>
          <Label htmlFor="userName">User Name</Label>
          <Input type="text" id="userName" ref={userRef} />
        </Row>
        <Row>
          <JoinButton onClick={clickJoin}> Join </JoinButton>
        </Row>
        <Row>
        {err ? <Error>{errMsg}</Error> : null}
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
  font-size: 18pt;
  color:#fff;
`;

const Form = styled.div`
 
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
  height: 35px;
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
  font-size: 15pt;
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

export default Main;
