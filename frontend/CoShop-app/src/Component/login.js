import React, { useState } from 'react'
import '../App.css';
import { Container, Row, Col, Button, Card, Breadcrumb } from 'react-bootstrap';
//import {Button, Alert, Breadcrumb, Card, Container, Form, Row, Col} from 'react-bootstrap'

import firebase from '../Services/firebase';

function Login() {
const [loginForm, setLoginForm] = useState({
  username: '',
  password: ''
})
const [response, setResponse] = useState()
const onChangeUserName = (value) => {
  loginForm.username = value;
}
const onChangePassword = (value) => {
  loginForm.password = value;
}
const onLogin = () => {
  firebase
  .auth()
  .signInWithEmailAndPassword(loginForm.username, loginForm.password)
  .then((res) => {
    setResponse('Welcome to CoShop, logged-in successfully!');
  })
  .catch((res) => {
    setResponse('Wrong username or password, logged-in failed!')
  })
}
return (
  <div>
    
    <div class="align-login-item-centre">
      <Container>
      <Card className="mb-3" style={{color: "#000", width: '60rem'}}>
          <Card.Img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSK4aQGQczM3a39lujDohb4FjYXLKTexZU1MQ&usqp=CAU/160/50"/>
          <Card.Body>
            <Card.Title>
              CoShop
            </Card.Title>
            <Card.Text>
            Collaborative Shopping
            </Card.Text>
          </Card.Body>
        </Card>

        <Breadcrumb>
          <Breadcrumb.Item>Stores</Breadcrumb.Item>
          <Breadcrumb.Item>Location</Breadcrumb.Item>
          <Breadcrumb.Item active>Test</Breadcrumb.Item>
        </Breadcrumb>

        <Row>
          <Col md = {4}></Col>
          <Col md = {4}>
            <div class="box">
              {/* <h1 class="text-centre black-text">Welcome !</h1> */}
              {(response)?<h6 class="response-text text-centre">{response}</h6>:<div></div>}
              <br />
              <label class="black-text small-text">username:</label>
              <input type="text" class="form-control" onChange={(e) => onChangeUserName(e.target.value)}/>
              <label class="black-text small-text">password:</label>
              <input type="password" class="form-control" onChange={(e) => onChangePassword(e.target.value)}/>
              <br />
              <Button variant="primary" block onClick={() => onLogin()}>Login</Button>
              <p class="text-centre black-text small-text">
              <a href="register">Don't have acount? click here to register</a></p>
            </div>
          </Col>
          <Col md = {4}></Col>
        </Row>

        


      </Container>
    </div>
  </div>
 )
}
export default Login;

