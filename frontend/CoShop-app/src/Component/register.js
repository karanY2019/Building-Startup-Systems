import React, { useState } from 'react'
import '../App.css';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import firebase from '../Services/firebase';

function Register() {
const [registerForm, setRegisterForm] = useState({
    name: '',
    username: '',
    password: ''
  })
const onChangeName = (value) => {
    registerForm.name = value;
  }
const onChangeUserName = (value) => {
    registerForm.username = value;
  }
const onChangePassword = (value) => {
    registerForm.password = value;
  }
/*class Invite extends React.Component {
    state = {invites  : null}
    
    async componentDidMount() {
      const response = await fetch('<http://localhost:4000/dev/invite>');
      const invites = await response.json();
      // save it to your components state so you can use it during render
      this.setState({invites: invites});
      console.log(invites);
    }
    
  }*/
// state = {invites  : null}

/*const onInvite = () => {
  response = await fetch('<http://localhost:4000/dev/invite>');
  invites = await response.json();
  setState({invites: invites});
  console.log(invites);

}*/


return (
<div>
  <div class="align-register-item-centre">
    <Container>
      <Row>
        <Col md = {4}></Col>
        <Col md = {4}>
          <div class="box">
            <h1 class="text-centre black-text">Invite Friends to shop togehter !</h1>
            {/* {(response)?<h6 class="error-text text-centre">{response}</h6>:<div></div>} */}
            <br />
            <label class="black-text small-text">Most Recent Collabrators:</label>
            <input type="text" class="form-control" onChange={(e) => onChangeName(e.target.value)}/>
            
            <label class="black-text small-text">Search Contact:</label>
            <input type="text" class="form-control" onChange={(e) => onChangeUserName(e.target.value)}/>
            
            
            <br />
            <Button variant="primary" >Invite</Button>
            {/* <p class="text-centre black-text small-text"><a href="/">You have account ?</a></p> */}
          </div>
       </Col>
       <Col md = {4}></Col>
      </Row>

      <Card className="mb-3" style={{color: "#000", width: '60rem'}}>
          <ul>
          { 
            this.state.invites  && this.state.invites.map(invite  => {
          return (
                      <li>
                          <div>Friend name: {invite.name}</div>
            <div>Friend location: {invite.location}</div>
                      </li>
                  )
             })
          }
          </ul>
          {/* <Card.Img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSK4aQGQczM3a39lujDohb4FjYXLKTexZU1MQ&usqp=CAU/160/50"/> */}
          <Card.Body>
            <Card.Title>
              CoShop
            </Card.Title>
            <Card.Text>
            Collaborative Shopping
            </Card.Text>
          </Card.Body>
        </Card>
    </Container>
  </div>
</div>
)
}
export default Register;


