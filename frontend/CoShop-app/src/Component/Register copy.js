import React, { useState } from 'react'
import '../App.css';
import { Container, Row, Col, Button } from 'react-bootstrap';
import firebase from '../Services/firebase';
function Register() {
const [registerForm, setRegisterForm] = useState({
  name: '',
  username: '',
  password: ''
})
const [response, setResponse] = useState();
const onChangeName = (value) => {
  registerForm.name = value;
}
const onChangeUserName = (value) => {
  registerForm.username = value;
}
const onChangePassword = (value) => {
  registerForm.password = value;
}
const onRegister = () => {
  firebase
  .auth()
  .createUserWithEmailAndPassword(registerForm.username, registerForm.password)
  .then((res) => {
    setResponse('User registered successfully!')
  })
  .catch((res) => {
    setResponse('User registration failed!')
  })
}
return (
<div>
  <div class="align-register-item-centre">
    <Container>
      <Row>
        <Col md = {4}></Col>
        <Col md = {4}>
          <div class="box">
            <h1 class="text-centre black-text">Invite</h1>
            {(response)?<h6 class="error-text text-centre">{response}</h6>:<div></div>}
            <br />
            <label class="black-text small-text">Name:</label>
            <input type="text" class="form-control" onChange={(e) => onChangeName(e.target.value)}/>
            <label class="black-text small-text">Username:</label>
            <input type="text" class="form-control" onChange={(e) => onChangeUserName(e.target.value)}/>
            <label class="black-text small-text">Password:</label>
            <input type="password" class="form-control" onChange={(e) => onChangePassword(e.target.value)}/>
            <br />
            <Button variant="primary" block onClick={() => onRegister()}>Register</Button>
            <p class="text-centre black-text small-text"><a href="/">You have account ?</a></p>
          </div>
       </Col>
       <Col md = {4}></Col>
      </Row>
    </Container>
  </div>
</div>
)
}
export default Register;


